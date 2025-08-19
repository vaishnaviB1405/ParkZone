package com.parkzone.services;

import java.math.BigDecimal;
import java.util.List;

import com.parkzone.dto.ApiResponse;
import com.parkzone.dto.TransactionDto;

public interface TransactionService{
	List<TransactionDto> getTransactions();

	TransactionDto getTransaction(long id);

	List<TransactionDto> getTransactionsUserId(long id);

	ApiResponse updateTransactionAmount(long id, BigDecimal amount);
}
