import type { Employee, EmployeeResponse, CreateEmployeeRequest } from '../types/employee';

const API_BASE_URL = 'http://localhost:8080';

class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new ApiError(await response.text(), response.status);
  }
  return response.json();
}

export const employeeApi = {
  // Get all active employees sorted by last name
  getActiveEmployees: async (): Promise<Employee[]> => {
    const response = await fetch(`${API_BASE_URL}/employees/active`);
    return handleResponse<Employee[]>(response);
  },

  // Get employee by ID with direct reports
  getEmployeeById: async (id: number): Promise<EmployeeResponse> => {
    const response = await fetch(`${API_BASE_URL}/employees/${id}`);
    return handleResponse<EmployeeResponse>(response);
  },

  // Get employees hired within date range
  getEmployeesByHireDate: async (startDate: string, endDate: string): Promise<Employee[]> => {
    const response = await fetch(
      `${API_BASE_URL}/employees/hired?start=${encodeURIComponent(startDate)}&end=${encodeURIComponent(endDate)}`
    );
    return handleResponse<Employee[]>(response);
  },

  // Create new employee
  createEmployee: async (employee: CreateEmployeeRequest): Promise<Employee> => {
    const response = await fetch(`${API_BASE_URL}/employees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });
    return handleResponse<Employee>(response);
  },

  // Deactivate employee
  deactivateEmployee: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/employees/${id}/deactivate`, {
      method: 'PATCH',
    });
    return handleResponse<void>(response);
  },
}; 