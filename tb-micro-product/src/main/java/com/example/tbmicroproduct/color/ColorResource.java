package com.example.tbmicroproduct.color;

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
public class ColorResource {
    @Autowired
    private ColorService service;

    @GetMapping("catalogs/colors")
    public List<Color> retrieveAllColors() {
        return service.getAllColors();
    }

    @PostMapping("catalogs/colors")
    public ResponseEntity createColors(@RequestBody Color color, @RequestParam String session) {
        if (isAdmin(session)) {
            Color savedColor = service.addColors(color);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(savedColor.getId()).toUri();
            return ResponseEntity.created(location).build();
        } else {
            throw new NotAuthorizeException("Access is denied");
        }
    }

    @PutMapping("catalogs/colors/{id}")
    public void updateColors(@RequestBody Color color, @PathVariable String id, @RequestParam String session) {
        if (isAdmin(session)) {
            service.updateColors(color, id);
        } else {
            throw new NotAuthorizeException("Access is denied");
        }
    }

    @DeleteMapping("catalogs/colors/{id}")
    public void deleteColors(@PathVariable String id, @RequestParam String session) {
        if (isAdmin(session)) {
            service.deleteColors(id);
        } else {
            throw new NotAuthorizeException("Access is denied");
        }
    }
}

