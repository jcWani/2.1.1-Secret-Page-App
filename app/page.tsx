import { redirect } from "next/navigation";
import { getCurrentUser } from "@/server/actions/get-current-user";

export default async function Home() {
  const user = await getCurrentUser();

  // Redirect authenticated users to secret-page-1
  if (user) redirect("/protected/secret-page-1");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>
      <p>Please log in to continue.</p>
    </div>
  );
}
