"use client";
import * as amplitude from "@amplitude/analytics-browser";
import { useEffect } from "react";

export default function Analytics() {
  useEffect(() => {
    amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE_KEY, undefined, {
      defaultTracking: {
        sessions: true,
        pageViews: true,
        formInteractions: true,
        fileDownloads: true
      }
    });
  }, []);
  return <></>;
}
