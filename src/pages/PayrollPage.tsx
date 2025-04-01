
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, FileText, Filter } from 'lucide-react';
import PayslipList from '@/components/payroll/PayslipList';
import PayslipDetail from '@/components/payroll/PayslipDetail';
import { Payslip } from '@/lib/types';

const PayrollPage = () => {
  const { auth } = useAuth();
  const [payslips, setPayslips] = useState<Payslip[]>([]);
  const [selectedPayslip, setSelectedPayslip] = useState<Payslip | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('current');
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockPayslips: Payslip[] = [
        {
          id: '1',
          employeeId: '1',
          employeeName: 'John Doe',
          period: 'May 2023',
          issueDate: '2023-05-31',
          grossAmount: 5000,
          netAmount: 3800,
          currency: 'USD',
          status: 'ISSUED'
        },
        {
          id: '2',
          employeeId: '1',
          employeeName: 'John Doe',
          period: 'June 2023',
          issueDate: '2023-06-30',
          grossAmount: 5200,
          netAmount: 3950,
          currency: 'USD',
          status: 'ISSUED'
        },
        {
          id: '3',
          employeeId: '1',
          employeeName: 'John Doe',
          period: 'July 2023',
          issueDate: '2023-07-31',
          grossAmount: 5200,
          netAmount: 3950,
          currency: 'USD',
          status: 'ISSUED'
        }
      ];
      
      setPayslips(mockPayslips);
      setLoading(false);
    }, 1000);
  }, []);
  
  const handlePayslipSelect = (payslip: Payslip) => {
    setSelectedPayslip(payslip);
    setViewMode('detail');
  };
  
  const handleBackToList = () => {
    setViewMode('list');
    setSelectedPayslip(null);
  };
  
  const handleDownload = (id: string) => {
    console.log(`Downloading payslip: ${id}`);
    // In a real app, this would initiate a file download
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payroll</h1>
        <p className="text-muted-foreground">View and manage payslips</p>
      </div>
      
      {viewMode === 'list' ? (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Filter by period:</span>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current Year</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export All
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Payslips</CardTitle>
              <CardDescription>All your payment records</CardDescription>
            </CardHeader>
            <CardContent>
              <PayslipList 
                payslips={payslips} 
                loading={loading}
                onSelect={handlePayslipSelect}
                onDownload={handleDownload}
              />
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="space-y-4">
          <Button variant="ghost" onClick={handleBackToList}>
            ← Back to List
          </Button>
          
          {selectedPayslip && (
            <PayslipDetail payslip={selectedPayslip} onDownload={handleDownload} />
          )}
        </div>
      )}
    </div>
  );
};

export default PayrollPage;
