import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { rateVersionsApi, simulationsApi } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Edit,
  Hash,
  Monitor,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddRateVersionModal from "./AddRateVersionModal";

const SimulationDetails = () => {
  const { id } = useParams();
  const [showAddRateVersionModal, setShowAddRateVersionModal] = useState(false);
  const handleAddRateVersion = () => {
    setShowAddRateVersionModal(true);
  };
  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["simulation", id],
    queryFn: () => simulationsApi.getOne(id),
  });

  const {
    data: rateVersionsResponse,
    isLoading: isRateVersionsLoading,
    isError: isRateVersionsError,
    error: rateVersionsError,
  } = useQuery({
    queryKey: ["rateVersions", id],
    queryFn: () => rateVersionsApi.getAll(id),
    enabled: !!id,
  });
  const rateVersions = rateVersionsResponse?.success
    ? rateVersionsResponse.data
    : [];
  console.log("Rate Versions", rateVersions);

  const simulation = response?.success ? response.data : null;

  if (isLoading)
    return (
      <div className="p-8 flex justify-center">
        Loading simulation details...
      </div>
    );

  if (isError || response?.success === false) {
    return (
      <div className="p-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-red-500">
              {response?.message ||
                error?.message ||
                "Failed to load simulation."}
            </div>
            <Button variant="outline" className="mt-4" asChild>
              <Link to="/simulations">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Simulations
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Format date to be more readable
  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header with back button */}
      <PageHeader
        title={simulation?.name}
        action={{
          label: "Edit Simulation",
          icon: <Edit className="mr-2 h-4 w-4" />,
          onClick: () => {},
        }}
      />

      {/* Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Simulation Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Game ID</p>
                <div className="flex items-center mt-1">
                  <Hash className="h-4 w-4 text-muted-foreground mr-2" />
                  <p className="font-medium">{simulation?.gameId}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Domain</p>
                <div className="flex items-center mt-1">
                  <Monitor className="h-4 w-4 text-muted-foreground mr-2" />
                  <Badge variant="outline">{simulation?.domain || "—"}</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Created At</p>
                <div className="flex items-center mt-1">
                  <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                  <p className="font-medium">
                    {formatDate(simulation?.createdAt)}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Simulation ID</p>
                <div className="flex items-center mt-1">
                  <Hash className="h-4 w-4 text-muted-foreground mr-2" />
                  <p className="font-mono text-sm">{simulation?._id}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Description Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{simulation?.description || "No description available."}</p>
        </CardContent>
      </Card>

      {/* Rate Versions Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold">Rate Versions</CardTitle>
          <Button size="sm" onClick={handleAddRateVersion}>
            <Plus className="h-4 w-4 mr-1" /> Add Rate Version
          </Button>
        </CardHeader>
        <AddRateVersionModal
          open={showAddRateVersionModal}
          onClose={() => setShowAddRateVersionModal(false)}
          simulationId={id}
        />
        <CardContent>
          {isRateVersionsLoading ? (
            <div className="text-center py-4">Loading rate versions...</div>
          ) : isRateVersionsError || rateVersionsResponse?.success === false ? (
            <div className="text-red-500">
              {rateVersionsResponse?.message ||
                rateVersionsError?.message ||
                "Failed to load rate versions."}
            </div>
          ) : rateVersions.length === 0 ? (
            <div className="text-center text-muted-foreground py-6">
              No rate versions found for this simulation.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="text-center">
                  <TableHead>Version</TableHead>
                  <TableHead>Rate Per Student</TableHead>
                  <TableHead>Effective From</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rateVersions.map((version) => (
                  <TableRow key={version._id}>
                    <TableCell className="font-medium">
                      {version.version || "—"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <DollarSign className="h-3 w-3 text-muted-foreground mr-1" />
                        {version.ratePerStudent || 0}
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(version.effectiveFrom)}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {version.notes || "—"}
                    </TableCell>
                    <TableCell>{formatDate(version.createdAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SimulationDetails;
