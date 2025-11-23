import React from "react";
import { Heading } from "@/components/ui/heading";

interface DashboardHeaderProps {
  title: string;
  children?: React.ReactNode;
}

function getUsername(): string {
  if (typeof window !== "undefined") {
    const email = localStorage.getItem("userEmail") || localStorage.getItem("email") || "User";
    if (email && email.includes("@")) {
      return email.split("@")[0];
    }
    return email || "User";
  }
  return "User";
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, children }) => {
  const [username, setUsername] = React.useState<string>("User");

  React.useEffect(() => {
    setUsername(getUsername());
  }, []);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 pt-6 pb-4">
      <div className="flex items-center gap-4 min-w-0">
        <Heading as="h1" variant="h3" className="font-bold truncate">{title}</Heading>
        <span className="hidden sm:inline-block text-base text-muted-foreground font-medium truncate max-w-xs">{username}</span>
      </div>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
};