package com.fyp.demo.controller;

import java.security.GeneralSecurityException;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fyp.demo.model.entity.system.Session;
import com.fyp.demo.model.entity.system.SystemState;
import com.fyp.demo.model.entity.system.Jwt;
import com.fyp.demo.repository.SessionRepository;

import io.jsonwebtoken.io.IOException;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpSession;

@Tag(name = "session", description = "session")
@RestController
@RequestMapping("/api/session/")
public class SessionController {

	@Autowired
	SessionRepository sessionRepository;
	@Autowired
	HttpSession httpSession;
	@Autowired
	SystemState _system;

	public SessionController() throws GeneralSecurityException, IOException {
		this._system = new SystemState();
	}

	@GetMapping("")
	public ResponseEntity<String> getSession(@RequestParam(required = false) String userName) {
		httpSession.setAttribute("session", "jwtTokent");
		Optional<Session> session = sessionRepository.findByUserName(userName);

		if (session.isPresent()) {
			Session sessionEntity = session.get();
			// expired
			if (sessionEntity.getExpiredDatetime().isAfter(LocalDateTime.now()) == false) {
				sessionRepository.deleteById(sessionEntity.getId());
				return new ResponseEntity<>("Session Expired", HttpStatus.NOT_FOUND);
			}

			// set session
			String token = sessionEntity.getSession();
			httpSession.setAttribute("session", token);
			httpSession.setAttribute("session_id", sessionEntity.getId());
			_system = new SystemState(sessionEntity.getId());
			return new ResponseEntity<>(token, HttpStatus.OK);
		} else {
			return new ResponseEntity<>("Session Not Found", HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("")
	public HttpStatus createSession(@RequestParam String sessionName) {
		// life for 1 day
		httpSession.setMaxInactiveInterval(86400);
		String jwtToken = Jwt.generateJwt(sessionName);
		httpSession.setAttribute("session", "jwtTokent");
		LocalDateTime expiredDatetime = LocalDateTime.now().plusDays(1);
		try {
			sessionRepository
					.save(new Session(jwtToken, sessionName, expiredDatetime));
			return HttpStatus.OK;
		} catch (Exception e) {
			return HttpStatus.INTERNAL_SERVER_ERROR;
		}
	}
}