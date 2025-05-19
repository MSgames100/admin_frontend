import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { simulationsApi } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { Eye } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddSimulationModal from "./AddSimulationModal";

const Simulations = () => {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["simulations"],
    queryFn: () => simulationsApi.getAll(),
  });

  const simulations = response?.success ? response.data : [];

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <PageHeader
        title="Simulations"
        description="Manage all game simulations"
        action={{
          label: "Add Simulation",
          onClick: () => {
            setShowAddModal(!showAddModal);
          },
        }}
      />
      <AddSimulationModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
      />

      <Card>
        <div className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Game ID</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {simulations.map((simulation) => (
                <TableRow key={simulation._id}>
                  <TableCell className="font-medium">
                    {simulation.name}
                  </TableCell>
                  <TableCell>{simulation.gameId}</TableCell>
                  <TableCell>{simulation.domain}</TableCell>
                  <TableCell>{simulation.description}</TableCell>
                  <TableCell>
                    {new Date(simulation.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-center flex items-center justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        navigate(`/simulations/${simulation._id}`);
                      }}
                      className="flex items-center gap-1"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
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
