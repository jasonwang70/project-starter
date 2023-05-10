import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert";

function PostFormPage() {
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [instructions, setInstructions] = useState([]);
  const [ingrediants, setIngrediants] = useState([]);
  const [numOfRecipe, setNumOfRecipe] = useState(0);

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    setIngrediants([]);
    setInstructions([]);
    setNumOfRecipe(0);
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
            setInstructions(prevArray => [...prevArray, data.results[i].instructions]);
            setIngrediants(previousArray => [...previousArray, data.results[i].sections])
            setNumOfRecipe(numOfRecipe => numOfRecipe + 1)
          }
        }
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
        {(numOfRecipe !== 0) ? 
        <table>
          <thead>
            <tr>
              <th>Instructions</th>
              <th>Ingrediants</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {instructions.map((index_instr) => 
                    <div>{index_instr.map((all_instructions) => all_instructions.display_text)}</div>
                )}
              </td>
              <td>
                {ingrediants.map((sect) => 
                    <div>{sect.map((comp) => 
                      <div>{(comp.components.map(a => a.raw_text))}</div>
                    )}</div>
                )}
              </td>
            </tr>
          </tbody>
        </table> : <></>}
      </div>
    </div>
  );
}

export default PostFormPage;
//{(instructions !== "") ? <><h1>INSTRUCTIONS</h1>{instructions.map((eachRecipe) => <p>{(eachRecipe.instructions !== undefined) ? eachRecipe.instructions.map(steps => steps.display_text) : <p></p>}</p>)}</> : <p></p>}

//{(ingrediants !== "") ? <><h2>INGREDIANTS</h2>{ingrediants.map((eachRecipe) => <p>{(eachRecipe.sections !== undefined) ? eachRecipe.sections[0].components.map(food => food.raw_text) : <p></p>}</p>)}</> : <p></p>}