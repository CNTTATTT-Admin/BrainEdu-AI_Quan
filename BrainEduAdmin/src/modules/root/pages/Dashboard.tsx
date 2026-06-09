import { useOutletContext } from "react-router";
import { AdminDashboard } from "../components/AdminDashboard";
import { InstructorDashboard } from "../components/InstructorDashboard";

interface ContextType {
  currentRole: "ADMIN" | "INSTRUCTOR" | undefined;
}

export default function Dashboard() {
  const context = useOutletContext<ContextType>();
  const currentRole = context?.currentRole;
  console.log(currentRole);

  if (!currentRole) {
    return (
      <div className="h-[60vh] w-full flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-blue-600 animate-spin" />
      </div>
    );
  }

  const isAdmin = currentRole === "ADMIN";

  if (isAdmin) {
    return <AdminDashboard />;
  }

  return <InstructorDashboard />;
}