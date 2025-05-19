import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "./components/DashboardLayout";
import PrivateRoute from "./components/PrivateRoute";
import PublicOnlyRoute from "./components/PublicOnlyRoute";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import InstituteDetails from "./pages/institutes/InstituteDetails";
import Institutes from "./pages/institutes/Institutes";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Professors from "./pages/professors/Professors";
import RateVersions from "./pages/RateVersions";
import Register from "./pages/Register";
import SimulationDetails from "./pages/simulations/SimulationDetails";
import Simulations from "./pages/simulations/Simulations";
import Subscriptions from "./pages/Subscriptions";
import Users from "./pages/Users";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicOnlyRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            {/* Protected Routes */}
            <Route path="/" element={<PrivateRoute />}>
              <Route element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="subscriptions" element={<Subscriptions />} />
                <Route path="institutes" element={<Institutes />} />
                <Route path="institutes/:id" element={<InstituteDetails />} />
                <Route path="simulations" element={<Simulations />} />
                <Route path="simulations/:id" element={<SimulationDetails />} />
                <Route path="users" element={<Users />} />
                <Route path="professors" element={<Professors />} />
                <Route path="rate-versions" element={<RateVersions />} />
              </Route>
            </Route>

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
