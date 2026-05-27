package com.alarmdashboard.backend.dto;

public class AlarmDto {

    private Long id;
    private String deviceName;
    private String alarmName;
    private String severity;
    private String status;
    private String sourceIp;
    private String createdTime;

    public AlarmDto(Long id, String deviceName, String alarmName, String severity, String status, String sourceIp, String createdTime) {
        this.id = id;
        this.deviceName = deviceName;
        this.alarmName = alarmName;
        this.severity = severity;
        this.status = status;
        this.sourceIp = sourceIp;
        this.createdTime = createdTime;
    }

    public Long getId() {
        return id;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public String getAlarmName() {
        return alarmName;
    }

    public String getSeverity() {
        return severity;
    }

    public String getStatus() {
        return status;
    }

    public String getSourceIp() {
        return sourceIp;
    }

    public String getCreatedTime() {
        return createdTime;
    }
}