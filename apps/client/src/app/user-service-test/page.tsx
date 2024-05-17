"use client";

import { useCreateUser, useUsers } from "@spin-spot/services";

export default function UserService() {
  const users = useUsers();
  const createUser = useCreateUser();

  const handleSubmit = () => {
    createUser.mutate(
      {
        email: "new@mail.com",
        firstName: "John",
        lastName: "Doe",
        gender: "MALE",
        password: "password123A",
        userType: "PLAYER",
        isActive: true,
      },
      {
        onSuccess() {
          users.refetch();
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <button onClick={handleSubmit}>Agregar</button>
      {users.data?.map((user) => <pre>{JSON.stringify(user)}</pre>)}
    </div>
  );
}
