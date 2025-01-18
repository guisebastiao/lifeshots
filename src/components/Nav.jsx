import { NavLink } from "react-router-dom";
import { House, Globe, SquarePlus, Search } from "lucide-react";

import { PictureNav } from "@/components/PictureNav";

export const Nav = () => {
  return (
    <section className="fixed bottom-0 w-full h-12 flex justify-center border-t border-t-zinc-800 bg-zinc-950 z-50">
      <nav className="flex items-center max-w-md w-full">
        <ul className="w-full flex justify-around">
          <li>
            <NavLink to="/">
              {({ isActive }) => (
                <House
                  size={22}
                  className={isActive ? "text-zinc-50" : "text-zinc-400"}
                />
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/explorer">
              {({ isActive }) => (
                <Globe
                  size={22}
                  className={isActive ? "text-zinc-50" : "text-zinc-400"}
                />
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/post">
              {({ isActive }) => (
                <SquarePlus
                  size={22}
                  className={isActive ? "text-zinc-50" : "text-zinc-400"}
                />
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/search">
              {({ isActive }) => (
                <Search
                  size={22}
                  className={isActive ? "text-zinc-50" : "text-zinc-400"}
                />
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile">
              {({ isActive }) => (
                <PictureNav
                  className={isActive ? "border-zinc-50" : "border-zinc-400"}
                />
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
    </section>
  );
};
