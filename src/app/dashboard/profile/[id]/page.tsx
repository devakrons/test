"use client";
import React, { useEffect, useState } from "react";
import "../../../globals.css";
import Image from "next/image";
import maleUserProfile from "../../../../assets/user/male-user-avatar.png";
import femaleUserProfile from "../../../../assets/user/female-user-avatar.jpg";

export default function Profile({ params }: { params: { id: string } }) {
  const [authedUser, setAuthedUser] = useState<User>();

  useEffect(() => {
    const authUser = localStorage.getItem("authUser") ?? "[]";
    const authenticUser = JSON.parse(authUser);

    if (authenticUser?.id) {
      const { paswword, ...userDetails } = authenticUser;
      setAuthedUser(userDetails);
    }
  }, [localStorage.getItem("authUser")]);

  return (
    <div className="flex flex-wrap p-4">
      {authedUser ? (
        <React.Fragment key={authedUser.id}>
          <div className="sm:mx-20 md:mx-32 lg:mx-80 flex w-full justify-center py-2">
            <div className="flex w-40 h-w-40 p-4 rounded-3xl border-4 border-blue-600 bg-blue-100">
              <Image
                src={
                  authedUser?.gender === "female"
                    ? femaleUserProfile
                    : maleUserProfile
                }
                alt="profile-pic"
                priority={false}
              />
            </div>
          </div>
          <div className="sm:mx-20 md:mx-32 lg:mx-80 lg:max-lg:w-1/4 flex w-full flex-wrap flex-col space-y-6 py-2 pt-6">
            {Object.keys(authedUser).map((propertyName: string, i) => {
              return (
                <div
                  key={propertyName + i}
                  className="break-words flex w-full border-4 border-dotted border-red-600 rounded-2xl justify-center p-3"
                >
                  <div className="w-40">
                    <span>
                      {propertyName === "id"
                        ? "ROLL NUMBER"
                        : `${propertyName.toUpperCase()}`}
                    </span>
                  </div>
                  <p className="px-4">:</p>
                  <div className="w-40">
                    <p>{Object.values(authedUser)[i]}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </React.Fragment>
      ) : (
        <div>User Not Found</div>
      )}
    </div>
  );
}
