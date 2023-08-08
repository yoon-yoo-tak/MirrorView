package com.mirrorview.domain.interview.service;

import com.mirrorview.domain.category.entity.Category;
import com.mirrorview.domain.category.repository.CategoryRepository;
import com.mirrorview.domain.essay.dto.EssayDetailDto;
import com.mirrorview.domain.essay.dto.EssayDto;
import com.mirrorview.domain.essay.dto.EssayListDto;
import com.mirrorview.domain.essay.repository.EssayDetailRepository;
import com.mirrorview.domain.essay.repository.EssayRepository;
import com.mirrorview.domain.interview.domain.InterviewRoom;
import com.mirrorview.domain.interview.domain.RoomMemberInfo;
import com.mirrorview.domain.interview.dto.MessageDto;
import com.mirrorview.domain.interview.dto.RoomRequestDto;
import com.mirrorview.domain.interview.dto.RoomResponseDto;
import com.mirrorview.domain.interview.repository.InterviewRepository;
import com.mirrorview.domain.user.domain.Member;
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
    private static final Integer LARGE_CATEGORY = 1;
    private static final Integer MIDDLE_CATEGORY = 2;
    private static final Integer SMALL_CATEGORY = 3;

    private final RedisTemplate<String, InterviewRoom> template;
    private final InterviewRepository interviewRepository;
    private final EssayRepository essayRepository;
    private final EssayDetailRepository essayDetailRepository;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final CategoryRepository categoryRepository;

    @Override
    public List<RoomResponseDto> findRoom() {
        Iterable<InterviewRoom> rooms = interviewRepository.findAll();
        return toRoomResponseDtos(rooms);
    }

    @Override
    public InterviewRoom create(Member member, RoomRequestDto requestDto) {
        InterviewRoom createRoom = requestDto.toEntity(member.getNickname());
        List<EssayListDto> essayList = new ArrayList<>();
        //List<EssayListDto> essayListDtos = getEssayListDtos(member.getUserId());
        createRoom.join(member, essayList);
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
    public List<RoomResponseDto> findRoomByCategory(Integer depth, String categoryName) {
        List<RoomResponseDto> result = new ArrayList<>();
        List<Category> tmp = new ArrayList<>();
        Category category = categoryRepository.findFirstByName(categoryName)
                .orElseThrow(() -> new IllegalArgumentException("해당 카테고리가 없습니다."));

        if (depth == SMALL_CATEGORY) {
            tmp.add(category);
        }
        if (depth == MIDDLE_CATEGORY) {
            tmp = categoryRepository.findHierarchiesByMiddleCategory(category.getId());
        }
        if (depth == LARGE_CATEGORY) {
            tmp = categoryRepository.findHierarchiesByLargeCategory(category.getId());
        }

        List<String> collect = tmp.stream()
                .map(Category::getName)
                .collect(Collectors.toList());

        collect.forEach(c -> {
            List<RoomResponseDto> roomResponseDtos = toRoomResponseDtos(interviewRepository.findByCategory(c));
            result.addAll(roomResponseDtos);
        });
        return result;
    }

    @Override
    @Transactional
    public InterviewRoom joinRoom(Member member, String roomId, String password) {
        Optional<InterviewRoom> findRoom = findRoomById(roomId);
        if (findRoom.isPresent()) {
            InterviewRoom interviewRoom = findRoom.get();
            String roomPassword = interviewRoom.getPassword();
            if (!roomPassword.isEmpty()) {
                log.info("room pass = {}", roomPassword);
                log.info("pass = {}", password);
                if (!roomPassword.equals(password)) {
                    throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
                }
            }
            List<EssayListDto> essayList = new ArrayList<>();
            //List<EssayListDto> essayListDtos = getEssayListDtos(member.getUserId());
            interviewRoom.join(member, essayList);

            System.out.println(member);

            interviewRepository.save(interviewRoom);
            return interviewRoom;
        }
        throw new IllegalArgumentException("방 정보가 존재하지 않습니다.");
    }

    public List<EssayListDto> getEssayListDtos(String userId) {
        List<EssayDto> essays = essayRepository.findEssayByUserId(userId);
        log.info("에쎄이 가져오기 {}", essays);
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
        log.info("rooms in method = {}", rooms);
        List<RoomResponseDto> result = new ArrayList<>();
        rooms.forEach(room -> {
            if (room != null) {
                RoomResponseDto roomResponseDto = RoomResponseDto.build(room);
                result.add(roomResponseDto);
            }
        });
        log.info("this is toDtos = {}", result);
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
    public void systemMessage(String userId, String roomId, String suffix) {
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

    public boolean startedState(String roomId){
        Optional<InterviewRoom> roomById = interviewRepository.findById(roomId);
        if(roomById.isPresent()){
            roomById.get().startedState();
            System.out.println("11111111111111111111111111111111111111");
            return true;
        }
        return false;
    }
}

