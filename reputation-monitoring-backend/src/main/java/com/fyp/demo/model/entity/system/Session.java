package com.fyp.demo.model.entity.system;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "session")
public class Session {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private int id;

  @Column(name = "session")
  private String session;

  @Column(name = "user_name")
  private String userName;

  @Column(name = "expired_datetime")
  private LocalDateTime expiredDatetime;

  public Session(String session, String userName, LocalDateTime expiredDatetime) {
    this.session = session;
    this.userName = userName;
    this.expiredDatetime = expiredDatetime;
  }
}