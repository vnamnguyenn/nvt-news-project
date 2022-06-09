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

  const tags = useSelector((state) => state.tag.tags);
  const [tagValue, setTagvalue] = useState();
  const [listTag, setTistTag] = useState(tags);
  useEffect(() => {
    getTags(dispatch);
  }, []);
  const { contentBlocks, entityMap } = convertFromHTML(Content);
  const editorState = EditorState.createWithContent(
    ContentState.createFromBlockArray(contentBlocks, entityMap)
  );
  console.log(Tags);
  const [content, setContent] = useState(editorState);
  const onEditorStateChange = (editorState) => {
    setContent(editorState);
  };

  data.Content = draftToHtml(convertToRaw(content.getCurrentContent()));

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
            <Autocomplete
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
            <div className="form-controlGroup-inputWrapper">
              <label className="form-input form-input--file">
                <input
                  onChange={(e) => onChange(e)}
                  type="file"
                  id="PostImage"
                  accept="image/*"
                  size="14"
                />
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
