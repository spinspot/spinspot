"use client";

import { Button, Pagination } from "@spin-spot/components";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5 text-lg font-bold">
      HomePage 🚧
      <Button
        label="Login"
        className="btn-primary"
        onClick={handleLoginClick}
      />
      <Pagination
        ariaLabels={["1", "2", "3", "4", "5"]}
        className="btn-neutral"
      ></Pagination>
    </div>
  );
}
