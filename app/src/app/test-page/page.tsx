"use client";

import confirm from "@/lib/confirm";
import { toast } from "react-hot-toast";
import NProgress from "nprogress";

function testConfirm() {
  confirm({
    title: "Test Confirm",
    message: "This is a test confirm",
    onAnswer: async (answer) => {
      console.log(answer);
      if (!answer) {
        return;
      }
      NProgress.start();
      try {
        toast.success("Test confirm success");
      } catch (error) {
        const errorStr = JSON.stringify(error);
        toast.error(errorStr);
      } finally {
        NProgress.done();
      }
    },
  });
}

export default function TestPage() {
  return (
    <div>
      <div className="py-4 px-16 text-lg">
        <p className="py-4">Content on CSR page</p>
        <button
          className="rounded bg-white/10 px-2 py-1 text-s font-semibold text-white shadow-sm hover:bg-white/20"
          onClick={testConfirm}
        >
          Some button
        </button>
      </div>
    </div>
  );
}
