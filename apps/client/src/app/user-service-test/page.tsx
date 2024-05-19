"use client";

import {
  useCreateUser,
  useSignInWithCredentials,
  useSignInWithGoogle,
  useUsers,
} from "@spin-spot/services";

export default function UserService() {
  const users = useUsers();
  const createUser = useCreateUser();
  const signInWithCredentials = useSignInWithCredentials();
  const signInWithGoogle = useSignInWithGoogle();

  const handleSubmit = () => {
    createUser.mutate(
      {
        email: Date.now() + "new@mail.com",
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
      <button
        onClick={() =>
          signInWithCredentials.mutate({
            email: "new@mail.com",
            password: "password123A",
          })
        }
      >
        Sign In With Credentials
      </button>
      <button
        onClick={() =>
          signInWithGoogle.mutate({
            app: "client",
            route: "/user-service-test",
          })
        }
      >
        Sign In With Google
      </button>
      <button onClick={handleSubmit}>Agregar</button>
      {users.data?.map((user) => <pre>{JSON.stringify(user)}</pre>)}
    </div>
  );
}
