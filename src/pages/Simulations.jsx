
import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const mockSimulations = [
  { 
    id: '1', 
    name: 'Supply Chain Strategy', 
    category: 'Operations', 
    complexity: 'Advanced',
    activeUsers: 450,
    lastUpdated: 'Apr 15, 2025'
  },
  { 
    id: '2', 
    name: 'Business Strategy Simulation', 
    category: 'Strategy', 
    complexity: 'Intermediate',
    activeUsers: 820,
    lastUpdated: 'Apr 10, 2025'
  },
  { 
    id: '3', 
    name: 'Marketing Analytics', 
    category: 'Marketing', 
    complexity: 'Intermediate',
    activeUsers: 380,
    lastUpdated: 'Apr 5, 2025'
  },
  { 
    id: '4', 
    name: 'Financial Management', 
    category: 'Finance', 
    complexity: 'Advanced',
    activeUsers: 290,
    lastUpdated: 'Mar 28, 2025'
  },
  { 
    id: '5', 
    name: 'HR Management Simulation', 
    category: 'Human Resources', 
    complexity: 'Beginner',
    activeUsers: 175,
    lastUpdated: 'Mar 20, 2025'
  },
];

const Simulations = () => {
  return (
    <div>
      <PageHeader 
        title="Simulations"
        description="Manage all game simulations"
        action={{ 
          label: "Add Simulation", 
          onClick: () => console.log("Add simulation clicked") 
        }}
      />
      
      <Card>
        <div className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Complexity</TableHead>
                <TableHead>Active Users</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSimulations.map((simulation) => (
                <TableRow key={simulation.id}>
                  <TableCell className="font-medium">{simulation.name}</TableCell>
                  <TableCell>{simulation.category}</TableCell>
                  <TableCell>
                    <Badge variant={
                      simulation.complexity === 'Advanced' ? 'destructive' : 
                      simulation.complexity === 'Intermediate' ? 'default' : 'outline'
                    }>
                      {simulation.complexity}
                    </Badge>
                  </TableCell>
                  <TableCell>{simulation.activeUsers}</TableCell>
                  <TableCell>{simulation.lastUpdated}</TableCell>
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

export default Simulations;
