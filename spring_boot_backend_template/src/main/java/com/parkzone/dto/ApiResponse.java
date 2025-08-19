package com.parkzone.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.parkzone.eums.Role;

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
public class ApiResponse {
	private LocalDateTime timeStamp;
	private String msg;
	public ApiResponse(String msg) {
		super();
		this.msg = msg;
		this.timeStamp=LocalDateTime.now();
	}
}
