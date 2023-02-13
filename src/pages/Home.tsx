import { useState, useEffect, FormEvent } from "react";
import { MagnifyingGlass } from "phosphor-react";
import { CountryDTO } from "../DTOs/countryDTO";
import { api } from "../services/api";
import { NavLink } from "react-router-dom";
import Loading from "../components/Loading";

type Props = {};

export default function Home({}: Props) {
  const [countries, setCountries] = useState<CountryDTO[]>([]);
  const [region, setRegion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [input, setInput] = useState("");

  const filteredCountries = region
    ? countries.filter((c) => c.region.toLowerCase() == region)
    : countries;

  async function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (input) {
      const res = await api.get("/name/" + input);
      const { data } = res;
      setCountries(data);
    }
  }

  useEffect(() => {
    async function getAll() {
      setIsLoading(true);
      const res = await api.get("/all");
      const { data } = res;
      setCountries(data);
      setIsLoading(false);
    }
    document.title = "Alien Countries";
    getAll();
  }, []);

  return (
    <main className="p-6 text-gray-900 dark:text-white max-w-[1484px] mx-auto">
      <div className="flex justify-between flex-col   gap-6 md:flex-row">
        <form
          className="flex bg-white dark:bg-gray-700 px-6 py-4 rounded-md shadow-md dark:text-zinc-100"
          onSubmit={handleSearch}
        >
          <input
            className="w-full bg-transparent border-none outline-none"
            type="text"
            placeholder="Pesquise um país..."
            value={input}
            onChange={({ target }) => setInput(target.value)}
          />
          <button className="dark:text-zinc-100 text-gray-800">
            <MagnifyingGlass size={24} />
          </button>
        </form>
        <div className="px-6 py-4 bg-white dark:bg-gray-700 rounded-md border-none outline-none">
          <select
            className=" border-none outline-none bg-white dark:bg-gray-700 w-full md:w-36"
            value={region}
            onChange={({ target }) => setRegion(target.value)}
          >
            <option value="">Filter by region</option>
            <option value="africa">Africa</option>
            <option value="americas">Americas</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="oceania">Oceania</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 py-8">
          {filteredCountries.map((c, i) => (
            <NavLink
              to={`/country/${c.cca2}`}
              key={c.cca2}
              className="bg-white text-gray-900 dark:bg-gray-700 dark:text-white rounded-md max-w-max mx-auto overflow-hidden shadow-md"
            >
              <img className="" src={c.flags.png} alt={c.flags.alt} />
              <div className="p-6">
                <h3 className="font-bold text-xl pb-3">{c.name.common}</h3>
                <p>
                  <span className="font-semibold">Population:</span>{" "}
                  {c.population.toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">Region:</span> {c.region}
                </p>
                <p>
                  <span className="font-semibold">Capital:</span> {c.capital}
                </p>
              </div>
            </NavLink>
          ))}
        </section>
      )}
    </main>
  );
}
