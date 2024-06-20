import z from "zod";
import { IBooking } from "../booking";
import { baseModelDefinition, objectIdDefinition } from "../definitions";
import { IUser, createUserInputDefinition, userDefinition } from "../user";

export const invitationStatusDefinition = z.enum(["PENDING", "ACCEPTED"]);

export const invitationDefinition = baseModelDefinition.extend({
  email: userDefinition.shape.email,
  firstName: userDefinition.shape.firstName,
  lastName: userDefinition.shape.lastName,
  from: objectIdDefinition,
  booking: objectIdDefinition,
  status: invitationStatusDefinition,
});
export type TInvitationDefinition = z.infer<typeof invitationDefinition>;

export type IInvitation = z.infer<typeof invitationDefinition>;
export type IPopulatedInvitation = Omit<IInvitation, "from"> & {
  from: IUser;
  booking: IBooking;
};

export const getInvitationParamsDefinition = invitationDefinition.pick({
  _id: true,
});
export type TGetInvitationParamsDefinition = z.infer<
  typeof getInvitationParamsDefinition
>;

export const createInvitationInputDefinition = invitationDefinition.omit({
  _id: true,
});
export type TCreateInvitationInputDefinition = z.infer<
  typeof createInvitationInputDefinition
>;

export const invitePlayerInputDefinition = createInvitationInputDefinition.omit(
  {
    status: true,
    from: true,
  },
);
export type TInvitePlayerInputDefinition = z.infer<
  typeof invitePlayerInputDefinition
>;

export const acceptInvitationParamsDefinition = invitationDefinition.pick({
  _id: true,
});
export type TAcceptInvitationParamsDefinition = z.infer<
  typeof acceptInvitationParamsDefinition
>;

export const acceptInvitationInputDefinition = createUserInputDefinition.pick({
  password: true,
});
export type TAcceptInvitationInputDefinition = z.infer<
  typeof acceptInvitationInputDefinition
>;
