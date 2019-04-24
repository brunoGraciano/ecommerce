package com.example.tbmicroproduct.size;

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
public class SizeResource {
    @Autowired
    private SizeService service;

    @GetMapping("catalogs/sizes")
    public List<Size> retrieveAllSizes() {
        return service.getAllSizes();
    }

    @PostMapping("catalogs/sizes")
    public ResponseEntity createSizes(@RequestBody Size size, @RequestParam String session) {
        if (isAdmin(session)) {
            Size savedSize = service.addSizes(size);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(savedSize.getId()).toUri();
            return ResponseEntity.created(location).build();
        } else {
            throw new NotAuthorizeException("Access is denied");
        }
    }

    @PutMapping("catalogs/sizes/{id}")
    public void updateSizes(@RequestBody Size size, @PathVariable String id, @RequestParam String session) {
        if (isAdmin(session)) {
            service.updateSizes(size, id);
        } else {
            throw new NotAuthorizeException("Access is denied");
        }
    }

    @DeleteMapping("catalogs/sizes/{id}")
    public void deleteSizes(@PathVariable String id, @RequestParam String session) {
        if (isAdmin(session)) {
            service.deleteSizes(id);
        } else {
            throw new NotAuthorizeException("Access is denied");
        }
    }
}

