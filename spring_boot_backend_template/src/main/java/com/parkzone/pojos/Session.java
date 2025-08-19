package com.parkzone.pojos;

import java.sql.Timestamp;

import com.parkzone.eums.SessionStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="sessions")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Session {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="session_id")
	private long sessionId;
	
	@ManyToOne
	@JoinColumn(name="reservation_id",nullable=false)
	private Reservation reservation;
	
	@Column(name="entry_time")
	@NotNull(message ="Entry time is required")
	private Timestamp entryTime;
	
	@Column(name="exit_time")
	private Timestamp endTime;
	
	@Enumerated(EnumType.STRING)
	private SessionStatus status;
}
