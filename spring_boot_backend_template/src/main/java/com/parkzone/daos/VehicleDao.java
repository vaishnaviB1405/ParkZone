package com.parkzone.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parkzone.pojos.Vehicle;

public interface VehicleDao extends JpaRepository<Vehicle,Long>{

}
