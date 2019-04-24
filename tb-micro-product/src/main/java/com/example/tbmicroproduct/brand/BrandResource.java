package com.example.tbmicroproduct.brand;

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
public class BrandResource {
    @Autowired
    private BrandService service;

    @GetMapping("catalogs/brands")
    public List<Brand> retrieveAllBrands() {
        return service.getAllBrands();
    }

    @PostMapping("catalogs/brands")
    public ResponseEntity createBrand(@RequestBody Brand brand, @RequestParam String session) {
        if (isAdmin(session)) {
            Brand savedBrand = service.addBrand(brand);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(savedBrand.getId()).toUri();
            return ResponseEntity.created(location).build();
        } else {
            throw new NotAuthorizeException("Access is denied");
        }
    }

    @PutMapping("catalogs/brands/{id}")
    public void updateBrand(@RequestBody Brand brand, @PathVariable String id, @RequestParam String session) {
        if (isAdmin(session)) {
            service.updateBrand(brand, id);
        } else {
            throw new NotAuthorizeException("Access is denied");
        }
    }

    @DeleteMapping("catalogs/brands/{id}")
    public void deleteBrand(@PathVariable String id, @RequestParam String session) {
        if (isAdmin(session)) {
            service.deleteBrand(id);
        } else {
            throw new NotAuthorizeException("Access is denied");
        }
    }
}

