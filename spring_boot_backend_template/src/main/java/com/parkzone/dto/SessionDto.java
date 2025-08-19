package com.parkzone.dto;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.parkzone.eums.SessionStatus;
import com.parkzone.pojos.Reservation;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
public class SessionDto {

	private long sessionId;
	
	private long reservationId;
	
	@NotNull(message ="Entry time is required")
	private Timestamp entryTime;
	
	private Timestamp endTime;
	
	@Enumerated(EnumType.STRING)
	private SessionStatus status;
}
