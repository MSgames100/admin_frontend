import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { institutesApi } from "@/services/api";
import { toast } from "@/hooks/use-toast";

const EditInstituteModal = ({ open, onClose, institute }) => {
  const [form, setForm] = useState({
    name: institute?.name || "",
    mode: institute?.mode || "librarian", // Default to librarian if not provided
    contactPersonEmail: institute?.contactPersonEmail || "",
    contactPersonName: institute?.contactPersonName || "",
    // Handle other fields like subscription, etc.
  });

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: () => institutesApi.update(institute.id, form),
    onSuccess: () => {
      toast({ title: "Institute updated successfully" });
      queryClient.invalidateQueries(["institutes"]);
      onClose();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to update institute",
        description: error.message || "Something went wrong",
      });
    },
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  useEffect(() => {
    if (institute) {
      setForm({
        name: institute.name,
        mode: institute.mode,
        contactPersonEmail: institute.contactPersonEmail,
        contactPersonName: institute.contactPersonName,
      });
    }
  }, [institute]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Institute</DialogTitle>
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
            <Label>Mode</Label>
            <Input
              name="mode"
              value={form.mode}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>Contact Person Name</Label>
            <Input
              name="contactPersonName"
              value={form.contactPersonName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>Contact Person Email</Label>
            <Input
              name="contactPersonEmail"
              type="email"
              value={form.contactPersonEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="text-right">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Institute"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditInstituteModal;
