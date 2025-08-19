package com.parkzone.services;

import java.util.List;


public interface SeatService {

	List<Long> getBookedSeats(long id);

}
