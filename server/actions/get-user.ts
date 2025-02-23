import { createClient } from "../supabase/server";

export default async function getUser(id: string) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.admin.getUserById(id);

    if (!user || error) throw new Error(`User with ID ${id} not found`);

    return user;
  } catch (err) {
    console.error("Error getting user: ", err);
    return null;
  }
}
