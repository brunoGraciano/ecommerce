package com.example.tbmicroproduct.weights;

import com.example.tbmicroproduct.exception.NoContentException;
import com.example.tbmicroproduct.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class WeightService {
    @Autowired
    private WeightRepository weightRepository;

    public List<Weight> getAllWeights() {
        List<Weight> weights = new ArrayList<>();
        weightRepository.findAll().forEach(weights::add);
        if (weights.isEmpty()) {
            throw new NoContentException("");
        }
        return weights;
    }

    public Weight addWeight(Weight weight) {
        weightRepository.save(weight);
        return weight;
    }

    public Weight updateWeight(Weight weightBody, String id) {
        Optional<Weight> weight = weightRepository.findById(id);
        if (!weight.isPresent()) {
            throw new NotFoundException("id- " + id);
        }
        weightBody.setId(id);
        return weightRepository.save(weightBody);
    }

    public void deleteWeight(String id) {
        if (!weightRepository.findById(id).isPresent()) {
            throw new NotFoundException("id- " + id);
        } else {
            weightRepository.deleteById(id);
        }
    }
}
