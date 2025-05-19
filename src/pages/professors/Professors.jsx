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
import { professorsApi, institutesApi } from "@/services/api";
import AddProfessorsModal from "./AddProfessorsModal";
import EditProfessorsModal from "./EditProfessorsModal";
import ViewProfessorsModal from "./ViewProfessorsModal";

const Professors = () => {
  const [professors, setProfessors] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState(null);

  const fetchProfessors = async () => {
    const response = await professorsApi.getAll();
    setProfessors(Array.isArray(response.data) ? response.data : []);
    setLoading(false);
  };

  const fetchInstitutes = async () => {
    const response = await institutesApi.getAll();
    setInstitutes(Array.isArray(response.data) ? response.data : []);
  };

  useEffect(() => {
    fetchProfessors();
    fetchInstitutes();
  }, []);

  const handleAddProfessorClose = (refresh = false) => {
    setShowAddModal(false);
    if (refresh) fetchProfessors();
  };

  const handleEditProfessor = (professor) => {
    setSelectedProfessor(professor);
    setShowEditModal(true);
  };

  const handleViewProfessor = (professor) => {
    setSelectedProfessor(professor);
    setShowViewModal(true);
  };

  const getInstituteName = (instituteId) => {
    const inst = institutes.find(
      (i) => i.id === instituteId || i._id === instituteId
    );
    return inst ? inst.name : instituteId || "-";
  };

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
                <TableHead>Institute</TableHead>
                <TableHead>Active</TableHead>
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
                    <TableCell>
                      {getInstituteName(professor.instituteId)}
                    </TableCell>
                    <TableCell>{professor.isActive ? "Yes" : "No"}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewProfessor(professor)}
                      >
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditProfessor(professor)}
                      >
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
      {showAddModal && <AddProfessorsModal onClose={handleAddProfessorClose} />}
      {showEditModal && (
        <EditProfessorsModal
          open={showEditModal}
          onClose={(refresh) => {
            setShowEditModal(false);
            setSelectedProfessor(null);
            if (refresh) fetchProfessors();
          }}
          professor={selectedProfessor}
        />
      )}
      {showViewModal && (
        <ViewProfessorsModal
          open={showViewModal}
          onClose={() => {
            setShowViewModal(false);
            setSelectedProfessor(null);
          }}
          professor={selectedProfessor}
        />
      )}
    </div>
  );
};

export default Professors;
