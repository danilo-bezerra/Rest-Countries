import React from "react";
import { CountryDTO } from "../DTOs/countryDTO";
import { NavLink } from "react-router-dom";
import { NoCountries } from "./NoCountries";

type Props = {
  list: CountryDTO[];
  onBack: () => void;
};

export function CountryList({ list, onBack }: Props) {
  if (list.length == 0) {
    return <NoCountries onBack={onBack} />;
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-8 ">
      {list.map((c, i) => (
        <NavLink
          to={`/country/${c.cca2}`}
          key={c.cca2}
          className="bg-white text-gray-900 dark:bg-gray-700 dark:text-white rounded-md max-w-max mx-auto overflow-hidden shadow-md"
        >
          <img
            className="aspect-video w-full border-b-[1px]"
            src={c.flags.png}
            alt={c.flags.alt}
          />
          <div className="p-6 py-4">
            <h3 className="font-bold text-xl pb-3">{c.name.common}</h3>
            <p>
              <span className="font-semibold">População:</span>{" "}
              {c.population.toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Região:</span> {c.region}
            </p>
            <p>
              <span className="font-semibold">Capital:</span> {c.capital}
            </p>
          </div>
        </NavLink>
      ))}
    </section>
  );
}
