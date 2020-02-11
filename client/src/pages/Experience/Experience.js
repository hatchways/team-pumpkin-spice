import React, { useState } from "react";
import SignUpContainer from "../../components/SignUpContainer";
import NewExperienceForm from "./NewExperienceForm";
import AddExperienceButton from "./AddExperienceButton";

const Experience = props => {
  const [experience, setExperience] = useState({});
  const [knownLanguages, setKnownLanguages] = useState([]);

  // [{C++: 4}, {C: 2}, {python: 1}]

  const languagesAvailable = [
    "C",
    "C++",
    "Java",
    "JavaScript",
    "Python",
    "Ruby"
  ].filter(ele => {
    return !Object.keys(experience).includes(ele);
  });

  console.log(experience);

  const updateExperience = newExperience => {
    setExperience({ ...newExperience });
    const newLanguagesKnown = Object.keys(experience);
    setKnownLanguages([newLanguagesKnown]);
  };

  return (
    <SignUpContainer>
      <p>Add your experience here</p>
      <NewExperienceForm
        updateExperience={updateExperience}
        languagesAvailable={languagesAvailable}
      />
      <AddExperienceButton />
    </SignUpContainer>
  );
};

export default Experience;
