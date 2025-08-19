package com.parkzone.dto;

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
public class ReservationTransactionVehicleWrapperDto {
	private TransactionDto trasactionDto;
	private ReservationDto reservationDto;
	private VehicleDto vehicleDto;
}
