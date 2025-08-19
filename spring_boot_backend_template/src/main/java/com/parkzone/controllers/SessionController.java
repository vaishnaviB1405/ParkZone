package com.parkzone.controllers;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.parkzone.services.SessionService;

@RequestMapping("/session")
@RestController
public class SessionController {
	
	@Autowired
	private SessionService sessionService;
	
	@PutMapping("/{id}")
	public ResponseEntity<?> markComplete(@PathVariable long id)
	{
		return ResponseEntity.ok(sessionService.markComplete(id));
	}
	
	@GetMapping("/{date}")
	public ResponseEntity<?> getSessionsByDate(@PathVariable LocalDate date)
	{
		return ResponseEntity.ok(sessionService.getSessionsByDate(date));
	}
}
