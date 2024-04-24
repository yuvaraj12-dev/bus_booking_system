package com.example.backend.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Passenger {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String mobileNo;

    private String age;

    private String gender;

    private String paymentOption;

    private String cardNumber;

    private String cvv;

    @Temporal(TemporalType.DATE)
    private String monthAndYear;

    private String cardHolderName;

    private String upiNumber;

    private String payment;

    private String gst;

    public void setCardNumber(String cardNumber) {
        this.cardNumber = "************" + cardNumber.substring(cardNumber.length() - 4);
}
}
