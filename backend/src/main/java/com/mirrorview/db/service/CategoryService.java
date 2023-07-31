package com.mirrorview.db.service;

import java.util.List;

import com.mirrorview.db.dto.CategoryDto;

public interface CategoryService {
	List<CategoryDto> getParentCategory();

	List<CategoryDto> getChildCategory(String parentName);
}
