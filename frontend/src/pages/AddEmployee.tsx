import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CreateEmployeeRequest } from '../types/employee';
import { employeeApi } from '../services/api';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';

export function AddEmployee() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(undefined);

    const formData = new FormData(event.currentTarget);
    const directReportsStr = formData.get('directReports') as string;
    
    try {
      const employee: CreateEmployeeRequest = {
        name: formData.get('name') as string,
        position: formData.get('position') as string,
        directReports: directReportsStr
          ? directReportsStr.split(',').map(id => parseInt(id.trim(), 10))
          : [],
        managerId: formData.get('managerId') 
          ? parseInt(formData.get('managerId') as string, 10)
          : undefined
      };

      await employeeApi.createEmployee(employee);
      navigate('/');
    } catch (err) {
      setError('Failed to create employee');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Add New Employee</h1>
        <Button variant="outline" onClick={() => navigate('/')}>
          Cancel
        </Button>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Employee Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-destructive/15 text-destructive px-4 py-2 rounded">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                required
                className="w-full px-3 py-2 border rounded-md"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="position">
                Position
              </label>
              <input
                id="position"
                name="position"
                required
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Software Engineer"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="managerId">
                Manager ID
              </label>
              <input
                id="managerId"
                name="managerId"
                type="number"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Optional"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="directReports">
                Direct Reports IDs
              </label>
              <input
                id="directReports"
                name="directReports"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Comma-separated IDs (e.g., 1,2,3)"
              />
              <p className="text-sm text-muted-foreground">
                Enter comma-separated employee IDs
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Employee'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
} 