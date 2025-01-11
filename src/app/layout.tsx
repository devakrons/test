"use client";
// // import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { useEffect, useState } from "react";
// import { metadata } from "./metadata";
// import SettingOptions from "./settingOptions";
// import { useRouter } from "next/navigation";
// import Login from "./authentication/login/page";

import users from "../data/users.json";
import { Inter } from "next/font/google";
import { metadata } from "./metadata";
import "./globals.css";
import SettingOptions from "./settingOptions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// const inter = Inter({ subsets: ["latin"] });

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const [authUser, setAuthUser] = useState<User>();
//   const [openSetting, setOpenSetting] = useState(false);

//   const router = useRouter();
//   let user = "";

//   if (typeof window !== "undefined") {
//     user = localStorage.getItem("authUser") ?? "";
//   }

//   useEffect(() => {
//     // Function to handle localStorage operations
//     const handleLocalStorage = () => {
//       const usersList = localStorage.getItem("users") ?? [];
//       const authedUser = localStorage.getItem("authUser") ?? "[]";

//       if (authedUser && !authedUser?.includes("id")) {
//         router.push("/authentication/login");
//       } else {
//         const parsedUser = JSON.parse(authedUser);

//         parsedUser?.id && setAuthUser(parsedUser);
//       }

//       if (!(usersList.length > 0)) {
//         localStorage.setItem("users", JSON.stringify(users));
//       }
//     };

//     // Check if we are in the client-side environment
//     if (typeof window !== "undefined") {
//       handleLocalStorage(); // Initial call to handle localStorage

//       // Add event listener to handle changes in localStorage
//       const handleStorageChange = () => {
//         handleLocalStorage();
//       };

//       window.addEventListener("storage", handleStorageChange);

//       // Clean up event listener
//       return () => {
//         window.removeEventListener("storage", handleStorageChange);
//       };
//     }
//   }, [router, user]);

//   return (
//     <html lang="en">
//       <head>
//         <title>{metadata?.title}</title>

//         <meta name="description" content={metadata?.description} />
//       </head>
//       <body className={inter.className}>
//         {/* {authUser?.id ? ( */}
//         <>
//           {authUser?.id && (
//             <header className="sticky top-0 left-0 flex flex-col items-center justify-between bg-gray-700 rounded-bl-lg rounded-br-lg p-2">
//               <div className="flex w-full ">
//                 <div className="flex w-1/4 p-2">
//                   <span className="text-center content-center pl-4 text-lg">
//                     <a href="/">Akron Systems</a>
//                   </span>
//                 </div>
//                 <div className="flex grow">
//                   <ul className="flex-col justify-items-end grow text-right content-center space-x-8 text-base">
//                     {[
//                       { label: "Home", path: "/" },
//                       { label: "About Us", path: "/aboutUs" },
//                       { label: "Careers", path: "/careers" },
//                     ]?.map(
//                       (
//                         menuName: { label: string; path: string },
//                         index: number
//                       ) => {
//                         return (
//                           <li
//                             className="inline-flex"
//                             key={menuName.path + index}
//                           >
//                             <a href={menuName.path}>{menuName.label}</a>
//                           </li>
//                         );
//                       }
//                     )}
//                   </ul>
//                 </div>
//                 <div className="flex w-1/4 justify-end items-center mr-4">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth={1.5}
//                     stroke="currentColor"
//                     className="size-8 active:rotate-90 transform-gpu"
//                     onClick={() => setOpenSetting((state) => !state)}
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
//                     />
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
//                     />
//                   </svg>
//                   {
//                     <SettingOptions
//                       openSetting={openSetting}
//                       setOpenSetting={setOpenSetting}
//                     />
//                   }
//                 </div>
//               </div>
//             </header>
//           )}

//           <main className="min-h-screen m-4 bg-zinc-700 rounded-lg p-3">
//             {children}
//           </main>
//           {authUser?.id && (
//             <footer className="flex flex-col items-center justify-between bg-gray-600 rounded-tl-lg rounded-tr-lg p-2">
//               <h1>Here is footer</h1>
//             </footer>
//           )}
//         </>
//         {/* ) : (
//           <>
//             <Login />
//           </>
//         )} */}
//       </body>
//     </html>
//   );
// }

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [authUser, setAuthUser] = useState<User>();
  const [openSetting, setOpenSetting] = useState(false);

  const router = useRouter();
  let user = "";

  if (typeof window !== "undefined") {
    user = localStorage.getItem("authUser") ?? "";
  }

  useEffect(() => {
    // Function to handle localStorage operations
    const handleLocalStorage = () => {
      const usersList = localStorage.getItem("users") ?? [];
      const authedUser = localStorage.getItem("authUser") ?? "[]";

      if (authedUser && !authedUser?.includes("id")) {
        router.push("/authentication/login");
      } else {
        const parsedUser = JSON.parse(authedUser);

        parsedUser?.id && setAuthUser(parsedUser);
      }

      if (!(usersList.length > 0)) {
        localStorage.setItem("users", JSON.stringify(users));
      }
    };

    // Check if we are in the client-side environment
    if (typeof window !== "undefined") {
      handleLocalStorage(); // Initial call to handle localStorage

      // Add event listener to handle changes in localStorage
      const handleStorageChange = () => {
        handleLocalStorage();
      };

      window.addEventListener("storage", handleStorageChange);

      // Clean up event listener
      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    }
  }, [router, user]);

  return (
    <html lang="en">
      <head>
        <title>{metadata?.title}</title>
        <meta name="description" content={metadata?.description} />
      </head>
      <body className={inter.className}>
        {authUser?.id && (
          <header className="sticky top-0 left-0 flex flex-col items-center justify-between bg-gray-700 rounded-bl-lg rounded-br-lg p-2">
            <div className="flex w-full ">
              <div className="flex w-1/4 p-2">
                <span className="text-center content-center pl-4 text-lg">
                  <a href="/">Akron Systems</a>
                </span>
              </div>
              <div className="flex grow">
                <ul className="flex-col justify-items-end grow text-right content-center space-x-8 text-base">
                  {[
                    { label: "Home", path: "/" },
                    { label: "About Us", path: "/aboutUs" },
                    { label: "Careers", path: "/careers" },
                  ]?.map(
                    (
                      menuName: { label: string; path: string },
                      index: number
                    ) => {
                      return (
                        <li className="inline-flex" key={menuName.path + index}>
                          <a href={menuName.path}>{menuName.label}</a>
                        </li>
                      );
                    }
                  )}
                </ul>
              </div>
              <div className="flex w-1/4 justify-end items-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-8 active:rotate-90 transform-gpu"
                  onClick={() => setOpenSetting((state) => !state)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                {
                  <SettingOptions
                    openSetting={openSetting}
                    setOpenSetting={setOpenSetting}
                  />
                }
              </div>
            </div>
          </header>
        )}
        {children}

        {authUser?.id && (
          <footer className="flex flex-col items-center justify-between bg-gray-600 rounded-tl-lg rounded-tr-lg p-2">
            <h1>Here is footer</h1>
          </footer>
        )}
      </body>
    </html>
  );
}
