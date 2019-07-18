package com.example.tbmicroproduct.brand;

import com.example.tbmicroproduct.exception.NoContentException;
import com.example.tbmicroproduct.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BrandService {
    @Autowired
    private BrandRepository brandRepository;

    public List<Brand> getAllBrands() {
        List<Brand> brands = new ArrayList<>();
        brandRepository.findAll().forEach(brands::add);
        if (brands.isEmpty()) {
            throw new NoContentException("");
        }
        return brands;
    }

    public Brand addBrand(Brand brand) {
        brandRepository.save(brand);
        return brand;
    }

    public Brand updateBrand(Brand brandBody, String id) {
        Optional<Brand> brand = brandRepository.findById(id);
        if (!brand.isPresent()) {
            throw new NotFoundException("id- " + id);
        }
        brandBody.setId(id);
        return brandRepository.save(brandBody);
    }

    public void deleteBrand(String id) {
        if (!brandRepository.findById(id).isPresent()) {
            throw new NotFoundException("id- " + id);
        } else {
            brandRepository.deleteById(id);
        }
    }
}
