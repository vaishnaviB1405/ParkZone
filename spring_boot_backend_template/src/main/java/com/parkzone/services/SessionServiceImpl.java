package com.parkzone.services;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.parkzone.customexception.ResourceNotFoundException;
import com.parkzone.daos.ParkingLocationDao;
import com.parkzone.daos.ReservationDao;
import com.parkzone.daos.SessionDao;
import com.parkzone.dto.SessionDto;
import com.parkzone.eums.ReservationStatus;
import com.parkzone.eums.SessionStatus;
import com.parkzone.pojos.ParkingLocation;
import com.parkzone.pojos.Reservation;
import com.parkzone.pojos.Session;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
public class SessionServiceImpl implements SessionService {
	
	@Autowired
	private SessionDao sessionDao;
	
	@Autowired
	private ReservationDao reservationDao;
	
	@Autowired
	private ParkingLocationDao parkingLocationDao;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private EmailService emailService;
	
	@Scheduled(fixedRate = 120000)
	@Async
	public void processReservations()
	{
		log.info("is any reservation sheduled");
		LocalDateTime now = LocalDateTime.now();
        Timestamp currentTime = Timestamp.valueOf(now);
        LocalDateTime startTime = now.minusMinutes(1);
        LocalDateTime endTime = now.plusMinutes(1);
        Timestamp startTimestamp = Timestamp.valueOf(startTime);
        Timestamp endTimestamp = Timestamp.valueOf(endTime);
        List<Reservation> reservations = reservationDao.findByStartTimeBetween(startTimestamp, endTimestamp);
        for(Reservation reservation:reservations)
        {
        	emailService.sessionStartMail(reservation);
        	Session session=new Session();
        	session.setReservation(reservation);
        	session.setEntryTime(reservation.getStartTime());
        	session.setStatus(SessionStatus.ACTIVE);
        	sessionDao.save(session);
        	System.out.println("Ho gya session activate");
        }
	}
	
	@Scheduled(fixedRate = 120000)
	@Async
	public void endAlert()
	{
		log.info("is any reservation completed");
		LocalDateTime now = LocalDateTime.now();
        Timestamp currentTime = Timestamp.valueOf(now);
        LocalDateTime startTime = now.minusMinutes(1);
        LocalDateTime endTime = now.plusMinutes(1);
        Timestamp startTimestamp = Timestamp.valueOf(startTime);
        Timestamp endTimestamp = Timestamp.valueOf(endTime);
        List<Reservation> reservations = reservationDao.findByEndTimeBetween(startTimestamp, endTimestamp);
        for(Reservation reservation:reservations)
        {
        	emailService.sessiontEndMail(reservation);
        }
	}
	

	@Override
	public BigDecimal markComplete(long id) {
		Session session = sessionDao.findById(id).orElseThrow(() -> new ResourceNotFoundException("Session not found"));
		session.setEndTime(Timestamp.valueOf(LocalDateTime.now()));
		session.setStatus(SessionStatus.COMPLETED);
		sessionDao.save(session);
		Reservation reservation = reservationDao.findById(session.getReservation().getReservationId()).orElseThrow(() -> new ResourceNotFoundException("Corresponding reservation not found"));
		reservation.setStatus(ReservationStatus.Completed);
		ParkingLocation location = parkingLocationDao.findById(reservation.getLocation().getLocationId()).orElseThrow(() -> new ResourceNotFoundException("Corresponding Location not found"));
		Duration duration = Duration.between(session.getEndTime().toInstant(),reservation.getEndTime().toInstant());
		long hoursDifference = duration.toHours()+1;
		BigDecimal extraCharge =location.getHourlyRate().multiply(new BigDecimal(hoursDifference));
		System.out.println(extraCharge);
		emailService.sessionComplete(reservation,extraCharge);
		return new BigDecimal(hoursDifference).multiply(location.getHourlyRate());
	}

	@Override
	public List<SessionDto> getSessionsByDate(LocalDate date) {
		List<Session> sessions = sessionDao.findByDate(Timestamp.valueOf(date.atStartOfDay()));
	    List<SessionDto> sessionDtos=new ArrayList<>();
		for(Session session:sessions)
		{
			SessionDto sessionDto=modelMapper.map(session,SessionDto.class);
			sessionDto.setReservationId(session.getReservation().getReservationId());
			sessionDtos.add(sessionDto);
		}
		return sessionDtos;
	}
}
