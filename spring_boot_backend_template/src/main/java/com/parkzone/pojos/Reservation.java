package com.parkzone.pojos;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import com.parkzone.eums.ReservationStatus;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="reservations")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="reservation_id")
	private long reservationId;
	
	@ManyToOne
	@JoinColumn(name="user_id", nullable=false)
	private User user;
	
	@ManyToOne
	@JoinColumn(name="location_id", nullable=false)
	private ParkingLocation location;
	
	@ManyToOne
	@JoinColumn(name="seat_id", nullable=false)
	private Seat seat;
	
	@ManyToOne
	@JoinColumn(name="vehicle_id", nullable=false)
	private Vehicle vehicle;
	
	@OneToOne
	@JoinColumn(name="transaction_id", nullable=false)
	private Transaction transaction;
	
	@Column(name="reserved_at")
	@CreationTimestamp
	private Timestamp reservedAt;
	
	@Column(name="start_time")
	@NotNull(message = "Start is required")
    private Timestamp startTime;
    
    @Column(name="end_time")
    @NotNull(message = "End time is required")
    private Timestamp endTime;

    @Enumerated(EnumType.STRING)
    private ReservationStatus status;

    @OneToOne(mappedBy = "reservation", cascade = CascadeType.ALL, orphanRemoval = true)
    private Session session;
}
