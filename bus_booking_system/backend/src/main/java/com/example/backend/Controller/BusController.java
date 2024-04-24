package com.example.backend.Controller;

import com.example.backend.Model.Bus;
import com.example.backend.Repository.BusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class BusController {

    @Autowired
    private BusRepository busRepository;

    @GetMapping("/getBus")
    private List<Bus> getBus() {
        return busRepository.findAll();
    }

    @PostMapping("/addBus")
    private Map<String,Object> addBus (@RequestBody Map<String,Object> body) {

        String busName = body.get("busName").toString();
        String from = body.get("from").toString();
        String to = body.get("to").toString();
        String busType = body.get("busType").toString();
        String feature = body.get("feature").toString();
        String fare = body.get("fare").toString();
        String seat = body.get("seat").toString();

        Bus bus = new Bus();
        bus.setBusName(busName);
        bus.setCurrentFrom(from);
        bus.setCurrentTo(to);
        bus.setBusType(busType);
        bus.setFeature(feature);
        bus.setFare(fare);
        bus.setSeat(seat);
        bus.setNumOfSeatBooked(seat);

        busRepository.save(bus);

        return body;
    }

    @PutMapping("/saveEditBus/{id}")
    private Bus savaEditPatient(@PathVariable("id") Long id, @RequestBody Map<String,Object> body) throws InterruptedException{

        String busName = body.get("busName").toString();
        String from = body.get("from").toString();
        String to = body.get("to").toString();
        String busType = body.get("busType").toString();
        String feature = body.get("feature").toString();
        String fare = body.get("fare").toString();

        Bus bus = busRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("exception" + id));
        bus.setBusName(busName);
        bus.setCurrentFrom(from);
        bus.setCurrentTo(to);
        bus.setBusType(busType);
        bus.setFeature(feature);
        bus.setFare(fare);
        busRepository.save(bus);

        return bus;
    }

    @PutMapping("/putNumOfSeat/{id}")
    private Bus putNumOfSeat(@PathVariable("id") Long id, @RequestBody Map<String,Object> body) throws InterruptedException{

        String numOfSeat = body.get("numOfSeat").toString();

        Bus bus = busRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("exception" + id));

        bus.setNumOfSeatBooked(numOfSeat);
        busRepository.save(bus);

        return bus;
    }
}
