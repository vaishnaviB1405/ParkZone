package com.parkzone.pojos;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="seats")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Seat {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="seat_id")
	private long seatId;
	
	@ManyToOne
	@JoinColumn(name="location_id",nullable=false)
	private ParkingLocation location;
	
	@NotNull(message = "Seat number is required")
    @Column(name="seat_number")
	private Integer seatNumber;
	
	@Column(name="is_available")
	private boolean isAvailable;
	
	@OneToMany(mappedBy = "seat", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reservation> reservations = new ArrayList<>();
	
	public void addReservations(Reservation reservation)
    {
    	this.reservations.add(reservation);
    	reservation.setSeat(this);
    }
}
