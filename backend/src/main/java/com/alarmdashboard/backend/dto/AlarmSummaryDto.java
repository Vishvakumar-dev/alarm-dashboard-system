package com.alarmdashboard.backend.dto;

public class AlarmSummaryDto{
    //total critical major minor cleared

    private Long total;
    private Long critical;
    private Long major;
    private Long minor;
    private Long cleared;

    public AlarmSummaryDto(long total, long critical, long major, long minor, long cleared){
        this.total = total;
        this.critical = critical;
        this.major = major;
        this.minor = minor;
        this.cleared = cleared;
    }

    public long getTotal(){
        return total;
    }
    public long getCritical(){
        return critical;
    }
    public long getMajor(){
        return major;
    }
    public long getMinor(){
        return minor;
    }
    public long getCleared(){
        return cleared;
    }
}