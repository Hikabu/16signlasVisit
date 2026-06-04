"use client";

import { useState } from "react";
import { useInterval } from "@/app/hooks/useInterval";

export function useRotatingScene(length: number, sceneDuration: number) {
  const [sceneIndex, setSceneIndex] = useState(0);

  useInterval(() => {
    setSceneIndex((current) => (current + 1) % length);
  }, sceneDuration);

  return { sceneIndex, setSceneIndex };
}
