package com.parkzone.controllers;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.parkzone.services.TransactionService;

@RequestMapping("/transactions")
@RestController
public class TransactionController {
	@Autowired
	private TransactionService transactionService;
	
	@GetMapping("/")
	public ResponseEntity<?> getTransactions()
	{
		return ResponseEntity.ok(transactionService.getTransactions());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getTransaction(@PathVariable long id)
	{
		return ResponseEntity.ok(transactionService.getTransaction(id));
	}
	
	@GetMapping("/user/{id}")
	public ResponseEntity<?> getTransactionsByUserId(@PathVariable long id)
	{
		return ResponseEntity.ok(transactionService.getTransactionsUserId(id));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateTransactionAmount(@RequestParam BigDecimal amount,@RequestParam long id)
	{
		return ResponseEntity.ok(transactionService.updateTransactionAmount(id,amount));
	}
}
