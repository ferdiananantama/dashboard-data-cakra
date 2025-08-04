import { redirect } from "next/navigation";
export default function DashboardView() {
  return redirect("/dashboard/articles");
}
