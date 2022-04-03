import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import Axios from 'axios';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function FormDialog({ open, handleClose, data, onChange, handleFormSubmit }) {
  const {
    PostID,
    PostTitle,
    Thumbnail,
    PostImage,
    Description,
    MetaDescription,
    MetaKeyword,
    MetaTitle,
    ReadingTime,
    // Published,
    Content,
  } = data;

  let editorState = EditorState.createEmpty();
  const [description, setDescription] = useState(editorState);
  const onEditorStateChange = (editorState) => {
    setDescription(editorState);
  };
  const [imageSelected, setImageSelected] = useState('');
  var getUrl = '';
  const uploadImage = (file) => {
    file.preventDefault();
    const formData = new FormData();
    console.log(imageSelected);
    formData.append('file', imageSelected);
    formData.append('upload_preset', 'jtwoxlu7');
    Axios.post('http://api.cloudinary.com/v1_1/van-nam/image/upload', formData).then((Response) => {
      // getUrl = Response.data.url;
      console.log(imageSelected.name);
    });
  };
  const convertToHTML = draftToHtml(convertToRaw(description.getCurrentContent()));
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
          {PostID ? 'Update user' : 'Create new user'}
        </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              id="PostTitle"
              value={PostTitle}
              onChange={(e) => onChange(e)}
              placeholder="Enter name"
              label="Title"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="Thumbnail"
              value={Thumbnail}
              onChange={(e) => onChange(e)}
              placeholder="Enter email"
              label="Thumbnail"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            {/* <input
              id="Thumbnail"
              type="file"
              onChange={(e) => {
                setImageSelected(e.target.files[0]);
              }}
            />
            <button onClick={uploadImage}>Upload image</button> */}
            <TextField
              id="PostImage"
              value={PostImage}
              onChange={(e) => onChange(e)}
              placeholder="Enter post image"
              label="Post Image"
              variant="outlined"
              margin="dense"
              fullWidth
            />
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
            <div style={{border:'1px solid gray',padding:'1px 5px',borderRadius:'4px'}}>
              <Editor
               placeholder='Content'
                editorState={description}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
              />
              <TextField
                style={{ display: 'none' }}
                onChange={(e) => onChange(e)}
                id="Content"
                multiline
                minRows={5}
                value={(data.Content = convertToHTML)}
              />
            </div>
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
          <Button color="primary" onClick={() => handleFormSubmit()} variant="contained">
            {PostID ? 'Update' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
