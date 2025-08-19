package com.parkzone.security;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private CustomJwtAuthenticationFilter jwtFilter;
	// Configure the bean to customize spring security filter chain
		@Bean
		public SecurityFilterChain authorizeRequests(HttpSecurity http) throws Exception
		{
			http.csrf(customizer -> customizer.disable())
			.cors(cors -> cors.configurationSource(corsConfigurationSource()))
	        .authorizeHttpRequests
	        (request -> 
	        request.requestMatchers("/users/register","/users/login","/users/password","/email","/reservation/",
					"/v*/api-doc*/**","/swagger-ui/**").permitAll()
	       .requestMatchers("/location/city/{city}",
	    		   "/reservation/user/{id}",
	    		   "/review/**",
	    		   "/seats/**",
	    		   "/transactions/user/{id}")
	       .hasAuthority("CUSTOMER")
	       .requestMatchers("/users/","/users/status/{id}",
	    		   "/faq/","/faq/{id}",
	    		   "/location/","/location/upload/{id}","/location/update/{id}","/location/status/{id}",
	    		   "/reservation/all",
	    		   "/transactions/")
	       .hasAuthority("ADMIN")       
	       .requestMatchers("/reservation/Date/{date}",
	    		   "/session/**")
	       .hasAuthority("EMPLOYEE")   
	       .requestMatchers("/users/upload/{id}","/users/update/{id}","/users/{id}","/transactions/{id}")
	       .hasAnyAuthority("CUSTOMER","EMPLOYEE","ADMIN")
	       .requestMatchers("/faq/all","/reservation/cancel/{uid}/{rid}")
	       .hasAnyAuthority("CUSTOMER","ADMIN") 
	        .anyRequest().authenticated())  
	//        .httpBasic(Customizer.withDefaults())
	        .sessionManagement(session 
	        		-> session.sessionCreationPolicy(
	        				SessionCreationPolicy.STATELESS))
	        /*
	         * adding custom JWT filter before 1st auth filter - UsernamePasswordAuthenticationFilter
	         */
	        .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
	        return http.build();
		}
		//configure AuthMgr bean - to be used in user authentication
		@Bean
		public AuthenticationManager authenticationManager
		(AuthenticationConfiguration config) throws Exception
		{
			return config.getAuthenticationManager();
		}
		
		@Bean
	    public CorsConfigurationSource corsConfigurationSource() {
	        CorsConfiguration configuration = new CorsConfiguration();
	        configuration.setAllowedOrigins(List.of("http://localhost:3000")); // Allow frontend
	        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
	        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
	        configuration.setAllowCredentials(true); // Allow credentials (JWT tokens, cookies)
	        
	        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	        source.registerCorsConfiguration("/**", configuration); // Apply CORS to all endpoints
	        return source;
	    }
}
