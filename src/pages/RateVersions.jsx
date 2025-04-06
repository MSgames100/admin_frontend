
import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const mockRateVersions = [
  { 
    id: '1', 
    simulation: 'Supply Chain Strategy', 
    version: '2.5', 
    effectiveDate: 'May 1, 2025',
    isLatest: true,
    createdBy: 'Admin User',
    createdAt: 'Apr 15, 2025'
  },
  { 
    id: '2', 
    simulation: 'Business Strategy Simulation', 
    version: '3.2', 
    effectiveDate: 'Apr 15, 2025',
    isLatest: true,
    createdBy: 'John Doe',
    createdAt: 'Apr 10, 2025'
  },
  { 
    id: '3', 
    simulation: 'Supply Chain Strategy', 
    version: '2.4', 
    effectiveDate: 'Apr 1, 2025',
    isLatest: false,
    createdBy: 'Admin User',
    createdAt: 'Mar 20, 2025'
  },
  { 
    id: '4', 
    simulation: 'Marketing Analytics', 
    version: '1.8', 
    effectiveDate: 'Apr 10, 2025',
    isLatest: true,
    createdBy: 'Jane Smith',
    createdAt: 'Apr 5, 2025'
  },
  { 
    id: '5', 
    simulation: 'Business Strategy Simulation', 
    version: '3.1', 
    effectiveDate: 'Mar 15, 2025',
    isLatest: false,
    createdBy: 'John Doe',
    createdAt: 'Mar 10, 2025'
  },
];

const RateVersions = () => {
  return (
    <div>
      <PageHeader 
        title="Rate Versions"
        description="Manage simulation rate versions"
        action={{ 
          label: "Add Rate Version", 
          onClick: () => console.log("Add rate version clicked") 
        }}
      />
      
      <Card>
        <div className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Simulation</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Effective Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRateVersions.map((version) => (
                <TableRow key={version.id}>
                  <TableCell className="font-medium">{version.simulation}</TableCell>
                  <TableCell>v{version.version}</TableCell>
                  <TableCell>{version.effectiveDate}</TableCell>
                  <TableCell>
                    <Badge variant={version.isLatest ? 'default' : 'secondary'}>
                      {version.isLatest ? 'Latest' : 'Previous'}
                    </Badge>
                  </TableCell>
                  <TableCell>{version.createdBy}</TableCell>
                  <TableCell>{version.createdAt}</TableCell>
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

export default RateVersions;
