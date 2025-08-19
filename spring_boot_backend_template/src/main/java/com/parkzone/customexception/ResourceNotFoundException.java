package com.parkzone.customexception;

public class ResourceNotFoundException extends RuntimeException {
	public ResourceNotFoundException(String msg){
		super(msg);
	}
}
