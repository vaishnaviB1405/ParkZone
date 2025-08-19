package com.parkzone.daos;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.parkzone.pojos.Session;

public interface SessionDao extends JpaRepository<Session,Long> {
	
	@Query("SELECT s FROM Session s WHERE DATE(s.entryTime) = :startOfDay")
	List<Session> findByDate(@Param("startOfDay") Timestamp startOfDay);
}
