"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [passowrd, setPassword] = useState("");
  const [userLogged, setUserLogged] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === "userName") {
      value && setUserName(value);
    } else if (id === "password") {
      value && setPassword(value);
    }
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    // const { userName, password } = e.target;
    const users = localStorage.getItem("users") ?? "[]";
    const userList: Array<User> = users && JSON.parse(users);

    const authenticUser = userList.find(
      (u) =>
        (u?.email === userName || u?.mobile === userName) &&
        u?.password === passowrd
    ) as User;

    if (authenticUser?.id) {
      const { password, ...userDetails } = authenticUser;

      localStorage.setItem("authUser", JSON.stringify({ ...userDetails }));
      window.location.href = "/";
      // router.push("/");
    } else {
      //wrong credentials!
      setPassword("");
    }
  };

  useEffect(() => {
    userLogged && router.push("/");
  }, [userLogged, router]);

  // useEffect(() => {
  //   const authUser = localStorage.getItem("authUser") ?? "[]";
  //   const authedUser: User = authUser && JSON.parse(authUser);
  //   if (authedUser?.id) {
  //     setUserLogged(true);
  //   }
  // }, [localStorage.getItem("authUser")]);

  useEffect(() => {
    // Function to handle localStorage operations
    const handleLocalStorage = () => {
      const authUser = localStorage.getItem("authUser") ?? "[]";
      const authedUser: User = authUser && JSON.parse(authUser);
      if (authedUser?.id) {
        setUserLogged(true);
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
  }, [router]);

  return (
    <>
      <div className="flex flex-wrap w-full h-screen p-6 justify-center align-middle">
        <form className="flex flex-col w-full sm:w-1/3 m-24 mt-10 justify-items-center">
          <h3 className="text-center font-bold text-lg mb-10">Login</h3>
          <div className="flex flex-col space-y-6 w-4/5 self-center text-black">
            <input
              className="flex rounded-full p-2"
              id="userName"
              type="text"
              placeholder="email OR mobile"
              autoComplete="username"
              value={userName}
              onChange={handleChange}
            />
            <input
              className="flex rounded-full p-2"
              id="password"
              type="password"
              value={passowrd}
              onChange={handleChange}
            />
            <button
              className="flex self-center rounded-2xl py-2 px-4 border-4 border-blue-300 hover:border-orange-600  bg-orange-600 hover:bg-blue-300"
              id="submit-btn"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
