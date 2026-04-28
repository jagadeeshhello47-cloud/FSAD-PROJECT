package com.fsad.backend.controller;

import com.fsad.backend.entity.MutualFund;
import com.fsad.backend.entity.MutualFundNav;
import com.fsad.backend.service.MutualFundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mf")
@CrossOrigin(origins = "*")
public class MutualFundController {
    
    @Autowired
    private MutualFundService mutualFundService;
    
    @GetMapping("/funds")
    public ResponseEntity<List<MutualFund>> getAllFunds() {
        return ResponseEntity.ok(mutualFundService.getAllFunds());
    }
    
    @GetMapping("/fund/{schemeCode}")
    public ResponseEntity<MutualFund> getFundBySchemeCode(@PathVariable String schemeCode) {
        return mutualFundService.findBySchemeCode(schemeCode)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<MutualFund>> searchFunds(@RequestParam String name) {
        return ResponseEntity.ok(mutualFundService.searchByName(name));
    }
    
    @GetMapping("/fund-house/{fundHouse}")
    public ResponseEntity<List<MutualFund>> getFundsByFundHouse(@PathVariable String fundHouse) {
        return ResponseEntity.ok(mutualFundService.getFundsByFundHouse(fundHouse));
    }
    
    @GetMapping("/category/{category}")
    public ResponseEntity<List<MutualFund>> getFundsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(mutualFundService.getFundsByCategory(category));
    }
    
    @PostMapping("/fund")
    public ResponseEntity<Map<String, Object>> saveFund(@RequestBody MutualFund fund) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            MutualFund savedFund = mutualFundService.saveFund(fund);
            response.put("success", true);
            response.put("fund", savedFund);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @DeleteMapping("/fund/{id}")
    public ResponseEntity<Map<String, Object>> deleteFund(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            mutualFundService.deleteFund(id);
            response.put("success", true);
            response.put("message", "Fund deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    // NAV endpoints
    @GetMapping("/nav/{schemeCode}")
    public ResponseEntity<List<MutualFundNav>> getNavHistory(@PathVariable String schemeCode) {
        return ResponseEntity.ok(mutualFundService.getNavHistory(schemeCode));
    }
    
    @GetMapping("/nav/latest/{schemeCode}")
    public ResponseEntity<MutualFundNav> getLatestNav(@PathVariable String schemeCode) {
        return mutualFundService.getLatestNav(schemeCode)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/nav/range/{schemeCode}")
    public ResponseEntity<List<MutualFundNav>> getNavByDateRange(
            @PathVariable String schemeCode,
            @RequestParam String startDate,
            @RequestParam String endDate) {
        
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        
        return ResponseEntity.ok(mutualFundService.getNavByDateRange(schemeCode, start, end));
    }
    
    @PostMapping("/nav")
    public ResponseEntity<Map<String, Object>> saveNav(@RequestBody MutualFundNav nav) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            MutualFundNav savedNav = mutualFundService.saveNav(nav);
            response.put("success", true);
            response.put("nav", savedNav);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}