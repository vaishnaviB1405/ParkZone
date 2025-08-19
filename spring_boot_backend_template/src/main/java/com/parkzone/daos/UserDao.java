package com.parkzone.daos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parkzone.pojos.User;

public interface UserDao extends JpaRepository<User,Long>{
	Optional<User> findByEmail(String email);
	List<User> findAll();
	Optional<User> findById(long id);
}
