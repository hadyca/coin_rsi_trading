"use client";

import { getData } from "@/lib/data";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    getData();
    // const intervalId = setInterval(getData, 5000);
    // return () => clearInterval(intervalId);
  }, []);
  return <div>시작페이지</div>;
}
