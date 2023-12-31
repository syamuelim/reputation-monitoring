package com.fyp.demo.model.entity.system;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Component
public class SystemState {
    Integer sessionId;

    public SystemState() {

    }
    public SystemState(Integer sessionId) {
        this.sessionId = sessionId;
    }

    public void setSessionId(Integer sessionId) {
        this.sessionId = sessionId;
    }
}
