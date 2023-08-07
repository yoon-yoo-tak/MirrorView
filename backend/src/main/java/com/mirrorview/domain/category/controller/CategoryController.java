package com.mirrorview.domain.category.controller;

import com.mirrorview.domain.category.dto.CategoryDto;
import com.mirrorview.domain.category.entity.Category;
import com.mirrorview.domain.category.service.CategoryService;
import com.mirrorview.global.response.BaseResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category")
@RequiredArgsConstructor
@Slf4j
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<?> getParentCategory() {
        List<CategoryDto> categoryDtos = categoryService.getParentCategory();
        if (categoryDtos == null || categoryDtos.isEmpty()) {
            return BaseResponse.fail("부모 카테고리 조회 실패", 400);
        }
        return BaseResponse.okWithData(HttpStatus.OK, "부모 카테고리 조회 성공", categoryDtos);
    }

    @GetMapping("/{parentName}")
    public ResponseEntity<?> getChildCategory(@PathVariable String parentName) {
        List<CategoryDto> categoryDtos = categoryService.getChildCategory(parentName);
        if (categoryDtos == null || categoryDtos.isEmpty()) {
            return BaseResponse.fail("자식 카테고리 조회 실패", 400);
        }
        return BaseResponse.okWithData(HttpStatus.OK, "자식 카테고리 조회 성공", categoryDtos);
    }

//    @GetMapping("/detail")
//    public ResponseEntity<?> getChildHierarchy(@RequestParam Integer depth, @RequestParam String name) {
//        List<CategoryDto> result = null;
//        try {
//            result = categoryService.getHierarchiesCategory(depth, name);
//        } catch (Exception e) {
//            return BaseResponse.fail(e.getMessage(), 400);
//        }
//        return BaseResponse.okWithData(HttpStatus.OK, "조회 성공", result);
//    }
}
