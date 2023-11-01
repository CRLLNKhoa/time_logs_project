"use client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import React from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {FcGoogle} from "react-icons/fc"
import {FaGithub} from "react-icons/fa"
export default function AuthComponent() {
	const supabase = createClientComponentClient();

	const handleLoginGithub = () => {
		supabase.auth.signInWithOAuth({
			provider: "github",
			options: {
				redirectTo: `${location.origin}/auth/callback`,
			},
		});
	};

  const handleLoginGoogle = () => {
		supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				redirectTo: `${location.origin}/auth/callback`,
			},
		});
	};

	return (
		<div className="p-5">
			<Navbar />
			<div className="flex justify-center items-center h-[80vh]">
				<div className="text-center flex flex-col justify-center items-center space-y-5">
					<p>
					Hãy nhớ rằng, thời gian là tài sản quý giá nhất của bạn <br /> hãy đầu tư
            nó một cách khôn ngoan với Ứng dụng Nhật ký thời gian của bạn!
					</p>
					<Button onClick={handleLoginGithub}><FaGithub className="mr-2 w-4 h-4" />Login with Github</Button>
          <Button onClick={handleLoginGoogle}><FcGoogle className="mr-2 w-4 h-4" />Login with Google</Button>
				</div>
			</div>
		</div>
	);
}