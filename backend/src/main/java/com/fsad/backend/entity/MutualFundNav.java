package com.fsad.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "mutual_fund_nav")
public class MutualFundNav {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "scheme_code", nullable = false)
    private String schemeCode;
    
    @Column(nullable = false)
    private Double nav;
    
    @Column(name = "nav_date", nullable = false)
    private LocalDate navDate;
    
    // Constructors
    public MutualFundNav() {}
    
    public MutualFundNav(String schemeCode, Double nav, LocalDate navDate) {
        this.schemeCode = schemeCode;
        this.nav = nav;
        this.navDate = navDate;
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
}