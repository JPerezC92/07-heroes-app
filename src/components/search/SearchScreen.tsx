import { FormEventHandler, useMemo } from "react";
import queryString from "query-string";
import { RouteComponentProps } from "react-router-dom";
import HeroCard from "../heroes/HeroCard";
import useForm from "./useForm";
import { getHeroesByName } from "../../selectors/getHeroesByName";

interface Props extends RouteComponentProps {}

const SearchScreen = ({ location, history }: Props) => {
  const { q = "" } = queryString.parse(location.search);

  const {
    values: { searchText },
    handleInputChange,
  } = useForm({ searchText: typeof q === "string" ? q : "" || "" });

  const heroesFiltered = useMemo(
    () => getHeroesByName(typeof q === "string" ? q : ""),
    [q]
  );

  const handleSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    history.push(`?q=${searchText}`);
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
              name="searchText"
              value={searchText}
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

          {q?.length === 0 && (
            <div className="alert alert-info">Search a hero</div>
          )}

          {q?.length !== 0 && heroesFiltered.length === 0 && (
            <div className="alert alert-danger">
              There is not a hero with {q}
            </div>
          )}

          {heroesFiltered.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchScreen;
