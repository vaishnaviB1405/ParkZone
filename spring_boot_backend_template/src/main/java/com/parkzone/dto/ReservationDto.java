package com.parkzone.dto;

import java.sql.Timestamp;
import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.parkzone.eums.ReservationStatus;
import com.parkzone.eums.Role;
import com.parkzone.pojos.ParkingLocation;
import com.parkzone.pojos.Seat;
import com.parkzone.pojos.Session;
import com.parkzone.pojos.Transaction;
import com.parkzone.pojos.User;
import com.parkzone.pojos.Vehicle;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
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
public class ReservationDto {
	@JsonProperty(access = Access.READ_ONLY)
	private long reservationId;
	
	private long userId;
	
	private long locationId;
	
	private long seatId;
	
	private long vehicleId;
	
	private long transactionId;
	
	@NotNull(message = "Start is required")
    private Timestamp startTime;
    
    @NotNull(message = "End time is required")
    private Timestamp endTime;

    private ReservationStatus status;

    
}
