import { PageHeader } from "~/components/ui/PageHeader";
import { Button } from "~/components/ui";
import { Plus, MessageSquareDashed } from "lucide-react"; // Using Lucide icons

export default function AssistantsPage() {
  return (
    <>
      <PageHeader
        title="Assistants"
        description="Manage your AI assistants and their configurations."
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Assistant
          </Button>
        }
      />
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-gray-300 p-8 py-16 dark:border-gray-700">
        <div className="text-center">
          <MessageSquareDashed
            className="mx-auto size-12 text-gray-400 dark:text-gray-500"
            strokeWidth={1.5}
          />
          <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
            No assistants yet
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Get started by creating a new assistant.
          </p>
          <div className="mt-6">
            <Button>
              <Plus aria-hidden="true" className="mr-1.5 -ml-0.5 size-5" />
              New Assistant
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
