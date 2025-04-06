
import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Student', institute: 'Harvard Business School', lastLogin: '2 hours ago' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Professor', institute: 'Stanford University', lastLogin: '1 day ago' },
  { id: '3', name: 'Michael Johnson', email: 'michael@example.com', role: 'Admin', institute: 'MSGames', lastLogin: '3 hours ago' },
  { id: '4', name: 'Sarah Williams', email: 'sarah@example.com', role: 'Student', institute: 'MIT', lastLogin: '5 days ago' },
  { id: '5', name: 'Robert Brown', email: 'robert@example.com', role: 'Professor', institute: 'Columbia University', lastLogin: '2 days ago' },
];

const Users = () => {
  return (
    <div>
      <PageHeader 
        title="User Management"
        description="Manage all system users"
        action={{ 
          label: "Add User", 
          onClick: () => console.log("Add user clicked") 
        }}
      />
      
      <Card>
        <div className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Institute</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={
                      user.role === 'Admin' ? 'destructive' : 
                      user.role === 'Professor' ? 'default' : 'outline'
                    }>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.institute}</TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
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

export default Users;
