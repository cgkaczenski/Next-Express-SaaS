"use client";

import {
  DocumentDuplicateIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import DarkModeBtn from "@/components/dark-mode-button";
import MenuLinks from "@/components/menu-links";
import Link from "next/link";

const navigation = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
  { name: "Team", href: "#", icon: UsersIcon, current: false },
  {
    name: "Discussions",
    href: "#",
    icon: DocumentDuplicateIcon,
    current: false,
    count: "5",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
  return (
    <div>
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col ">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto dark:bg-zinc-800/90 bg-zinc-200 p-6 ">
          <div className="relative flex h-16 items-center justify-between">
            <Link href="/" className="text-zinc-600 dark:text-zinc-400">
              SVG Logo
            </Link>

            <div className="-mx-6 mt-auto">
              <div className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white ">
                <DarkModeBtn />
                <MenuLinks />
              </div>
            </div>
          </div>
          <nav className="flex flex-1 flex-col ">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "dark:bg-grey-900 bg-zinc-600 text-white"
                            : "text-gray-400 hover:text-white hover:bg-gray-800",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        )}
                      >
                        <item.icon
                          className="h-6 w-6 shrink-0"
                          aria-hidden="true"
                        />
                        {item.name}
                        {item.count ? (
                          <span
                            className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white ring-1 ring-inset dark:bg-grey-900 bg-zinc-600 ring-gray-700"
                            aria-hidden="true"
                          >
                            {item.count}
                          </span>
                        ) : null}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
