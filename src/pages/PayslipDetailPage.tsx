
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Payslip } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Download, Calendar, CreditCard, Building } from 'lucide-react';

const PayslipDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [payslip, setPayslip] = useState<Payslip | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to fetch payslip data
    setTimeout(() => {
      // Mock payslip data - in a real app this would come from an API
      const mockPayslip: Payslip & { 
        employeeName: string; 
        department: string;
        earnings: Array<{description: string; amount: number}>;
        deductions: Array<{description: string; amount: number}>;
      } = {
        id: id || '1',
        employeeId: '1',
        employeeName: 'John Doe',
        department: 'Engineering',
        period: 'May 2023',
        issueDate: '2023-05-31T10:00:00Z',
        grossAmount: 5000,
        netAmount: 3850,
        currency: 'USD',
        status: 'ISSUED',
        earnings: [
          { description: 'Basic Salary', amount: 4500 },
          { description: 'Bonus', amount: 300 },
          { description: 'Overtime', amount: 200 }
        ],
        deductions: [
          { description: 'Tax', amount: 750 },
          { description: 'Health Insurance', amount: 200 },
          { description: 'Pension', amount: 200 }
        ]
      };
      
      setPayslip(mockPayslip);
      setLoading(false);
    }, 1000);
  }, [id]);
  
  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    console.log('Downloading payslip PDF for:', payslip?.id);
    
    // Mock download effect
    const link = document.createElement('a');
    link.href = '#';
    link.setAttribute('download', `Payslip-${payslip?.period}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading payslip details...</p>
      </div>
    );
  }
  
  if (!payslip) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Payslip not found</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payslip Details</h1>
          <p className="text-muted-foreground">View payslip information</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/payroll')}>
            Back to All Payslips
          </Button>
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Payslip for {payslip.period}</CardTitle>
              <CardDescription>
                Issued on {format(new Date(payslip.issueDate), 'PP')}
              </CardDescription>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              payslip.status === 'PAID' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {payslip.status}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Employee Details</h3>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="font-medium">{payslip.employeeName}</span>
                  </div>
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-muted-foreground">{payslip.department}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Payment Period</h3>
                <div className="flex items-center mt-2">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{payslip.period}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Gross Amount:</span>
                <span className="font-medium">
                  {payslip.grossAmount.toLocaleString('en-US', {
                    style: 'currency',
                    currency: payslip.currency,
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total Deductions:</span>
                <span className="font-medium">
                  {(payslip.grossAmount - payslip.netAmount).toLocaleString('en-US', {
                    style: 'currency',
                    currency: payslip.currency,
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between text-lg">
                <span className="font-medium">Net Amount:</span>
                <span className="font-bold">
                  {payslip.netAmount.toLocaleString('en-US', {
                    style: 'currency',
                    currency: payslip.currency,
                  })}
                </span>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3">Earnings</h3>
              <div className="space-y-2">
                {payslip.earnings.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-muted-foreground">{item.description}</span>
                    <span>
                      {item.amount.toLocaleString('en-US', {
                        style: 'currency',
                        currency: payslip.currency,
                      })}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between font-medium pt-2 border-t">
                  <span>Total Earnings</span>
                  <span>
                    {payslip.grossAmount.toLocaleString('en-US', {
                      style: 'currency',
                      currency: payslip.currency,
                    })}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Deductions</h3>
              <div className="space-y-2">
                {payslip.deductions.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-muted-foreground">{item.description}</span>
                    <span>
                      {item.amount.toLocaleString('en-US', {
                        style: 'currency',
                        currency: payslip.currency,
                      })}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between font-medium pt-2 border-t">
                  <span>Total Deductions</span>
                  <span>
                    {(payslip.grossAmount - payslip.netAmount).toLocaleString('en-US', {
                      style: 'currency',
                      currency: payslip.currency,
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayslipDetailPage;
