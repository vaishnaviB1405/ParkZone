package com.parkzone.services;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.parkzone.customexception.ResourceNotFoundException;
import com.parkzone.daos.TransactionDao;
import com.parkzone.daos.UserDao;
import com.parkzone.dto.ApiResponse;
import com.parkzone.dto.TransactionDto;
import com.parkzone.pojos.Transaction;
import com.parkzone.pojos.User;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class TransactionServiceImpl implements TransactionService{

	@Autowired 
	private TransactionDao transactionDao;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private ModelMapper modelMapper;
	@Override
	public List<TransactionDto> getTransactions() {
		List<Transaction> transactions=transactionDao.findAll();
		List<TransactionDto> transactionDtos=new ArrayList<>();
		for(Transaction transaction:transactions)
		{
			TransactionDto transactionDto=modelMapper.map(transaction, TransactionDto.class);
			transactionDto.setUserId(transaction.getUser().getUserId());
			transactionDtos.add(transactionDto);
		}
		return transactionDtos;
	}

	@Override
	public TransactionDto getTransaction(long id) {
		Transaction transaction=transactionDao.findById(id).orElseThrow(() -> new ResourceNotFoundException("Transaction not found"));
		TransactionDto transactionDto=modelMapper.map(transaction,TransactionDto.class);
		transactionDto.setUserId(transaction.getUser().getUserId());
		return transactionDto;
	}

	@Override
	public List<TransactionDto> getTransactionsUserId(long id) {
		User user=userDao.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
		List<Transaction> transactions=transactionDao.findByUserUserId(id);
		List<TransactionDto> transactionDtos=new ArrayList<>();
		for(Transaction transaction:transactions)
		{
			TransactionDto transactionDto=modelMapper.map(transaction, TransactionDto.class);
			transactionDto.setUserId(user.getUserId());
			transactionDtos.add(transactionDto);
		}
		return transactionDtos;
	}

	@Override
	public ApiResponse updateTransactionAmount(long id, BigDecimal amount) {
		Transaction transaction=transactionDao.findById(id).orElseThrow(() -> new ResourceNotFoundException("Transaction not found"));
		transaction.setAmount(transaction.getAmount().add(amount));
		return new ApiResponse("Transaction updated");
	}

}
