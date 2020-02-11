import React, { useState } from "react";
import SignUpContainer from "../../components/SignUpContainer";
import NewExperienceForm from "./NewExperienceForm";
import AddExperienceButton from "./AddExperienceButton";

const Experience = props => {
  const [experience, setExperience] = useState({});
  let [numberOfLanguages, setNumberOfLanguages] = useState(1);

  const languagesAvailable = [
    "C",
    "C++",
    "Java",
    "JavaScript",
    "Python",
    "Ruby"
  ];
  // Only allow user to select those languages which have not been selected?
  //.filter(ele => !Object.keys(experience).includes(ele));

  const updateExperience = newExperience => {
    setExperience({ ...experience, ...newExperience });
  };

  const addExperience = () => {
    setExperience({
      ...experience,
      [languagesAvailable[Object.keys(experience).length]]: 1
    });
    setNumberOfLanguages(++numberOfLanguages);
  };
  console.log(numberOfLanguages);

  return (
    <SignUpContainer>
      <p>Add your experience here</p>
      {Array(numberOfLanguages)
        .fill(true)
        .map((ele, idx) => (
          <NewExperienceForm
            updateExperience={updateExperience}
            language={ele}
            languagesAvailable={languagesAvailable}
          />
        ))}
      <AddExperienceButton addExperience={addExperience} />
    </SignUpContainer>
  );
};

export default Experience;
