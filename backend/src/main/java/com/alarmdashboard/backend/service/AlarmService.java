package com.alarmdashboard.backend.service;

import com.alarmdashboard.backend.dto.AlarmDto;
import com.alarmdashboard.backend.dto.AlarmSummaryDto;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class AlarmService{

    public List<AlarmDto> getAllAlarms(){
        return List.of(
                new AlarmDto(1L, "Router-01", "Interface Down", "CRITICAL", "ACTIVE", "10.10.1.1", "2026-05-27 10:30:00"),
                new AlarmDto(2L, "Switch-02", "High CPU Usage", "MAJOR", "ACTIVE", "10.10.1.2", "2026-05-27 10:40:00"),
                new AlarmDto(3L, "Firewall-01", "Link Restored", "MINOR", "CLEARED", "10.10.1.3", "2026-05-27 11:00:00"),
                new AlarmDto(4L, "Router-02", "Packet Drop", "MAJOR", "ACTIVE", "10.10.1.4", "2026-05-27 11:15:00")
        );
    }

    public AlarmSummaryDto getAlarmSummary(){
        List<AlarmDto> alarms = getAllAlarms();
        Long total = alarms.size();
        Long critical = alarms.stream().filter(alarm -> alarm.getSeverity().equalsIgnoreCase("Critical").count());
        Long major = alarms.stream().filter(alarm -> alarm.getSeverity().equalsIgnoreCase("Major").count());
        Long minor = alarms.stream().filter(alarm -> alarm.getSeverity().equalsIgnoreCase("minor").count());
        Long cleared = alarms.stream().filter(alarm -> alarm.getSeverity().equalsIgnoreCase("cleared").count());

        return new AlarmSummaryDto(total, critical, major,minor, cleared);
    }
}