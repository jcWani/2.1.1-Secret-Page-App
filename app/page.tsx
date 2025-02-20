import AppLayout from "@/components/ui/app-layout";
import { createClient } from "@/server/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <AppLayout>
      <div>
        <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>
        <p>Hello, {user?.user_metadata.username}!</p>
      </div>
    </AppLayout>
  );
}
