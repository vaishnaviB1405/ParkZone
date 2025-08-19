package com.parkzone.services;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.parkzone.customexception.ResourceNotFoundException;
import com.parkzone.daos.ParkingLocationDao;
import com.parkzone.daos.ReviewDao;
import com.parkzone.daos.SeatDao;
import com.parkzone.daos.UserDao;
import com.parkzone.dto.ApiResponse;
import com.parkzone.dto.ParkingLocationDto;
import com.parkzone.pojos.ParkingLocation;
import com.parkzone.pojos.Review;
import com.parkzone.pojos.Seat;
import com.parkzone.pojos.User;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ParkingLocationServiceImpl implements ParkingLocationService{

	@Autowired
	private ParkingLocationDao parkingLocationDao;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private SeatDao seatDao;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private ReviewDao reviewDao;
	
	@Override
	public ApiResponse insertParkingLocation(ParkingLocationDto parkingLocationDto) {
		User user=userDao.findById(parkingLocationDto.getUserId()).orElseThrow(() -> 
		new ResourceNotFoundException("Employee not found"));
		ParkingLocation location=modelMapper.map(parkingLocationDto, ParkingLocation.class);
		location.setUser(user);
		location=parkingLocationDao.save(location);
		for(int n=1;n<=location.getTotalSeats();n++)
		{
			Seat seat=new Seat();
			seat.setLocation(location);
			seat.setAvailable(true);
			seat.setSeatNumber(n);
			seatDao.save(seat);
		}
		return new ApiResponse("Location inserted");
	}
	@Override
	public ParkingLocationDto findByLocationId(long id) {
		ParkingLocation location=parkingLocationDao.findById(id).orElseThrow(() -> 
		new ResourceNotFoundException("Location not found"));
		ParkingLocationDto parkingLocationDto=modelMapper.map(location, ParkingLocationDto.class);
		parkingLocationDto.setUserId(location.getUser().getUserId());
		return parkingLocationDto;
	}
	
	@Override
	public ApiResponse updateLocation(ParkingLocationDto parkingLocationDto, long id) {
	    ParkingLocation existingLocation = parkingLocationDao.findById(id)
	        .orElseThrow(() -> new ResourceNotFoundException("Parking location not found"));

	    System.out.println(parkingLocationDto.getUserId());

	    User user = userDao.findById(parkingLocationDto.getUserId())
	        .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

	    modelMapper.map(parkingLocationDto, existingLocation);
	    existingLocation.setUser(user);
	    existingLocation.setLocationId(id);
	    parkingLocationDao.save(existingLocation);

	    return new ApiResponse("Location updated successfully");
	}

	@Override
	public List<ParkingLocationDto> findByLocations() {
		List<ParkingLocation> locations = parkingLocationDao.findAll();
		List<ParkingLocationDto> locationDtos=new ArrayList<>();
		for(ParkingLocation location:locations)
		{
			ParkingLocationDto parkingLocationDto=modelMapper.map(location,ParkingLocationDto.class );
			parkingLocationDto.setUserId(location.getUser().getUserId());
			locationDtos.add(parkingLocationDto);
		}
		return locationDtos;
	}
	@Override
	public ApiResponse locationStatus(long id) {
		ParkingLocation location=parkingLocationDao.findById(id).orElseThrow(() -> 
		new ResourceNotFoundException("Location not found"));
		if(location.getIsActive()==true)
			location.setIsActive(false);
		else
			location.setIsActive(true);
		return new ApiResponse("Location status updated");
	}
	@Override
	public List<ParkingLocationDto> getLocationByCity(String city) {
		List<ParkingLocation> locations = parkingLocationDao.findByAddressContainingIgnoreCase(city);
		List<ParkingLocationDto> locationDtos=new ArrayList<>();
		for(ParkingLocation location:locations)
		{
			ParkingLocationDto parkingLocationDto=modelMapper.map(location,ParkingLocationDto.class );
			parkingLocationDto.setUserId(location.getUser().getUserId());
			locationDtos.add(parkingLocationDto);
		}
		return locationDtos;
	}
}
