package com.example.tbmicroproduct.image;

import com.example.tbmicroproduct.exception.NoContentException;
import com.example.tbmicroproduct.exception.NotFoundException;
import com.example.tbmicroproduct.product.Product;
import com.example.tbmicroproduct.product.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<Image> getAllImages(String id) {
        Optional<Product> productOptional = productRepository.findById(id);
        if (!productOptional.isPresent()) {
            throw new NotFoundException("id- " + id);
        }
        if (productOptional.get().getImages().isEmpty()) {
            throw new NoContentException("");
        }
        return productOptional.get().getImages();
    }

    public Image getImage(String id) {
        Optional<Image> result = imageRepository.findById(id);
        Image image = null;
        if (result.isPresent()) {
            image = result.get();
        } else {
            throw new NotFoundException("id- " + id);
        }
        return image;
    }

    public Image addImage(Image image, String id) {
        Optional<Product> productOptional = productRepository.findById(id);
        if (!productOptional.isPresent()) {
            throw new NotFoundException("id- " + id);
        }
        Product product = productOptional.get();
        image.setProduct(product);
        imageRepository.save(image);
        return image;
    }

    public Image updateImage(Image imageBody, String id) {
        if (!productRepository.findById(id).isPresent()) {
            throw new NotFoundException("id- " + id);
        }
        imageBody.setId(id);
        imageBody.setProduct(imageRepository.findById(id).get().getProduct());
        return imageRepository.save(imageBody);
    }

    public void deleteImage(String id) {
        if (!imageRepository.findById(id).isPresent()) {
            throw new NotFoundException("id- " + id);
        } else {
            imageRepository.deleteById(id);
        }
    }
}
