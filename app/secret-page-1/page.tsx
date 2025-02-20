import { createClient } from "@/server/supabase/server";

export default async function SecretPage1() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <h1>Welcome to Secret Page One</h1>
      <h2>Hello, {user?.user_metadata.username}!</h2>
    </div>
  );
}
