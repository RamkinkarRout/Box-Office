import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { apiGet } from "../components/misc/config";

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
        }, 2000);
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
  return <div>showp page</div>;
};

export default Show;
