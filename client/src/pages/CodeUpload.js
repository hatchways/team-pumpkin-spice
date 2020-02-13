import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Button,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  Paper,
  makeStyles
} from "@material-ui/core";
import TextEditor from "../components/TextEditor";

const useStlyes = makeStyles({
  root: {
    padding: "5%"
  },
  wrapper: {
    background: "white",
    width: "80%",
    height: "80%",
    margin: "20px auto"
  },
  textInput: {
    textAlign: "center",
    width: "60%",
    display: "inline"
  },
  languageSelect: {
    width: "20%"
  }
});

const CodeUpload = () => {
  const classes = useStlyes();
  const [requestTitle, setRequestTitle] = useState();
  const [requestLanguage, setRequestLanguage] = useState();

  const handleTitleChange = event => {
    setRequestTitle(event.target.value);
  };

  const handleLanguageChange = event => {
    setRequestLanguage(event.target.value);
  };

  //Get user context
  //const user = useContext(UserContext);
  //TODO: Map over userContext object to get languages and create a select component with options populated by the context.

  return (
    <div className={classes.root}>
      <Grid className={classes.wrapper} container justify="center" spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h2" align="center">
            Request a Code Review
          </Typography>
          <TextField
            className={classes.textInput}
            align="left"
            label="Title"
            variant="outlined"
            onChange={handleTitleChange}
          />
          <InputLabel id="language-select-label">Language</InputLabel>
          <Select
            className={classes.languageSelect}
            labelId="language-select-label"
            id="language-select"
            value={requestLanguage}
            onChange={handleLanguageChange}
          >
            <MenuItem value="Language1">Language1</MenuItem>
            <MenuItem value="Language2">Language2</MenuItem>
            <MenuItem value="Language3">Language3</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <TextEditor></TextEditor>
        </Grid>
      </Grid>
    </div>
  );
};

export default CodeUpload;