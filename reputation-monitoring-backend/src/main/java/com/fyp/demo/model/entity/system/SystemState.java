package com.fyp.demo.model.entity.system;

import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Service
public class SystemState {
    Integer sessionId;

    public SystemState() {

    }
    public SystemState(Integer sessionId) {
        this.sessionId = sessionId;
    }

    @PostConstruct
    public void init() {
        connect();
    }

    public void connect() {

    }

    public void setSessionId(Integer sessionId) {
        this.sessionId = sessionId;
    }

    public Integer getSessionId() {
        return this.sessionId;
    }
}
