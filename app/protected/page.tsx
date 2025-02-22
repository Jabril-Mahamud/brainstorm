// app/protected/page.tsx
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import SettingsContent from "./SettingsContent";

export default async function ProtectedPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
 
  if (!user) {
    redirect("/sign-in");
  }

  return <SettingsContent user={user} />;
}