import { useEffect, useState } from "react";
import { IHero } from "../../types/hero";
import { Link } from "react-router-dom";
import { dynamicImportImg } from "../../helper/dynamicImportImg";

const HeroCard = (props: IHero) => {
  const [heroImage, setHeroImage] = useState<string>("");
  useEffect(() => {
    if (props.id.length > 0) {
      dynamicImportImg(props.id).then((img) => setHeroImage(() => img));
    }
  }, [props.id]);

  return (
    <div className="card">
      <div className="row no-gutters">
        <div className="col-md-4">
          <img className="card-img" src={heroImage} alt={props.superhero} />
        </div>

        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{props.superhero}</h5>
            <p className="card-text">{props.alter_ego}</p>

            {props.alter_ego !== props.characters && (
              <p className="card-text">{props.characters}</p>
            )}
            <p className="card-text">
              <small className="text-muted">{props.first_appearance}</small>
            </p>

            <Link to={`./hero/${props.id}`}>Mas...</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
