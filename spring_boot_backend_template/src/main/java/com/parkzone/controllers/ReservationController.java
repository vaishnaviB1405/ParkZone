package com.parkzone.controllers;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.parkzone.daos.ReservationDao;
import com.parkzone.dto.ReservationTransactionVehicleWrapperDto;
import com.parkzone.services.ReservationService;

@RequestMapping("/reservation")
@RestController
public class ReservationController {
	@Autowired
	private ReservationService reservationService;
	
	@PostMapping("/")
	public ResponseEntity<?> insertReservation(@RequestBody ReservationTransactionVehicleWrapperDto dto)
	{
		System.out.println(dto);
		return ResponseEntity.ok(reservationService.insertReservation(dto));
	}
	
	@GetMapping("/all")
	public ResponseEntity<?> getReservations()
	{
		return ResponseEntity.ok(reservationService.getReservations());
	}
	
	@GetMapping("/user/{id}")
	public ResponseEntity<?> getUserReservations(@PathVariable long id)
	{
		return ResponseEntity.ok(reservationService.getUserReservations(id));
	}
	
	@GetMapping("/Date/{date}")
	public ResponseEntity<?> getReservationsByDate(@PathVariable LocalDate date)
	{
		return ResponseEntity.ok(reservationService.getReservationsByDate(date));
	}
	
	@PutMapping("/cancel/{uid}/{rid}")
	public ResponseEntity<?> cancelReservation(@PathVariable long uid,@PathVariable long rid)
	{
		return ResponseEntity.ok(reservationService.cancelReservation(uid,rid));
	}
}
