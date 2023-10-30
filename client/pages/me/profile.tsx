"use client";

import { useLazyQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Loader } from "../../app/components/Loader";
import { isAuthenticated } from "../../app/store/utils";
import HeaderDropdown from "../../app/components/HeaderDropdown";
import Link from "next/link";

const MY_PROFILE = gql`
  query Me {
    me {
      _id
      fullname
      email
      username
      gender
    }
  }
`;

export default function MyProfile() {
  const router = useRouter();
  const [getData, { loading, error, data }] = useLazyQuery(MY_PROFILE, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/");
    } else {
      getData();
    }
  }, [router.asPath]);

  const userProfile = data?.me;

  if (loading) return <Loader />;
  if (error) return <div>Submission error! ${error.message}</div>;

  return (
    <div className="selection:bg-rose-500 selection:text-white">
      <div className="flex min-h-screen items-center justify-center bg-rose-100">
        <HeaderDropdown />
        <Link
          className="bg-rose-500 fixed right-0 top-4 inline-flex items-center mr-20 px-4 py-2 rounded-lg cursor-pointer"
          href="/products"
        >
          Shop more
        </Link>

        <div className="flex-1 py-5">
          <div className="mx-auto w-1/2 overflow-hidden rounded-xl bg-white shadow-xl">
            <div className="rounded-tr-4xl bg-white px-10 py-14">
              <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                My Profile
              </h1>
              {/* Display user profile information here */}
              <p className="text-lg">
                <span className="text-rose-500 font-semibold">Full Name: </span>{" "}
                {userProfile?.fullname}
              </p>
              <p className="text-lg">
                <span className="text-rose-500 font-semibold">Email: </span>{" "}
                {userProfile?.email}
              </p>
              <p className="text-lg">
                <span className="text-rose-500 font-semibold">Username: </span>{" "}
                {userProfile?.username}
              </p>
              <p className="text-lg">
                <span className="text-rose-500 font-semibold">Gender: </span>{" "}
                {userProfile?.gender}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
