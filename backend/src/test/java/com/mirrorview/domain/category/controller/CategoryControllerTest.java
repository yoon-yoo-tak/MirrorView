package com.mirrorview.domain.category.controller;

import com.mirrorview.config.AbstractRestDocsTests;
import com.mirrorview.domain.category.service.CategoryService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.web.WebAppConfiguration;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


//@ExtendWith({RestDocumentationExtension.class, SpringExtension.class})
@WebMvcTest(CategoryController.class)
//@AutoConfigureRestDocs
//    @AutoConfigureMockMvc
//    @WebAppConfiguration
//@Import(CategoryService.class)
class CategoryControllerTest extends AbstractRestDocsTests {

    @Test
    void getParentCategory() throws Exception {
    }

    @Test
    void getChildCategory() {
    }
}