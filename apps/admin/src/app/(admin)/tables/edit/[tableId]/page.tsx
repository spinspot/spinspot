"use client";
import { UserIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Loader, SelectInput, TextInput } from "@spin-spot/components";
import {
  TUpdateTableInputDefinition,
  updateTableInputDefinition,
} from "@spin-spot/models";
import { useTable } from "@spin-spot/services";
import { cn } from "@spin-spot/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

interface editTableParams {
  tableId: string;
}

export default function editTableAdmin({
  params,
}: {
  params: editTableParams;
}) {
  const table = useTable(params.tableId);
  const router = useRouter();
  //const updateTable = useUp;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<
    Omit<TUpdateTableInputDefinition, "isActive"> & { isActive: string }
  >({
    resolver: zodResolver(
      updateTableInputDefinition
        .omit({ isActive: true })
        .extend({ isActive: z.enum(["ACTIVO", "INACTIVO"]) }),
    ),

    defaultValues: {
      code: table.data?.code,
      isActive: table.data?.isActive ? "ACTIVA" : "INACTIVA",
    },
    shouldFocusError: false,
    mode: "onBlur",
  });

  const handleBackClick = () => {
    router.push("/tables");
  };

  const handleUpdateTable: SubmitHandler<
    Omit<TUpdateTableInputDefinition, "isActive"> & { isActive: string }
  > = (data) => {
    // updateUser.mutate(
    //   { _id: userId, ...data },
    //   {
    //     onSuccess: () => {
    //       showToast({
    //         label: "Se ha actualizado su perfil con exito!",
    //         type: "success",
    //         duration: 3000,
    //       });
    //       router.push("/profile");
    //     },
    //   },
    // );
  };

  useEffect(() => {
    if (table.data) {
      setValue("code", table.data.code);
      // Convirtiendo isActive a "ACTIVA" o "INACTIVA" para el SelectInput
      setValue("isActive", table.data.isActive ? "ACTIVA" : "INACTIVA");
    }
  }, [table.data, setValue]);

  return (
    <div className="font-body flex-grow py-32">
      <div className="font-title text-center font-bold">
        <h1 className="text-primary flex flex-col text-3xl">
          <span>Editar Mesa</span>
        </h1>
      </div>
      <div className="text-primary mx-auto mt-4 flex max-w-md flex-col items-center gap-y-4">
        {table.isLoading ? (
          <div className="mt-14 flex items-center justify-center">
            <Loader size="lg" variant="dots" className="text-primary"></Loader>
          </div>
        ) : (
          <>
            <TextInput
              placeholder="Código..."
              topRightLabel="Código de la mesa"
              iconLeft={
                <UserIcon className="text-primary dark:text-neutral h-6 w-6" />
              }
              {...register("code")}
              className={errors.code ? "input-error" : ""}
              bottomLeftLabel={errors.code?.message}
            />
            <SelectInput
              options={["ACTIVA", "INACTIVA"]}
              defaultOption="Seleccione actividad"
              topRightLabel="Actividad"
              {...register("isActive", {
                setValueAs: (value) => value === "ACTIVA",
              })}
              className={cn(
                "select-primary",
                errors.isActive ? "input-error" : "",
              )}
              bottomLeftLabel={errors.isActive?.message}
            />
            <div className="mt-6 flex w-full flex-col gap-3">
              <Button
                className="btn-md btn-primary"
                label="Editar Mesa"
                labelSize="text-md"
                onClick={handleSubmit(handleUpdateTable)}
              />
              <Button
                className="btn-md btn-link text-secondary mx-auto !no-underline"
                label="Volver"
                labelSize="text-md"
                onClick={handleBackClick}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
