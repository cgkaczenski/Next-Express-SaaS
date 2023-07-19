"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";

export function NavigationEvents() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();
    const url = `${pathname}`;
    if (url) {
      NProgress.done();
    }
  }, [pathname]);

  return null;
}
