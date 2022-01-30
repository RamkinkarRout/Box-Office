import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { apiGet } from "../components/misc/config";
import Cast from "../components/shows/Cast";
import Details from "../components/shows/Details";
import Season from "../components/shows/Season";
import ShowMainData from "../components/shows/ShowMainData";
import { InfoBlock, ShowPageWrapper } from "./Show.styled";

const Show = () => {
  const { id } = useParams();
  //   console.log(params);
  const [show, setShow] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then((results) => {
        setTimeout(() => {
          if (isMounted) {
            setShow(results);
            setIsLoading(false);
          }
        }, 1500);
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setIsLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [id]);
  console.log(show);
  if (isLoading) {
    return <div>Please wait for a while ⌚</div>;
  }
  if (error) {
    return <div>Error Occured: {error}😖</div>;
  }
  return (
    <ShowPageWrapper>
      <ShowMainData
        id={show.id}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
        image={show.image}
      />
      <InfoBlock>
        <h2>Details</h2>
        <Details
          status={show.status}
          network={show.network}
          premiered={show.premiered}
        />
      </InfoBlock>
      <InfoBlock>
        <h2>Seasons</h2>
        <Season seasons={show._embedded.seasons} />
      </InfoBlock>
      <InfoBlock>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} image={show.image} />
      </InfoBlock>
    </ShowPageWrapper>
  );
};

export default Show;
