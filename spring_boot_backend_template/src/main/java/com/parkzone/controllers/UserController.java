package com.parkzone.controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.parkzone.dto.ApiResponse;
import com.parkzone.dto.UserDto;
import com.parkzone.dto.UserLogInDto;
import com.parkzone.security.JwtUtils;
import com.parkzone.services.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
public class UserController {
	
	@Autowired	
	private UserService userService; 
	
	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtUtils jwtUtils;
	
	private static final String UPLOAD_DIR = "uploads/profile_images/";
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody @Valid UserDto userDto)
	{
		System.out.println(userDto);
		ApiResponse response=userService.signupUser(userDto);
		if(response.getMsg().equals("Registration Sucessfull"))
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody @Valid UserLogInDto userLoginDto)
	{
		try {
	        Authentication successfulAuth = authenticationManager.authenticate(
	            new UsernamePasswordAuthenticationToken(
	                userLoginDto.getEmail(), userLoginDto.getPassword()
	            )
	        );

	        String jwt = jwtUtils.generateJwtToken(successfulAuth);
	        userLoginDto.setJwt(jwt);
	        userLoginDto.setId(userService.getId(userLoginDto.getEmail()));
            userLoginDto.setRole(userService.getRole(userLoginDto.getEmail()));
	        return ResponseEntity.ok(userLoginDto);
	    } catch (BadCredentialsException ex) {
	        Map<String, String> errorResponse = new HashMap<>();
	        errorResponse.put("error", "Invalid email or password");
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
	    }
	}
	
	@GetMapping("/")
	public ResponseEntity<?> getAllUsers()
	{
		List<UserDto> userDtos=userService.getAllUsers();
		if(userDtos.isEmpty())
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		return ResponseEntity.ok(userDtos);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getUser(@PathVariable Long id)
	{
		return ResponseEntity.ok(userService.findByUserId(id));
	}
	
	@PutMapping("/status/{id}")
	public ResponseEntity<?> blockUnBlockUser(@PathVariable Long id)
	{
		return ResponseEntity.ok(userService.blockUndblockUser(id));
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<?> updateUser(@PathVariable Long id,@RequestBody UserDto userDto)
	{
		return ResponseEntity.ok(userService.updateProfile(id,userDto));
	}
	
	@PutMapping(value="/upload/{id}" , consumes = {"multipart/form-data"},produces = {"application/json"})
	public ResponseEntity<?> uploadProfile(@RequestPart MultipartFile file,@PathVariable Long id) throws IOException
	{
		UserDto userDto=userService.findByUserId(id);
            if (file != null && !file.isEmpty()) {
                String fileName = file.getOriginalFilename();
                Path filePath = Paths.get(UPLOAD_DIR + fileName);

                Files.createDirectories(filePath.getParent());

                Files.write(filePath, file.getBytes());
                userDto.setProfileImagePath(fileName);

                return ResponseEntity.ok(userService.updateProfile(id,userDto));
            }
            return ResponseEntity.badRequest().body("File is empty or not provided");
	}
	
	@PostMapping("/password")
	public ResponseEntity<?> forgetPassword(@RequestBody UserDto userDto)
	{
		System.out.println(userDto);
		return ResponseEntity.ok(userService.forgetPassword(userDto));
	}
}
