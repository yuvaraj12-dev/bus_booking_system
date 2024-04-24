package com.example.backend.Controller;

import com.example.backend.Model.Passenger;
import com.example.backend.Repository.PassengerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@CrossOrigin
public class PassengerComponent {

    @Autowired
    private PassengerRepository passengerRepository;

    @PostMapping("/bookTicket")
    private Map<String,Object> bookTicket(@RequestBody Map<String,Object> body) {

        String name = body.get("name").toString();
        String gender = body.get("gender").toString();
        String age = body.get("age").toString();
        String mobileNo = body.get("mobileNo").toString();
        String paymentOption = body.get("selectedPaymentOption").toString();
        String cardNumber = body.get("cardNumber").toString();
        String monthAndYear = body.get("monthAndYear").toString();
        String cvv = body.get("cvv").toString();
        String cardHolderName = body.get("cardHolderName").toString();
        String upiId = body.get("upiId").toString();
        String totalPayment = body.get("totalPayment").toString();
        String totalGst = body.get("totalGst").toString();

        if(paymentOption.equals("CreditCard")) {
            Passenger passenger = new Passenger();
            passenger.setName(name);
            passenger.setGender(gender);
            passenger.setAge(age);
            passenger.setMobileNo(mobileNo);
            passenger.setPaymentOption(paymentOption);
            passenger.setCardNumber(cardNumber);
            passenger.setCardHolderName(cardHolderName);
            passenger.setCvv(cvv);
            passenger.setMonthAndYear(monthAndYear);
            passenger.setPayment(totalPayment);
            passenger.setGst(totalGst);
            passengerRepository.save(passenger);
        } else if (paymentOption.equals("UPI")) {
            Passenger passenger = new Passenger();
            passenger.setName(name);
            passenger.setGender(gender);
            passenger.setAge(age);
            passenger.setMobileNo(mobileNo);
            passenger.setPaymentOption(paymentOption);
            passenger.setUpiNumber(upiId);
            passenger.setPayment(totalPayment);
            passenger.setGst(totalGst);
            passengerRepository.save(passenger);
        }

        return body;
    }
}
