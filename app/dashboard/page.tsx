import { DashboardSidebar } from "../../components/dashboard-ui";
import { DashboardInteractiveView } from "../../components/dashboard-interactive-view";
import { getDashboardData } from "../../lib/dashboard-data";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const data = await getDashboardData();
  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc", padding: "20px 0 60px" }}>
      <DashboardInteractiveView initialData={data} />
    </main>
  );
}
