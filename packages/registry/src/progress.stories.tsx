import { useEffect, useState } from "react";
import { Progress } from "../registry/default/components/ui/Progress";

export const Default = () => (
  <div className="w-[300px]">
    <Progress value={60} />
  </div>
);

export const Zero = () => (
  <div className="w-[300px]">
    <Progress value={0} />
  </div>
);

export const Complete = () => (
  <div className="w-[300px]">
    <Progress value={100} />
  </div>
);

export const Simulated = () => {
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
