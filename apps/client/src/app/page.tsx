"use client";

import { Button, Pagination, SelectInput } from "@spin-spot/components";
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
        labels={["1", "2", "3", "4", "5"]}
        className="btn-neutral"
      ></Pagination>
      <SelectInput
        options={[
          "Harry Potter",
          "Planeta De los Simios",
          "StarTrek",
          "Star Wars",
        ]}
        defaultOption="Pick A Movie!"
        topRightLabel="Hola papi"
        className="select-primary"
      ></SelectInput>
    </div>
  );
}
