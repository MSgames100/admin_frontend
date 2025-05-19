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
import { institutesApi, subscriptionsApi } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  Building,
  Calendar,
  Clock,
  Edit,
  Mail,
  Tag,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddSubscriptionModal from "./AddSubscriptionModal";

const InstituteDetails = () => {
  const [showAddSubscriptionModal, setShowAddSubscriptionModal] =
    useState(false);
  const { id } = useParams();
  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["institutes", id],
    queryFn: () => institutesApi.getOne(id),
  });

  const institute = response?.success ? response.data : null;

  const {
    data: subscriptionResponse,
    isLoading: isSubscriptionLoading,
    isError: isSubscriptionError,
    error: subscriptionError,
  } = useQuery({
    queryKey: ["subscriptions", "institute", id],
    queryFn: () => subscriptionsApi.getSubscriptionByInstitute(id),
    enabled: !!institute,
  });
  const subscription = subscriptionResponse?.success
    ? subscriptionResponse.data
    : null;

  if (isLoading) {
    return (
      <div className="p-8 flex justify-center">
        Loading institute details...
      </div>
    );
  }

  if (isError || response?.success === false) {
    return (
      <div className="p-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-red-500">
              {response?.message ||
                error?.message ||
                "Failed to load institute."}
            </div>
            <Button variant="outline" className="mt-4" asChild>
              <Link to="/institutes">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Institutes
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
        title={institute?.name}
        description={`Details for ${institute?.mode} institute`}
        action={{
          label: "Edit Institute",
          icon: <Edit className="mr-2 h-4 w-4" />,
          onClick: () => {},
        }}
        backButton={{
          label: "Back to Institutes",
          icon: <ArrowLeft className="mr-2 h-4 w-4" />,
          href: "/institutes",
        }}
      />

      {/* Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Institute Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Institute Name</p>
                <div className="flex items-center mt-1">
                  <Building className="h-4 w-4 text-muted-foreground mr-2" />
                  <p className="font-medium">{institute.name}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Mode</p>
                <div className="flex items-center mt-1">
                  <Tag className="h-4 w-4 text-muted-foreground mr-2" />
                  <Badge
                    variant={
                      institute.mode === "temporary" ? "outline" : "default"
                    }
                  >
                    {institute.mode || "—"}
                  </Badge>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <div className="flex items-center mt-1">
                  <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                  <Badge
                    variant={
                      institute.status === "active" ? "success" : "secondary"
                    }
                    className={
                      institute.status === "active"
                        ? "bg-green-100 text-green-800"
                        : ""
                    }
                  >
                    {institute.status || "—"}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Contact Person</p>
                <div className="flex items-center mt-1">
                  <User className="h-4 w-4 text-muted-foreground mr-2" />
                  <p className="font-medium">
                    {institute.contactPersonName || "—"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Contact Email</p>
                <div className="flex items-center mt-1">
                  <Mail className="h-4 w-4 text-muted-foreground mr-2" />
                  <p className="font-medium">
                    {institute.contactPersonEmail || "—"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Created At</p>
                <div className="flex items-center mt-1">
                  <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                  <p className="font-medium">
                    {formatDate(institute.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <AddSubscriptionModal
        open={showAddSubscriptionModal}
        onClose={setShowAddSubscriptionModal}
        instituteId={institute._id}
        subscriptionsData={subscription}
      />

      {/* Subscription Information */}
      <Card>
        <div>
          <div className="flex items-center justify-between p-4">
            <h2 className="text-lg font-semibold">Subscription Information</h2>
            <Button
              size="sm"
              onClick={() => {
                setShowAddSubscriptionModal(true);
              }}
            >
              Add Subscription
            </Button>
          </div>
        </div>

        <CardContent>
          <div className="p-6 text-center">
            {subscription?.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">Subscription ID</TableHead>
                    <TableHead className="text-center">Type</TableHead>
                    <TableHead className="text-center">Period</TableHead>
                    <TableHead className="text-center">Students</TableHead>
                    <TableHead className="text-center">Simulations</TableHead>
                    <TableHead className="text-center">Auto-Renew</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscription.map((subs) => (
                    <TableRow key={subs._id}>
                      <TableCell className="font-medium">
                        {subs.displayId
                          ? `#${subs.displayId}`
                          : subs._id.substring(0, 8)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            subs.type === "standard" ? "default" : "outline"
                          }
                        >
                          {subs.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">
                            From: {formatDate(subs.startDate).split(",")[0]}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            To: {formatDate(subs.endDate).split(",")[0]}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{subs.numberOfStudents}</TableCell>
                      <TableCell>
                        {subs.simulations && subs.simulations.length > 0 ? (
                          <div className="flex flex-col gap-1">
                            {subs.simulations.map((sim, idx) => (
                              <div
                                key={idx}
                                className="text-xs flex items-center"
                              >
                                <Badge variant="outline" className="mr-1">
                                  {sim.version || "v?"}
                                </Badge>
                                <span className="text-muted-foreground">
                                  ${sim.ratePerStudent}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          "—"
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={subs.autoRenew ? "success" : "outline"}
                          className={
                            subs.autoRenew ? "bg-green-100 text-green-800" : ""
                          }
                        >
                          {subs.autoRenew ? "Yes" : "No"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="space-y-4">
                <Badge variant="outline" className="px-3 py-1 text-base">
                  No Subscription
                </Badge>
                <p className="text-muted-foreground">
                  This institute currently does not have an active subscription.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstituteDetails;
