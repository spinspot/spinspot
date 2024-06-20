import { bookingService } from "@/booking";
import { sendMail } from "@/email";
import {
  ApiError,
  acceptInvitationParamsDefinition,
  getInvitationParamsDefinition,
  invitePlayerInputDefinition,
} from "@spin-spot/models";
import { Request, Response } from "express";
import { invitationService } from "./service";

async function getInvitation(req: Request, res: Response) {
  const params = getInvitationParamsDefinition.parse(req.params);
  const invitation = await invitationService.getInvitation(params._id);
  return res.status(200).json(invitation);
}

async function invitePlayer(req: Request, res: Response) {
  const invitationData = invitePlayerInputDefinition.parse(req.body);
  const user = req.user!;

  const invitation = await invitationService.createInvitation({
    ...invitationData,
    from: user._id,
    status: "PENDING",
  });

  const link = new URL(
    `/invitation/${encodeURIComponent(`${invitation._id}`)}`,
    process.env.CLIENT_APP_URL,
  ).href;

  await sendMail({
    from: `Spin Spot 🏓 <${process.env.EMAIL_USER}>`,
    to: `${invitation.email}`,
    subject: `${user?.firstName} te ha invitado a SpinSpot 🏓`,
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        .button {
          display: inline-block;
          padding: 10px 20px;
          font-size: 16px;
          background-color: #02415a;
          color: #ffffff !important;
          text-decoration: none;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }

        .button:hover {
          background-color: #022431;
          color: #ffffff;
        }

        .text {
          color: #000000;
        }
      </style>
    </head>
    <body>
      <p class="text">Hola, ${invitation.firstName}! El usuario ${user.firstName} ${user.lastName} te ha invitado a su reserva en SpinSpot. Presiona el botón a continuación para unirte:</p>
      <a href="${link}" class="button">Ver invitación</a>
    </body>
    </html>
  `,
  });

  return res.status(200).json(invitation);
}

async function acceptInvitation(req: Request, res: Response) {
  const params = acceptInvitationParamsDefinition.parse(req.params);
  const user = req.user!;
  const invitation = await invitationService.getInvitation(params._id);

  if (!invitation) {
    throw new ApiError({
      status: 404,
      errors: [{ message: "No se encontró la invitación" }],
    });
  }

  if (`${user.email}` !== `${invitation.email}`) {
    throw new ApiError({
      status: 500,
      errors: [{ message: "No puedes aceptar esta invitación" }],
    });
  }

  if (
    invitation.booking.players.some(
      (player) => `${player._id}` === `${user._id}`,
    )
  ) {
    throw new ApiError({
      status: 500,
      errors: [{ message: "Ya estás en esta reserva" }],
    });
  }

  const newPlayers = [
    ...invitation.booking.players.map((player) => player._id),
    user._id,
  ];

  await bookingService.updateBooking(invitation.booking._id, {
    players: newPlayers,
  });

  return res.status(200).json(user);
}

export const invitationController = {
  getInvitation,
  invitePlayer,
  acceptInvitation,
} as const;
