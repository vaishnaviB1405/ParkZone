package com.parkzone.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.parkzone.eums.Role;
import com.parkzone.eums.VehicleType;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
public class VehicleDto {
	@JsonProperty(access = Access.READ_ONLY)
	private long vehicleId;
	
	@NotBlank(message = "Vehicle number is required")
	private String vehicleNumber;
	
	@NotNull(message="Vehicle type is required")
	private VehicleType vehicleType;
}
