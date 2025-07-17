package com.flywire.exercise.controller;

import com.flywire.exercise.model.Employee;
import com.flywire.exercise.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/employees")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping("/active")
    public List<Employee> getActiveEmployees() {
        return employeeService.getActiveEmployeesSortedByLastName();
    }

    @GetMapping("/{id}")
    public Map<String, Object> getById(@PathVariable int id) {
        return employeeService.getEmployeeWithDirectReports(id);
    }

    @GetMapping("/hired")
    public List<Employee> getByHireDateRange(
            @RequestParam String start,
            @RequestParam String end
    ) throws Exception {
        return employeeService.getEmployeesHiredBetween(start, end);
    }

    @PostMapping
    public Employee add(@RequestBody Employee e) {
        return employeeService.addEmployee(e);
    }

    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<String> deactivate(@PathVariable int id) {
        employeeService.deactivateEmployee(id);
        return ResponseEntity.ok("Employee deactivated");
    }
}
