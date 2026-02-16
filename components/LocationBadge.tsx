"use client";

import React from "react";

export default function LocationBadge() {
  const [text, setText] = React.useState("Detecting location…");

  React.useEffect(() => {
    if (!("geolocation" in navigator)) {
      setText("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setText(`Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`);
      },
      () => setText("Location unavailable"),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60000 }
    );
  }, []);

  return (
    <div className="flex items-center gap-2">
      <svg
        className="w-5 h-5 md:w-6 md:h-6 text-red-500"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
      </svg>
      <span className="text-sm md:text-base font-medium">{text}</span>
    </div>
  );
}
