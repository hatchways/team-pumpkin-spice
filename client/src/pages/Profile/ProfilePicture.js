import React, { useCallback, useState } from "react";
import { Dialog, DialogTitle, makeStyles } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import EditIcon from "@material-ui/icons/Edit";
import { useDropzone } from "react-dropzone";
import { Autocomplete } from "@material-ui/lab";

const useStyles = makeStyles({
  dropRoot: {},
  avatarWrapper: {
    margin: "auto"
  },
  previewWrapper: {
    display: "flex",
    flexDirection: "row"
  },
  thumb: {
    display: "inline-flex",
    borderRadius: "50%",
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box"
  }
});

const Dropzone = props => {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const arrayBuffer = reader.result;
        setFiles(prev => {
          prev.push({ file: arrayBuffer, preview: URL.createObjectURL(file) });
          return prev;
        });
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "img/*"
  });

  return (
    <div className={classes.dropRoot}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <div className={classes.previewWrapper}>
        {files.map(file => {
          return <img src={file.preview} className={classes.thumb} />;
        })}
      </div>
    </div>
  );
};

const ProfileName = ({ editable, user }) => {
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(prev => !prev);
  };

  if (isEditing) {
    return (
      <Dialog open={isEditing} onClose={handleEditClick}>
        <DialogTitle>Upload a picture</DialogTitle>
        <Dropzone />
      </Dialog>
    );
  } else {
    return (
      <div className={classes.avatarWrapper}>
        {user.hasOwnProperty("avatar") ? (
          <img src={user.avatar} />
        ) : (
          <PersonIcon />
        )}
        {editable && <EditIcon button onClick={handleEditClick} />}
      </div>
    );
  }
};

export default ProfileName;
