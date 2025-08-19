package com.parkzone.dto;

import java.math.BigDecimal;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.parkzone.pojos.Review;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ParkingLocationDto {
	@JsonProperty(access = Access.READ_ONLY)
	private long locationId;
	
	@NotBlank(message = "Location name is required")
	private String locationName;
	
	@NotBlank(message = "Address is required")
	private String address;
	
	@NotNull(message = "Hourly rate is required")
	private double longitude;
	
	@NotNull(message = "Hourly rate is required")
    private double latitude;
    
    @NotNull(message = "Hourly rate is required")
    private BigDecimal hourlyRate;
    
    @NotNull(message = "Total seats is required")
    private Integer totalSeats;
    
    private Integer rows;
    
    private Integer columns;
    
    @NotNull(message = "Opening time is required")
    private LocalTime openingTime;
    
    @NotNull(message = "Closing time is required")
    private LocalTime closingTime;
    
    private Boolean isActive;
    
    private String contact;
    
    private Boolean cctv;
    
    private Boolean valetParking;
     
    private String locationImagePath;
    
    private long userId;
}
