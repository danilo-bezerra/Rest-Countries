import React from "react";
import { useState, useEffect } from "react";
import { ArrowLeft } from "phosphor-react";
import { useParams } from "react-router-dom";
import Link from "../components/Link";
import { CountryDTO } from "../DTOs/countryDTO";
import { api } from "../services/api";

type Props = {};

export default function Country({}: Props) {
  const [country, setCountry] = useState<CountryDTO>();
  const [borders, setBorders] = useState<CountryDTO[]>();

  const { id } = useParams();

  useEffect(() => {
    async function getCountry() {
      const res = await api.get(`/alpha/${id}`);
      setCountry(res.data[0]);
    }
    getCountry();
  }, [id]);

  useEffect(() => {
    if (country?.borders) {
      async function getBorders() {
        const res = await api.get(`/alpha?codes=${country?.borders.join(",")}`);
        setBorders(res.data);
      }
      getBorders();
    }
    document.title = country?.name.common!;
  }, [country]);

  return (
    <main className="p-6 dark:text-zinc-200 max-w-[1484px] mx-auto">
      <Link to="/" className="mb-10">
        <ArrowLeft size={24} /> Back
      </Link>
      {country && (
        <section className="grid grid-cols-1 md:grid-cols-2 md:gap-20">
          <img src={country?.flags?.svg} alt="" />

          <div>
            <h2 className="text-3xl font-bold mb-2 mt-6 dark:text-white col-span-2">
              {country.name.common}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 py-8  gap-y-6 gap-x-4">
              <div className="flex flex-col gap-2">
                <p>
                  <strong>Native Name:</strong> {country.name.official}
                </p>
                <p>
                  <strong>Population:</strong>{" "}
                  {country.population.toLocaleString()}
                </p>
                <p>
                  <strong>Region:</strong> {country.region}
                </p>
                <p>
                  <strong>Sub Region:</strong> {country.subregion}
                </p>
                <p>
                  <strong>Capital:</strong> {country.capital}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p>
                  <strong>Top level Domain:</strong> {country.tld.map((t) => t)}
                </p>
                <p>
                  <strong>Currencies:</strong>{" "}
                  {Object.values(country.currencies)
                    .map((v: any) => v.name)
                    .join(", ")}
                </p>
                <p>
                  <strong>Languages:</strong>{" "}
                  {Object.values(country.languages)
                    .map((v) => v)
                    .join(", ")}
                </p>
              </div>
            </div>
            {borders && (
              <div className="col-span-2 flex flex-wrap items-center gap-2">
                <h3 className="font-semibold w-full md:w-max">
                  Border Countries:{" "}
                </h3>
                {borders.map((c) => (
                  <Link to={`/country/${c.cca2}`} key={c.cca2}>
                    {c.name.common}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
