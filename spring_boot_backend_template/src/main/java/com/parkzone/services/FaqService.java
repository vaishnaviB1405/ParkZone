package com.parkzone.services;

import java.util.List;

import com.parkzone.dto.ApiResponse;
import com.parkzone.dto.FaqDto;

public interface FaqService {

	FaqDto insertFAQ(FaqDto faqDto);

	List<FaqDto> getAllFAQs();

	ApiResponse deleteFAQ(long id);

}
