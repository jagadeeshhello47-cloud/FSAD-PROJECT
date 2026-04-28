package com.fsad.backend.repository;

import com.fsad.backend.entity.MutualFundNav;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface MutualFundNavRepository extends JpaRepository<MutualFundNav, Long> {
    
    List<MutualFundNav> findBySchemeCodeOrderByNavDateDesc(String schemeCode);
    
    Optional<MutualFundNav> findFirstBySchemeCodeOrderByNavDateDesc(String schemeCode);
    
    @Query("SELECT m FROM MutualFundNav m WHERE m.schemeCode = ?1 AND m.navDate <= ?2 ORDER BY m.navDate DESC")
    List<MutualFundNav> findBySchemeCodeAndNavDateBefore(String schemeCode, LocalDate date);
    
    @Query("SELECT m FROM MutualFundNav m WHERE m.schemeCode = ?1 AND m.navDate BETWEEN ?2 AND ?3 ORDER BY m.navDate ASC")
    List<MutualFundNav> findBySchemeCodeAndDateRange(String schemeCode, LocalDate startDate, LocalDate endDate);
}