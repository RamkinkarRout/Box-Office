import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { apiGet } from "../components/misc/config";

const Show = () => {
  const { id } = useParams();
  //   console.log(params);
  const [show, setShow] = useState("");

  useEffect(() => {
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then((results) => {
      setShow(results);
    });
  }, [id]);
  console.log(show);
  return <div>showp page</div>;
};

export default Show;
