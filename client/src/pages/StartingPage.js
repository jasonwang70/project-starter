import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert";

function PostFormPage() {
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [instructions, setInstructions] = useState([]);
  const [ingrediants, setIngrediants] = useState([]);
  const [recipeName, setRecipeName] = useState([]);
  const [numOfRecipe, setNumOfRecipe] = useState(0);
  const [loading, setLoading] = useState(false);
  let str = [''];
  let strIngrediants = [''];
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
    str = [''];
    strIngrediants = ['']
    event.preventDefault();
    try {
      let response = await fetch(`https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes&q=${content}`, {
        method: "GET",
        headers: {
          'X-RapidAPI-Key': '794db09640msh73ba8daca21b059p134b5bjsn8bd96b2de9e6',
          'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
          "Content-type": "application/json",
        },
      }).then(res => res.json()).then(data => {
        for(let i = 0; i < data.results.length; i++) { // For each recipe
          if(data.results[i].instructions !== undefined && data.results[i].sections !== undefined) {
            setRecipeName(pArray => [...pArray, data.results[i].name]);
            for(let j = 0; j < data.results[i].instructions.length; j++) {
              //{console.log(data.results[i].instructions[j].display_text)}
              str[0] = str[0] + data.results[i].instructions[j].display_text + " ";
            }
            promises.push(str[0]);
            for(let n = 0; n < data.results[i].sections.length; n++) {
              for(let m = 0; m < data.results[i].sections[n].components.length; m++){
                strIngrediants[0] = strIngrediants[0] + data.results[i].sections[n].components[m].raw_text + ", ";
              }
            }
            promisesIngrediants.push(strIngrediants[0]);
            setNumOfRecipe(numOfRecipe => numOfRecipe + 1);
          } else {
            countMiss++;
          }
          str[0] = "";
          strIngrediants[0] = "";
        }
        Promise.all(promises).then(response => {
          for(let k = 0; k < data.results.length - countMiss; k++) {
            setInstructions(prev => [...prev, promises[k]]);
          }
        });
        Promise.all(promisesIngrediants).then(response => {
          for(let k = 0; k < data.results.length - countMiss; k++) {
            setIngrediants(prev2 => [...prev2, promisesIngrediants[k]]);
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
        <div className="input-group">
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
      <div>
        {(numOfRecipe !== 0 && loading) ? 
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Instructions</th>
              <th>ingrediants</th>
              <tr>like button</tr>
            </tr>
          </thead>
          <tbody>
            {recipeName.map((index, i) => {
              return (
                <tr>
                  <td>{recipeName[i]}</td>
                  <td>{instructions[i]}</td>
                  <td>{ingrediants[i]}</td>
                  <td><button>Like</button></td>
                </tr>
              );
            })}
          </tbody>
        </table> : <></>}
      </div>
    </div>
  );
}

export default PostFormPage;
//{(instructions !== "") ? <><h1>INSTRUCTIONS</h1>{instructions.map((eachRecipe) => <p>{(eachRecipe.instructions !== undefined) ? eachRecipe.instructions.map(steps => steps.display_text) : <p></p>}</p>)}</> : <p></p>}

//{(ingrediants !== "") ? <><h2>INGREDIANTS</h2>{ingrediants.map((eachRecipe) => <p>{(eachRecipe.sections !== undefined) ? eachRecipe.sections[0].components.map(food => food.raw_text) : <p></p>}</p>)}</> : <p></p>}