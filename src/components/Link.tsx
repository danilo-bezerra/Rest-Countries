import { NavLink, NavLinkProps } from "react-router-dom";

type Props = NavLinkProps & {};

export default function Link({ children, className = "", ...rest }: Props) {
  return (
    <NavLink
      className={
        "flex gap-2 max-w-max bg-white text-gray-900 dark:bg-gray-700 dark:text-white px-4 py-1 rounded-md " +
        className
      }
      {...rest}
    >
      <>{children}</>
    </NavLink>
  );
}
