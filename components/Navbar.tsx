"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { FcTimeline } from "react-icons/fc";
import ThemeSwitcher from "./ThemeSwitch";
import { useTheme } from "next-themes";
import { BiLogOutCircle } from "react-icons/bi";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar(data: any) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const supebase = createClientComponentClient();
  const handleLogout = async () => {
    await supebase.auth.signOut();
    router.refresh();
  };
  useEffect(() => {
    setMounted(true);
  }, []);
  const path = usePathname();
  const isAuthPage = path === "/auth";
  return (
    <div className="flex items-center justify-between p-5">
      <h1 className="font-bold flex items-center text-lg">
        <FcTimeline className="h-6 w-6" />
        Time Logs
      </h1>
      <ThemeSwitcher />
      {!isAuthPage && (
        <div className="lg:flex gap-2 items-center ml-auto mr-4 hidden">
          <Avatar className="w-8 h-8">
            <AvatarImage
              src={data?.data?.user_metadata?.avatar_url}
              alt="@shadcn"
            />
            <AvatarFallback>TL</AvatarFallback>
          </Avatar>
          <p className="text-sm font-mono">{data?.data?.email}</p>
        </div>
      )}
      {!isAuthPage && (
        <Button
          size={"sm"}
          onClick={handleLogout}
        >
          {theme === "dark" && mounted && (
            <BiLogOutCircle className=" w-4 h-4 mr-2 text-black" />
          )}
          {theme !== "dark" && mounted && (
            <BiLogOutCircle className=" w-4 h-4 mr-2 text-white" />
          )}
          Logout
        </Button>
      )}
    </div>
  );
}
