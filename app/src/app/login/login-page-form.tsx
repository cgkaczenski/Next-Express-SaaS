"use client";

import { useState } from "react";
import { LoadingDots, Google } from "@/components/icons";
import { signIn } from "next-auth/react";

export default function LoginPageForm() {
  const [signInClicked, setSignInClicked] = useState(false);

  async function handleClick() {
    setSignInClicked(true);
    await signIn("google", {
      redirect: true,
      callbackUrl: "/teams/your-settings",
    });
  }

  return (
    <>
      <div className="flex items-center justify-center sm:px-6 lg:px-8 overflow-hidden">
        <div className="relative isolate pt-14 h-screen w-screen">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 h-screen w-screen"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#1E71FF] opacity-50 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="py-24 sm:py-32 lg:pb-40">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <div className="mt-10 flex items-center justify-center gap-x-6">
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
              </div>
            </div>
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#1E71FF] opacity-50 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
