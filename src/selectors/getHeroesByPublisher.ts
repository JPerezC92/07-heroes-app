import { heroes } from "../data/heroes";

export const getHeroById = (id: string) =>
  heroes.find((hero) => hero.id === id);
