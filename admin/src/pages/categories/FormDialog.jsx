import React, { useRef } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField } from "@material-ui/core";

import "react-toastify/dist/ReactToastify.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function FormDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const { CategoryId, CategoryName } = data;
  const formRef = useRef();
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form ref={formRef} onSubmit={handleFormSubmit} autoComplete="off">
          <DialogTitle id="alert-dialog-title">
            {CategoryId ? "Update category" : "Create new category"}
          </DialogTitle>
          <DialogContent>
            <TextField
              required
              id="CategoryName"
              value={CategoryName}
              onChange={(e) => onChange(e)}
              placeholder="Enter Category Name"
              label="Name"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="Thumbnail"
              type="file"
              onChange={(e) => onChange(e)}
              label="Image"
              inputProps={{ accept: 'image/png, image/jpeg' }}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              margin="dense"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary" variant="outlined">
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
              onClick={() => formRef.current.reportValidity()}
              variant="contained"
            >
              {CategoryId ? "Update" : "Submit"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
