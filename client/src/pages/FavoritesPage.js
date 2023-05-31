import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCircleMinus } from "@fortawesome/free-solid-svg-icons";

function AboutUsPage(props) {
  return (
    <>
      <div className="col text-center">
        <h1 className="mt-5">
          <strong>Favorites</strong>
        </h1>
        <div className="rounded border mt-5">
          <h4>
            <strong>Sun-Dried Tomato Skillet Chicken</strong>
            <button className="btn btn-danger">
              <FontAwesomeIcon icon={faHeartCircleMinus} />
            </button>
          </h4>
          <br />
          <h5>
            Direction:
            <br />
            Remove the chicken from the refrigerator 30 minutes prior cooking.
            Pat the chicken dry with a paper towel, then season both sides
            generously with salt, black pepper, and Italian seasoning. Dredge in
            the flour, shaking off any excess. Heat a medium skillet over
            medium-high heat. Melt together the avocado oil and butter, then add
            the chicken in a single layer and cook for 3½ minutes on each side,
            or until golden and crispy. Remove the chicken from the skillet and
            set aside. Add the shallot and garlic to the skillet and cook for 3
            minutes, being careful to not let them brown. Add the thyme and red
            pepper flakes and stir for 1 minute, until fragrant. Add the chicken
            broth, heavy cream, and sun-dried tomatoes and cook until the liquid
            reduces slightly, 3–5 minutes. Add the Parmesan cheese and stir
            until the sauce thickens slightly. Season the sauce with salt and
            black pepper to taste. Return the chicken to the skillet and cook
            for 2 minutes, or until warmed through. Garnish with the basil and
            serve with mashed potatoes or pasta. Enjoy!
          </h5>
          <br />
          <p>
            Ingrediants:
            <br />
            1½ pounds boneless, skinless chicken thighs, Kosher salt, to taste,
            Freshly ground black pepper, to taste, Italian seasoning, to taste,
            ¼ cup all-purpose flour, 2 tablespoons avocado oil, 1 tablespoon
            unsalted butter, ⅓ cup diced shallot, 2½ tablespoons minced garlic,
            1 ½ teaspoons chopped fresh thyme leaves, ¼ teaspoon red pepper
            flakes, ¾ cup chicken broth, ¾ cup heavy cream, ½ cup sun-dried
            tomatoes, oil drained and chopped, ½ cup freshly grated Parmesan
            cheese, 2 tablespoons chopped fresh basil, Mashed potatoes or pasta,
            for serving,
          </p>
        </div>
        <div className="rounded border mt-5">
          <h4>
            <strong>Pad Krapow</strong>
            <button className="btn btn-danger">
              <FontAwesomeIcon icon={faHeartCircleMinus} />
            </button>
          </h4>
          <br />
          <h5>
            Direction:
            <br />
            Chop and mash together the garlic and Thai chiles to make a paste.
            In a large pan over medium-high heat, sear the ground beef for 4–5
            minutes, until the fat has rendered. Drain the excess fat, then
            increase the heat to high and continue to sear until the beef is
            nicely browned, 2–3 minutes more. Add the garlic Thai chile paste
            and sauté for 2 minutes. Add the fish sauce, dark soy sauce, sugar,
            and water and continue cooking for 2 minutes, until the meat is
            well-coated with the sauce. Remove the pan from the heat and stir in
            the basil. Serve with steamed white rice and fried eggs. Enjoy!
          </h5>
          <br />
          <p>
            Ingrediants:
            <br />6 garlic cloves, 4 Thai chile peppers, 2 pounds 94/6 ground
            beef, 2 tablespoons fish sauce, or to taste, 2 tablespoons dark soy
            sauce, or to taste, 1½ tablespoons sugar, or to taste, ¼ cup water,
            or to taste, Fresh basil leaves, to taste, Steamed white rice, for
            serving, Fried eggs, for serving,
          </p>
        </div>
      </div>
    </>
  );
}

export default AboutUsPage;
