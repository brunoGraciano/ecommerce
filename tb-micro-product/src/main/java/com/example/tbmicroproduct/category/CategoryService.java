package com.example.tbmicroproduct.category;

import com.example.tbmicroproduct.exception.NoContentException;
import com.example.tbmicroproduct.exception.NotFoundException;
import com.example.tbmicroproduct.subcategory.SubcategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private SubcategoryRepository subcategoryRepository;

    public List<Category> getAllCategories() {
        List<Category> categories = new ArrayList<>();
        categoryRepository.findAll().forEach(categories::add);
        if (categories.isEmpty()) {
            throw new NoContentException("");
        }
        return categories;
    }

    public Category getCategory(String id) {
        Optional<Category> result = categoryRepository.findById(id);
        Category category = null;
        if (result.isPresent()) {
            category = result.get();
        } else {
            throw new NotFoundException("id- " + id);
        }
        return category;
    }

    public Category addCategory(Category category) {
        categoryRepository.save(category);
        return category;
    }

    public Category updateCategory(Category categoryBody, String id) {
        Optional<Category> category = categoryRepository.findById(id);
        if (!category.isPresent()) {
            throw new NotFoundException("id- " + id);
        }
        categoryBody.setId(id);
        categoryBody.setSubcategories(category.get().getSubcategories());
        return categoryRepository.save(categoryBody);
    }

    public void deleteCategory(String id) {
        if (!categoryRepository.findById(id).isPresent()) {
            throw new NotFoundException("id- " + id);
        } else {
            categoryRepository.deleteById(id);
        }
    }
}
