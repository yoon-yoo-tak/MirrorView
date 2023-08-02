package com.mirrorview.domain.category.entity;

import com.mirrorview.domain.category.dto.CategoryDto;
import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder
@ToString
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Category parent;

    public CategoryDto toCategoryDto() {
        return CategoryDto.builder()
                .id(this.id)
                .name(this.name)
                .build();
    }
}
