package com.example.tbmicroproduct.attributes;

import com.example.tbmicroproduct.exception.NotAuthorizeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

import static com.example.tbmicroproduct.TbMicroProductApplication.isAdmin;

@RestController
@CrossOrigin
public class AttributesResource {
    @Autowired
    private AttributesService service;

    @GetMapping("catalogs/categories/{idCategories}/subcategories/{idSubcategories}/products/{idProducts}/attributes")
    public Attributes retrieveAttributes(@PathVariable String idProducts) {
        return service.getAttributes(idProducts);
    }

    @PostMapping("catalogs/categories/{idCategories}/subcategories/{idSubcategories}/products/{id}/attributes")
    public ResponseEntity createAttributes(@RequestBody Attributes attributes, @PathVariable String id, @RequestParam String session) {
        if (isAdmin(session)) {
            Attributes savedAttributes = service.addAttributes(attributes, id);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(savedAttributes.getId()).toUri();
            return ResponseEntity.created(location).build();
        } else {
            throw new NotAuthorizeException("Access is denied");
        }
    }

    @PutMapping("catalogs/categories/{idCategories}/subcategories/{idSubcategories}/products/{idProducts}/attributes/{id}")
    public void updateAttributes(@RequestBody Attributes attributes, @PathVariable String id, @RequestParam String session) {
        if (isAdmin(session)) {
            service.updateAttributes(attributes, id);
        } else {
            throw new NotAuthorizeException("Access is denied");
        }

    }

    @DeleteMapping("catalogs/categories/{idCategories}/subcategories/{idSubcategories}/products/{idProducts}/attributes/{id}")
    public void deleteAttributes(@PathVariable String id, @RequestParam String session) {
        if (isAdmin(session)) {
            service.deleteAttributes(id);
        } else {
            throw new NotAuthorizeException("Access is denied");
        }
    }
}
