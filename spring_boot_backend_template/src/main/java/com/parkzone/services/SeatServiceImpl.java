package com.parkzone.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.parkzone.customexception.ResourceNotFoundException;
import com.parkzone.daos.ParkingLocationDao;
import com.parkzone.daos.ReservationDao;
import com.parkzone.pojos.ParkingLocation;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class SeatServiceImpl implements SeatService{
	@Autowired
	private ReservationDao reservationDao;
	
	@Autowired
	private ParkingLocationDao parkingLocationDao; 

	@Override
	public List<Long> getBookedSeats(long id) {
        ParkingLocation location=parkingLocationDao.findById(id).orElseThrow(()-> new ResourceNotFoundException("Location not found"));
        return reservationDao.findBookedSeatNumbersByLocation(id);		
	}
}
