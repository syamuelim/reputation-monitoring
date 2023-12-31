package com.fyp.demo.model.entity.system;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "watching")
public class Watching {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "session_id")
    private int sessionId;

    @Column(name = "kol_id")
    private int kolId;

    public Watching(Integer sessionId, Integer kolId) {
        this.sessionId = sessionId;
        this.kolId = kolId;
    }
}