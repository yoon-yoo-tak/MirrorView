package com.mirrorview.domain.category.repository;

import com.mirrorview.domain.category.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, String> {
    List<Category> findByParentIsNull();

    List<Category> findByParent(Category parent);

    Optional<Category> findFirstByName(String name);

    @Query(nativeQuery = true,
            value = "WITH RECURSIVE CategoryHierarchy (id, name, parent_id) AS (" +
                    "SELECT id, name, parent_id FROM category WHERE id = :id " +
                    "UNION ALL " +
                    "SELECT c.id, c.name, c.parent_id FROM category c " +
                    "INNER JOIN CategoryHierarchy ch ON c.parent_id = ch.id) " +
                    "SELECT * FROM CategoryHierarchy")
    List<Category> findHierarchiesByLargeCategory(@Param("id") Long id);

    @Query("SELECT c FROM Category c WHERE c.parent.id = :id")
    List<Category> findHierarchiesByMiddleCategory(@Param("id") Long id);

}
