package com.flywire.exercise.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class HelloWorldController {

    @RequestMapping(value = "/", method = {RequestMethod.GET})
    public String healthCheck() {
        return "Hello world!";
    }
}
