package com.fyp.demo.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fyp.demo.model.entity.KOL;
import com.fyp.demo.repository.KOLRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "KOL", description = "KOL")
@RestController	
@RequestMapping("/api/kol/")
public class KOLController {

	@Autowired
	KOLRepository KOLRepository;
	@Operation(
      summary = "Get All KOLs")
	@GetMapping("")
	public ResponseEntity<List<KOL>> getAllKOLs(@RequestParam(required = false) String name) {
		try {
			List<KOL> KOLs = new ArrayList<KOL>();

			if (name == null)
				KOLRepository.findAll().forEach(KOLs::add);
			else
				KOLRepository.findByNameContaining(name).forEach(KOLs::add);

			if (KOLs.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(KOLs, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("{id}")
	public ResponseEntity<KOL> getKOLById(@PathVariable("id") long id) {
		Optional<KOL> KOLs = KOLRepository.findById(id);

		if (KOLs.isPresent()) {
			return new ResponseEntity<>(KOLs.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("create")
	public ResponseEntity<KOL> createKOL(@RequestBody KOL KOL) {
		try {
			KOL _KOL = KOLRepository
					.save(new KOL(KOL.getName(), KOL.getOtherName()));
			return new ResponseEntity<>(_KOL, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("{id}")
	public ResponseEntity<KOL> updateKOL(@PathVariable("id") long id, @RequestBody KOL KOL) {

		Optional<KOL> KOLs = KOLRepository.findById(id);

		if (KOLs.isPresent()) {
			KOL _KOL = KOLs.get();
			_KOL.setName(KOL.getName());
			return new ResponseEntity<>(KOLRepository.save(_KOL), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("{id}")
	public ResponseEntity<HttpStatus> deleteKOL(@PathVariable("id") long id) {
		try {
			KOLRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}