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
import { toast } from "@/hooks/use-toast";
import { professorsApi, institutesApi } from "@/services/api";

const AddProfessorsModal = ({ open = true, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    designation: "",
    department: "",
    instituteId: "",
    isActive: true,
    status: "active",
  });
  const [loading, setLoading] = useState(false);
  const [institutes, setInstitutes] = useState([]);

  useEffect(() => {
    const fetchInstitutes = async () => {
      const response = await institutesApi.getAll();
      console.log("Fetched institutes:", response);

      setInstitutes(Array.isArray(response.data) ? response.data : []);
    };
    fetchInstitutes();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectInstitute = (value) => {
    setForm((prev) => ({ ...prev, instituteId: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await professorsApi.create(form);
      toast({ title: "Professor added successfully" });
      setLoading(false);
      if (onClose) onClose(true); // Pass true to trigger refetch
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to add professor",
        description: error?.message || "Something went wrong",
      });
      setLoading(false);
    }
  };
  console.log(institutes);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Professor</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label>Name</Label>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>Designation</Label>
            <Input
              name="designation"
              value={form.designation}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Department</Label>
            <Input
              name="department"
              value={form.department}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Institute</Label>
            <Select
              value={form.instituteId}
              onValueChange={handleSelectInstitute}
            >
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
              onChange={handleChange}
              id="isActive"
            />
            <Label htmlFor="isActive">
              {form.isActive
                ? "Active (Professor can login)"
                : "Inactive (Professor cannot login)"}
            </Label>
          </div>
          <div className="text-right">
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Professor"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProfessorsModal;
