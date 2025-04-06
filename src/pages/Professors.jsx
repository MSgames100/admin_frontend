
import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const mockProfessors = [
  { id: '1', name: 'Dr. Jonathan Smith', email: 'j.smith@harvard.edu', institute: 'Harvard Business School', department: 'Business Strategy', studentsCount: 145 },
  { id: '2', name: 'Prof. Emily Johnson', email: 'e.johnson@stanford.edu', institute: 'Stanford University', department: 'Marketing', studentsCount: 112 },
  { id: '3', name: 'Dr. Michael Chen', email: 'm.chen@mit.edu', institute: 'MIT', department: 'Operations', studentsCount: 98 },
  { id: '4', name: 'Prof. Sarah Wilson', email: 's.wilson@columbia.edu', institute: 'Columbia University', department: 'Finance', studentsCount: 87 },
  { id: '5', name: 'Dr. Robert Garcia', email: 'r.garcia@yale.edu', institute: 'Yale University', department: 'Economics', studentsCount: 76 },
];

const Professors = () => {
  return (
    <div>
      <PageHeader 
        title="Professors"
        description="Manage professor accounts and access"
        action={{ 
          label: "Add Professor", 
          onClick: () => console.log("Add professor clicked") 
        }}
      />
      
      <Card>
        <div className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Institute</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Students</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockProfessors.map((professor) => (
                <TableRow key={professor.id}>
                  <TableCell className="font-medium">{professor.name}</TableCell>
                  <TableCell>{professor.email}</TableCell>
                  <TableCell>{professor.institute}</TableCell>
                  <TableCell>{professor.department}</TableCell>
                  <TableCell>{professor.studentsCount}</TableCell>
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

export default Professors;
