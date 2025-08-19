package com.parkzone.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.parkzone.services.SeatService;

@RestController
@RequestMapping("/seats")
public class SeatController {
	@Autowired
	private SeatService seatService;
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getBookedSeats(@PathVariable long id)
	{
		return ResponseEntity.ok(seatService.getBookedSeats(id));
	}
}
