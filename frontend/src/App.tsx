import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button } from './components/ui/button';
import { ActiveEmployees } from './pages/ActiveEmployees';
import { EmployeeDetails } from './pages/EmployeeDetails';
import { AddEmployee } from './pages/AddEmployee';
import { SearchByDate } from './pages/SearchByDate';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost">Active Employees</Button>
              </Link>
              <Link to="/hire">
                <Button variant="ghost">Add Employee</Button>
              </Link>
              <Link to="/search">
                <Button variant="ghost">Search by Date</Button>
              </Link>
            </nav>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<ActiveEmployees />} />
            <Route path="/employee/:id" element={<EmployeeDetails />} />
            <Route path="/hire" element={<AddEmployee />} />
            <Route path="/search" element={<SearchByDate />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
