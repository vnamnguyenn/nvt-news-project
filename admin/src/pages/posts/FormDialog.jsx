import React, { useEffect, useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField } from "@material-ui/core";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-toastify/dist/ReactToastify.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./FormInput.scss";
import Autocomplete from "@mui/material/Autocomplete";
import { publicRequest } from "../../requestMethods";
import { Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getTags } from "../../redux/apiCalls";

export default function FormDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const {
    PostID,
    PostTitle,
    PostImage,
    Description,
    MetaDescription,
    MetaKeyword,
    MetaTitle,
    ReadingTime,
    Tags,
    // Published,
    Content,
  } = data;
  const dispatch = useDispatch();
  useEffect(() => {
    getTags(dispatch);
  }, []);
  const tags = useSelector((state) => state.tag.tags);
  const [tagValue, setTagvalue] = useState();
  const [listTag, setTistTag] = useState(tags);
  const [imageSelected, setImageSelected] = useState("");
  const { contentBlocks, entityMap } = convertFromHTML(Content);
  const editorState = EditorState.createWithContent(
    ContentState.createFromBlockArray(contentBlocks, entityMap)
  );

  const [content, setContent] = useState(editorState);
  const onEditorStateChange = (editorState) => {
    setContent(editorState);
  };

  data.Content = draftToHtml(convertToRaw(content.getCurrentContent()));
  const inputFile = useRef(null);
  const openFile = () => {
    inputFile.current.click();
  };

  const uploadImage = (e) => {
    e.preventDefault();
    // if (imageSelected) {
    //   const data = new FormData();
    //   const filename = Date.now() + imageSelected;
    //   data.append("name", filename);
    //   data.append("file", imageSelected);
    //   document.getElementById("PostImage").value = filename;
    //   try {
    //     publicRequest.post("/upload", data);
    //   } catch (err) {}
    // }

    console.log(imageSelected);
  };

  // window.confirm(localStorage.getItem("items"));
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="lg"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {PostID ? "Update post" : "Create new post"}
        </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              id="PostTitle"
              value={PostTitle}
              onChange={(e) => onChange(e)}
              placeholder="Enter title"
              label="Title"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <div
              style={{
                border: "1px solid #808080",
                borderBottom: "unset",
                borderTop: "unset",
                borderRadius: "4px",
              }}
            >
              <Autocomplete
                multiple
                options={listTag}
                variant="standard"
                getOptionLabel={(option) => option.TagName}
                onChange={(e, value) => setTagvalue(value)}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Choose Tags"
                    variant="outlined"
                  />
                )}
              />

              <TextField
                style={{ marginBottom: "unset" }}
                id="Tags"
                value={JSON.stringify(tagValue)}
                onMouseOver={(e) => onChange(e)}
                placeholder="Tag value"
                hidden
                fullWidth
                inputProps={{
                  readOnly: true,
                  underline: {
                    "&&&:before": {
                      borderBottom: "none",
                    },
                    "&&:after": {
                      borderBottom: "none",
                    },
                  },
                }}
              />
            </div>
            <div className="form-controlGroup-inputWrapper">
              <label className="form-input form-input--file">
                {/* <span
                  className="form-input--file-button-left"
                  onClick={openFile}
                >
                  Browse
                </span> */}
                {/* <input
                  id="PostImage"
                  onClick={(e) => onChange(e)}
                  onMouseOver={(e) => onChange(e)}
                  onChange={(e) => onChange(e)}
                  onMouseOut={(e) => onChange(e)}
                  placeholder="Upload Image"
                  label="Image"
                  value={PostImage}
                  type="text"
                  className="form-input--file-text"
                /> */}
                <input
                  ref={inputFile}
                  // className="form-input-file"
                  // onChange={(e) => {
                  //   setImageSelected(e.target.files[0]);
                  // }}
                  onChange={(e) => onChange(e)}
                  type="file"
                  id="PostImage"
                  accept="image/*"
                  size="14"
                />
                {/* <button
                  onClick={uploadImage}
                  className="form-input--file-button-right"
                >
                  Upload
                </button> */}
              </label>
            </div>
            <TextField
              id="Description"
              value={Description}
              onChange={(e) => onChange(e)}
              placeholder="Enter description"
              label="Description"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <div
              style={{
                border: "1px solid gray",
                padding: "1px 5px",
                borderRadius: "4px",
              }}
            >
              <Editor
                placeholder="Content"
                editorState={content}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
              />
            </div>
            <TextField
              style={{ display: "block" }}
              onChange={(e) => onChange(e)}
              id="Content"
              value={Content}
              placeholder="Enter Content"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="ReadingTime"
              value={ReadingTime}
              onChange={(e) => onChange(e)}
              placeholder="Enter ReadingTime"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="MetaDescription"
              value={MetaDescription}
              onChange={(e) => onChange(e)}
              placeholder="Enter MetaDescription"
              label="MetaDescription"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="MetaKeyword"
              value={MetaKeyword}
              onChange={(e) => onChange(e)}
              placeholder="Enter MetaKeyword"
              label="MetaKeyword"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="MetaTitle"
              value={MetaTitle}
              onChange={(e) => onChange(e)}
              placeholder="Enter MetaTitle"
              label="MetaTitle"
              variant="outlined"
              margin="dense"
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => handleFormSubmit()}
            variant="contained"
          >
            {PostID ? "Update" : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
