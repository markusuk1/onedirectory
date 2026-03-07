"use client";

import { signOut } from "next-auth/react";

export default function OperatorSignOut() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/operator/login" })}
      className="text-sm text-text-light hover:text-text"
    >
      Sign out
    </button>
  );
}
