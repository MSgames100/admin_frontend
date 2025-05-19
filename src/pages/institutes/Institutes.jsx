import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
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
import { Eye } from "lucide-react";

import AddInstituteModal from "@/pages/institutes/AddInstituteModal";
import EditInstituteModal from "@/pages/institutes/EditInstituteModal";
import ViewInstituteModal from "@/pages/institutes/ViewInstituteModal";
import { institutesApi } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Institutes = () => {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedInstitute, setSelectedInstitute] = useState(null);

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
                  <TableHead>Mode</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {institutes.map((institute) => (
                  <TableRow key={institute._id || institute.id}>
                    <TableCell className="font-medium">
                      {institute.name}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          institute.mode === "temporary" ? "outline" : "default"
                        }
                      >
                        {institute.mode || "—"}
                      </Badge>
                    </TableCell>
                    <TableCell>{institute.contactPersonName || "—"}</TableCell>
                    <TableCell className="max-w-[150px] truncate">
                      {institute.contactPersonEmail || "—"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          institute.status === "active"
                            ? "success"
                            : "secondary"
                        }
                        className={
                          institute.status === "active"
                            ? "bg-green-100 text-green-800"
                            : ""
                        }
                      >
                        {institute.status || "—"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {institute.latestSubscriptionId ? (
                        <Badge variant="secondary">Active</Badge>
                      ) : (
                        <Badge variant="outline">None</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center flex items-center justify-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          navigate(`/institutes/${institute._id}`);
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
