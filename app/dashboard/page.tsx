import { DashboardSidebar } from "../../components/dashboard-ui";
import { DashboardInteractiveView } from "../../components/dashboard-interactive-view";
import { getDashboardData } from "../../lib/dashboard-data";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const data = await getDashboardData();
  return (
    <main className="dashboard-shell">
      <DashboardSidebar />
      <div className="dashboard-main-wrapper">
        <div className="dashboard-main">
          <DashboardInteractiveView initialData={data} />
          <footer className="dashboard-footer">
            <span>Dernière synchronisation : {data.lastSyncedAt}</span>
            <span>JobFlow v1.0 <i>·</i> Tous les systèmes opérationnels</span>
          </footer>
        </div>
      </div>
    </main>
  );
}
