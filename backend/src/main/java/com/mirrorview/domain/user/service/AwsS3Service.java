package com.mirrorview.domain.user.service;

import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.mirrorview.domain.user.domain.Member;
import com.mirrorview.domain.user.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AwsS3Service {
	private final AmazonS3 amazonS3;
	private final MemberRepository memberRepository;
	@Value("${cloud.aws.s3.bucket}")
	private String bucket;
	@Value("${cloud.aws.prefix.url}")
	private String prefix;

	public String uploadProfileImage(MultipartFile newImage, String userId) {
		Optional<Member> member = memberRepository.findByUserId(userId);

		String currentFileName = member.get().getPhoto(); // member에 저장되어있는 이미지주소
		String newFileName = uploadImage(newImage); // 업데이트할 이미지명
		member.get().updatePhoto(prefix + newFileName);
		if (currentFileName != null) {
			log.info(currentFileName);
			log.info(currentFileName.substring(52));
			deleteImage(currentFileName.substring(52));
		}
		return prefix + newFileName;
	}

	public String uploadImage(MultipartFile multipartFile) {

		// 업로드된 파일의 확장자
		String fileExtension = getFileExtension(multipartFile.getOriginalFilename());

		// 업로드된 파일의 MIME 타입
		String mimeType = multipartFile.getContentType();

		// 이미지 파일인지 확인
		if (!isImageFile(fileExtension, mimeType)) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "이미지 파일만 업로드 가능합니다.");
		}

		String fileName = createFileName(multipartFile.getOriginalFilename());
		ObjectMetadata objectMetadata = new ObjectMetadata();
		objectMetadata.setContentLength(multipartFile.getSize());
		objectMetadata.setContentType(multipartFile.getContentType());

		try (InputStream inputStream = multipartFile.getInputStream()) {
			amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
				.withCannedAcl(CannedAccessControlList.PublicRead));
		} catch (IOException e) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "사진 업로드에 실패했습니다.");
		}
		return fileName;
	}

	public void deleteImage(String fileName) {
		amazonS3.deleteObject(new DeleteObjectRequest(bucket, fileName));
	}

	/// 랜덤파일이름으로 바꾸기
	private String createFileName(String fileName) {
		return UUID.randomUUID().toString().concat(getFileExtension(fileName));
	}

	// 파일의 확장자 갖고오기, 확장자가 없는 파일이면 Exception
	private String getFileExtension(String fileName) {
		try {
			return fileName.substring(fileName.lastIndexOf("."));
		} catch (StringIndexOutOfBoundsException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일(" + fileName + ") 입니다.");
		}
	}

	// 이미지 파일인지 확인하는 메서드
	private boolean isImageFile(String fileExtension, String mimeType) {
		List<String> allowedExtensions = Arrays.asList(".jpg", ".jpeg", ".png", ".gif", ".bmp", "tiff", ".tif", "webp",
			"svg");
		List<String> allowedMimeTypes = Arrays.asList("image/jpeg", "image/png", "image/gif");
		return allowedExtensions.contains(fileExtension.toLowerCase()) && allowedMimeTypes.contains(mimeType);
	}
}
