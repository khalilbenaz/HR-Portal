
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";
import { Payslip } from "@/lib/types";

interface PayslipListProps {
  payslips: Payslip[];
  loading: boolean;
  onSelect: (payslip: Payslip) => void;
  onDownload: (id: string) => void;
}

const PayslipList = ({ payslips, loading, onSelect, onDownload }: PayslipListProps) => {
  if (loading) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <p className="text-muted-foreground">Loading payslips...</p>
      </div>
    );
  }

  if (payslips.length === 0) {
    return (
      <div className="h-[300px] flex flex-col items-center justify-center">
        <p className="text-muted-foreground">No payslips found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Period</TableHead>
            <TableHead>Issue Date</TableHead>
            <TableHead className="text-right">Gross Amount</TableHead>
            <TableHead className="text-right">Net Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payslips.map((payslip) => (
            <TableRow key={payslip.id}>
              <TableCell>{payslip.period}</TableCell>
              <TableCell>{new Date(payslip.issueDate).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                {payslip.grossAmount.toLocaleString('en-US', {
                  style: 'currency',
                  currency: payslip.currency,
                })}
              </TableCell>
              <TableCell className="text-right">
                {payslip.netAmount.toLocaleString('en-US', {
                  style: 'currency',
                  currency: payslip.currency,
                })}
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  payslip.status === 'ISSUED' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {payslip.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onSelect(payslip)}
                    aria-label="View details"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDownload(payslip.id)}
                    aria-label="Download payslip"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PayslipList;
