package com.example.tbmicroproduct.product;

import com.example.tbmicroproduct.exception.NoContentException;
import com.example.tbmicroproduct.exception.NotAuthorizeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import static com.example.tbmicroproduct.TbMicroProductApplication.isAdmin;

@RestController
@CrossOrigin
public class ProductResource {
    @Autowired
    private ProductService service;

    @GetMapping("/products")
    public Iterable<Product> retrieveAllProducts() {
        return service.getAllProducts();
    }

    @PostMapping("/products/arr")
    public ArrayList<Product> retrieveAllProductsFromArr(@RequestBody String[] product) {
        ArrayList<Product> products = new ArrayList<>();
        for (int p = 0; p < product.length; p++) {
            products.add(service.getProduct(product[p]));
        }
        return products;
    }

    @GetMapping("catalogs/categories/{idCategories}/subcategories/{idSubcategories}/products")
    public List<Product> retrieveAllProducts(@PathVariable String idSubcategories, @RequestParam(value = "brand", defaultValue = "") String brand, @RequestParam(value = "color", defaultValue = "") String color, @RequestParam(value = "weight", defaultValue = "") String weight, @RequestParam(value = "size", defaultValue = "") String size) {
        List<Product> products = service.getAllProducts(idSubcategories);
        if (!brand.equals("") || !color.equals("") || !weight.equals("") || !size.equals("")) {
            Iterator<Product> productIterator = products.iterator();
            while (productIterator.hasNext()) {
                Product p = productIterator.next();
                if ((!brand.equals("") && !p.getAttributes().getBrand().equals(brand)) || (!color.equals("") && !p.getAttributes().getColor().equals(color)) || (!weight.equals("") && !p.getAttributes().getWeight().equals(weight)) || (!size.equals("") && !p.getAttributes().getSize().equals(size))) {
                    productIterator.remove();
                }
            }
        }
        if (products.isEmpty()) {
            throw new NoContentException("");
        }
        return products;
    }

    @GetMapping("catalogs/categories/{idCategories}/subcategories/{idSubcategories}/products/{id}")
    public Product retrieveProduct(@PathVariable String id) {
        return service.getProduct(id);
    }

    @PostMapping("catalogs/categories/{idCategories}/subcategories/{id}/products")
    public ResponseEntity createProduct(@RequestBody Product product, @PathVariable String id, @RequestParam String session) {
        if (isAdmin(session)) {
            Product savedProduct = service.addProduct(product, id);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(savedProduct.getId()).toUri();
            return ResponseEntity.created(location).build();
        } else {
            throw new NotAuthorizeException("Access is denied");
        }
    }

    @PutMapping("catalogs/categories/{idCategories}/subcategories/{idSubcategories}/products/{id}")
    public void updateProduct(@RequestBody Product product, @PathVariable String id, @RequestParam String session) {
        if (isAdmin(session)) {
            service.updateProduct(product, id);
        } else {
            throw new NotAuthorizeException("Access is denied");
        }
    }

    @DeleteMapping("catalogs/categories/{idCategories}/subcategories/{idSubcategories}/products/{id}")
    public void deleteProduct(@PathVariable String id, @RequestParam String session) {
        if (isAdmin(session)) {
            service.deleteProduct(id);
        } else {
            throw new NotAuthorizeException("Access is denied");
        }
    }
}
