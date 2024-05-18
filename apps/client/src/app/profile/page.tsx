'use client';

import Image from 'next/image';
import { Button } from "@spin-spot/components";
import { useRouter } from 'next/navigation';

export default function Profile() {

    const router = useRouter();
    const handleEditClick = () => {
        router.push('/profile/edit')
    };

    return (
        <>


            {/* Profile Info */}
            <div className="absolute inset-0  z-40 flex flex-col items-center justify-center">
                <div className="w-90 h-32 rounded-full overflow-hidden bg-black">
                    <Image
                        src="" // PONER PERFIL DE USUARIO
                        alt="Jane Doe"
                        width={128}
                        height={128}
                        className="object-cover"
                    />
                </div>
                <h1 className="mt-4 text-xl font-bold text-center text-purple-700">Jane Doe</h1> {/* Poner info de usuario */}
                <p className="mt-2 text-center text-gray-600">Universidad Metropolitana</p>
                <div className="flex justify-center mt-4 space-x-4">
                    <div className="text-center">
                        <p className="text-lg font-semibold text-gray-700">232</p>
                        <p className="text-sm text-gray-500">Reservas</p>
                    </div>
                    <div className="text-center">
                        <p className="text-lg font-semibold text-gray-700">12</p>
                        <p className="text-sm text-gray-500">Torneos</p>
                    </div>
                </div>
                <div className="flex justify-center mt-6 space-x-4">
                    <Button className="btn-sm btn-secondary w-24"
                        label="Back"
                        labelSize="text-md"></Button>
                    <Button className="btn-sm btn-primary w-30"
                        label="Edit Profile"
                        labelSize="text-md"
                        onClick={handleEditClick}></Button>
                </div>
            </div>

        </>
    );
}
