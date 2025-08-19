package com.parkzone.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parkzone.pojos.Faq;

public interface FaqDao extends JpaRepository<Faq,Long>{
	
}
