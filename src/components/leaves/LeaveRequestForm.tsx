
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar } from 'lucide-react';

interface LeaveRequestFormProps {
  onSubmit: (formData: {
    startDate: string;
    endDate: string;
    type: string;
    reason: string;
  }) => void;
  isLoading: boolean;
}

const LeaveRequestForm = ({ onSubmit, isLoading }: LeaveRequestFormProps) => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    type: '',
    reason: ''
  });
  
  const [error, setError] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, type: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.startDate || !formData.endDate || !formData.type || !formData.reason) {
      setError('Please fill in all required fields');
      return;
    }
    
    // Validate date range
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    
    if (endDate < startDate) {
      setError('End date cannot be earlier than start date');
      return;
    }
    
    setError(null);
    onSubmit(formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Request Leave</CardTitle>
          <CardDescription>Submit a new leave request</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="type">Leave Type</Label>
            <Select value={formData.type} onValueChange={handleSelectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select leave type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ANNUAL">Annual Leave</SelectItem>
                <SelectItem value="SICK">Sick Leave</SelectItem>
                <SelectItem value="MATERNITY">Maternity Leave</SelectItem>
                <SelectItem value="PATERNITY">Paternity Leave</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reason">Reason</Label>
            <Textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Please provide a reason for your leave request"
              required
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit Request'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default LeaveRequestForm;
