"use client";

import { useAuth, useSignOut } from "@spin-spot/services";
import Link from "next/link";
import { SpinSpotIcon } from "../extra-icons";
import { Loader } from "../loaders";

export function Header() {
  const user = useAuth();
  const signOut = useSignOut();

  console.log(user);

  const handleLogoutClick = () => {
    signOut.mutate();
  };

  return (
    <div className="navbar bg-base-200">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Mesas</a>
            </li>
            <li>
              <a>Torneos</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link
          href="/"
          tabIndex={0}
          role="button"
          className="btn btn-link btn-lg avatar"
        >
          <SpinSpotIcon />
        </Link>
      </div>
      <div className="navbar-end">
        {!user.isLoading ? (
          <div className="dropdown dropdown-end flex">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-full rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-[60px] w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">Profile</a>
              </li>
              <li>
                <a className="text-red-500" onClick={handleLogoutClick}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <Loader size="lg"></Loader>
        )}
      </div>
    </div>
  );
}
