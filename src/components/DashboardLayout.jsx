
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarNavigation } from './SidebarNavigation';
import { Toaster } from '@/components/ui/toaster';

export const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-background">
      <SidebarNavigation />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto py-6">
          <Outlet />
        </div>
      </main>
      <Toaster />
    </div>
  );
};
