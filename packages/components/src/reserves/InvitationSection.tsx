"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TCreateUserInputDefinition,
  createUserInputDefinition,
} from "@spin-spot/models";
import { useToast } from "@spin-spot/services";
import { useForm } from "react-hook-form";
import { Button } from "../buttons";
import { TextInput } from "../text-inputs";
interface InvitationProps {
  timeBlockId: string;
  onSubmit: (_user: {
    firstName: string;
    lastName: string;
    email: string;
  }) => void;
}

export function InvitationSection({ onSubmit }: InvitationProps) {
  const { showToast } = useToast();

  const { formState, register, handleSubmit, reset } = useForm<
    Pick<TCreateUserInputDefinition, "firstName" | "lastName" | "email">
  >({
    resolver: zodResolver(
      createUserInputDefinition.pick({
        firstName: true,
        lastName: true,
        email: true,
      }),
    ),
  });

  return (
    <div className="mt-6 flex flex-col items-center">
      <h3 className="mt-4 text-center text-lg">
        Ingrese los datos del nuevo invitado
      </h3>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <TextInput
          placeholder="Nombre del invitado"
          topLeftLabel="Nombre"
          bottomLeftLabel={formState.errors.firstName?.message}
          {...register("firstName")}
        />
        <TextInput
          placeholder="Apellido del invitado"
          topLeftLabel="Apellido"
          bottomLeftLabel={formState.errors.lastName?.message}
          {...register("lastName")}
        />
        <TextInput
          containerClassName="col-span-2"
          placeholder="Correo electrónico"
          topLeftLabel="Correo electrónico"
          bottomLeftLabel={formState.errors.email?.message}
          {...register("email")}
        />
      </div>
      <Button
        label="Agregar invitado"
        labelSize="text-sm"
        className="btn-md btn-secondary mt-4"
        onClick={handleSubmit((data) => {
          onSubmit(data);
          showToast({
            label: "Usuario agregado a la lista de invitados",
            type: "info",
          });
          reset();
        })}
      />
    </div>
  );
}
