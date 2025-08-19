package com.parkzone.pojos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="faq")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Faq {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="faq_id")
	private long faqId;
	
	@NotBlank(message = "Question is required")
	private String question;
	
	@NotBlank(message = "Answer is required")
	private String answer;
}
