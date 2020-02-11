import React, { useState } from "react";
import { InputLabel, Select, MenuItem, makeStyles } from "@material-ui/core";

const NewExperienceForm = ({ updateExperience, languagesAvailable }) => {
  const [selected, setSelected] = useState({
    language: languagesAvailable[0],
    level: "1"
  });

  const handleChange = name => evt => {
    setSelected({ ...selected, [name]: evt.target.value });

    updateExperience({ [selected.language]: selected.level });
  };

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
        <MenuItem value="C">C</MenuItem>
        <MenuItem value="C++">C++</MenuItem>
        <MenuItem value="Java">Java</MenuItem>
        <MenuItem value="JavaScript">JavaScript</MenuItem>
        <MenuItem value="Python">Python</MenuItem>
        <MenuItem value="Ruby">Ruby</MenuItem>
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
    </>
  );
};

export default NewExperienceForm;
