import React, { useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getTags } from '../../redux/apiCalls';
import { TextField } from '@material-ui/core';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import Axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './FormInput.scss';
import Autocomplete from '@mui/material/Autocomplete';

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
    Tags,
    // Published,
    Content,
  } = data;

  let editorState = EditorState.createEmpty();
  const [description, setDescription] = useState(editorState);
  const onEditorStateChange = (editorState) => {
    setDescription(editorState);
  };

  const inputFile = useRef(null);
  const openFile = () => {
    inputFile.current.click();
  };

  const [imageSelected, setImageSelected] = useState('');
  const uploadImage = (file) => {
    file.preventDefault();
    const formData = new FormData();
    formData.append('file', imageSelected);
    formData.append('upload_preset', 'jtwoxlu7');
    Axios.post('http://api.cloudinary.com/v1_1/van-nam/image/upload', formData).then((Response) => {
      document.getElementById('Thumbnail').value =
        'http://res.cloudinary.com/van-nam/image/upload/v1649074277/image/' + imageSelected.name;
    });
  };

  // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
  ];

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
          {PostID ? 'Update post' : 'Create new post'}
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
            {/* <Autocomplete
              multiple
              id="tags-outlined"
              options={top100Films}
              getOptionLabel={(option) => option.title}
              // defaultValue={[top100Films[13]]}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  id="Tags"
                  onChange={(e) => onChange(e)}
                  label="Tags"
                  placeholder="Tags"
                  variant="outlined"
                />
              )}
            /> */}
            <div className="form-controlGroup-inputWrapper">
              <label className="form-input form-input--file">
                <span className="form-input--file-button-left" onClick={openFile}>
                  Browse
                </span>
                <input
                  id="Thumbnail"
                  onChange={(e) => onChange(e)}
                  placeholder="Upload Thumbnail"
                  label="Thumbnail"
                  value={Thumbnail}
                  variant="outlined"
                  margin="dense"
                  type="text"
                  className="form-input--file-text"
                />
                <input
                  ref={inputFile}
                  className="form-input-file"
                  onChange={(e) => {
                    setImageSelected(e.target.files[0]);
                  }}
                  type="file"
                  id="file"
                  accept="image/*"
                  size="14"
                />
                <button onClick={uploadImage} className="form-input--file-button-right">
                  Upload
                </button>
              </label>
            </div>
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
            <div style={{ border: '1px solid gray', padding: '1px 5px', borderRadius: '4px' }}>
              <Editor
                placeholder="Content"
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
