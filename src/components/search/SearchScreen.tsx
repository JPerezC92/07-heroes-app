import React, { FormEventHandler } from "react";
import { heroes } from "../../data/heroes";
import HeroCard from "../heroes/HeroCard";
import useForm from "./useForm";

interface Props {}

const SearchScreen = (props: Props) => {
  const heroesFiltered = heroes;

  const { values, handleInputChange } = useForm({ searchClue: "" });

  const handleSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <div>
      <h1>SearchScreen</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Search</h4>

          <form onSubmit={handleSearch} autoComplete="off">
            <input
              type="text"
              placeholder="Search your hero"
              className="form-control"
              name="searchClue"
              value={values.searchClue}
              onChange={handleInputChange}
            />

            <button
              type="submit"
              className="btn mt-1 btn-block btn-outline-primary"
            >
              Search...
            </button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />

          {heroesFiltered.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchScreen;
