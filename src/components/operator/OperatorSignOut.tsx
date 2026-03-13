"use client";

import { signOut } from "next-auth/react";

export default function OperatorSignOut() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/operator/login" })}
      className="text-sm text-white/70 hover:text-white transition-colors"
    >
      Sign out
    </button>
  );
}
