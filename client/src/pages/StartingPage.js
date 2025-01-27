import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert";
import { Accordion, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCirclePlus } from "@fortawesome/free-solid-svg-icons";
function PostFormPage() {
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [instructions, setInstructions] = useState([]);
  const [ingrediants, setIngrediants] = useState([]);
  const [recipeName, setRecipeName] = useState([]);
  const [numOfRecipe, setNumOfRecipe] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showIngrediants, setShowIngrediants] = useState([]);
  let str = [""];
  let strIngrediants = [""];
  let promises = [];
  let promisesIngrediants = [];
  let countMiss = 0;

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    setIngrediants([]);
    setRecipeName([]);
    setInstructions([]);
    setNumOfRecipe(0);
    str = [""];
    strIngrediants = [""];
    event.preventDefault();
    try {
      let response = await fetch(
        `https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes&q=${content}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "794db09640msh73ba8daca21b059p134b5bjsn8bd96b2de9e6",
            "X-RapidAPI-Host": "tasty.p.rapidapi.com",
            "Content-type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          for (let i = 0; i < data.results.length; i++) {
            // For each recipe
            if (
              data.results[i].instructions !== undefined &&
              data.results[i].sections !== undefined
            ) {
              setRecipeName((pArray) => [...pArray, data.results[i].name]);
              for (let j = 0; j < data.results[i].instructions.length; j++) {
                //{console.log(data.results[i].instructions[j].display_text)}
                str[0] =
                  str[0] + data.results[i].instructions[j].display_text + " ";
              }
              promises.push(str[0]);
              for (let n = 0; n < data.results[i].sections.length; n++) {
                for (
                  let m = 0;
                  m < data.results[i].sections[n].components.length;
                  m++
                ) {
                  strIngrediants[0] =
                    strIngrediants[0] +
                    data.results[i].sections[n].components[m].raw_text +
                    ", ";
                }
              }
              promisesIngrediants.push(strIngrediants[0]);
              setNumOfRecipe((numOfRecipe) => numOfRecipe + 1);
              setShowIngrediants((prev3) => [...prev3, false]);
            } else {
              countMiss++;
            }
            str[0] = "";
            strIngrediants[0] = "";
          }
          Promise.all(promises).then((response) => {
            for (let k = 0; k < data.results.length - countMiss; k++) {
              setInstructions((prev) => [...prev, promises[k]]);
            }
          });
          Promise.all(promisesIngrediants).then((response) => {
            for (let k = 0; k < data.results.length - countMiss; k++) {
              setIngrediants((prev2) => [...prev2, promisesIngrediants[k]]);
            }
          });
          setLoading(true);
        });

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Server error while creating a new micro post", error);
      setError(true);
    }
  };

  //if (success) return <Navigate to="/" />;

  return (
    <div className="col-10 col-md-8 col-lg-7">
      {error && <ErrorAlert details={"Failed to save the content"} />}
      <form onSubmit={handleSubmit}>
        <div className="input-group mt-5">
          <input
            type="text"
            placeholder="Input your recipe here..."
            value={content}
            className="form-control"
            onChange={handleContentChange}
            autoFocus
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>
      <div className="mt-5">
        {numOfRecipe !== 0 && loading ? (
          <div>
            {recipeName.map((index, i) => {
              return (
                <Accordion>
                  <div>
                    <button
                      className="accordion-button collapsed rounded border"
                      type="button"
                      data-bs-toggle="collapse"
                      onClick={() => {
                        if (showIngrediants[i] === false) {
                          const newArr = [...showIngrediants];
                          newArr[i] = true;
                          setShowIngrediants(newArr);
                        } else {
                          const newArr = [...showIngrediants];
                          newArr[i] = false;
                          setShowIngrediants(newArr);
                        }
                      }}
                    >
                      <strong>{recipeName[i]}</strong>
                      <button className="btn btn-danger">
                        <FontAwesomeIcon icon={faHeartCirclePlus} />
                      </button>
                    </button>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <p>{instructions[i]}</p>
                        <div className="container mt-4 rounded border">
                          {showIngrediants[i] === true ? ingrediants[i] : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                </Accordion>
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default PostFormPage;
//{(instructions !== "") ? <><h1>INSTRUCTIONS</h1>{instructions.map((eachRecipe) => <p>{(eachRecipe.instructions !== undefined) ? eachRecipe.instructions.map(steps => steps.display_text) : <p></p>}</p>)}</> : <p></p>}

//{(ingrediants !== "") ? <><h2>INGREDIANTS</h2>{ingrediants.map((eachRecipe) => <p>{(eachRecipe.sections !== undefined) ? eachRecipe.sections[0].components.map(food => food.raw_text) : <p></p>}</p>)}</> : <p></p>}

/*
<tr>
                      <td>{recipeName[i]}</td>
                      <td>{instructions[i]}</td>
                      <td>{ingrediants[i]}</td>
                      <td>
                        <button>Like</button>
                      </td>
                    </tr>
                    */
