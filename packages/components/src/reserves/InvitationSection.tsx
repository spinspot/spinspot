"use client";
import { useRouter } from "next/navigation";
import { Button } from "../buttons";
import { TextInput } from "../text-inputs";
interface InvitationProps{
    timeBlockId: string;
    reservationOwner: { firstName: string; lastName: string } | null;
}

export function InvitationSection({
timeBlockId,
reservationOwner
}:InvitationProps){
    const router = useRouter();
    const handleClick = () => {
        router.push("/invitation");
      };
    return(
        <div className="mt-6 flex flex-col items-center">
            <h3 className="mt-4 text-center text-lg">
              Ingrese un correo para mandar la invitacion.
            </h3>
            <TextInput className="mt-4"/>
            <Button 
                label="Enviar email"
                labelSize="text-sm"
                className="btn-md btn-primary mt-4"
                onClick={handleClick}
            />
        </div>
    )
}