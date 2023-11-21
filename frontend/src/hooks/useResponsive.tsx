import React, { useState, useEffect } from "react";

export const useResponsive = () => {
  const [isSmallDevice, setIsSmallDevice] = useState(false);

  useEffect(() => {
    const updateIsSmallDevice = () => {
      setIsSmallDevice(window.innerWidth < 768);
    };

    window.addEventListener("resize", updateIsSmallDevice);

    updateIsSmallDevice();

    return () => window.removeEventListener("resize", updateIsSmallDevice);
  }, []);

  return isSmallDevice;
};
