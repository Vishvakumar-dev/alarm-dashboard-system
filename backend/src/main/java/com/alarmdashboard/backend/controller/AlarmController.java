package com.alarmdashboard.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;

import com.alarmdashboard.backend.dto.AlarmDto;
import com.alarmdashboard.backend.dto.AlarmSummaryDto;
import com.alarmdashboard.backend.service.AlarmService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class AlarmController{
    private AlarmService alarmService;

    public AlarmController(AlarmService alarmService){
        this.alarmService = alarmService;
    }

    @GetMapping("/api/alarms")
    public List<AlarmDto> getAlarms(){
        return alarmService.getAllAlarms();
    }

    @GetMapping("/api/alarms/summary")
    public AlarmSummaryDto getAlarmSummary(){
        return alarmService.getAlarmSummary();
    }
}