import { render, screen } from '@testing-library/react';
import NurseDashboard from '../NurseDashboard';

test('แสดงหัวข้อ Dashboard', () => {
  render(<NurseDashboard />);
  expect(screen.getByText('แดชบอร์ดการดูแลผู้ป่วย')).toBeInTheDocument();
});

test('แสดงผู้ป่วยห้อง 501', () => {
  render(<NurseDashboard />);
  expect(screen.getByText('สมชาย ใจดี')).toBeInTheDocument();
});