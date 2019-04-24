package com.example.tbmicroproduct.color;

import com.example.tbmicroproduct.exception.NoContentException;
import com.example.tbmicroproduct.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ColorService {
    @Autowired
    private ColorRepository colorRepository;

    public List<Color> getAllColors() {
        List<Color> color = new ArrayList<>();
        colorRepository.findAll().forEach(color::add);
        if (color.isEmpty()) {
            throw new NoContentException("");
        }
        return color;
    }

    public Color addColors(Color color) {
        colorRepository.save(color);
        return color;
    }

    public Color updateColors(Color colorBody, String id) {
        Optional<Color> color = colorRepository.findById(id);
        if (!color.isPresent()) {
            throw new NotFoundException("id- " + id);
        }
        colorBody.setId(id);
        return colorRepository.save(colorBody);
    }

    public void deleteColors(String id) {
        if (!colorRepository.findById(id).isPresent()) {
            throw new NotFoundException("id- " + id);
        } else {
            colorRepository.deleteById(id);
        }
    }
}
