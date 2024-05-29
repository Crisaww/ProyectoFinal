package com.sena.tuVooz.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin")
public class adminController {
    @GetMapping("/")
    public String home() {
        return "Este es un END point privado del Admin";
    }
}
