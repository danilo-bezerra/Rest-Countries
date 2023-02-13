import { useState } from "react";
import { Moon, Sun } from "phosphor-react";

import { zinc } from "tailwindcss/colors";

type Props = {};

export default function ThemeSwitcher({}: Props) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const color = isDarkMode ? zinc[100] : zinc[800];

  const toggleTheme = () => {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("dark-theme");
    setIsDarkMode((v) => !v);
  };

  return (
    <button onClick={toggleTheme}>
      {isDarkMode ? (
        <Moon size={28} color={color} />
      ) : (
        <Sun size={28} color={color} />
      )}
    </button>
  );
}
