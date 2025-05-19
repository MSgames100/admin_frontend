import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { institutesApi } from "@/services/api";
import { useNavigate } from "react-router-dom";

const Institutes = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const navigate = useNavigate();

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["institutes"],
    queryFn: institutesApi.getAll,
  });

  const institutes = response?.success ? response.data : [];

  const handleViewInstitute = (institute) => {
    navigate(`/institutes/${institute.id || institute._id}`);
  };

  const handleEditInstitute = (institute) => {
    navigate(`/institutes/${institute.id || institute._id}`);
  };

  return (
    <div>
      <PageHeader
        title="Institutes"
        description="Manage all registered educational institutions"
        action={{
          label: "Add Institute",
          onClick: () => setShowAddModal(true),
        }}
      />
      <Card>
        <div className="p-6">
          {isLoading ? (
            <p>Loading institutes...</p>
          ) : isError || response?.success === false ? (
            <p className="text-red-500">
              {response?.message ||
                error?.message ||
                "Failed to load institutes."}
            </p>
          ) : institutes.length === 0 ? (
            <div className="text-center text-muted-foreground py-10">
              <p>No institutes found.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Professors</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {institutes.map((institute) => (
                  <TableRow key={institute.id}>
                    <TableCell className="font-medium">
                      {institute.name}
                    </TableCell>
                    <TableCell>{institute.location || "—"}</TableCell>
                    <TableCell>{institute.professors || 0}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewInstitute(institute)}
                      >
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditInstitute(institute)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Institutes;
