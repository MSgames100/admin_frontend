
import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const mockInstitutes = [
  { id: '1', name: 'Harvard Business School', location: 'Boston, MA', activeSubscription: true, professors: 45, students: 950 },
  { id: '2', name: 'Stanford University', location: 'Stanford, CA', activeSubscription: true, professors: 38, students: 820 },
  { id: '3', name: 'MIT', location: 'Cambridge, MA', activeSubscription: true, professors: 42, students: 880 },
  { id: '4', name: 'Columbia University', location: 'New York, NY', activeSubscription: true, professors: 36, students: 760 },
  { id: '5', name: 'Yale University', location: 'New Haven, CT', activeSubscription: false, professors: 31, students: 680 },
];

const Institutes = () => {
  return (
    <div>
      <PageHeader 
        title="Institutes"
        description="Manage all registered educational institutions"
        action={{ 
          label: "Add Institute", 
          onClick: () => console.log("Add institute clicked") 
        }}
      />
      
      <Card>
        <div className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead>Professors</TableHead>
                <TableHead>Students</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInstitutes.map((institute) => (
                <TableRow key={institute.id}>
                  <TableCell className="font-medium">{institute.name}</TableCell>
                  <TableCell>{institute.location}</TableCell>
                  <TableCell>
                    <Badge variant={institute.activeSubscription ? 'default' : 'secondary'}>
                      {institute.activeSubscription ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>{institute.professors}</TableCell>
                  <TableCell>{institute.students}</TableCell>
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

export default Institutes;
