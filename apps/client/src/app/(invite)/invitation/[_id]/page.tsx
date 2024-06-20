"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  LayoutWaves,
  Loader,
  ReservationInfo,
  TextInput,
} from "@spin-spot/components";
import { signUpWithCredentialsInputDefinition } from "@spin-spot/models";
import {
  useAcceptInvitation,
  useInvitation,
  useSignUpWithCredentials,
  useToast,
} from "@spin-spot/services";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

interface IInterfaceInvitationForm {
  password: string;
}

interface InvitationParams {
  _id: string;
}
export default function Invitation({ params }: { params: InvitationParams }) {
  const { showToast } = useToast();

  const invitation = useInvitation(params._id);
  const signUpWithCredentials = useSignUpWithCredentials();
  const acceptInvitation = useAcceptInvitation();

  const { formState, register, handleSubmit } =
    useForm<IInterfaceInvitationForm>({
      resolver: zodResolver(
        signUpWithCredentialsInputDefinition.pick({ password: true }),
      ),
    });

  const router = useRouter();

  const onSubmit: SubmitHandler<IInterfaceInvitationForm> = (data) => {
    if (!invitation.data) {
      return;
    }

    signUpWithCredentials.mutate(
      {
        email: invitation.data.email,
        firstName: invitation.data.firstName,
        lastName: invitation.data.lastName,
        password: data.password,
      },
      {
        onSuccess() {
          showToast({
            label: "Te has registrado con exito!",
            type: "success",
            duration: 3000,
          });

          acceptInvitation.mutate(
            { _id: invitation.data._id },
            {
              onSuccess() {
                showToast({
                  label: "Te has unido a la reserva!",
                  type: "success",
                  duration: 3000,
                });
                router.push(`/tables`);
              },
            },
          );
        },
        onError: () => {
          showToast({
            label: "Error al crear la cuenta",
            type: "error",
          });
        },
      },
    );
  };

  if (!invitation.isSuccess) {
    return <Loader />;
  }

  return (
    <LayoutWaves>
      <div className="font-body flex-grow items-center justify-center py-32">
        <h1 className="mt-6 text-center text-3xl font-bold">Invitación</h1>
        <div className="font-title  w-full pt-5 text-center font-normal md:h-60"></div>
        <ReservationInfo
          dateReserve={new Date(invitation.data.booking.timeBlock.startTime)
            .toLocaleDateString([], {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .replace(/\//g, "-")}
          startTime={new Date(
            invitation.data.booking.timeBlock.startTime,
          ).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
          endTime={new Date(
            invitation.data.booking.timeBlock.endTime,
          ).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
          tableCode={invitation.data.booking.timeBlock.table.code}
          user={null}
        />
        <div className="flex flex-col items-center justify-center gap-4">
          <h3 className="mt-5 pb-2 text-center text-lg">
            Ingresa la contraseña de tu nuevo usuario para unirte a la reserva
          </h3>
          <TextInput
            topLeftLabel="Correo electrónico"
            value={invitation.data.email}
            disabled={true}
          />
          <TextInput
            placeholder="Ingresa tu contraseña"
            topLeftLabel="Contraseña"
            bottomLeftLabel={formState.errors.password?.message}
            {...register("password")}
          />
          <Button
            className="btn-md btn-primary mx-2"
            label="Aceptar invitación"
            labelSize="text-md"
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </div>
    </LayoutWaves>
  );
}
