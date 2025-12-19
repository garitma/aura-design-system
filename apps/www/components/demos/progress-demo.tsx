import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/Progress";

export const ProgressDemo = () => (
  <div className="w-[300px]">
    <Progress value={60} />
  </div>
);

export const ProgressDemoZero = () => (
  <div className="w-[300px]">
    <Progress value={0} />
  </div>
);

export const ProgressDemoComplete = () => (
  <div className="w-[300px]">
    <Progress value={100} />
  </div>
);

export const ProgressDemoSimulated = () => {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-[300px]">
      <Progress value={progress} />
    </div>
  );
};