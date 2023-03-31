import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Navbar: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <nav className="w-full pt-4 z-10">
      <div className="navbar rounded-xl bg-primary bg-opacity-20 px-5">
        <div className="flex-1">
          <Image className="rounded-md" src="/t3-logo.svg" alt="logo" width={40} height={40} />
        </div>
        <div className="flex-none gap-2">
          {sessionData ? (
            <>
              <span className="text-sm">Logged in as <strong>{sessionData.user?.name}</strong></span>
              <div className="dropdown-end dropdown">
                <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
                  <div className="w-10 rounded-full">
                    {sessionData?.user?.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={sessionData?.user?.image} alt="Avatar" />
                    )}
                    {
                      (!sessionData.user.image && sessionData.user.name != null) && (
                        <span className="text-3xl">{sessionData.user.name[0]}</span>
                      )
                    }
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
                >
                  <li>
                    <button
                      className="rounded-full bg-white/10 px-10 py-3 text-center font-semibold text-white no-underline transition hover:bg-white/20"
                      onClick={() => void signOut()}
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <button
              className="btn-primary btn-sm btn border-none font-light"
              onClick={() => void signIn()}
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
