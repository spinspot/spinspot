"use client";

import * as React from 'react';
import { Badges, Button, GoogleIcon, Pagination, SelectInput, TextInput } from "@spin-spot/components";
import { useAuth } from "@spin-spot/services";
import { useState, useEffect } from "react";

export default function Reserve(){
    const {user}= useAuth();
    const userName=user?.firstName;
    const options= ["Single 1 Vs 1","Double 2 Vs 2"];
    const optinosNo=["NO","Si"];
    const players=["Andres","Fabrizio", "Mich", "Dani"]

    const [eventType, setEventType] = useState<string | null>(null);
    const [indumentary, setIndumentary] = useState<string | null>(null);
    console.log(eventType);
    console.log("Quier indumentaria? :" +indumentary);
    return( 
    <div className="flex-grow py-32 font-body">
        <div className="font-title text-center pb-12">
            <h1 className="text-3xl font-bold">Datos de la reserva</h1>
        </div>

        <div className="flex justify-center w-full">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <Badges labelName="Fecha" label="2024-05-12" leftIcon={<GoogleIcon/>}/>
                <Badges labelName="Horario" label="8:30 -> 10:00" leftIcon={<GoogleIcon/>}/>
                <Badges labelName="Deporte" label="Ping-Pong" leftIcon={<GoogleIcon/>}/>
                <Badges labelName="Mesa" label="3" leftIcon={<GoogleIcon/>}/>

            </div>
        </div>

        <h3 className="flex justify-center mt-9 text-xl"> <span className="mr-1">Reservado por: </span> <span className="font-bold">{userName}</span></h3>
        <div className="flex flex-col items-center mt-6"> 
            <h3 className="mr-1 text-lg">Seleccione modalidad:  </h3> 
            <Pagination labels={options} size="sm" onPageChange={(label)=>setEventType(label ?? null)} className="btn-neutral text-nowrap mt-2 min-w-28"/>
        </div>
        <div className="flex flex-col items-center justify-center mt-6">
            <span className=" text-lg">Filtro de busqueda para jugadores:</span>
            <TextInput placeholder="Type here" className="mt-2"/>
            <>
            {eventType===null ? 
            <>
            </>: 
            <div className='mt-10'>
                {eventType==="Single 1 Vs 1" ? 
                <div>
                    <span className=" text-lg mt-4">Seleccione Jugador:</span>
                    <SelectInput options={players} defaultOption="Pick one option" disabled={false} className="my-3"/>
                </div>:
                <div >
                    <span className=" text-lg mt-4">Seleccionar Jugadores:</span>
                    <SelectInput options={players} defaultOption="Pick one option" disabled={false} className="my-3"/>
                    <SelectInput options={players} defaultOption="Pick one option" disabled={false} className="my-3"/>
                    <SelectInput options={players} defaultOption="Pick one option" disabled={false} className="my-3"/>
                </div> }
            </div>}
        </>

        </div>

        <div className="flex flex-col items-center font-body mt-10">
            <span className="">¿Posee raquetas y pelotas?</span>
            <Pagination labels={optinosNo} size="sm" onPageChange={(label)=>setIndumentary(label??null)} className="mt-2 btn-neutral text-nowrap px-5"/>
        </div>
        <div className="flex flex-row justify-center mt-14 gap-x-6">
            <Button label="Cancelar" labelSize="text-sm" className="btn-lg btn-secondary"/>
            <Button label="Reservar" labelSize="text-sm" className={(eventType!=null && indumentary!=null) ? "btn-lg btn-primary": " btn-primary btn-lg btn-disabled"}/>
        </div>
    </div>
    );
}