package com.flywire.exercise.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {
    private int id;
    private String name;
    private String position;
    private List<Integer> directReports;
    private String hireDate; // keep as String for JSON mapping
    private boolean active;
}
