"use client";

import { MapPinIcon } from "@heroicons/react/24/outline";
import { Button } from "@spin-spot/components";
import { useAuth } from "@spin-spot/services";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useScrollLock } from "usehooks-ts";

export default function Profile() {
  useScrollLock();
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();

  const handleEditClick = () => {
    router.push("/profile/edit");
  };

  const handleBackClick = () => {
    router.push("/dashboard");
  };

  if (isAuthLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Error loading user data</div>;
  }

  const userFullName = `${user?.firstName} ${user?.lastName}`;

  return (
    <>
      {/* Profile Info */}
      <div className="flex flex-col items-center justify-center">
        <div className="w-90 h-32 overflow-hidden rounded-full bg-black">
          <Image
            src="/DefaultUserImage.png" // PONER PERFIL DE USUARIO
            alt={user ? userFullName : "User"}
            width={128}
            height={128}
            className="object-cover"
          />
        </div>
        <h1 className="mt-4 text-center text-xl font-bold text-purple-700">
          {user ? userFullName : "Jane Doe"}
        </h1>
        <div className="flex items-center justify-center gap-2">
          <MapPinIcon className="h-6 w-6 text-gray-600"></MapPinIcon>
          <p className="mt-2 text-center text-gray-600">
            Universidad Metropolitana
          </p>
        </div>
        <div className="mt-4 flex justify-center gap-6">
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700">{0}</p>
            <p className="text-sm text-gray-500">Reservas</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700">{0}</p>
            <p className="text-sm text-gray-500">Torneos</p>
          </div>
        </div>
        <div className="mt-6 flex justify-center space-x-4">
          <Button
            className="btn-sm btn-secondary w-24"
            label="Back"
            labelSize="text-md"
            onClick={handleBackClick}
          />
          <Button
            className="btn-sm dark:btn-neutral btn-primary"
            label="Edit Profile"
            labelSize="text-md"
            onClick={handleEditClick}
          />
        </div>
      </div>
    </>
  );
}
