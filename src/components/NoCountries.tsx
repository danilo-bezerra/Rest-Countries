import notFound from "../assets/not-found.png";

type Props = {
  onBack: () => void;
};

export function NoCountries({ onBack }: Props) {
  return (
    <div className="p-6 text-center  bg-zinc-200 mt-6 rounded-md shadow-lg dark:shadow-gray-900 dark:bg-gray-700">
      <img src={notFound} className="w-28 mx-auto" />
      <h2 className="text-xl font-bold  my-4">Nenhum país encontrado!</h2>
      <button
        className="bg-blue-500 text-white px-4 py-1 rounded-md"
        onClick={onBack}
      >
        Voltar
      </button>
    </div>
  );
}
