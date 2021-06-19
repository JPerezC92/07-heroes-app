import { heroes } from "../data/heroes";
import { Publisher } from "../types/publisher";

export const getHeroesByPublisher = (publisher: Publisher) => {
  const validPublisher: Publisher[] = ["DC Comics", "Marvel Comics"];

  if (!validPublisher.includes(publisher)) {
    throw new Error(`Publisher ${publisher} not found`);
  }

  return heroes.filter((hero) => hero.publisher === publisher);
};
