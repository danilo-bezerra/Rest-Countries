export interface CountryDTO {
  name: {
    common: string;
    official: string;
  };
  capital: string[];
  region: string;
  subregion: string;
  borders: string[];
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  cca2: string;
  population: number;
  tld: string[];
  currencies: any;
  languages: any;
}
