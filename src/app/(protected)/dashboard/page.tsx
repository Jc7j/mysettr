import { PageHeader } from "~/components/ui/PageHeader";
import { Button } from "~/components/ui";

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        actions={<Button variant="outline">...</Button>}
      />
      <div className="flex-1 overflow-y-auto p-6 lg:p-8">
        <p className="text-center text-gray-500 dark:text-gray-400">
          Dashboard content coming soon...
        </p>
      </div>
    </>
  );
}
