"use client";

import { Badges, GoogleIcon, Pagination } from "@spin-spot/components";

export default function Reserve(){
    const options= ["Single 1 Vs 1","Double 2 Vs 2"];

    return( 
    <div className="flex-grow py-32 font-body">
        <div className="font-title text-center pb-12">
            <h1 className="text-3xl">Datos de la reserva</h1>
        </div>

        <div className="flex justify-center w-full">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <Badges labelName="fecha" label="2024-05-12" leftIcon={<GoogleIcon/>}/>
                <Badges labelName="Horario" label="8:30 -> 10:00" leftIcon={<GoogleIcon/>}/>
                <Badges labelName="Deporte" label="Ping-Pong" leftIcon={<GoogleIcon/>}/>
                <Badges labelName="Mesa" label="3" leftIcon={<GoogleIcon/>}/>

            </div>
        </div>

        <h3 className="flex justify-center mt-9 text-xl"> <span className="mr-1">Reservado por: </span> <span className="font-bold"> Jhon Doe</span></h3>
        <div className="flex flex-col items-center mt-6"> 
            <h3 className="mr-1">Seleccione modalidad:  </h3> 
            <Pagination labels={options} className=" mt-2 w-24"/>
        </div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
        <div>Holal holas</div>
    </div>
    );
}