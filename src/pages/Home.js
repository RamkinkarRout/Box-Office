import React, { useState } from "react";
import ActorGrid from "../components/actor/ActorGrid";
import MainPageLayout from "../components/MainPageLayout";
import { apiGet } from "../components/misc/config";
import { useLastQuery } from "../components/misc/Custom-hooks";
import ShowGrid from "../components/shows/ShowGrid";

const Home = () => {
  const [input, setInput] = useLastQuery();
  const [results, setresults] = useState(null);
  const [searchOption, setSearchOption] = useState("shows");
  const isShowsSearch = searchOption === "shows";
  // saving input field text to our useState
  const onInputChange = (ev) => {
    setInput(ev.target.value);
  };

  //fetching data
  const onSearch = () => {
    // https://api.tvmaze.com/search/shows?q=girls

    apiGet(`/search/${searchOption}?q=${input}`).then((result) => {
      setresults(result);
      console.log(result);
    });
  };
  //keycode for enter to show results
  const keyDown = (ev) => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };
  //conditional rendering according to search text if the results ll be null

  //On change for radio buttons
  const onRadioChange = (ev) => {
    setSearchOption(ev.target.value);
  };
  console.log(searchOption);

  //Rendering Results
  const renderResult = () => {
    if (results && results.length === 0) {
      return <div>No Results Found 😓</div>;
    }

    if (results && results.length > 0) {
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );
    }
    return null;
  };

  return (
    <MainPageLayout>
      <input
        type="text"
        placeholder="Search For Something"
        onChange={onInputChange}
        onKeyDown={keyDown}
        value={input}
      />

      <div>
        <label htmlFor="shows-search">
          Shows
          <input
            type="radio"
            id="shows-search"
            value="shows"
            checked={isShowsSearch}
            onChange={onRadioChange}
          />
        </label>

        <label htmlFor="actors-search">
          Actors
          <input
            type="radio"
            id="actors-search"
            checked={!isShowsSearch}
            value="people"
            onChange={onRadioChange}
          />
        </label>
      </div>

      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResult()}
    </MainPageLayout>
  );
};

export default Home;
