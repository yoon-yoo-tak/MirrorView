package com.mirrorview.domain.category.controller;

import com.mirrorview.config.AbstractRestDocsTests;
import com.mirrorview.domain.category.dto.CategoryDto;
import com.mirrorview.domain.category.service.CategoryService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(CategoryController.class)
@DisplayName("카테고리")
class CategoryControllerTest extends AbstractRestDocsTests {

    @MockBean
    private CategoryService categoryService;

    @Test
    @DisplayName("부모 카테고리 조회")
    void getParentCategory() throws Exception {
        List<CategoryDto> mockedCategoryDtos = List.of(new CategoryDto(1, "IT"), new CategoryDto(2, "디자인"));
        when(categoryService.getParentCategory()).thenReturn(mockedCategoryDtos);

        mockMvc.perform(get("/api/category"))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        "{" +
                                "\"success\":true," +
                                "\"msg\":\"부모 카테고리 조회 성공\"," +
                                "\"data\":" +
                                "[{\"id\":1,\"name\":\"IT\"}," +
                                "{\"id\":2,\"name\":\"디자인\"}]}"));
    }

    @Test
    @DisplayName("자식 카테고리 조회")
    void getChildCategory() throws Exception {
        String parentName = "앱개발";
        List<CategoryDto> mockedCategoryDtos = List.of(new CategoryDto(132, "IOS개발"), new CategoryDto(133, "안드로이드개발"));
        when(categoryService.getChildCategory(parentName)).thenReturn(mockedCategoryDtos);

        mockMvc.perform(get("/api/category/" + parentName))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        "{" +
                                "\"success\":true," +
                                "\"msg\":\"자식 카테고리 조회 성공\"," +
                                "\"data\":[" +
                                "{\"id\":132,\"name\":\"IOS개발\"}" +
                                ",{\"id\":133,\"name\":\"안드로이드개발\"}" +
                                "]}"));

    }
}