import React, { useEffect, useState } from "react";
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
import { professorsApi } from "@/services/api";
import AddProfessorsModal from "./professors/AddProfessorsModal";

const Professors = () => {
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const fetchProfessors = async () => {
      // You may want to pass instituteId if required
      const data = await professorsApi.getAll();
      setProfessors(Array.isArray(data) ? data : []);
      setLoading(false);
    };
    fetchProfessors();
  }, []);

  return (
    <div>
      <PageHeader
        title="Professors"
        description="Manage professor accounts and access"
        action={{
          label: "Add Professor",
          onClick: () => setShowAddModal(true),
        }}
      />
      <Card>
        <div className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Institute ID</TableHead>
                <TableHead>Active</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={9}>Loading...</TableCell>
                </TableRow>
              ) : professors.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9}>No professors found.</TableCell>
                </TableRow>
              ) : (
                professors.map((professor) => (
                  <TableRow key={professor.id || professor._id}>
                    <TableCell className="font-medium">
                      {professor.name}
                    </TableCell>
                    <TableCell>{professor.email}</TableCell>
                    <TableCell>{professor.designation || "-"}</TableCell>
                    <TableCell>{professor.department || "-"}</TableCell>
                    <TableCell>{professor.instituteId}</TableCell>
                    <TableCell>{professor.isActive ? "Yes" : "No"}</TableCell>
                    <TableCell>
                      {professor.createdAt
                        ? new Date(professor.createdAt).toLocaleString()
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {professor.updatedAt
                        ? new Date(professor.updatedAt).toLocaleString()
                        : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
      {showAddModal && (
        <AddProfessorsModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
};

export default Professors;
