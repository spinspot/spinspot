"use client";

import { TextInput } from '@spin-spot/components';
import Image from 'next/image';
export default function edit() {

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
                    placeholder="Jane" // PONER NOMBRE DE USUARIO
                    
                    topRightLabel='First Name'
                ></TextInput>
                <TextInput
                    placeholder="Doe" // PONER APELLIDO DE USUARIO
                    
                    topRightLabel='Last Name'
                ></TextInput>
                <TextInput
                    placeholder="email" // PONER CORREO DE USUARIO
                    
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

            </div>

        </>
    )
}