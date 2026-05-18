package com.example.backend.service;

import com.example.backend.dto.BookResponseDto;
import com.example.backend.entity.Book;
import com.example.backend.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookService {

    private final BookRepository bookRepository;

    public List<BookResponseDto> findAll() {
        return bookRepository.findAll().stream()
                .map(BookResponseDto::new)
                .toList();
    }

    public List<BookResponseDto> search(String keyword) {
        return bookRepository.search(keyword).stream()
                .map(BookResponseDto::new)
                .toList();
    }

    public BookResponseDto findById(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Book not found: " + id));
        return new BookResponseDto(book);
    }

    @Transactional
    public BookResponseDto save(Book book) {
        if (book.getAvailable() == null) book.setAvailable(true);
        return new BookResponseDto(bookRepository.save(book));
    }

    @Transactional
    public BookResponseDto update(Long id, Book request) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Book not found: " + id));
        book.setTitle(request.getTitle());
        book.setAuthor(request.getAuthor());
        book.setPrice(request.getPrice());
        if (request.getAvailable() != null) book.setAvailable(request.getAvailable());
        return new BookResponseDto(book);
    }

    @Transactional
    public void delete(Long id) {
        if (!bookRepository.existsById(id))
            throw new IllegalArgumentException("Book not found: " + id);
        bookRepository.deleteById(id);
    }
}
