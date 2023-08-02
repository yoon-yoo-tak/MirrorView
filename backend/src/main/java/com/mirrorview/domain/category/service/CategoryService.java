package com.mirrorview.domain.category.service;

import com.mirrorview.domain.category.dto.CategoryDto;

import java.util.List;

public interface CategoryService {
    List<CategoryDto> getParentCategory();

    List<CategoryDto> getChildCategory(String parentName);
}
