package com.housezip;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@SpringBootApplication
@EnableAspectJAutoProxy
@MapperScan(basePackages = "com.housezip.model.repo")
public class HousezipSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(HousezipSpringApplication.class, args);
	}

}
