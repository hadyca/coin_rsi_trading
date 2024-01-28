"use client";

import { app } from "@/lib/app";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    app();
    // const intervalId = setInterval(getData, 5000);
    // return () => clearInterval(intervalId);
  }, []);
  return <div>시작페이지</div>;
}
