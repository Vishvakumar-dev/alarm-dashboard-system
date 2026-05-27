package com.alarmdashboard.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthcareController{
    @GetMapping("/api/health")
    public String healthCheck(){
        return "Backend is Running...";
    }
}