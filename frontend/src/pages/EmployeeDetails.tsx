import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { EmployeeResponse } from '../types/employee';
import { employeeApi } from '../services/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

export function EmployeeDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState<EmployeeResponse>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (id) {
      loadEmployee(parseInt(id, 10));
    }
  }, [id]);

  async function loadEmployee(employeeId: number) {
    try {
      const data = await employeeApi.getEmployeeById(employeeId);
      setEmployeeData(data);
      setError(undefined);
    } catch (err) {
      setError('Failed to load employee details');
      console.error(err);
    }
  }

  if (!employeeData) {
    return (
      <div className="text-center py-8">
        {error ? (
          <div className="bg-destructive/15 text-destructive px-4 py-2 rounded">
            {error}
          </div>
        ) : (
          'Loading...'
        )}
      </div>
    );
  }

  const { employee, directReports } = employeeData;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Employee Details</h1>
        <Button variant="outline" onClick={() => navigate('/')}>
          Back to List
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{employee.name}</CardTitle>
          <CardDescription>{employee.position}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Employee Information</h3>
            <div className="space-y-1">
              <p className="text-sm">
                <span className="font-medium">ID:</span> {employee.id}
              </p>
              <p className="text-sm">
                <span className="font-medium">Hire Date:</span> {employee.hireDate}
              </p>
              <p className="text-sm">
                <span className="font-medium">Status:</span>{' '}
                {employee.active ? 'Active' : 'Inactive'}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Direct Reports</h3>
            {directReports.length > 0 ? (
              <ul className="list-disc list-inside space-y-1">
                {directReports.map((name, index) => (
                  <li key={index} className="text-sm">{name}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No direct reports</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 