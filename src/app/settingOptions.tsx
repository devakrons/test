"use client";
import maleUserProfileLogo from "../assets/user/male-user-avatar.png";
import femaleUserProfileLogo from "../assets/user/female-user-avatar.jpg";
import logOutIcon from "../assets/auth/logout-jpeg.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  openSetting: Boolean;
  setOpenSetting: Function;
}

export default function SettingOptions({
  openSetting = false,
  setOpenSetting = (state: any) => null,
}: Props) {
  const [authedUser, setAuthedUser] = useState<User>();

  const router = useRouter();

  let user = "";

  if (typeof window !== "undefined") {
    user = localStorage.getItem("authUser") ?? "";
  }

  // useEffect(() => {
  //   const authUser = localStorage.getItem("authUser") ?? "[]";
  //   const authenticUser = JSON.parse(authUser);

  //   if (authenticUser?.id) {
  //     const { paswword, ...userDetails } = authenticUser;
  //     setAuthedUser(userDetails);
  //   }
  // }, [localStorage.getItem("authUser")]);

  useEffect(() => {
    // Function to handle localStorage operations
    const handleLocalStorage = () => {
      const authUser = localStorage.getItem("authUser") ?? "[]";
      const authenticUser = JSON.parse(authUser);

      if (authenticUser?.id) {
        const { paswword, ...userDetails } = authenticUser;
        setAuthedUser(userDetails);
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
    <div
      className={`absolute top-10 right-0 transition ${
        openSetting
          ? "flex ease-out duration-200 opacity-100 translate-y-0"
          : "hidden ease-in duration-150 opacity-0 translate-y-1"
      }`}
    >
      <div className="left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1 px-4">
        <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
          <div className="p-4">
            {/* <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
              <div className="mt-1 flex">
                <div className="relative h-11 w-11 flex-none">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="profile-avatar.png"
                    alt="profile"
                  />
                  <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                </div>
              </div>
            </div> */}
            <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
              <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                {/* <svg
                  className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
                  />
                </svg> */}
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg> */}
                <div className="relative h-11 w-11 flex-none">
                  <Image
                    className="w-10 h-10 rounded-full"
                    src={
                      authedUser?.gender === "female"
                        ? femaleUserProfileLogo
                        : maleUserProfileLogo
                    }
                    alt="profile"
                  />
                  <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                </div>
              </div>
              <div>
                <a
                  href={`/dashboard/profile/${authedUser?.id}`}
                  className="font-semibold text-gray-900"
                >
                  {authedUser?.name}
                  <span className="absolute inset-0"></span>
                </a>
                <p className="mt-1 text-gray-600">View your Profile</p>
              </div>
              <div className="relative h-11 w-11 flex justify-end flex-grow">
                <Image
                  className="w-10 h-10 rounded-full"
                  src={logOutIcon}
                  alt="logout"
                  onClick={() => {
                    localStorage.removeItem("authUser");
                    // router.push("/authentication/login");
                    window.location.href = "/authentication/login";
                    setOpenSetting(false);
                  }}
                />
                {/* <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span> */}
              </div>
            </div>
            <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
              <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                <svg
                  className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
                  />
                </svg>
              </div>
              <div>
                <a href="#" className="font-semibold text-gray-900">
                  Engagement
                  <span className="absolute inset-0"></span>
                </a>
                <p className="mt-1 text-gray-600">
                  Speak directly to your customers
                </p>
              </div>
            </div>
            <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
              <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                <svg
                  className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"
                  />
                </svg>
              </div>
              <div>
                <a href="#" className="font-semibold text-gray-900">
                  Security
                  <span className="absolute inset-0"></span>
                </a>
                <p className="mt-1 text-gray-600">
                  Your customers&#039; data will be safe and secure
                </p>
              </div>
            </div>
            <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
              <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                <svg
                  className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              </div>
              <div>
                <a href="#" className="font-semibold text-gray-900">
                  Integrations
                  <span className="absolute inset-0"></span>
                </a>
                <p className="mt-1 text-gray-600">
                  Connect with third-party tools
                </p>
              </div>
            </div>
            <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
              <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                <svg
                  className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </div>
              <div>
                <a href="#" className="font-semibold text-gray-900">
                  Automations
                  <span className="absolute inset-0"></span>
                </a>
                <p className="mt-1 text-gray-600">
                  Build strategic funnels that will convert
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
            <a
              href="#"
              className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
            >
              <svg
                className="h-5 w-5 flex-none text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z"
                  clipRule="evenodd"
                />
              </svg>
              Watch demo
            </a>
            <a
              href="#"
              className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
            >
              <svg
                className="h-5 w-5 flex-none text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                  clipRule="evenodd"
                />
              </svg>
              Contact sales
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
