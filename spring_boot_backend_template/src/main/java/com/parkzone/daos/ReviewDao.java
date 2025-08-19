package com.parkzone.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parkzone.pojos.Review;

public interface ReviewDao extends JpaRepository<Review,Long>{

	List<Review> findByLocationLocationId(long id);
}
