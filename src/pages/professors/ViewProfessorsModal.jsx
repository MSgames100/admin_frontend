import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { institutesApi } from "@/services/api";

const ViewProfessorsModal = ({ open = true, onClose, professor }) => {
  const [form, setForm] = useState({
    name: professor?.name || "",
    email: professor?.email || "",
    designation: professor?.designation || "",
    department: professor?.department || "",
    instituteId: professor?.instituteId || "",
    isActive: professor?.isActive ?? true,
  });
  const [institutes, setInstitutes] = useState([]);

  useEffect(() => {
    setForm({
      name: professor?.name || "",
      email: professor?.email || "",
      designation: professor?.designation || "",
      department: professor?.department || "",
      instituteId: professor?.instituteId || "",
      isActive: professor?.isActive ?? true,
    });
  }, [professor]);

  useEffect(() => {
    const fetchInstitutes = async () => {
      const response = await institutesApi.getAll();
      setInstitutes(Array.isArray(response.data) ? response.data : []);
    };
    fetchInstitutes();
  }, []);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Professor Details</DialogTitle>
        </DialogHeader>
        <form className="space-y-4 mt-4">
          <div>
            <Label>Name</Label>
            <Input name="name" value={form.name} disabled />
          </div>
          <div>
            <Label>Email</Label>
            <Input name="email" type="email" value={form.email} disabled />
          </div>
          <div>
            <Label>Designation</Label>
            <Input name="designation" value={form.designation} disabled />
          </div>
          <div>
            <Label>Department</Label>
            <Input name="department" value={form.department} disabled />
          </div>
          <div>
            <Label>Institute</Label>
            <Select value={form.instituteId} disabled>
              <SelectTrigger>
                <SelectValue placeholder="Select institute" />
              </SelectTrigger>
              <SelectContent>
                {institutes.map((inst) => (
                  <SelectItem
                    key={inst.id || inst._id}
                    value={inst.id || inst._id}
                  >
                    {inst.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              disabled
              id="isActive"
            />
            <Label htmlFor="isActive">
              {form.isActive
                ? "Active (Professor can login)"
                : "Inactive (Professor cannot login)"}
            </Label>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ViewProfessorsModal;
