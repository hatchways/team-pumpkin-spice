import React, { useCallback, useState } from "react";
import { Dialog, DialogTitle, Typography, makeStyles } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import EditIcon from "@material-ui/icons/Edit";
import { useDropzone } from "react-dropzone";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles({
  dropRoot: { padding: "3vh 2vh 0 2vh" },
  dropzone: {
    padding: "4vh 2vh",
    border: "1px dashed grey"
  },
  avatarWrapper: {
    margin: "auto"
  },
  avatar: {
    margin: "auto",
    height: "8vh",
    width: "8vh"
  },
  previewWrapper: {
    display: "flex",
    flexDirection: "row",
    height: "200px"
  },
  thumb: {
    display: "inline-flex",
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: "auto",
    padding: 4,
    boxSizing: "border-box",
    clipPath: "circle(30%)",
    objectFit: "cover"
  }
});

const maxFileSize = 2000000; //2mb

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

  const onDropRejected = useCallback((file, event) => {
    //TODO inform user that the file was rejected
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDropRejected,
    onDrop,
    accept: "image/*",
    maxSize: maxFileSize
  });

  return (
    <div className={classes.dropRoot}>
      <div className={classes.dropzone} {...getRootProps()}>
        <input {...getInputProps()} />
        <Typography variant="p">
          Drag 'n' drop some files here, or click to select files
        </Typography>
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
          <Avatar className={classes.avatar} src={user.avatar}></Avatar>
        ) : (
          <Avatar className={classes.avatar}>
            <PersonIcon />
          </Avatar>
        )}
        {editable && <EditIcon button onClick={handleEditClick} />}
      </div>
    );
  }
};

export default ProfileName;
