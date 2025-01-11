"use client";
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../../app/globals.css";
import { metadata } from "../../metadata";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// const inter = Inter({ subsets: ["latin"] });

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const [authedUser, setAutheduser] = useState<User>();

  // const router = useRouter();
  // let user = "";

  // if (typeof window !== "undefined") {
  //   user = localStorage.getItem("authUser") ?? "";
  // }

  // useEffect(() => {
  //   if (user) {
  //     setAutheduser(JSON.parse(user));
  //   }
  // }, [user]);

  // if (authedUser?.id) {
  //   router.push("/");
  // }

  return (
    // <html lang="en">
    //   <head>
    //     <title>{metadata?.title}</title>

    //     <meta name="description" content={metadata?.description} />
    //   </head>
    //   <body className={inter.className}>
    <>{children}</>
    //   </body>
    // </html>
  );
}
