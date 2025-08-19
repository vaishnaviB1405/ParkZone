package com.parkzone.services;

import java.time.LocalDate;
import java.util.List;

import com.parkzone.dto.ApiResponse;
import com.parkzone.dto.ReservationDto;
import com.parkzone.dto.ReservationTransactionVehicleWrapperDto;

public interface ReservationService {

	ApiResponse insertReservation(ReservationTransactionVehicleWrapperDto dto);

	List<ReservationDto> getReservations();

	List<ReservationDto> getUserReservations(long id);

	List<ReservationDto> getReservationsByDate(LocalDate date);

	ApiResponse cancelReservation(long uid, long rid);

}
