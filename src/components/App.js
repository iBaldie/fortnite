import React, { useState, useEffect } from "react";
import axios from "axios";
import FortniteContext from "../context/fortnite-context";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [image, setImage] = useState("");
  const [featured, setFeatured] = useState({});

  useEffect(() => {
    axios
      .get(
        "https://fortnite-api.com/v1/stats/br/v2?name=ibaldie&image=all&timeWindow=lifetime"
      )
      .then((response) => {
        console.log("Fething Data... ");
        console.log(response);
        setImage(response.data.data.image);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });

    axios
      .get("https://fortnite-api.com/v2/shop/br/combined")
      .then((response) => {
        setFeatured(response.data.data.featured);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <FortniteContext.Provider value={{ featured }}>
      <h1>Featured</h1>
      {loading
        ? "Loading..."
        : featured.entries.map((entry) => {
            return (
              <div>
              <p>-----------------------------------</p>
                {entry.bundle ? (
                  <div>
                    <h2>{entry.bundle.name}</h2>
                    <h3>{entry.bundle.info}</h3>
                    <img alt={entry.bundle.name} src={entry.bundle.image} />
                  </div>
                ) : (
                  ""
                )}
                {entry.items.map((item) => (
                  <div key={item.id}>
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                  <img alt={item.name} src={item.images.smallIcon} />
                  </div>
                  ))}
                  <p>{entry.finalPrice}</p>
                </div>

            );
          })}

      <img alt="iBaldie" src={image} />
      <p>{error ? "Error!" : ""}</p>
    </FortniteContext.Provider>
  );
};

export { App as default };
