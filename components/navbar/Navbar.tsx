"use client";
import { BuiltInProviderType } from "next-auth/providers/index";
import {
  ClientSafeProvider,
  LiteralUnion,
  getProviders,
  signIn,
  signOut,
  useSession,
} from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  //? @___Locale State___@
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);
  const [toggleDropdown, setToggleDropDown] = useState(false);

  //? @___Auth Hooks___@
  const { data: session } = useSession();

  //? @___Mount Effects___@;
  useEffect(() => {
    const handleProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    handleProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={3}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* ?___Desktop Navigation___? */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" className="outline_btn" onClick={() => signOut()}>
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user?.image as string}
                alt="Profile"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          providers &&
          Object.values(providers).map((provider) => (
            <button
              key={provider.name}
              type="button"
              className="black_btn"
              onClick={() => signIn(provider.id)}
            >
              Sign In
            </button>
          ))
        )}
      </div>

      {/* ?___Mobile Navigation___? */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user?.image as string}
              alt="Profile"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => setToggleDropDown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  className="mt-5 w-full black_btn"
                  type="button"
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          providers &&
          Object.values(providers).map((provider) => (
            <button
              key={provider.name}
              type="button"
              className="black_btn"
              onClick={() => signIn()}
            >
              Sign In
            </button>
          ))
        )}
      </div>
    </nav>
  );
};
export default Navbar;
