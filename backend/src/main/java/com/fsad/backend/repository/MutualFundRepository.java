package com.fsad.backend.repository;

import com.fsad.backend.entity.MutualFund;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MutualFundRepository extends JpaRepository<MutualFund, Long> {
    Optional<MutualFund> findBySchemeCode(String schemeCode);
    List<MutualFund> findBySchemeNameContainingIgnoreCase(String schemeName);
    List<MutualFund> findByFundHouse(String fundHouse);
    List<MutualFund> findByCategory(String category);
    boolean existsBySchemeCode(String schemeCode);
}