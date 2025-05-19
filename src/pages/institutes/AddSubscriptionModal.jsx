import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import {
  rateVersionsApi,
  simulationsApi,
  subscriptionsApi,
} from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";

const AddSubscriptionModal = ({
  open,
  onClose,
  instituteId,
  parentSubscriptionId = null,
  subscriptionsData,
}) => {
  const [form, setForm] = useState({
    instituteId: instituteId || "",
    displayId: "",
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 12)),
    numberOfStudents: 0,
    simulations: [],
    autoRenew: false,
    type: "standard",
    parentSubscriptionId: parentSubscriptionId || null,
  });

  const [selectedSimulation, setSelectedSimulation] = useState("");
  const [selectedRateVersion, setSelectedRateVersion] = useState("");

  const queryClient = useQueryClient();

  // Fetch available simulations
  const { data: simulationsResponse, isLoading: isSimulationsLoading } =
    useQuery({
      queryKey: ["simulations"],
      queryFn: simulationsApi.getAll,
    });

  const simulations = simulationsResponse?.success
    ? simulationsResponse.data
    : [];

  // Fetch rate versions for selected simulation
  const { data: rateVersionsResponse, isLoading: isRateVersionsLoading } =
    useQuery({
      queryKey: ["rateVersions", selectedSimulation],
      queryFn: () => rateVersionsApi.getAll(selectedSimulation),
      enabled: !!selectedSimulation,
    });

  const rateVersions = rateVersionsResponse?.success
    ? rateVersionsResponse.data
    : [];

  // Add subscription mutation
  const { mutate, isLoading: isSubmitting } = useMutation({
    mutationFn: () =>
      subscriptionsApi.create({
        ...form,
        startDate: form.startDate.toISOString(),
        endDate: form.endDate.toISOString(),
        numberOfStudents: parseInt(form.numberOfStudents, 10),
      }),
    onSuccess: () => {
      toast({ title: "Subscription added successfully" });
      queryClient.invalidateQueries([
        "subscriptions",
        "institute",
        instituteId,
      ]);
      onClose();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to add subscription",
        description: error.message || "Something went wrong",
      });
    },
  });

  // Reset form when instituteId changes
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      instituteId: instituteId || "",
      parentSubscriptionId: parentSubscriptionId || null,
    }));
  }, [instituteId, parentSubscriptionId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.numberOfStudents) {
      toast({
        variant: "destructive",
        title: "Validation error",
        description: "Please enter the number of students",
      });
      return;
    }

    if (form.simulations.length === 0) {
      toast({
        variant: "destructive",
        title: "Validation error",
        description: "Please add at least one simulation",
      });
      return;
    }

    mutate();
  };

  const addSimulation = () => {
    if (!selectedSimulation || !selectedRateVersion) {
      toast({
        variant: "destructive",
        title: "Validation error",
        description: "Please select both a simulation and rate version",
      });
      return;
    }

    if (
      form.simulations.some((sim) => sim.simulationId === selectedSimulation)
    ) {
      toast({
        variant: "destructive",
        title: "Validation error",
        description: "This simulation is already added",
      });
      return;
    }

    setForm((prev) => ({
      ...prev,
      simulations: [
        ...prev.simulations,
        {
          simulationId: selectedSimulation,
          rateVersionId: selectedRateVersion,
        },
      ],
    }));

    // Clear selections
    setSelectedSimulation("");
    setSelectedRateVersion("");
  };

  const removeSimulation = (index) => {
    setForm((prev) => ({
      ...prev,
      simulations: prev.simulations.filter((_, i) => i !== index),
    }));
  };

  // Find simulation name based on ID
  const getSimulationName = (id) => {
    const simulation = simulations.find(
      (sim) => sim._id === id || sim.id === id
    );
    return simulation ? simulation.name : id;
  };

  // Find rate version info based on ID
  const getRateVersionInfo = (simId, rateId) => {
    if (simId !== selectedSimulation) return rateId;
    const rateVersion = rateVersions.find(
      (rv) => rv._id === rateId || rv.id === rateId
    );
    return rateVersion
      ? `${rateVersion.version} ($${rateVersion.ratePerStudent}/student)`
      : rateId;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Add Subscription</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="displayId">Id</Label>
            <Input
              id="displayId"
              type="text"
              value={form.displayId}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  displayId: e.target.value,
                }))
              }
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(form.startDate, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={form.startDate}
                    onSelect={(date) =>
                      setForm((prev) => ({ ...prev, startDate: date }))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(form.endDate, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={form.endDate}
                    onSelect={(date) =>
                      setForm((prev) => ({ ...prev, endDate: date }))
                    }
                    initialFocus
                    disabled={(date) => date < form.startDate}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div>
            <Label htmlFor="numberOfStudents">Number of Students</Label>
            <Input
              id="numberOfStudents"
              type="number"
              min="1"
              value={form.numberOfStudents}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  numberOfStudents: e.target.value,
                }))
              }
              required
            />
          </div>

          <div>
            <Label>Subscription Type</Label>
            <Select
              value={form.type}
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, type: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="temporary">Temporary</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Parent Subscription</Label>
            <Select
              value={form.parentSubscriptionId}
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, parentSubscriptionId: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {subscriptionsData?.map((subscription) => (
                  <SelectItem
                    key={subscription._id || subscription.id}
                    value={subscription._id || subscription.id}
                  >
                    {subscription.displayId}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="autoRenew"
              checked={form.autoRenew}
              onCheckedChange={(checked) =>
                setForm((prev) => ({ ...prev, autoRenew: checked }))
              }
            />
            <Label htmlFor="autoRenew">Auto-renew subscription</Label>
          </div>

          <div className="border p-4 rounded-md">
            <Label className="mb-2 block">Add Simulations</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
              <Select
                value={selectedSimulation}
                onValueChange={setSelectedSimulation}
                disabled={isSimulationsLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select simulation" />
                </SelectTrigger>
                <SelectContent>
                  {simulations.map((simulation) => (
                    <SelectItem
                      key={simulation._id || simulation.id}
                      value={simulation._id || simulation.id}
                    >
                      {simulation.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedRateVersion}
                onValueChange={setSelectedRateVersion}
                disabled={!selectedSimulation || isRateVersionsLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select rate version" />
                </SelectTrigger>
                <SelectContent>
                  {rateVersions.map((version) => (
                    <SelectItem
                      key={version._id || version.id}
                      value={version._id || version.id}
                    >
                      {version.version} (${version.ratePerStudent})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addSimulation}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Simulation
            </Button>

            {/* List of added simulations */}
            {form.simulations.length > 0 && (
              <div className="mt-4 space-y-2">
                <Label>Selected Simulations:</Label>
                {form.simulations.map((sim, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-muted p-2 rounded-md"
                  >
                    <span>
                      {getSimulationName(sim.simulationId)} -{" "}
                      {getRateVersionInfo(
                        sim.simulationId,
                        selectedRateVersion
                      )}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSimulation(index)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="text-right">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Subscription"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSubscriptionModal;
