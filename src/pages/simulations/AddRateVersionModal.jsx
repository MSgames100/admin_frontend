import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { rateVersionsApi } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const AddRateVersionModal = ({ open, onClose, simulationId }) => {
  // Initialize form with the simulationId passed as prop
  const [form, setForm] = useState({
    simulationId: simulationId || "",
    version: "",
    ratePerStudent: "",
    effectiveFrom: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: () => {
      // Convert ratePerStudent to number for API
      const payload = {
        ...form,
        ratePerStudent: Number(form.ratePerStudent),
        // Make sure effectiveFrom is in proper ISO format
        effectiveFrom: new Date(form.effectiveFrom).toISOString(),
      };
      return rateVersionsApi.create(payload);
    },
    onSuccess: () => {
      toast({ title: "Rate version added successfully" });
      queryClient.invalidateQueries(["rateVersions", simulationId]);
      setForm({
        simulationId: simulationId || "",
        version: "",
        ratePerStudent: "",
        effectiveFrom: new Date().toISOString().split("T")[0],
        notes: "",
      });
      onClose();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to add rate version",
        description: error.message || "Something went wrong",
      });
    },
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.version || !form.ratePerStudent) {
      toast({
        variant: "destructive",
        title: "Validation error",
        description: "Version and Rate Per Student are required",
      });
      return;
    }
    mutate();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Rate Version</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="version">Version</Label>
            <Input
              id="version"
              name="version"
              value={form.version}
              onChange={handleChange}
              placeholder="e.g., v1.0"
              required
            />
          </div>

          <div>
            <Label htmlFor="ratePerStudent">Rate Per Student ($)</Label>
            <Input
              id="ratePerStudent"
              name="ratePerStudent"
              type="number"
              min="0"
              step="0.01"
              value={form.ratePerStudent}
              onChange={handleChange}
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <Label htmlFor="effectiveFrom">Effective From</Label>
            <Input
              id="effectiveFrom"
              name="effectiveFrom"
              type="date"
              value={form.effectiveFrom}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Add any additional details about this rate version"
              rows={3}
            />
          </div>

          <div className="text-right">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Rate Version"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRateVersionModal;
