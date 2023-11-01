import React from "react";
import Calendar from "@/components/Calendar";
import Logs from "@/components/Logs";
import Navbar from "@/components/Navbar";
import NewLog from "@/components/NewLog";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import InitLog from "@/components/state/initLog";
import { ILog } from "@/store";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

	const { data } = await supabase.auth.getSession();

	if (!data.session) {
		return redirect("/auth");
	}

 const {data: logs} = await supabase.from("logs").select("*").order("date", {ascending: true})

  return (
    <div className="flex flex-col gap-4">
      <InitLog logs={logs as ILog[]} />
      <Navbar data={data.session.user} />
      <NewLog />
      <Calendar />
      <Logs />
    </div>
  );
}
