export interface Employee {
  id: number;
  name: string;
  position: string;
  directReports: number[];
  hireDate: string;
  active: boolean;
}

export interface EmployeeResponse {
  employee: Employee;
  directReports: string[]; // Array of direct report names
}

export interface CreateEmployeeRequest {
  name: string;
  position: string;
  directReports: number[];
  managerId?: number;
} 