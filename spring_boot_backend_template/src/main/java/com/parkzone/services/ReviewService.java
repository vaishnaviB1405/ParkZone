package com.parkzone.services;

import java.util.List;

import com.parkzone.dto.ApiResponse;
import com.parkzone.dto.ReviewDto;
import com.parkzone.pojos.Review;

public interface ReviewService {

	ApiResponse insertReview(ReviewDto reviewDto);

	List<ReviewDto> getReviews(long id);

}
