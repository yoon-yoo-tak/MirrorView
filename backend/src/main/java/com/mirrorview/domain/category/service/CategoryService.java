package com.mirrorview.domain.category.service;

import java.util.List;

import com.mirrorview.domain.category.dto.CategoryDto;

public interface CategoryService {
	List<CategoryDto> getParentCategory();

	List<CategoryDto> getChildCategory(String parentName);
}
