'use client';

import Image from 'next/image';
import { Button } from "@spin-spot/components";
import { useRouter } from 'next/navigation';
import { useUser } from '@spin-spot/services'; // Ajusta la ruta según la ubicación de tu archivo queries.ts
import { useContext } from 'react';
import { AuthContext } from "@spin-spot/services"; // Asegúrate de ajustar la ruta según la ubicación de tu contexto de autenticación

export default function Profile() {
    const router = useRouter();
    const { user, isLoading: isAuthLoading } = useContext(AuthContext);
    const userId = user?._id; 

    const { data: userProfile, isLoading, error } = useUser(userId ?? '');

    const handleEditClick = () => {
        router.push('/profile/edit');
    };

    if (isAuthLoading || isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading user data</div>;
    }

    const userFullName = `${userProfile?.firstName} ${userProfile?.lastName}`;

    return (
        <>
            {/* Profile Info */}
            <div className="absolute inset-0 z-40 flex flex-col items-center justify-center">
                <div className="w-90 h-32 rounded-full overflow-hidden bg-black">
                    <Image
                        src={ '/default-profile.png'} // PONER PERFIL DE USUARIO
                        alt={userProfile? userFullName : 'User'}
                        width={128}
                        height={128}
                        className="object-cover"
                    />
                </div>
                <h1 className="mt-4 text-xl font-bold text-center text-purple-700">
                    {userProfile? userFullName : 'Jane Doe'}
                </h1> 
                <p className="mt-2 text-center text-gray-600">{'Universidad Metropolitana'}</p>
                <div className="flex justify-center mt-4 space-x-4">
                    <div className="text-center">
                        <p className="text-lg font-semibold text-gray-700">{0}</p>
                        <p className="text-sm text-gray-500">Reservas</p>
                    </div>
                    <div className="text-center">
                        <p className="text-lg font-semibold text-gray-700">{0}</p>
                        <p className="text-sm text-gray-500">Torneos</p>
                    </div>
                </div>
                <div className="flex justify-center mt-6 space-x-4">
                    <Button className="btn-sm btn-secondary w-24"
                        label="Back"
                        labelSize="text-md"></Button>
                    <Button className="btn-sm dark:btn-neutral btn-primary w-30"
                        label="Edit Profile"
                        labelSize="text-md"
                        onClick={handleEditClick}></Button>
                </div>
            </div>
        </>
    );
}
