import AppLayout from "@/components/ui/app-layout";
import { getCurrentUser } from "@/server/actions/get-current-user";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <AppLayout>
      <div>
        <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>
        <p>Hello, {user?.user_metadata.username}!</p>
      </div>
    </AppLayout>
  );
}
