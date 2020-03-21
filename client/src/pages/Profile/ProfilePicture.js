import React, { useCallback, useState } from "react";
import {
  Dialog,
  DialogTitle,
  Typography,
  Paper,
  Button,
  makeStyles
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import { useDropzone } from "react-dropzone";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles({
  dropRoot: { padding: "3vh 2vh 1vh 2vh" },
  dropzone: {
    padding: "4vh 2vh",
    border: "2px dashed #6E3ADB"
  },
  dropzoneDisabled: {
    color: "#888888",
    padding: "4vh 2vh"
  },
  avatarWrapper: {
    margin: "auto",
    height: "10vh",
    width: "10vh",
    borderRadius: "50%",
    display: "flex",
    alignContent: "center",
    justifyContent: "center"
  },
  avatar: {
    margin: "auto",
    height: "9vh",
    width: "9vh"
  },
  editButton: {
    position: "relative",
    left: "6vh",
    bottom: "10vh"
  },
  icon: {
    color: "#888888",
    "&:hover": {
      color: "black"
    }
  },
  previewWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "5px",
    height: "200px",
    marginTop: "2vh"
  },
  preview: {
    height: "200px",
    display: "flex"
  },
  thumb: {
    border: "1px solid #eaeaea",
    padding: "10px",
    boxSizing: "border-box",
    clipPath: "circle(30%)",
    objectFit: "cover",
    height: "auto",
    width: "150px"
  },
  uploadButton: {
    float: "right"
  }
});

const maxFileSize = 2000000; //2mb

const Dropzone = ({ files, setFiles, saveAvatar }) => {
  const [accepted, setAccepted] = useState([...files]); //restore file if dialog is closed
  const classes = useStyles();

  //Disable the dropzone if there is already a file waiting to be uploaded
  const disabled = () => {
    if (files.length < 1) {
      return false;
    } else return true;
  };

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const arrayBuffer = reader.result;
        const fileObj = new File([arrayBuffer], file.name);
        setFiles(prev => {
          prev.push({
            data: fileObj,
            type: file.type,
            preview: URL.createObjectURL(file)
          });
          return prev;
        });
        setAccepted([{ preview: URL.createObjectURL(file) }]);
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
    maxSize: maxFileSize,
    multiple: false,
    disabled: disabled()
  });

  const removeFile = () => {
    setFiles([]);
    setAccepted([]);
  };

  const getDropzoneStyles = () => {
    if (disabled()) {
      return classes.dropzoneDisabled;
    } else return classes.dropzone;
  };

  const getDropzoneText = () => {
    if (disabled()) {
      return "Remove current file to upload another";
    } else return "Drag 'n Drop or click to upload a picture";
  };

  const handlePictureUpload = () => {
    saveAvatar();
  };

  return (
    <div className={classes.dropRoot}>
      <div className={getDropzoneStyles()} {...getRootProps()}>
        <input {...getInputProps()} />
        <Typography variant="body1">{getDropzoneText()}</Typography>
      </div>
      <div className={classes.previewWrapper}>
        {accepted.map(file => {
          return (
            <div className={classes.preview} key={file.preview}>
              <img src={file.preview} className={classes.thumb} />
              <CloseIcon className={classes.icon} onClick={removeFile} />
            </div>
          );
        })}
      </div>
      <Button className={classes.uploadButton} onClick={handlePictureUpload}>
        Upload
      </Button>
    </div>
  );
};

const ProfilePicture = ({ editable, user, saveAvatar }) => {
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState(false);
  const [files, setFiles] = useState([]);

  const handleEditClick = () => {
    setIsEditing(prev => !prev);
  };

  const handleSaveAvatar = async () => {
    await saveAvatar(files[0]);
    setIsEditing(prev => !prev);
  };

  return (
    <>
      <Paper className={classes.avatarWrapper}>
        <Dialog open={isEditing} onClose={handleEditClick}>
          <DialogTitle>Upload a picture</DialogTitle>
          <Dropzone
            files={files}
            setFiles={setFiles}
            saveAvatar={handleSaveAvatar}
          />
        </Dialog>
        {user.hasOwnProperty("avatar") ? (
          <Avatar
            alt={user.name}
            className={classes.avatar}
            src={user.avatar.url}
          ></Avatar>
        ) : (
          <Avatar alt={user.name} className={classes.avatar}>
            <PersonIcon />
          </Avatar>
        )}
      </Paper>
      {editable && (
        <EditIcon
          className={`${classes.editButton} ${classes.icon}`}
          onClick={handleEditClick}
        />
      )}
    </>
  );
};

export default ProfilePicture;
