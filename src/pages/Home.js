import React, { useState } from "react";
import MainPageLayout from "../components/MainPageLayout";
import { apiGet } from "../components/misc/config";

const Home = () => {
  const [input, setInput] = useState("");
  const [results, setresults] = useState(null);
  // saving input field text to our useState
  const onInputChange = (ev) => {
    setInput(ev.target.value);
  };

  //fetching data
  const onSearch = () => {
    // https://api.tvmaze.com/search/shows?q=girls

    apiGet(`/search/shows?q=${input}`).then((result) => {
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

  const renderResult = () => {
    if (results && results.length === 0) {
      return <div>No Results Found 😓</div>;
    }

    if (results && results.length > 0) {
      return (
        <div>
          {results.map((item) => (
            <div key={item.show.id}>{item.show.name}</div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <MainPageLayout>
      <input
        type="text"
        onChange={onInputChange}
        onKeyDown={keyDown}
        value={input}
      />
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResult()}
    </MainPageLayout>
  );
};

export default Home;
