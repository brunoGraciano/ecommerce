package com.example.tbmicroproduct.subcategory;

import com.example.tbmicroproduct.category.Category;
import com.example.tbmicroproduct.product.Product;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "subcategory")
public class Subcategory {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;
    private String name;
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Category category;
    @OneToMany(mappedBy = "subcategory")
    private List<Product> products;

    public Subcategory() {

    }

    public Subcategory(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}
