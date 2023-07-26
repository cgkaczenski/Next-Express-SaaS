"use client";

import { useState } from "react";
import { LoadingDots, Google } from "@/components/icons";

export default function LoginPage() {
  const [signInClicked, setSignInClicked] = useState(false);

  function handleClick() {
    setSignInClicked(true);
  }

  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center sm:px-6 lg:px-8 bg-gray-900">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 shadow sm:rounded-lg sm:px-12 text-black">
            <div className="pt-1">
              <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
              <h2 className="mt-6 text-center text-sm  text-gray-900">
                Use Gmail to either sign in or sign up.
              </h2>
              <div className="relative mt-10">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6"></div>
              </div>

              <div className="mt-6 mx-auto gap-4 pb-12 flex justify-center">
                <button
                  disabled={signInClicked}
                  className={`${
                    signInClicked
                      ? "cursor-not-allowed border-gray-200 bg-gray-100"
                      : "border border-gray-200 bg-white text-black hover:bg-gray-50"
                  } flex items-center justify-center gap-3 rounded-md py-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]  w-40 flex-shrink-0`}
                  onClick={handleClick}
                >
                  {signInClicked ? (
                    <LoadingDots color="#808080" />
                  ) : (
                    <>
                      <Google className="w-5 h-5" />
                      <span className="text-sm font-semibold leading-6">
                        Google
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
