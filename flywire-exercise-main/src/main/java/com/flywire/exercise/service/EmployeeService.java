package com.flywire.exercise.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.flywire.exercise.model.Employee;
import jakarta.annotation.PostConstruct;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class EmployeeService {

    private final Map<Integer, Employee> employeeMap = new HashMap<>();

    @PostConstruct
    public void init() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        InputStream inputStream = new ClassPathResource("json/data.json").getInputStream();
        List<Employee> employees = mapper.readValue(inputStream, new TypeReference<>() {
        });
        for (Employee e : employees) {
            employeeMap.put(e.getId(), e);
        }
    }

    public List<Employee> getActiveEmployeesSortedByLastName() {
        return employeeMap.values().stream()
                .filter(Employee::isActive)
                .sorted(Comparator.comparing(e -> e.getName().split(" ")[1])) // sort by last name
                .toList();
    }

    public Map<String, Object> getEmployeeWithDirectReports(int id) {
        Employee emp = employeeMap.get(id);
        if (emp == null) throw new NoSuchElementException("Employee not found");

        List<Employee> reports = emp.getDirectReports().stream()
                .map(employeeMap::get)
                .filter(Objects::nonNull)
                .toList();

        return Map.of(
                "employee", emp,
                "directReports", reports
        );
    }

    public List<Employee> getEmployeesHiredBetween(String start, String end) throws Exception {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy");
        LocalDate startDate = LocalDate.parse(start, formatter);
        LocalDate endDate = LocalDate.parse(end, formatter);

        return employeeMap.values().stream()
                .filter(e -> {
                    try {
                        LocalDate date = LocalDate.parse(e.getHireDate(), formatter);
                        return !date.isBefore(startDate) && !date.isAfter(endDate);
                    } catch (Exception ex) {
                        return false;
                    }
                })
                .sorted((e1, e2) -> {
                    LocalDate d1 = LocalDate.parse(e1.getHireDate(), formatter);
                    LocalDate d2 = LocalDate.parse(e2.getHireDate(), formatter);
                    return d2.compareTo(d1);
                })
                .toList();
    }

    public Employee addEmployee(Employee newEmp) {
        if (employeeMap.containsKey(newEmp.getId())) {
            throw new IllegalArgumentException("Employee ID already exists");
        }
        employeeMap.put(newEmp.getId(), newEmp);
        return newEmp;
    }

    public void deactivateEmployee(int id) {
        Employee emp = employeeMap.get(id);
        if (emp == null) throw new NoSuchElementException("Employee not found");
        if (!emp.isActive()) throw new IllegalStateException("Employee already inactive");
        emp.setActive(false);
    }
}
