"use client";

import { useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  const userName = session?.user?.name ?? "User";

  return (
    <header className="px-4 py-3 shadow flex items-center justify-between">
      <h1 className="font-bold">Hi, {userName}!</h1>
    </header>
  );
};

export default Header;
