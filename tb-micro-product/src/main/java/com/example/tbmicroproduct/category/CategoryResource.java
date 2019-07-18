package com.example.tbmicroproduct.category;

import com.example.tbmicroproduct.exception.NotAuthorizeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

import static com.example.tbmicroproduct.TbMicroProductApplication.isAdmin;

@RestController
@CrossOrigin
public class CategoryResource {
    @Autowired
    private CategoryService service;

    @GetMapping("catalogs/categories")
    public List<Category> retrieveAllCategories() {
        return
                service.getAllCategories();
    }

    @GetMapping("catalogs/categories/{id}")
    public Category retrieveCategory(@PathVariable String id) {
        return service.getCategory(id);
    }

    @PostMapping("catalogs/categories")
    public ResponseEntity createCategory(@RequestBody Category category,
                                         @RequestParam String session) {
        if (isAdmin(session)) {
            Category savedCategory = service.addCategory(category);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                    .path("/{id}").buildAndExpand(savedCategory.getId()).toUri();
            return ResponseEntity.created(location).build();
        } else {
            throw new NotAuthorizeException("Access is denied");
        }
    }

    @PutMapping("catalogs/categories/{id}")
    public void updateCategory(@RequestBody Category category,
                               @PathVariable String id,
                               @RequestParam String session) {
        if (isAdmin(session)) {
            service.updateCategory(category, id);
        } else {
            throw new NotAuthorizeException("Access is denied");
        }
    }

    @DeleteMapping("catalogs/categories/{id}")
    public void deleteCategory(@PathVariable String id,
                               @RequestParam String session) {
        if (isAdmin(session)) {
            service.deleteCategory(id);
        } else {
            throw new NotAuthorizeException("Access is denied");
        }
    }
}

