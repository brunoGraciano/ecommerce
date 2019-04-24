package com.example.tbmicroproduct.product;

import com.example.tbmicroproduct.attributes.Attributes;
import com.example.tbmicroproduct.image.Image;
import com.example.tbmicroproduct.subcategory.Subcategory;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "product")
public class Product {
    @Id
    private String id;
    private String name;
    private String description;
    @OneToOne(mappedBy = "product")
    private Attributes attributes;
    private Double price;
    private Integer quantity;
    private String thumbnail;
    @OneToMany(mappedBy = "product")
    private List<Image> images;
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Subcategory subcategory;

    protected Product() {
    }

    public Product(String id, String name, String description, Double price, Integer quantity, String thumbnail) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.thumbnail = thumbnail;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public Subcategory getSubcategory() {
        return subcategory;
    }

    public void setSubcategory(Subcategory subcategory) {
        this.subcategory = subcategory;
    }

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }

    public Attributes getAttributes() {
        return attributes;
    }

    public void setAttributes(Attributes attributes) {
        this.attributes = attributes;
    }
}
