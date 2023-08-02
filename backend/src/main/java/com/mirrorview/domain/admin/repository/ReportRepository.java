package com.mirrorview.domain.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mirrorview.domain.admin.domain.Report;

public interface ReportRepository extends JpaRepository<Report, Long> {

}
