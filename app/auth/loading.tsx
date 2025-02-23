import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <main className="py-4 px-12 w-full relative">
      <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-50">
        <Spinner size="lg" />
      </div>
    </main>
  );
}
