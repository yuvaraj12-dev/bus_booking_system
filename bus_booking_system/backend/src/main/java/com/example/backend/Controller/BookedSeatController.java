package com.example.backend.Controller;


import com.example.backend.Model.BookedSeat;
import com.example.backend.Model.Bus;
import com.example.backend.Repository.BookedSeatRepository;
import com.example.backend.Repository.BusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin
public class BookedSeatController {

    @Autowired
    private BookedSeatRepository bookedSeatRepository;

    @Autowired
    private BusRepository busRepository;

    @GetMapping("/getBookedSeat")
    private List<BookedSeat> getBookedSeat() {
        return bookedSeatRepository.findAll();
    }

    @PostMapping("/addBookedSeat")
    private Map<String,Object> addBookedSeat(@RequestBody Map<String,Object> body) {

        String currentBusId = body.get("currentBusId").toString();
        String bookingSeatNum = body.get("bookingSeatNum").toString();

        BookedSeat bookedSeat = new BookedSeat();
        bookedSeat.setBusId(currentBusId);
        bookedSeat.setSeatNumber(bookingSeatNum);
        bookedSeat.setBookedStatus("true");

        bookedSeatRepository.save(bookedSeat);
        return body;
    }

}
