import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import React from "react";
import AuthComponent from "./components/AuthComponent";
import { cookies } from "next/headers";

export default async function page() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log(session);

  if (session) {
    return redirect("/");
  }

  return (
    <div>
      <AuthComponent />
    </div>
  );
}
