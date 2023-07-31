package com.mirrorview.db.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mirrorview.db.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, String> {
	List<Category> findByParentIsNull();

	List<Category> findByParent(Category parent);

	Optional<Category> findFirstByName(String name);

}
