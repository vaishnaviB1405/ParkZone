package com.parkzone.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parkzone.pojos.ParkingLocation;

public interface ParkingLocationDao extends JpaRepository<ParkingLocation,Long>{
	List<ParkingLocation> findByAddressContainingIgnoreCase(String city);
}
