package com.example.tbmicroproduct.attributes;

import com.example.tbmicroproduct.exception.NoContentException;
import com.example.tbmicroproduct.exception.NotFoundException;
import com.example.tbmicroproduct.product.Product;
import com.example.tbmicroproduct.product.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AttributesService {
    @Autowired
    private AttributesRepository attributesRepository;

    @Autowired
    private ProductRepository productRepository;

    public Attributes getAttributes(String id) {
        Optional<Product> productOptional = productRepository.findById(id);
        if (!productOptional.isPresent()) {
            throw new NotFoundException("id- " + id);
        }
        if (productOptional.get().getAttributes() == null) {
            throw new NoContentException("");
        }
        return productOptional.get().getAttributes();
    }

    public Attributes addAttributes(Attributes attributes, String id) {
        Optional<Product> productOptional = productRepository.findById(id);
        if (!productOptional.isPresent()) {
            throw new NotFoundException("id- " + id);
        }
        Product product = productOptional.get();
        attributes.setProduct(product);
        attributesRepository.save(attributes);
        return attributes;
    }

    public Attributes updateAttributes(Attributes attributesBody, String id) {
        if (!attributesRepository.findById(id).isPresent()) {
            throw new NotFoundException("id- " + id);
        }
        attributesBody.setId(id);
        attributesBody.setProduct(attributesRepository.findById(id).get().getProduct());
        return attributesRepository.save(attributesBody);
    }

    public void deleteAttributes(String id) {
        if (!attributesRepository.findById(id).isPresent()) {
            throw new NotFoundException("id- " + id);
        } else {
            attributesRepository.deleteById(id);
        }
    }
}

