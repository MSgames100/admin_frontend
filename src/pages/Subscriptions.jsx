
import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const mockSubscriptions = [
  { id: '1', institute: 'Harvard Business School', plan: 'Enterprise', startDate: 'Jan 15, 2025', endDate: 'May 15, 2025', status: 'active', students: 450 },
  { id: '2', institute: 'Stanford University', plan: 'Professional', startDate: 'Feb 1, 2025', endDate: 'May 20, 2025', status: 'active', students: 320 },
  { id: '3', institute: 'MIT', plan: 'Enterprise Plus', startDate: 'Jan 25, 2025', endDate: 'May 25, 2025', status: 'active', students: 380 },
  { id: '4', institute: 'Columbia University', plan: 'Standard', startDate: 'Mar 2, 2025', endDate: 'June 2, 2025', status: 'active', students: 210 },
  { id: '5', institute: 'Yale University', plan: 'Professional', startDate: 'Dec 10, 2024', endDate: 'Apr 10, 2025', status: 'expired', students: 260 },
];

const Subscriptions = () => {
  return (
    <div>
      <PageHeader 
        title="Subscriptions Management"
        description="Manage institute subscriptions"
        action={{ 
          label: "Add Subscription", 
          onClick: () => console.log("Add subscription clicked") 
        }}
      />
      
      <Card>
        <div className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Institute</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Students</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSubscriptions.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell className="font-medium">{subscription.institute}</TableCell>
                  <TableCell>{subscription.plan}</TableCell>
                  <TableCell>{subscription.startDate}</TableCell>
                  <TableCell>{subscription.endDate}</TableCell>
                  <TableCell>
                    <Badge variant={subscription.status === 'active' ? 'default' : 'secondary'}>
                      {subscription.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{subscription.students}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View</Button>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default Subscriptions;
