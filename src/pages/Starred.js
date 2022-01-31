import React, { useEffect, useState } from "react";
import MainPageLayout from "../components/MainPageLayout";
import { apiGet } from "../components/misc/config";
import { useShows } from "../components/misc/Custom-hooks";
import ShowGrid from "../components/shows/ShowGrid";

const Starred = () => {
  const [starred] = useShows();

  const [shows, setShows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map((showId) => apiGet(`/shows/${showId}`));

      Promise.all(promises)
        .then((apiData) => apiData.map((show) => ({ show })))
        .then((results) => {
          setShows(results);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [starred]);

  return (
    <MainPageLayout>
      {isLoading && <div> Shows all still loading ⌚ </div>}
      {error && <div>Error Occured 😖: {error} </div>}
      {!isLoading && !shows && <div>No shows are added</div>}
      {!isLoading && !error && shows && <ShowGrid data={shows} />}
    </MainPageLayout>
  );
};

export default Starred;
