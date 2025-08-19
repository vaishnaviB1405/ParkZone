package com.parkzone.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parkzone.dto.TransactionDto;
import com.parkzone.pojos.Transaction;

public interface TransactionDao extends JpaRepository<Transaction,Long>{

	List<Transaction> findByUserUserId(long id);

}
