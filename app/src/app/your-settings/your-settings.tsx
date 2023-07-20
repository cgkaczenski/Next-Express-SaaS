"use client";

import { UserCircleIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import confirm from "@/lib/confirm";
import { toast } from "react-hot-toast";
import NProgress from "nprogress";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function YourSettingsPage(props: {
  user: { email: string; displayName: string; avatarUrl: string };
}) {
  const { user } = props;
  const [originalName, setOriginalName] = useState(user.displayName);
  const [name, setName] = useState(user.displayName);
  const [originalAvatarUrl, setOriginalAvatarUrl] = useState(user.avatarUrl);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
  const [disabled, setDisabled] = useState(false);

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleCancel() {
    setName(originalName);
  }

  async function confirmSubmit() {
    confirm({
      title: "Update Profile",
      message: "Please confirm to update your profile",
      onAnswer: async (answer) => {
        if (!answer) {
          return;
        }
        if (answer === true) {
          NProgress.start();
          setDisabled(true);
          try {
            await sleep(2000);
            console.log(name);
          } catch (error) {
            const errorStr = JSON.stringify(error);
            toast.error(errorStr);
          } finally {
            toast.success("You updated your profile");
            NProgress.done();
            setDisabled(false);
            setOriginalName(name);
            setOriginalAvatarUrl(avatarUrl);
          }
        }
      },
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name) {
      toast.error("Name is required");
      return;
    }

    confirmSubmit();
  }

  return (
    <div className="p-3 dark:bg-zinc-700 min-h-screen flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full lg:w-11/12 xl:w-9/12 2xl:w-7/12 lg:pt-3 xl:pt-7 2xl:pt-20 mx-auto"
      >
        <div className="space-y-12 sm:space-y-16">
          <div>
            <h2 className="text-base font-semibold leading-7 dark:text-white">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">Your account</p>

            <div className="mt-10 space-y-8 border-b dark:border-white/10 pb-12 sm:space-y-0 sm:divide-y dark:divide-white/10 sm:border-t sm:pb-0">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 dark:text-white sm:pt-1.5"
                >
                  Username
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 sm:max-w-md">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="flex-1 bg-transparent py-1.5 pl-1 dark:text-white focus:ring-0 sm:text-sm sm:leading-6"
                      value={name}
                      onChange={handleNameChange}
                    />
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6 ">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 dark:text-white sm:pt-1.5"
                >
                  Email
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <p className=" dark:text-white"> {user.email}</p>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:py-6">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 dark:text-white sm:pt-1.5"
                >
                  Photo
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <div className="flex items-center gap-x-3">
                    {avatarUrl ? (
                      <img
                        className="h-12 w-12 rounded-full"
                        src={avatarUrl}
                        alt=""
                      />
                    ) : (
                      <UserCircleIcon
                        className="h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                    )}
                    <button
                      type="button"
                      className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold dark:text-white shadow-sm hover:bg-white/20 dark:ring-0 ring-1 ring-inset ring-gray-300"
                      disabled={disabled}
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 dark:text-white"
            onClick={handleCancel}
            disabled={disabled}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            disabled={disabled}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
