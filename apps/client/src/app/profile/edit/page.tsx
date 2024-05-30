"use client";

import { EnvelopeIcon, UserIcon } from "@heroicons/react/16/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, SelectInput, TextInput } from "@spin-spot/components";
import {
  TUpdateUserInputDefinition,
  updateUserInputDefinition,
} from "@spin-spot/models";
import { useAuth, useUpdateUser } from "@spin-spot/services";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

export default function EditProfile() {
  const router = useRouter();

  const { user, isLoading: isAuthLoading } = useAuth();
  const userId = user?._id;

  const updateUser = useUpdateUser();

  const handleBackClick = () => {
    router.push("/profile");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUpdateUserInputDefinition>({
    resolver: zodResolver(updateUserInputDefinition),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      gender: user?.gender,
    },
    shouldFocusError: false,
    mode: "onBlur",
  });

  const handleUpdateProfile: SubmitHandler<TUpdateUserInputDefinition> = (
    data,
  ) => {
    if (userId) {
      updateUser.mutate(
        { _id: userId, ...data },
        {
          onSuccess: () => {
            router.push("/profile");
          },
        },
      );
    }
  };

  if (isAuthLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Error loading user data</div>;
  }

  return (
    <>
      <div className="mb-3 flex flex-col items-center justify-center">
        <div className="w-90 h-32 overflow-hidden rounded-full bg-black">
          <Image
            src="/DefaultUserImage.png" // PONER PERFIL DE USUARIO
            alt="Jane Doe"
            width={128}
            height={128}
            className="object-cover"
          />
        </div>
        {/*Formulario*/}
        <TextInput
          placeholder="First Name"
          topRightLabel="First Name"
          iconLeft={
            <UserIcon className="text-primary dark:text-neutral h-6 w-6" />
          }
          {...register("firstName")}
          className={errors.firstName ? "input-error" : ""}
          bottomLeftLabel={errors.firstName?.message}
        />
        <TextInput
          placeholder="Last Name"
          topRightLabel="Last Name"
          iconLeft={
            <UserIcon className="text-primary dark:text-neutral h-6 w-6" />
          }
          {...register("lastName")}
          className={errors.lastName ? "input-error" : ""}
          bottomLeftLabel={errors.lastName?.message}
        />
        <TextInput
          placeholder="Email"
          topRightLabel="Email"
          iconLeft={
            <EnvelopeIcon className="text-primary dark:text-neutral h-6 w-6" />
          }
          {...register("email")}
          className={errors.email ? "input-error" : ""}
          bottomLeftLabel={errors.email?.message}
        />
        <SelectInput
          options={["MALE", "FEMALE", "OTHER"]}
          defaultOption="Elige tu Género"
          topRightLabel="Género"
          {...register("gender")}
          className={errors.gender ? "input-error" : ""}
          bottomLeftLabel={errors.gender?.message}
        />
        <div className="mt-6 flex justify-center space-x-4">
          <Button
            className="btn-md btn-secondary w-32"
            label="Back"
            labelSize="text-md"
            onClick={handleBackClick}
          />
          <Button
            className="btn-md btn-neutral w-40 "
            label="Edit Profile"
            labelSize="text-md"
            onClick={handleSubmit(handleUpdateProfile)}
          />
        </div>
      </div>
    </>
  );
}
