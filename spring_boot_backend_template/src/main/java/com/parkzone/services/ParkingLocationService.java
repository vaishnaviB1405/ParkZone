package com.parkzone.services;

import java.util.List;

import com.parkzone.dto.ApiResponse;
import com.parkzone.dto.ParkingLocationDto;

public interface ParkingLocationService {

	ApiResponse insertParkingLocation(ParkingLocationDto parkingLocationDto);

	ApiResponse updateLocation(ParkingLocationDto parkingLocationDto, long id);

	ParkingLocationDto findByLocationId(long id);

	List<ParkingLocationDto> findByLocations();

	ApiResponse locationStatus(long id);

	List<ParkingLocationDto> getLocationByCity(String city);

}
