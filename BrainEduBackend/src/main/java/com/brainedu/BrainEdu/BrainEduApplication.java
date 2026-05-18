package com.brainedu.BrainEdu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class BrainEduApplication {

	public static void main(String[] args) {
		SpringApplication.run(
				BrainEduApplication.class,
				args
		);
	}
}