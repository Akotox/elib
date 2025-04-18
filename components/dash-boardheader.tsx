import React from "react";
import { Button } from "@/components/ui/button";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function  DashboardHeader() {
  const { userId, redirectToSignIn } = await auth();

  if (userId == null) return redirectToSignIn();

  const user = await currentUser();

  if (user == null) return redirectToSignIn();

  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Hello, {user.fullName!.toUpperCase()}!</h1>
        <p className="text-sm text-muted-foreground">
          Here is a snapshot of your e-books. Browse, manage, or add new titles
          to your collection effortlessly.
        </p>
      </div>
      <Button className="px-3">Add E-book</Button>
    </div>
  );
}

DashboardHeader;
