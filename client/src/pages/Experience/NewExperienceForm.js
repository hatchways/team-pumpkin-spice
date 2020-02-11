import React, { useState } from "react";
import { InputLabel, Select, MenuItem, makeStyles } from "@material-ui/core";

const NewExperienceForm = ({
  updateExperience,
  language,
  languagesAvailable,
  removable = true
}) => {
  const [selected, setSelected] = useState({
    language: language,
    level: "1"
  });

  const handleChange = name => evt => {
    setSelected({ ...selected, [name]: evt.target.value });
    updateExperience({ [selected.language]: selected.level });
  };
  console.log("languages available", languagesAvailable);

  // Todo: add functionality for not allowing 0 experiences

  return (
    <>
      <InputLabel id="label">Language</InputLabel>
      <Select
        labelId="label"
        id="select"
        onChange={handleChange("language")}
        value={selected.language}
        name="language"
      >
        {languagesAvailable.map(ele => (
          <MenuItem value={ele}>{ele}</MenuItem>
        ))}
      </Select>
      <Select
        labelId="label"
        id="select"
        onChange={handleChange("level")}
        value={selected.level}
        name="level"
      >
        <MenuItem value="1">Beginner</MenuItem>
        <MenuItem value="2">Intermediate</MenuItem>
        <MenuItem value="3">Advanced</MenuItem>
        <MenuItem value="4">Expert</MenuItem>
      </Select>
      {removable && <button> Delete </button>}
    </>
  );
};

export default NewExperienceForm;
