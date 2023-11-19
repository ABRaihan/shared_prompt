"use client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

type ProviderType = {
  children: React.ReactNode;
  session: Session | null | undefined;
};

const Provider = ({ children, session }: ProviderType) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
export default Provider;
