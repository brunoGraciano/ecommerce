package com.example.tbmicroproduct.product;

import com.example.tbmicroproduct.exception.NotFoundException;
import com.example.tbmicroproduct.subcategory.Subcategory;
import com.example.tbmicroproduct.subcategory.SubcategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private SubcategoryRepository subcategoryRepository;

    public Iterable<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> getAllProducts(String id) {
        Optional<Subcategory> subcategoryOptional = subcategoryRepository.findById(id);
        if (!subcategoryOptional.isPresent()) {
            throw new NotFoundException("id- " + id);
        }
        return subcategoryOptional.get().getProducts();
    }

    public Product getProduct(String id) {
        Optional<Product> result = productRepository.findById(id);
        Product product = null;
        if (result.isPresent()) {
            product = result.get();
        } else {
            throw new NotFoundException("id- " + id);
        }
        return product;
    }

    public Product addProduct(Product product, String id) {
        Optional<Subcategory> subcategoryOptional = subcategoryRepository.findById(id);
        if (!subcategoryOptional.isPresent()) {
            throw new NotFoundException("id- " + id);
        }
        Subcategory subcategory = subcategoryOptional.get();
        product.setSubcategory(subcategory);
        product.setId(product.getName().replaceAll(" ", "-").toLowerCase());
        productRepository.save(product);
        return product;
    }

    public Product updateProduct(Product productBody, String id) {
        if (!productRepository.findById(id).isPresent()) {
            throw new NotFoundException("id- " + id);
        }
        productBody.setId(id);
        productBody.setSubcategory(productRepository.findById(id).get().getSubcategory());
        return productRepository.save(productBody);
    }

    public void deleteProduct(String id) {
        if (!productRepository.findById(id).isPresent()) {
            throw new NotFoundException("id- " + id);
        } else {
            productRepository.deleteById(id);
        }
    }
}
