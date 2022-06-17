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
    Description,
    MetaDescription,
    MetaKeyword,
    ReadingTime,
    Tags,
    Categories,
  } = data;

  const dispatch = useDispatch();
  const formRef = useRef();
  const tags = useSelector((state) => state.tag.tags); //fetch tags data
  const categories = useSelector((state) => state.category.categories); //fetch categories data
  const [listTag, setListTag] = useState(tags);
  const [listCategory, setListCategory] = useState(categories);
  const editorState = EditorState.createEmpty();
  const [content, setContent] = useState(editorState);
  const convertToHTML = draftToHtml(convertToRaw(content.getCurrentContent()));

  useEffect(() => {
    getTags(dispatch);
  }, []);

  const onEditorStateChange = (editorState) => {
    setContent(editorState);
  };

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
        <form ref={formRef} onSubmit={handleFormSubmit}>
          <DialogTitle id="alert-dialog-title">
            {PostID ? "Update post" : "Create new post"}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
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
              autoFocus
              style={{ marginTop: "5px" }}
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
                  placeholder="Choose Tag"
                  variant="outlined"
                />
              )}
            />
            <Autocomplete
              style={{ marginTop: "8px" }}
              multiple
              autoFocus
              options={listCategory}
              id="Categories"
              fullWidth
              required
              autoHighlight
              defaultValue={Categories}
              getOptionLabel={(option) => option.CategoryName}
              onChange={(e, value) => onChange(e, value)}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Choose Category"
                  variant="outlined"
                />
              )}
            />
            {PostID ? (
              <>
                <TextField
                  autoFocus
                  id="Thumbnail"
                  type="file"
                  onChange={(e) => onChange(e)}
                  label="Thumbnail"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  margin="dense"
                  fullWidth
                />
                <TextField
                  id="PostImage"
                  type="file"
                  onChange={(e) => onChange(e)}
                  label="Image"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  margin="dense"
                  fullWidth
                />
              </>
            ) : (
              <>
                <TextField
                  required
                  autoFocus
                  id="Thumbnail"
                  type="file"
                  onChange={(e) => onChange(e)}
                  label="Thumbnail"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  margin="dense"
                  fullWidth
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
              </>
            )}

            <TextField
              required
              autoFocus
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
              autoFocus
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
              autoFocus
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
              autoFocus
              value={MetaKeyword}
              onChange={(e) => onChange(e)}
              placeholder="Enter MetaKeyword"
              label="MetaKeyword"
              variant="outlined"
              margin="dense"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary" variant="outlined">
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={() => formRef.current.reportValidity()}
              color="primary"
              variant="contained"
            >
              {PostID ? "Update" : "Submit"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
