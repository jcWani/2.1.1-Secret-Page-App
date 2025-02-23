import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <main className="flex-1 flex items-center justify-center bg-white min-h-[90vh]">
      <Spinner size="lg" />
    </main>
  );
}
