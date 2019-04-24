package com.example.tbmicroproduct.subcategory;

import com.example.tbmicroproduct.category.Category;
import com.example.tbmicroproduct.category.CategoryRepository;
import com.example.tbmicroproduct.exception.NoContentException;
import com.example.tbmicroproduct.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubcategoryService {
    @Autowired
    private SubcategoryRepository subcategoryRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    public List<Subcategory> getAllSubcategories(String id) {
        Optional<Category> categoryOptional = categoryRepository.findById(id);
        if (!categoryOptional.isPresent()) {
            throw new NotFoundException("id- " + id);
        }
        if (categoryOptional.get().getSubcategories().isEmpty()) {
            throw new NoContentException("");
        }
        return categoryOptional.get().getSubcategories();
    }

    public Subcategory getSubcategory(String id) {
        Optional<Subcategory> result = subcategoryRepository.findById(id);
        Subcategory subcategory = null;
        if (result.isPresent()) {
            subcategory = result.get();
        } else {
            throw new NotFoundException("id- " + id);
        }
        return subcategory;
    }

    public Subcategory addSubcategory(Subcategory subcategory, String id) {
        Optional<Category> categoryOptional = categoryRepository.findById(id);
        if (!categoryOptional.isPresent()) {
            throw new NotFoundException("id- " + id);
        }
        Category category = categoryOptional.get();
        subcategory.setCategory(category);
        subcategoryRepository.save(subcategory);
        return subcategory;
    }

    public Subcategory updateSubcategory(Subcategory subcategoryBody, String id) {
        if (!subcategoryRepository.findById(id).isPresent()) {
            throw new NotFoundException("id- " + id);
        }
        subcategoryBody.setId(id);
        subcategoryBody.setCategory(subcategoryRepository.findById(id).get().getCategory());
        return subcategoryRepository.save(subcategoryBody);
    }

    public void deleteSubcategory(String id) {
        if (!subcategoryRepository.findById(id).isPresent()) {
            throw new NotFoundException("id- " + id);
        } else {
            subcategoryRepository.deleteById(id);
        }
    }

}
