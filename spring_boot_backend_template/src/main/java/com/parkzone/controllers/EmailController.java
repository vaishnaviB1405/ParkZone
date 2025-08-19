package com.parkzone.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.parkzone.dto.ApiResponse;
import com.parkzone.services.EmailService;

@RequestMapping("/email")
@RestController
public class EmailController {
	
	@Autowired
	private EmailService emailService;
	
	@PostMapping
	public ResponseEntity<?> sendOtp(@RequestBody String email)
	{
		System.out.println(email);
		ApiResponse response = emailService.sendOtp(email);
		if(!response.getMsg().equals("Email service is down"))
			return ResponseEntity.status(HttpStatus.OK).body(response);
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	}
}
