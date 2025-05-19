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
import { institutesApi } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const EditInstituteModal = ({ open, onClose, institute }) => {
  const [form, setForm] = useState({
    name: institute?.name || "",
    mode: institute?.mode || "librarian",
    contactPersonEmail: institute?.contactPersonEmail || "",
    contactPersonName: institute?.contactPersonName || "",
    status: institute?.status || "active",
  });

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: () => institutesApi.update(institute._id || institute.id, form),
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
        name: institute.name || "",
        mode: institute.mode || "librarian",
        contactPersonEmail: institute.contactPersonEmail || "",
        contactPersonName: institute.contactPersonName || "",
        status: institute.status || "active",
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
            <Select
              value={form.mode}
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, mode: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="librarian">Librarian</SelectItem>
                <SelectItem value="temporary">Temporary</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Contact Person</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <Input
                name="contactPersonName"
                placeholder="Name"
                value={form.contactPersonName}
                onChange={handleChange}
                required
              />
              <Input
                name="contactPersonEmail"
                type="email"
                placeholder="Email"
                value={form.contactPersonEmail}
                onChange={handleChange}
                required={form.mode === "librarian"}
              />
            </div>
          </div>

          <div>
            <Label>Status</Label>
            <Select
              value={form.status}
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
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
