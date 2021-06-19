import { useMemo } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { getHeroById } from "../../selectors/getHeroesByPublisher";

const HeroScreen = () => {
  const { heroeId = "" }: { heroeId: string } = useParams();
  const history = useHistory();

  const hero = useMemo(() => getHeroById(heroeId), [heroeId]);

  const handleClick = () =>
    history.length > 2 ? history.goBack() : history.push("/");

  if (!hero) return <Redirect to="/" />;

  return (
    <div className="row mt-5">
      <div className="col-4">
        <img
          className="img-thumbnail"
          src={`../assets/heroes/${heroeId}.jpg`}
          alt={hero.superhero}
        />
      </div>

      <div className="col-8">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <b>Alter ego:</b> {hero.alter_ego}
          </li>
          <li className="list-group-item">
            <b>Publisher:</b> {hero.publisher}
          </li>
          <li className="list-group-item">
            <b>First Appearance:</b> {hero.first_appearance}
          </li>
        </ul>

        <h5>Characters</h5>

        <p>{hero.characters}</p>

        <button className="btn btn-outline-info" onClick={handleClick}>
          Return
        </button>
      </div>
    </div>
  );
};

export default HeroScreen;
