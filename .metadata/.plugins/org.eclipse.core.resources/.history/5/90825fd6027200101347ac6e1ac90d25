package com.parkease.services;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.parkease.dto.ApiResponse;
import com.parkease.dto.EmailRequestDto;
import com.parkease.pojos.Reservation;

@Service
public class EmailService {

	@Autowired
	private RestTemplate restTemplate;
	
	private final String emailService = "http://localhost:7259/api/Otp/send-Email";
	private final String emailOtpService = "http://localhost:7259/api/Otp/send-otp";
	
	public void sendReservationDtails(Reservation reservation)
	{
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		EmailRequestDto emailRequestDto=new EmailRequestDto();
		emailRequestDto.setRecipientEmail(reservation.getUser().getEmail());
		emailRequestDto.setSubject("Your Parking Reservation Confirmed - "+ reservation.getReservationId());
		emailRequestDto.setBody(
				"<html><body>" +
					    "<p>Dear <strong>" + reservation.getUser().getFirstName() + "</strong>,</p>" +
					    "<p>Thank you for choosing our parking services!</p>" +
					    "<h3>Here are the details of your booking:</h3>" +
					    "<table border='1' cellpadding='5' cellspacing='0' style='border-collapse: collapse;'>" +
					    "<tr><td><strong>Reservation ID:</strong></td><td>" + reservation.getReservationId() + "</td></tr>" +
					    "<tr><td><strong>Parking Location:</strong></td><td>" + reservation.getLocation().getLocationName() + "</td></tr>" +
					    "<tr><td><strong>Location Address:</strong></td><td>" + reservation.getLocation().getAddress() + "</td></tr>" +
					    "<tr><td><strong>Slot Start Time:</strong></td><td>" + convertTimestampToDate(reservation.getStartTime().getTime()) + "</td></tr>" +
					    "<tr><td><strong>Slot End Time:</strong></td><td>" + convertTimestampToDate(reservation.getEndTime().getTime()) + "</td></tr>" +
					    "</table>" +
					    "<p>Please keep this email handy.</p>" +
					    "<p>We look forward to seeing you.</p>" +
					    "<p><strong>Sincerely,</strong><br>Parkease Pvt. Ltd.</p>" +
					    "</body></html>"
				);
		HttpEntity<EmailRequestDto> request = new HttpEntity<>(emailRequestDto,headers);
		try {
			ResponseEntity<String> response = restTemplate.exchange(emailService, HttpMethod.POST,request,String.class);
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	private String convertTimestampToDate(long timestamp) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date(timestamp); 
        return sdf.format(date);  
    }
	
	public void sessionStartMail(Reservation reservation)
	{
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		EmailRequestDto emailRequestDto=new EmailRequestDto();
		emailRequestDto.setRecipientEmail(reservation.getUser().getEmail());
		emailRequestDto.setSubject("Your Parking Session Has Started - "+ reservation.getReservationId());
		emailRequestDto.setBody(
				"<html><body>"
		                + "<p>Dear <strong>" + reservation.getUser().getFirstName() + "</strong>,</p>"
		                + "<p>Your parking session has started! Please find the details below:</p>"
		                + "<h3>Session Details:</h3>"
		                + "<table border='1' cellpadding='5' cellspacing='0' style='border-collapse: collapse;'>"
		                + "<tr><td><strong>Reservation ID:</strong></td><td>" + reservation.getReservationId() + "</td></tr>"
		                + "<tr><td><strong>Parking Location:</strong></td><td>" + reservation.getLocation().getLocationName() + "</td></tr>"
		                + "<tr><td><strong>Location Address:</strong></td><td>" + reservation.getLocation().getAddress() + "</td></tr>"
		                + "<tr><td><strong>Session Start Time:</strong></td><td>" + convertTimestampToDate(reservation.getStartTime().getTime()) + "</td></tr>" + "</td></tr>"
		                + "</table>"
		                + "<p>We hope you have a smooth parking experience. If you have any questions or need assistance, feel free to contact us.</p>"
		                + "<p>Thank you for choosing Parkease!</p>"
		                + "<p><strong>Sincerely,</strong><br>Parkease Pvt. Ltd.</p>"
		                + "</body></html>"
				);
		HttpEntity<EmailRequestDto> request = new HttpEntity<>(emailRequestDto,headers);
		try {
			ResponseEntity<String> response = restTemplate.exchange(emailService, HttpMethod.POST,request,String.class);
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	public void sessiontEndMail(Reservation reservation)
	{
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		EmailRequestDto emailRequestDto=new EmailRequestDto();
		emailRequestDto.setRecipientEmail(reservation.getUser().getEmail());
		emailRequestDto.setSubject("Your Parking Session Has Ended - "+ reservation.getReservationId());
		emailRequestDto.setBody(
				"<html><body>"
		                + "<p>Dear <strong>" + reservation.getUser().getFirstName() + "</strong>,</p>"
		                + "<p>Your parking session has ended. Please find the details below:</p>"
		                + "<h3>Session Details:</h3>"
		                + "<table border='1' cellpadding='5' cellspacing='0' style='border-collapse: collapse;'>"
		                + "<tr><td><strong>Reservation ID:</strong></td><td>" + reservation.getReservationId() + "</td></tr>"
		                + "<tr><td><strong>Parking Location:</strong></td><td>" + reservation.getLocation().getLocationName() + "</td></tr>"
		                + "<tr><td><strong>Location Address:</strong></td><td>" + reservation.getLocation().getAddress() + "</td></tr>"
		                + "<tr><td><strong>Session End Time:</strong></td><td>" + convertTimestampToDate(reservation.getEndTime().getTime()) + "</td></tr>"
		                + "</table>"
		                + "<p><strong>Alert:</strong> It appears that you did not pick up your car by the designated end time. Please note that extra charges may apply if your car remains in the parking space after the session has ended.</p>"
		                + "<p>We encourage you to pick up your car within the designated time to avoid any additional charges in the future.</p>"
		                + "<p>If you have any questions or need assistance, feel free to contact us.</p>"
		                + "<p>Thank you for choosing Parkease!</p>"
		                + "<p><strong>Sincerely,</strong><br>Parkease Pvt. Ltd.</p>"
		                + "</body></html>"
				);
		HttpEntity<EmailRequestDto> request = new HttpEntity<>(emailRequestDto,headers);
		try {
			ResponseEntity<String> response = restTemplate.exchange(emailService, HttpMethod.POST,request,String.class);
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	public void sessionComplete(Reservation reservation, BigDecimal extraCharge)
	{
		String emailBody;
		if (extraCharge.compareTo(BigDecimal.ZERO) > 0) {
			emailBody = "<p><strong>⚠️ Important:</strong> Extra charges of ₹" + extraCharge + " have been applied due to exceeding your reserved time.</p>"
		               + "<p>Please ensure timely checkout in the future to avoid extra charges.</p>";
		} else {
			emailBody = "<p>Thank you for checking out on time! No extra charges have been applied.</p>";
		}
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		EmailRequestDto emailRequestDto=new EmailRequestDto();
		emailRequestDto.setRecipientEmail(reservation.getUser().getEmail());
		emailRequestDto.setSubject("Session Completed - Reservation ID: "+ reservation.getReservationId());
		emailRequestDto.setBody("<html><body>"
		        + "<p>Dear <strong>" + reservation.getUser().getFirstName() + "</strong>,</p>"
		        + "<p>Your parking session has now been completed.</p>"

		        + "<h3>Session Details:</h3>"
		        + "<table border='1' cellpadding='5' cellspacing='0'>"
		        + "<tr><td><strong>Reservation ID:</strong></td><td>" + reservation.getReservationId() + "</td></tr>"
		        + "<tr><td><strong>Parking Location:</strong></td><td>" + reservation.getLocation().getLocationName() + "</td></tr>"
		        + "<tr><td><strong>Location Address:</strong></td><td>" + reservation.getLocation().getAddress() + "</td></tr>"
		        + "<tr><td><strong>Slot Start Time:</strong></td><td>" + convertTimestampToDate(reservation.getStartTime().getTime()) + "</td></tr>"
		        + "<tr><td><strong>Slot End Time:</strong></td><td>" + convertTimestampToDate(reservation.getEndTime().getTime()) + "</td></tr>"
		        + "<tr><td><strong>Actual Checkout Time:</strong></td><td>" + Timestamp.from(Instant.now()) + "</td></tr>"
		        + "</table>"

		        + emailBody

		        + "<p>Thank you for using ParkEase.</p>"
		        + "<p><strong>Sincerely,</strong><br>ParkEase Pvt. Ltd.</p>"
		        + "</body></html>"
				);
		HttpEntity<EmailRequestDto> request = new HttpEntity<>(emailRequestDto,headers);
		try {
			ResponseEntity<String> response = restTemplate.exchange(emailService, HttpMethod.POST,request,String.class);
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	public ApiResponse sendOtp(String email) {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<String> request = new HttpEntity<>(email,headers);
		System.out.print(request);
		try {
			ResponseEntity<String> response = restTemplate.exchange(emailOtpService, HttpMethod.POST,request,String.class);
			//System.out.println(response.getBody());
			return new ApiResponse(response.getBody());
		}catch(Exception e) {
			e.printStackTrace();
		}
		return new ApiResponse("Email service is down");
	}
}
