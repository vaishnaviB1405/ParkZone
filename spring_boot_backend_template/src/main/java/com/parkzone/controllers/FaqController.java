package com.parkzone.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.parkzone.dto.FaqDto;
import com.parkzone.services.FaqService;

@RequestMapping("/fag")
@RestController
public class FaqController {

	@Autowired
	private FaqService faqService;
	
	@PostMapping("/")
	public ResponseEntity<?> insertFAQ(@RequestBody FaqDto faqDto)
	{
		return ResponseEntity.ok(faqService.insertFAQ(faqDto));
	}
	@GetMapping("/all")
	public ResponseEntity<?> getAllFAQs()
	{
		return ResponseEntity.ok(faqService.getAllFAQs());
	}
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteFAQ(@PathVariable long id)
	{
		return ResponseEntity.ok(faqService.deleteFAQ( id));
	}
}
