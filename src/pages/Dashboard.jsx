
import React from 'react';
import { Users, School, Receipt, Gamepad2 } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { ExpiringSubscriptions } from '@/components/dashboard/ExpiringSubscriptions';

// Mock data for demonstration
const mockActivities = [
  { id: '1', user: 'Admin User', action: 'created a new simulation', target: 'Supply Chain Strategy', timestamp: '10 minutes ago' },
  { id: '2', user: 'John Doe', action: 'added a new institute', target: 'MIT', timestamp: '2 hours ago' },
  { id: '3', user: 'Jane Smith', action: 'renewed a subscription for', target: 'Stanford University', timestamp: '3 hours ago' },
  { id: '4', user: 'Admin User', action: 'updated rate version for', target: 'Business Strategy Simulation', timestamp: '5 hours ago' },
  { id: '5', user: 'Robert Johnson', action: 'added 25 students to', target: 'Harvard Business School', timestamp: '1 day ago' },
  { id: '6', user: 'Sarah Wilson', action: 'modified permissions for', target: 'Professor Adams', timestamp: '1 day ago' },
  { id: '7', user: 'Admin User', action: 'generated invoice for', target: 'Columbia University', timestamp: '2 days ago' },
];

const mockExpiringSubscriptions = [
  { id: '1', institute: 'Harvard Business School', plan: 'Enterprise', expiresAt: 'May 15, 2025', daysLeft: 5 },
  { id: '2', institute: 'Stanford University', plan: 'Professional', expiresAt: 'May 20, 2025', daysLeft: 10 },
  { id: '3', institute: 'MIT', plan: 'Enterprise Plus', expiresAt: 'May 25, 2025', daysLeft: 15 },
  { id: '4', institute: 'Columbia University', plan: 'Standard', expiresAt: 'June 2, 2025', daysLeft: 23 },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome to the MSGames Admin Dashboard.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Active Subscriptions" 
          value="24"
          icon={<Receipt className="h-5 w-5" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard 
          title="Total Institutes" 
          value="18"
          icon={<School className="h-5 w-5" />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard 
          title="Active Users" 
          value="3,841"
          icon={<Users className="h-5 w-5" />}
          trend={{ value: 4, isPositive: true }}
        />
        <StatCard 
          title="Total Simulations" 
          value="32"
          icon={<Gamepad2 className="h-5 w-5" />}
          trend={{ value: 0, isPositive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpiringSubscriptions subscriptions={mockExpiringSubscriptions} />
        <RecentActivity activities={mockActivities} />
      </div>
    </div>
  );
};

export default Dashboard;
