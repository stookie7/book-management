package com.example.backend.dto;

import com.example.backend.entity.Book;
import lombok.Getter;

@Getter
public class BookResponseDto {
    private final Long id;
    private final String title;
    private final String author;
    private final Integer price;
    private final Boolean available;

    public BookResponseDto(Book book) {
        this.id = book.getId();
        this.title = book.getTitle();
        this.author = book.getAuthor();
        this.price = book.getPrice();
        this.available = book.getAvailable();
    }
}
