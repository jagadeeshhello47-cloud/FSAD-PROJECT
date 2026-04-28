package com.fsad.backend.service;

import com.fsad.backend.entity.MutualFund;
import com.fsad.backend.entity.MutualFundNav;
import com.fsad.backend.repository.MutualFundRepository;
import com.fsad.backend.repository.MutualFundNavRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class MutualFundService {
    
    @Autowired
    private MutualFundRepository mutualFundRepository;
    
    @Autowired
    private MutualFundNavRepository mutualFundNavRepository;
    
    public MutualFund saveFund(MutualFund fund) {
        return mutualFundRepository.save(fund);
    }
    
    public Optional<MutualFund> findBySchemeCode(String schemeCode) {
        return mutualFundRepository.findBySchemeCode(schemeCode);
    }
    
    public List<MutualFund> searchByName(String schemeName) {
        return mutualFundRepository.findBySchemeNameContainingIgnoreCase(schemeName);
    }
    
    public List<MutualFund> getAllFunds() {
        return mutualFundRepository.findAll();
    }
    
    public List<MutualFund> getFundsByFundHouse(String fundHouse) {
        return mutualFundRepository.findByFundHouse(fundHouse);
    }
    
    public List<MutualFund> getFundsByCategory(String category) {
        return mutualFundRepository.findByCategory(category);
    }
    
    // NAV related methods
    public MutualFundNav saveNav(MutualFundNav nav) {
        return mutualFundNavRepository.save(nav);
    }
    
    public List<MutualFundNav> getNavHistory(String schemeCode) {
        return mutualFundNavRepository.findBySchemeCodeOrderByNavDateDesc(schemeCode);
    }
    
    public Optional<MutualFundNav> getLatestNav(String schemeCode) {
        return mutualFundNavRepository.findFirstBySchemeCodeOrderByNavDateDesc(schemeCode);
    }
    
    public List<MutualFundNav> getNavByDateRange(String schemeCode, LocalDate startDate, LocalDate endDate) {
        return mutualFundNavRepository.findBySchemeCodeAndDateRange(schemeCode, startDate, endDate);
    }
    
    public void deleteFund(Long id) {
        mutualFundRepository.deleteById(id);
    }
}