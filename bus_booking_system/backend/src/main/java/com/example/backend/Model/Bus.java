package com.example.backend.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter

public class Bus {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String busName;

    private String currentFrom;

    private String currentTo;

    private String busType;

    private String feature;

    private String fare;

    private String seat;

    private String numOfSeatBooked;
}
