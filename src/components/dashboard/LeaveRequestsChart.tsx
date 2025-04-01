
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Sample data with monthly leave requests
const data = [
  { name: 'Jan', pending: 4, approved: 12, rejected: 2 },
  { name: 'Feb', pending: 5, approved: 15, rejected: 3 },
  { name: 'Mar', pending: 8, approved: 20, rejected: 1 },
  { name: 'Apr', pending: 7, approved: 17, rejected: 2 },
  { name: 'May', pending: 9, approved: 22, rejected: 4 },
  { name: 'Jun', pending: 12, approved: 25, rejected: 3 },
];

const LeaveRequestsChart = () => {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="approved" name="Approved" fill="#10B981" />
          <Bar dataKey="pending" name="Pending" fill="#F59E0B" />
          <Bar dataKey="rejected" name="Rejected" fill="#EF4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LeaveRequestsChart;
