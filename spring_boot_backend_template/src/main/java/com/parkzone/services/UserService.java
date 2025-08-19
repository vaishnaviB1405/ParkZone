package com.parkzone.services;

import java.util.List;

import com.parkzone.dto.ApiResponse;
import com.parkzone.dto.UserDto;
import com.parkzone.dto.UserLogInDto;
import com.parkzone.eums.Role;

import jakarta.validation.Valid;

public interface UserService {

	ApiResponse signupUser(UserDto userDto);

	UserDto logInUser(@Valid UserLogInDto userLoginDto);

	List<UserDto> getAllUsers();

	ApiResponse updateProfile(long id,UserDto userDto);

	UserDto findByUserId(Long id);

	ApiResponse blockUndblockUser(long id);

	ApiResponse forgetPassword(UserDto userDto);

	long getId(String email);

	Role getRole(String email);

}
