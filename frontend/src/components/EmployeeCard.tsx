import type { Employee } from '../types/employee';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { format } from 'date-fns';

interface EmployeeCardProps {
  employee: Employee;
  onDeactivate?: (id: number) => void;
  onViewDetails?: (id: number) => void;
}

export function EmployeeCard({ employee, onDeactivate, onViewDetails }: EmployeeCardProps) {
  const formattedDate = format(new Date(employee.hireDate), 'MM/dd/yyyy');
  
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{employee.name}</CardTitle>
        <CardDescription>{employee.position}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm">
            <span className="font-medium">Hire Date:</span> {formattedDate}
          </p>
          <p className="text-sm">
            <span className="font-medium">Direct Reports:</span>{' '}
            {employee.directReports.length}
          </p>
        </div>
      </CardContent>
      <CardFooter className="justify-end space-x-2">
        {onViewDetails && (
          <Button
            variant="outline"
            onClick={() => onViewDetails(employee.id)}
          >
            View Details
          </Button>
        )}
        {onDeactivate && employee.active && (
          <Button
            variant="destructive"
            onClick={() => onDeactivate(employee.id)}
          >
            Deactivate
          </Button>
        )}
      </CardFooter>
    </Card>
  );
} 