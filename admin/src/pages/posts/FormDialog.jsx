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
    Content,
    Published,
  } = data;
  const dispatch = useDispatch();

  const tags = useSelector((state) => state.tag.tags);
  const [tagValue, setTagvalue] = useState();
  const [listTag, setTistTag] = useState(tags);
  const [publish, setPublish] = useState(Published);
  useEffect(() => {
    getTags(dispatch);
  }, []);
  const editorState = EditorState.createEmpty();
  const [content, setContent] = useState(editorState);
  const onEditorStateChange = (editorState) => {
    setContent(editorState);
  };

  const convertToHTML = draftToHtml(convertToRaw(content.getCurrentContent()));

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
              required
              id="PostTitle"
              value={PostTitle}
              onChange={(e) => onChange(e)}
              placeholder="Enter title"
              label="Title"
              variant="outlined"
              margin="dense"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <Autocomplete
              required
              multiple
              options={listTag}
              id="Tags"
              variant="outlined"
              defaultValue={Tags}
              getOptionLabel={(option) => option.TagName}
              onChange={(e, value) => onChange(e, value)}
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
              required
              id="PostImage"
              type="file"
              onChange={(e) => onChange(e)}
              label="Image"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              required
              id="Description"
              value={Description}
              onChange={(e) => onChange(e)}
              placeholder="Enter description"
              label="Description"
              variant="outlined"
              margin="dense"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            {PostID == null && (
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
            )}
            <TextField
              style={{ display: "none" }}
              id="Content"
              value={(data.Content = convertToHTML)}
              placeholder="Enter Content"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              required
              id="ReadingTime"
              value={ReadingTime}
              onChange={(e) => onChange(e)}
              placeholder="Enter ReadingTime"
              variant="outlined"
              margin="dense"
              fullWidth
              InputLabelProps={{ shrink: true }}
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
              InputLabelProps={{ shrink: true }}
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
              InputLabelProps={{ shrink: true }}
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
              InputLabelProps={{ shrink: true }}
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
