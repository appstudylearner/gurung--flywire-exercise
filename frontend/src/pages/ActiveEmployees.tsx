import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Employee } from '../types/employee';
import { employeeApi } from '../services/api';
import { EmployeeCard } from '../components/EmployeeCard';

export function ActiveEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    loadEmployees();
  }, []);

  async function loadEmployees() {
    try {
      const data = await employeeApi.getActiveEmployees();
      setEmployees(data);
      setError(undefined);
    } catch (err) {
      setError('Failed to load employees');
      console.error(err);
    }
  }

  async function handleDeactivate(id: number) {
    try {
      await employeeApi.deactivateEmployee(id);
      await loadEmployees();
    } catch (err) {
      setError('Failed to deactivate employee');
      console.error(err);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Active Employees</h1>
      
      {error && (
        <div className="bg-destructive/15 text-destructive px-4 py-2 rounded">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {employees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            onDeactivate={handleDeactivate}
            onViewDetails={(id) => navigate(`/employee/${id}`)}
          />
        ))}
      </div>
    </div>
  );
} 