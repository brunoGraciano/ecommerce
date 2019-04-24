package com.example.tbmicroproduct.weights;

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
public class WeightResource {
    @Autowired
    private WeightService service;

    @GetMapping("catalogs/weights")
    public List<Weight> retrieveAllWeights() {
        return service.getAllWeights();
    }

    @PostMapping("catalogs/weights")
    public ResponseEntity createWeight(@RequestBody Weight weight, @RequestParam String session) {
        if (isAdmin(session)) {
            Weight savedWeight = service.addWeight(weight);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(savedWeight.getId()).toUri();
            return ResponseEntity.created(location).build();
        } else {
            throw new NotAuthorizeException("Access is denied");
        }
    }

    @PutMapping("catalogs/weights/{id}")
    public void updateWeight(@RequestBody Weight weight, @PathVariable String id, @RequestParam String session) {
        if (isAdmin(session)) {
            service.updateWeight(weight, id);
        } else {
            throw new NotAuthorizeException("Access is denied");
        }
    }

    @DeleteMapping("catalogs/weights/{id}")
    public void deleteWeight(@PathVariable String id, @RequestParam String session) {
        if (isAdmin(session)) {
            service.deleteWeight(id);
        } else {
            throw new NotAuthorizeException("Access is denied");
        }
    }
}

