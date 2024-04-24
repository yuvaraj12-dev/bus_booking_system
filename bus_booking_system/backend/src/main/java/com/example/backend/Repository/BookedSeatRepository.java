package com.example.backend.Repository;

import com.example.backend.Model.BookedSeat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookedSeatRepository extends JpaRepository<BookedSeat, Long> {
}
