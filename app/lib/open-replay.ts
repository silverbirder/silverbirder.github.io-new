"use client";

import { useEffect } from "react";
import Tracker from "@openreplay/tracker";

const tracker = new Tracker({
  projectKey: process.env.NEXT_PUBLIC_OPEN_REPLAY_PROJECT_KEY ?? "",
});

const Openreplay = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      tracker.start();
    }
  }, []);

  return null;
};

export default Openreplay;
