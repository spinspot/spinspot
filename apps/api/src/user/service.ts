import {
  IUser,
  TGetUserParamsDefinition,
  TGetUsersQueryDefinition,
  TUpdateUserInputDefinition,
  TUpdateUserParamsDefinition,
  userSchema,
  bookingSchema,
  type TCreateUserInputDefinition,
} from "@spin-spot/models";
import { hash } from "bcrypt";
import { UpdateQuery, model } from "mongoose";

userSchema.pre("save", async function (next) {
  if (this.password) this.password = await hash(this.password, 10);
  next();
});
userSchema.pre("findOneAndUpdate", async function (next) {
  const user: UpdateQuery<IUser> | null = this.getUpdate();
  if (user?.password) user.password = await hash(user.password, 10);
  next();
});
userSchema.set("toJSON", {
  transform(doc, ret) {
    delete ret["password"];
    delete ret["googleId"];
    return ret;
  },
});
const User = model("User", userSchema);
const Booking = model("Booking", bookingSchema);

async function getUsers(filter: TGetUsersQueryDefinition = {}) {
  const users = await User.find(filter);
  return users;
}

async function getUser(_id: TGetUserParamsDefinition["_id"]) {
  const user = await User.findById(_id);
  return user;
}

async function createUser(data: TCreateUserInputDefinition) {
  const user = await User.create(data);
  return user;
}

async function updateUser(
  _id: TUpdateUserParamsDefinition["_id"],
  data: TUpdateUserInputDefinition,
) {
  const user = await User.findByIdAndUpdate(_id, data);
  return user;
}

async function getAvailableUsers() {
    const bookings = await Booking.aggregate([
      {
        $match: {
          status: { $in: ["PENDING", "IN_PROGRESS"] }
        }
      },
      {
        $unwind: "$players"
      },
      {
        $group: {
          _id: null,
          players: { $addToSet: "$players" }
        }
      }
    ]);

    const playersInBookings = bookings[0]?.players || [];

    const availableUsers = await User.find({
      _id: { $nin: playersInBookings }
    });

    return availableUsers;
}


export const userService = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  getAvailableUsers,
} as const;
