import { useMemo } from "react";
import { CSSProperties } from "react";
import { getHeroesByPublisher } from "../../selectors/getHeroById";
import { Publisher } from "../../types/publisher";
import HeroCard from "./HeroCard";

const HeroesList = ({ publisher }: { publisher: Publisher }) => {
  const heroesList = useMemo(
    () => getHeroesByPublisher(publisher),
    [publisher]
  );

  const styles: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(3, auto)",
    justifyContent: "space-between",
    gap: "15px",
  };

  return (
    <div
      className="card-columns animate__animated animate__fadeIn"
      style={styles}
    >
      {heroesList.map((hero) => (
        <HeroCard key={hero.id} {...hero} />
      ))}
    </div>
  );
};

export default HeroesList;
