"use client";

import { Button, LayoutWaves, SpinSpotIcon } from "@spin-spot/components";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <LayoutWaves>
      <div className="w-96 space-y-4 rounded-lg px-12 pb-2 pt-8">
        <div className="flex flex-col items-center justify-center gap-9 pb-20">
          <SpinSpotIcon />
          <h2 className="dark:text-base-300 mb-1 text-center text-xl font-light  ">
            La nueva pagina de reservas de los unimetanos
          </h2>
          <Button
            className=" btn-lg btn-neutral"
            onClick={handleLoginClick}
            label="Ingresar"
            labelSize="text-md"
          />
        </div>
      </div>
    </LayoutWaves>
  );
}
