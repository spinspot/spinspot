"use client";

import { EnvelopeIcon, UserIcon } from '@heroicons/react/16/solid';
import { TextInput, Button, SelectInput } from '@spin-spot/components';
import Image from 'next/image';
import { AuthContext, useUser } from '@spin-spot/services';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUserInputDefinition, TUpdateUserInputDefinition } from '@spin-spot/models';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useUpdateUser } from '@spin-spot/services';

export default function edit() {

    const router = useRouter();

    const { user, isLoading: isAuthLoading } = useContext(AuthContext);
    const userId = user?._id;

    const { data: userProfile, isLoading, error } = useUser(userId ?? '');

    const updateUser = useUpdateUser();

    const handleBackClick = () => {
        router.push('/profile');
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TUpdateUserInputDefinition>({
        resolver: zodResolver(updateUserInputDefinition),
        defaultValues: {
            firstName: userProfile?.firstName,
            lastName: userProfile?.lastName,
            email: userProfile?.email,
            gender: userProfile?.gender,
        },
        shouldFocusError: false,
        mode: "onBlur",
    });

    const handleUpdateProfile: SubmitHandler<TUpdateUserInputDefinition> = (data) => {
        if (userId) {
            updateUser.mutate(
                { _id: userId, ...data },
                {
                    onSuccess: () => {
                        router.push('/profile');
                    },
                }
            );
        }
    };



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
                    placeholder="First Name"
                    topRightLabel='First Name'
                    iconLeft={<UserIcon className="text-primary h-6 w-6" />}
                    {...register('firstName')}
                    className={errors.firstName ? 'input-error' : ''}
                    bottomLeftLabel={errors.firstName?.message}
                />
                <TextInput
                    placeholder="Last Name"
                    topRightLabel='Last Name'
                    iconLeft={<UserIcon className="text-primary h-6 w-6" />}
                    {...register('lastName')}
                    className={errors.lastName ? 'input-error' : ''}
                    bottomLeftLabel={errors.lastName?.message}
                />
                <TextInput
                    placeholder="Email"
                    topRightLabel='Email'
                    iconLeft={<EnvelopeIcon className="text-primary h-6 w-6" />}
                    {...register('email')}
                    className={errors.email ? 'input-error' : ''}
                    bottomLeftLabel={errors.email?.message}
                />
                <SelectInput
                    options={['MALE', 'FEMALE', 'OTHER']}
                    defaultOption='Elige tu Género'
                    topRightLabel='Género'
                    {...register('gender')}
                    className={errors.gender ? 'input-error' : ''}
                    bottomLeftLabel={errors.gender?.message}    
                    ></SelectInput>
                <div className="flex justify-center mt-6 space-x-4">
                    <Button className="btn-md btn-secondary w-32"
                        label="Back"
                        labelSize="text-md"
                        onClick={handleBackClick}>
                    </Button>
                    <Button className="btn-md dark:btn-neutral btn-primary w-40 "
                        label="Edit Profile"
                        labelSize="text-md"
                        onClick={handleSubmit(handleUpdateProfile)}
                    ></Button>
                </div>

            </div>

        </>
    )
}