import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import NurseDashboard from './NurseDashboard';
import MedicationTracker from './MedicationTracker';
import ShiftSummary from './ShiftSummary';
import RobotManagement from './RobotManagement';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/robots" element={<RobotManagement />} />
        <Route path="/shifts" element={<ShiftSummary />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<NurseDashboard />} />
        <Route path="/medications" element={<MedicationTracker />} /> {/* ✅ ใช้ตัวพิมพ์เล็ก */}
        <Route path="/shifts" element={<div>Shift Summary Placeholder</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
