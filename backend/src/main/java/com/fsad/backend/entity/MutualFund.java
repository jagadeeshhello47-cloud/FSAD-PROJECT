package com.fsad.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "mutual_funds")
public class MutualFund {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String schemeCode;
    
    @Column(nullable = false)
    private String schemeName;
    
    private String fundHouse;
    
    private String category;
    
    private String subCategory;
    
    @Column(name = "nav")
    private Double nav;
    
    @Column(name = "nav_date")
    private LocalDate navDate;
    
    private Double returns1M;
    private Double returns3M;
    private Double returns6M;
    private Double returns1Y;
    private Double returns2Y;
    private Double returns3Y;
    private Double returns5Y;
    private Double returns10Y;
    
    // Constructors
    public MutualFund() {}
    
    public MutualFund(String schemeCode, String schemeName) {
        this.schemeCode = schemeCode;
        this.schemeName = schemeName;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getSchemeCode() {
        return schemeCode;
    }
    
    public void setSchemeCode(String schemeCode) {
        this.schemeCode = schemeCode;
    }
    
    public String getSchemeName() {
        return schemeName;
    }
    
    public void setSchemeName(String schemeName) {
        this.schemeName = schemeName;
    }
    
    public String getFundHouse() {
        return fundHouse;
    }
    
    public void setFundHouse(String fundHouse) {
        this.fundHouse = fundHouse;
    }
    
    public String getCategory() {
        return category;
    }
    
    public void setCategory(String category) {
        this.category = category;
    }
    
    public String getSubCategory() {
        return subCategory;
    }
    
    public void setSubCategory(String subCategory) {
        this.subCategory = subCategory;
    }
    
    public Double getNav() {
        return nav;
    }
    
    public void setNav(Double nav) {
        this.nav = nav;
    }
    
    public LocalDate getNavDate() {
        return navDate;
    }
    
    public void setNavDate(LocalDate navDate) {
        this.navDate = navDate;
    }
    
    public Double getReturns1M() {
        return returns1M;
    }
    
    public void setReturns1M(Double returns1M) {
        this.returns1M = returns1M;
    }
    
    public Double getReturns3M() {
        return returns3M;
    }
    
    public void setReturns3M(Double returns3M) {
        this.returns3M = returns3M;
    }
    
    public Double getReturns6M() {
        return returns6M;
    }
    
    public void setReturns6M(Double returns6M) {
        this.returns6M = returns6M;
    }
    
    public Double getReturns1Y() {
        return returns1Y;
    }
    
    public void setReturns1Y(Double returns1Y) {
        this.returns1Y = returns1Y;
    }
    
    public Double getReturns2Y() {
        return returns2Y;
    }
    
    public void setReturns2Y(Double returns2Y) {
        this.returns2Y = returns2Y;
    }
    
    public Double getReturns3Y() {
        return returns3Y;
    }
    
    public void setReturns3Y(Double returns3Y) {
        this.returns3Y = returns3Y;
    }
    
    public Double getReturns5Y() {
        return returns5Y;
    }
    
    public void setReturns5Y(Double returns5Y) {
        this.returns5Y = returns5Y;
    }
    
    public Double getReturns10Y() {
        return returns10Y;
    }
    
    public void setReturns10Y(Double returns10Y) {
        this.returns10Y = returns10Y;
    }
}