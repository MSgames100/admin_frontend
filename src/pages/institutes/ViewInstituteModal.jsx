import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ViewInstituteModal = ({ open, onClose, institute }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>View Institute</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div>
            <Label>Name</Label>
            <Input value={institute.name} disabled />
          </div>
          <div>
            <Label>Mode</Label>
            <Input value={institute.mode} disabled />
          </div>
          <div>
            <Label>Contact Person Name</Label>
            <Input value={institute.contactPersonName} disabled />
          </div>
          <div>
            <Label>Contact Person Email</Label>
            <Input value={institute.contactPersonEmail} disabled />
          </div>
          <div>
            <Label>Status</Label>
            <Input value={institute.status} disabled />
          </div>
          <div>
            <Label>Created At</Label>
            <Input value={institute.createdAt} disabled />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewInstituteModal;
