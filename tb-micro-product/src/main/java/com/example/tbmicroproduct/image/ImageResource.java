package com.example.tbmicroproduct.image;

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
public class ImageResource {
    @Autowired
    private ImageService service;

    @GetMapping("catalogs/categories/{idCategories}/subcategories/{idSubcategories}/products/{idProducts}/images")
    public List<Image> retrieveAllImages(@PathVariable String idProducts) {
        return service.getAllImages(idProducts);
    }

    @GetMapping("catalogs/categories/{idCategories}/subcategories/{idSubcategories}/products/{idProducts}/images/{id}")
    public Image retrieveImage(@PathVariable String id) {
        return service.getImage(id);
    }

    @PostMapping("catalogs/categories/{idCategories}/subcategories/{idSubcategories}/products/{id}/images")
    public ResponseEntity createImage(@RequestBody Image image, @PathVariable String id, @RequestParam String session) {
        if (isAdmin(session)) {
            Image savedImage = service.addImage(image, id);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(savedImage.getId()).toUri();
            return ResponseEntity.created(location).build();
        } else {
            throw new NotAuthorizeException("Access is denied");
        }
    }

    @PutMapping("catalogs/categories/{idCategories}/subcategories/{idSubcategories}/products/{idProducts}/images/{id}")
    public void updateImage(@RequestBody Image image, @PathVariable String id, @RequestParam String session) {
        if (isAdmin(session)) {
            service.updateImage(image, id);
        } else {
            throw new NotAuthorizeException("Access is denied");
        }
    }

    @DeleteMapping("catalogs/categories/{idCategories}/subcategories/{idSubcategories}/products/{idProducts}/images/{id}")
    public void deleteImage(@PathVariable String id, @RequestParam String session) {
        if (isAdmin(session)) {
            service.deleteImage(id);
        } else {
            throw new NotAuthorizeException("Access is denied");
        }
    }
}
