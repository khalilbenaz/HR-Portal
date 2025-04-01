
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Calendar, DollarSign, User } from "lucide-react";
import { Payslip } from "@/lib/types";

interface PayslipDetailProps {
  payslip: Payslip;
  onDownload: (id: string) => void;
}

const PayslipDetail = ({ payslip, onDownload }: PayslipDetailProps) => {
  // Sample earnings and deductions - in a real app, these would come from the API
  const earnings = [
    { description: "Base Salary", amount: payslip.grossAmount * 0.8 },
    { description: "Bonus", amount: payslip.grossAmount * 0.1 },
    { description: "Overtime", amount: payslip.grossAmount * 0.1 },
  ];

  const deductions = [
    { description: "Income Tax", amount: payslip.grossAmount * 0.15 },
    { description: "Social Security", amount: payslip.grossAmount * 0.075 },
    { description: "Health Insurance", amount: payslip.grossAmount * 0.05 },
    { description: "Retirement", amount: payslip.grossAmount * 0.03 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Payslip for {payslip.period}</h2>
          <p className="text-muted-foreground">Issued on {new Date(payslip.issueDate).toLocaleDateString()}</p>
        </div>
        <Button onClick={() => onDownload(payslip.id)}>
          <Download className="mr-2 h-4 w-4" /> Download PDF
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Employee Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-4">
            <User className="h-5 w-5 mt-1 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Employee</p>
              <p className="font-medium">{payslip.employeeName}</p>
              <p className="text-sm text-muted-foreground">ID: {payslip.employeeId}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Calendar className="h-5 w-5 mt-1 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Pay Period</p>
              <p className="font-medium">{payslip.period}</p>
              <p className="text-sm text-muted-foreground">
                Issue Date: {new Date(payslip.issueDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {earnings.map((item, index) => (
                <div key={index} className="flex justify-between border-b pb-2 last:border-0">
                  <span>{item.description}</span>
                  <span className="font-medium">
                    {item.amount.toLocaleString('en-US', {
                      style: 'currency',
                      currency: payslip.currency,
                    })}
                  </span>
                </div>
              ))}
              <div className="flex justify-between pt-2 font-bold">
                <span>Total Earnings</span>
                <span>
                  {payslip.grossAmount.toLocaleString('en-US', {
                    style: 'currency',
                    currency: payslip.currency,
                  })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Deductions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deductions.map((item, index) => (
                <div key={index} className="flex justify-between border-b pb-2 last:border-0">
                  <span>{item.description}</span>
                  <span className="font-medium">
                    {item.amount.toLocaleString('en-US', {
                      style: 'currency',
                      currency: payslip.currency,
                    })}
                  </span>
                </div>
              ))}
              <div className="flex justify-between pt-2 font-bold">
                <span>Total Deductions</span>
                <span>
                  {(payslip.grossAmount - payslip.netAmount).toLocaleString('en-US', {
                    style: 'currency',
                    currency: payslip.currency,
                  })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <span className="text-lg font-medium">Net Pay</span>
            </div>
            <span className="text-2xl font-bold">
              {payslip.netAmount.toLocaleString('en-US', {
                style: 'currency',
                currency: payslip.currency,
              })}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayslipDetail;
