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
import AddInstituteModal from "@/pages/institutes/AddInstituteModal";
import ViewInstituteModal from "@/pages/institutes/ViewInstituteModal"; // new modal
import EditInstituteModal from "@/pages/institutes/EditInstituteModal"; // new modal

const Institutes = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false); // For view
  const [showEditModal, setShowEditModal] = useState(false); // For edit
  const [selectedInstitute, setSelectedInstitute] = useState(null); // For selected institute

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
    setSelectedInstitute(institute);
    setShowViewModal(true);
  };

  const handleEditInstitute = (institute) => {
    setSelectedInstitute(institute);
    setShowEditModal(true);
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

      <AddInstituteModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
      />

      {/* View Modal */}
      {selectedInstitute && (
        <ViewInstituteModal
          open={showViewModal}
          onClose={() => setShowViewModal(false)}
          institute={selectedInstitute}
        />
      )}

      {/* Edit Modal */}
      {selectedInstitute && (
        <EditInstituteModal
          open={showEditModal}
          onClose={() => setShowEditModal(false)}
          institute={selectedInstitute}
        />
      )}
    </div>
  );
};

export default Institutes;
