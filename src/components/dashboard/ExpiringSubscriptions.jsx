import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export const ExpiringSubscriptions = ({ subscriptions }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expiring Soon</CardTitle>
        <CardDescription>Subscriptions that need renewal</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Institute</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Expires</TableHead>
              <TableHead>Days Left</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions.map((subscription) => (
              <TableRow key={subscription.id}>
                <TableCell className="font-medium">
                  {subscription.institute}
                </TableCell>
                <TableCell>{subscription.plan}</TableCell>
                <TableCell>{subscription.expiresAt}</TableCell>
                <TableCell>
                  <span
                    className={
                      subscription.daysLeft <= 7
                        ? "text-red-500 font-medium"
                        : subscription.daysLeft <= 15
                        ? "text-amber-500 font-medium"
                        : "text-green-600 font-medium"
                    }
                  >
                    {subscription.daysLeft} days
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    Remind
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
