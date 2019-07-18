package com.example.tbmicroproduct.subcategory;

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
public class SubcategoryResource {
    @Autowired
    private SubcategoryService service;

    @GetMapping("catalogs/categories/{idCategories}/subcategories")
    public List<Subcategory> getAllSubcategories(@PathVariable String idCategories) {
        return service.getAllSubcategories(idCategories);
    }

    @GetMapping("catalogs/categories/{idCategories}/subcategories/{id}")
    public Subcategory getSubcategory(@PathVariable String id) {
        return service.getSubcategory(id);
    }

    @PostMapping("catalogs/categories/{id}/subcategories")
    public ResponseEntity createSubcategory(@RequestBody Subcategory subcategory, @PathVariable String id, @RequestParam String session) {
        if (isAdmin(session)) {
            Subcategory savedSubcategory = service.addSubcategory(subcategory, id);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(savedSubcategory.getId()).toUri();
            return ResponseEntity.created(location).build();
        } else {
            throw new NotAuthorizeException("Access is denied");
        }
    }

    @PutMapping("catalogs/categories/{idCategories}/subcategories/{id}")
    public void updateSubcategory(@RequestBody Subcategory subcategory, @PathVariable String id, @RequestParam String session) {
        if (isAdmin(session)) {
            service.updateSubcategory(subcategory, id);
        } else {
            throw new NotAuthorizeException("Access is denied");
        }
    }

    @DeleteMapping("catalogs/categories/{idCategories}/subcategories/{id}")
    public void deleteCategory(@PathVariable String id, @RequestParam String session) {
        if (isAdmin(session)) {
            service.deleteSubcategory(id);
        } else {
            throw new NotAuthorizeException("Access is denied");
        }
    }
}
