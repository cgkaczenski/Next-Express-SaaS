"use client";

import { useState, useRef } from "react";
import { LoadingDots, Google } from "@/components/icons";
import { signIn } from "next-auth/react";

export default function LoginPageForm() {
  const [googleSignInClicked, setGoogleSignInClicked] = useState(false);
  const [emailSignInClicked, setEmailSignInClicked] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);

  async function handleGoogleSignIn() {
    setGoogleSignInClicked(true);
    await signIn("google", {
      redirect: true,
      callbackUrl: "/teams/your-settings",
    });
  }

  async function handleEmailSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current?.value;
    if (!enteredEmail || enteredEmail.trim().length === 0) {
      return;
    }
    setEmailSignInClicked(true);
    await signIn("email", { email: enteredEmail });
  }

  return (
    <>
      <div className="flex items-center justify-center sm:px-6 lg:px-8 overflow-hidden">
        <div className="relative isolate h-screen w-screen">
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

                        <div className="mt-6 mx-auto gap-4 pb-10 flex justify-center">
                          <button
                            disabled={googleSignInClicked}
                            className={`${
                              googleSignInClicked
                                ? "cursor-not-allowed border-gray-200 bg-gray-100"
                                : "border border-gray-200 bg-white text-black hover:bg-gray-50"
                            } flex items-center justify-center gap-3 rounded-md py-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]  w-40 flex-shrink-0`}
                            onClick={handleGoogleSignIn}
                          >
                            {googleSignInClicked ? (
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
                        <div className="relative">
                          <div
                            className="absolute inset-0 flex items-center"
                            aria-hidden="true"
                          >
                            <div className="w-full border-t border-gray-200" />
                          </div>
                          <div className="relative flex justify-center text-sm font-medium leading-6">
                            <span className="bg-white px-6 text-gray-900">
                              Or continue with
                            </span>
                          </div>
                        </div>
                        <h2 className="mt-6 text-center text-sm  text-gray-900 pb-2">
                          We will send you a link to sign in or sign up.
                        </h2>
                        <form
                          className="space-y-6 pb-10"
                          onSubmit={handleEmailSignIn}
                        >
                          <div className="mt-2 mx-10">
                            <label htmlFor="email" className="hidden">
                              Email
                            </label>
                            <input
                              id="email"
                              name="email"
                              type="email"
                              autoComplete="email"
                              placeholder="Email address"
                              ref={emailInputRef}
                              required
                              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 px-5 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                            />
                          </div>
                          <div className="mt-6 mx-auto gap-4 flex justify-center">
                            <button
                              disabled={emailSignInClicked}
                              className={`${
                                emailSignInClicked
                                  ? "cursor-not-allowed border-gray-200 bg-gray-100"
                                  : "border border-gray-200 bg-white text-black hover:bg-gray-50"
                              } flex items-center justify-center gap-3 rounded-md py-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]  w-40 flex-shrink-0`}
                            >
                              {emailSignInClicked ? (
                                <LoadingDots color="#808080" />
                              ) : (
                                <>
                                  <span className="text-sm font-semibold leading-6 px-4">
                                    Sign in with email
                                  </span>
                                </>
                              )}
                            </button>
                          </div>
                        </form>
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
