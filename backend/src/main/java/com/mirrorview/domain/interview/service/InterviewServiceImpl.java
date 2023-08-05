package com.mirrorview.domain.interview.service;

import com.mirrorview.domain.essay.dto.EssayDetailDto;
import com.mirrorview.domain.essay.dto.EssayDto;
import com.mirrorview.domain.essay.dto.EssayListDto;
import com.mirrorview.domain.essay.repository.EssayDetailRepository;
import com.mirrorview.domain.essay.repository.EssayRepository;
import com.mirrorview.domain.interview.domain.InterviewRoom;
import com.mirrorview.domain.interview.domain.RoomMemberInfo;
import com.mirrorview.domain.interview.dto.MemberDto;
import com.mirrorview.domain.interview.dto.MessageDto;
import com.mirrorview.domain.interview.dto.RoomRequestDto;
import com.mirrorview.domain.interview.dto.RoomResponseDto;
import com.mirrorview.domain.interview.repository.InterviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class InterviewServiceImpl implements InterviewService {

    private final RedisTemplate<String, InterviewRoom> template;
    private final InterviewRepository interviewRepository;
    private final EssayRepository essayRepository;
    private final EssayDetailRepository essayDetailRepository;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @Override
    public List<RoomResponseDto> findRoom() {
        Iterable<InterviewRoom> rooms = interviewRepository.findAll();
        return toRoomResponseDtos(rooms);
    }

    @Override
    public InterviewRoom create(String userId, String nickname, RoomRequestDto requestDto) {
        InterviewRoom createRoom = requestDto.toEntity(nickname);
        List<EssayListDto> essayList = getEssayListDtos(userId);
        createRoom.join(nickname, essayList);
        interviewRepository.save(createRoom);
        System.out.println(interviewRepository.count());
        return createRoom;
    }

    @Override
    @Transactional
    public void exitRoom(String nickname, String roomId) {
        Optional<InterviewRoom> findRoom = findRoomById(roomId);
        if (findRoom.isPresent()) {
            InterviewRoom interviewRoom = findRoom.get();
            if (interviewRoom.getCurrentCount() == 1) {
                interviewRepository.delete(interviewRoom);
                return;
            }
            boolean exit = interviewRoom.exit(nickname);
            if (!exit) {
                throw new IllegalArgumentException("사용자가 존재하지 않습니다.");
            }
            interviewRepository.save(interviewRoom);
            return;
        }
        throw new IllegalArgumentException("잘못된 정보입니다.");
    }

    @Override
    public Optional<InterviewRoom> findRoomById(String roomId) {
        return interviewRepository.findById(roomId);
    }

    @Override
    public List<RoomResponseDto> findRoomByCategory(String category) {
        return interviewRepository.findByCategory(category)
                .stream()
                .map(RoomResponseDto::build)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public InterviewRoom joinRoom(String userId, String nickname, String roomId) {
        Optional<InterviewRoom> findRoom = findRoomById(roomId);
        if (findRoom.isPresent()) {
            InterviewRoom interviewRoom = findRoom.get();
            List<EssayListDto> essayList = getEssayListDtos(userId);
            interviewRoom.join(nickname, essayList);
            interviewRepository.save(interviewRoom);
            return interviewRoom;
        }
        throw new IllegalArgumentException("방 정보가 존재하지 않습니다.");
    }

    private List<EssayListDto> getEssayListDtos(String userId) {
        List<EssayDto> essays = essayRepository.findEssayByUserId(userId);
        List<EssayListDto> essayList = new ArrayList<>();
        for (EssayDto essay : essays) {
            List<EssayDetailDto> essayDetail = essayDetailRepository.findEssayByEssayId(essay.getId());
            EssayListDto createEssay = EssayListDto.createEssay(essay, essayDetail);
            essayList.add(createEssay);
        }
        return essayList;
    }

    @Override
    @Transactional
    public void changeReady(RoomMemberInfo memberInfo, InterviewRoom room) {
        room.changeReady(memberInfo);
        interviewRepository.save(room);

    }

    private List<RoomResponseDto> toRoomResponseDtos(Iterable<InterviewRoom> rooms) {
        List<RoomResponseDto> result = new ArrayList<>();
        rooms.forEach(room -> {
            if (room != null) {
                RoomResponseDto roomResponseDto = RoomResponseDto.build(room);
                result.add(roomResponseDto);
            }
        });
        return result;
    }

    public RoomMemberInfo toggleReadyStatus(String roomId, String userNickname) {
        Optional<InterviewRoom> roomOptional = interviewRepository.findById(roomId);
        if (!roomOptional.isPresent()) {
            throw new RuntimeException("Room not found");
        }
        InterviewRoom room = roomOptional.get();

        Optional<RoomMemberInfo> memberOptional = room.getMembers().stream()
            .filter(member -> member.getNickname().equals(userNickname))
            .findFirst();
        if (!memberOptional.isPresent()) {
            throw new RuntimeException("Member not found");
        }
        RoomMemberInfo member = memberOptional.get();

        // 레디 상태 토글
        member.changeReady();

        interviewRepository.save(room);
        return member;
    }

    public RoomMemberInfo toggleRoleStatus(String roomId, String username) {
        Optional<InterviewRoom> roomOptional = interviewRepository.findById(roomId);
        if (!roomOptional.isPresent()) {
            throw new RuntimeException("Room not found");
        }
        InterviewRoom room = roomOptional.get();

        Optional<RoomMemberInfo> memberOptional = room.getMembers().stream()
            .filter(member -> member.getNickname().equals(username))
            .findFirst();

        if (!memberOptional.isPresent()) {
            throw new RuntimeException("Member not found");
        }
        RoomMemberInfo member = memberOptional.get();

        // 역할 상태 토글
        member.changeRole();
        interviewRepository.save(room);
        return member;
    }

    // ex) suffix: userid + suffix 내용
    public void systemMessage(String userId, String roomId, String suffix){
        if (!roomId.startsWith("interviewRoom")) {
            // roomId가 "interviewRoom"으로 시작하지 않으면 메서드를 종료
            return;
        }

        MessageDto systemMessage = MessageDto.builder()
            .type("SYSTEM")
            .data(Map.of("memberId", "system", "message", userId + suffix))
            .build();

        simpMessagingTemplate.convertAndSend("/sub/interviewrooms/" + roomId, systemMessage);
    }
}

