package com.example.tbmicroproduct.size;

import com.example.tbmicroproduct.exception.NoContentException;
import com.example.tbmicroproduct.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SizeService {
    @Autowired
    private SizeRepository sizeRepository;

    public List<Size> getAllSizes() {
        List<Size> sizes = new ArrayList<>();
        sizeRepository.findAll().forEach(sizes::add);
        if (sizes.isEmpty()) {
            throw new NoContentException("");
        }
        return sizes;
    }

    public Size addSizes(Size size) {
        sizeRepository.save(size);
        return size;
    }

    public Size updateSizes(Size sizeBody, String id) {
        Optional<Size> size = sizeRepository.findById(id);
        if (!size.isPresent()) {
            throw new NotFoundException("id- " + id);
        }
        sizeBody.setId(id);
        return sizeRepository.save(sizeBody);
    }

    public void deleteSizes(String id) {
        if (!sizeRepository.findById(id).isPresent()) {
            throw new NotFoundException("id- " + id);
        } else {
            sizeRepository.deleteById(id);
        }
    }
}
