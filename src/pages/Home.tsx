import { useState, useEffect, FormEvent } from "react";
import { MagnifyingGlass } from "phosphor-react";
import { CountryDTO } from "../DTOs/countryDTO";
import { api } from "../services/api";
import { NavLink } from "react-router-dom";
import Loading from "../components/Loading";
import { CountryList } from "../components/CountryList";

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
      try {
        setIsLoading(true);
        const res = await api.get("translation/" + input);
        const { data } = res;
        setCountries(data);
      } catch {
        setCountries([]);
      } finally {
        setIsLoading(false);
      }
    }
  }

  async function getAllCountries() {
    setIsLoading(true);
    const res = await api.get("/all");
    const { data } = res;
    setCountries(data);
    setIsLoading(false);
    setInput("");
  }

  useEffect(() => {
    document.title = "Países do mundo | Home";
    getAllCountries();
  }, []);

  return (
    <main className="p-6 text-gray-900 dark:text-white max-w-[1484px] mx-auto">
      <div className="flex justify-between flex-col   gap-6 md:flex-row">
        <form
          className="flex bg-white dark:bg-gray-700 px-6 py-4 rounded-md shadow-md dark:text-zinc-100 md:w-[400px] "
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
            <option value="">Filtrar por região</option>
            <option value="africa">Africa</option>
            <option value="americas">America</option>
            <option value="asia">Asia</option>
            <option value="europe">Europa</option>
            <option value="oceania">Oceania</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <CountryList list={filteredCountries} onBack={getAllCountries} />
      )}
    </main>
  );
}
