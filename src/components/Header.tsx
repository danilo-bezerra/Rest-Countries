import { NavLink } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="bg-white  py-6 px-4 shadow-lg dark:shadow-gray-900 dark:bg-gray-700">
      <div className="flex justify-between items-center max-w-[1440px] mx-auto ">
        <NavLink to="/">
          <h1 className="font-bold text-2xl dark:text-slate-100">
            Países do mundo
          </h1>
        </NavLink>

        <ThemeSwitcher />
      </div>
    </header>
  );
}
