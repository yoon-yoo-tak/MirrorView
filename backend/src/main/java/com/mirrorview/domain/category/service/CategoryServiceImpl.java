package com.mirrorview.domain.category.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mirrorview.domain.category.dto.CategoryDto;
import com.mirrorview.domain.category.entity.Category;
import com.mirrorview.domain.category.repository.CategoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
	private final CategoryRepository categoryRepository;

	@Override
	@Transactional
	public List<CategoryDto> getParentCategory() {
		List<CategoryDto> result = new ArrayList<>();
		List<Category> categories = categoryRepository.findByParentIsNull();
		categories.forEach(category -> result.add(category.toCategoryDto()));
		return result;
	}

	@Override
	@Transactional
	public List<CategoryDto> getChildCategory(String parentName) {
		List<CategoryDto> result = new ArrayList<>();
		Optional<Category> parent = categoryRepository.findFirstByName(parentName);

		if (parent.isPresent()) {
			List<Category> parents = categoryRepository.findByParent(parent.get());
			parents.forEach(category -> result.add(category.toCategoryDto()));
		}
		return result;
	}
}
