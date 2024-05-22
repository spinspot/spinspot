"use client";

import { EnvelopeIcon, UserIcon } from '@heroicons/react/16/solid';
import { TextInput, Button } from '@spin-spot/components';
import Image from 'next/image';
import { AuthContext, useUser } from '@spin-spot/services';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
export default function edit() {

    const router = useRouter();

    const handleBackClick = () => {
        router.push('/profile');
    };
        



    const { user, isLoading: isAuthLoading } = useContext(AuthContext);
    const userId = user?._id; 

    const { data: userProfile, isLoading, error } = useUser(userId ?? '');


    if (isAuthLoading || isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading user data</div>;
    }

    return (
        <>
            <div className="absolute inset-0  z-40 flex flex-col items-center justify-center mb-3">
                <div className="w-90 h-32 rounded-full overflow-hidden bg-black">
                    <Image
                        src="" // PONER PERFIL DE USUARIO
                        alt="Jane Doe"
                        width={128}
                        height={128}
                        className="object-cover" />

                </div>
                {/*Formulario*/}
                <TextInput
                    placeholder={userProfile?.firstName || " "} 
                    topRightLabel='First Name'
                    iconLeft = {
                        <UserIcon className="text-primary h-6 w-6"></UserIcon>
                    }
                ></TextInput>
                <TextInput
                    placeholder={userProfile?.lastName || " "} 
                    topRightLabel='Last Name'
                    iconLeft = {
                        <UserIcon className="text-primary h-6 w-6"></UserIcon>
                    }
                ></TextInput>
                <TextInput
                    placeholder={userProfile?.email || " "}
                    iconLeft = {
                        <EnvelopeIcon className="text-primary h-6 w-6"></EnvelopeIcon>
                    }
                    topRightLabel='Email'
                ></TextInput>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-base">Gender</span>
                    </div>
                    <select className="select select-bordered">
                        <option disabled selected>Pick one</option>
                        <option>Masculine</option>
                        <option>Femenine</option>
                        <option>Other</option>
                    </select>
                </label>
                <div className="flex justify-center mt-6 space-x-4">
                    <Button className="btn-md btn-secondary w-32"
                        label="Back"
                        labelSize="text-md"
                        onClick = {handleBackClick}>
                        </Button>
                    <Button className="btn-md dark:btn-neutral btn-primary w-40 "
                        label="Edit Profile"
                        labelSize="text-md"
                        ></Button>
                </div>

            </div>

        </>
    )
}