import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@material-ui/data-grid";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addBackup,
  getbackup,
  deleteBackup,
  downloadBackup,
  restoreBackup,
  addBackupFromFile,
} from "../../redux/apiCalls";

import { Button } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

function Backup() {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const backup = useSelector((state) => state.backup.backup); //fetch tags data
  const [selectionModel, setSelectionModel] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    getbackup(dispatch);
    document.title = "Admin Dashboard - Backup";
  }, [dispatch]);

  useEffect(() => {
    document.getElementById("delete-button").style.display =
      selectionModel.length === 0 ? "none" : "";
    document.getElementById("item-selected").style.display =
      selectionModel.length === 0 ? "none" : "";
    document.getElementById("upload-button").style.display =
      selectionModel.length !== 0 ? "none" : "";
    document.getElementById("add-button").style.display =
      selectionModel.length !== 0 ? "none" : "";
  }, [selectionModel.length]);

  const handleOpenChooseFile = () => {
    //open file input box on click of other element
    inputRef.current.click();
  };

  const handleDownload = (url, name) => {
    downloadBackup(url, name);
  };

  const handleRestore = (path, name) => {
    const confirm = window.confirm(
      `Are you sure, you want to import data from '${name}'`
    );
    if (confirm) {
      restoreBackup(path, name);
    }
  };

  const handleClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleOpenDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleSubmitDelete = () => {
    deleteBackup(selectionModel, dispatch);
    setDeleteDialogOpen(false);
  };

  const onChange = (e) => {
    handleSubmit(e);
  };

  const handleSubmit = async (e) => {
    const reader = new FileReader();
    // alert(reader.readAsText(e));
    reader.onload = async (e) => {
      const text = e.target.result;
      console.log(text);
      addBackupFromFile(
        {
          Content: text,
        },
        dispatch
      );
      // alert(text);
    };
    reader.readAsText(e.target.files[0]);
  };

  const handleCreate = () => {
    addBackup(dispatch);
  };
  //set column show in page
  const columns = [
    {
      field: "BackupID",
      headerName: "ID",
      width: 200,
    },
    {
      field: "BackupName",
      headerName: "Name",
      width: 300,
    },
    {
      field: "CreatedDate",
      headerName: "Created Date",
      width: 200,
    },
    {
      field: "Action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <>
            <button
              onClick={() =>
                handleRestore(params.row.Path, params.row.BackupName)
              }
              className="productListEdit"
            >
              Restore
            </button>
            <button
              onClick={() => handleDownload(params.row.Path, params.row.Path)}
              className="productListDownload"
            >
              Download
            </button>
          </>
        );
      },
    },
  ];
  //custom toolbar
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </GridToolbarContainer>
    );
  }

  return (
    <>
      <div className="list">
        <Sidebar />
        <div className="list__container" id="main">
          <Navbar />
          <div className="productList" style={{ width: "auto" }}>
            <div style={{ display: "flex", gap: "5px" }}>
              <div className="datatableTitle">
                <Button
                  onClick={handleCreate}
                  id="add-button"
                  className="add-new"
                >
                  Add Backup
                </Button>
                <Button
                  onClick={handleOpenDialog}
                  id="delete-button"
                  className="delete-item delete-button"
                >
                  Delete selected
                </Button>
                <span id="item-selected">{selectionModel.length} Selected</span>
              </div>
              <div className="datatableTitle">
                <form onSubmit={handleSubmit}>
                  <input
                    style={{ display: "none" }}
                    accept="application/JSON"
                    type="file"
                    ref={inputRef}
                    onChange={onChange}
                  />
                </form>
                <Button
                  className="add-new"
                  onClick={handleOpenChooseFile}
                  id="upload-button"
                >
                  Upload file
                </Button>
              </div>
            </div>

            <DataGrid
              autoHeight
              {...backup}
              rows={backup}
              disableSelectionOnClick
              columns={columns}
              getRowId={(row) => row.BackupID}
              pageSize={pageSize}
              onSelectionModelChange={(BackupId) => {
                setSelectionModel(BackupId);
              }}
              selectionModel={selectionModel}
              sortModel={[
                {
                  field: "CreatedDate",
                  sort: "desc",
                },
              ]}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[10, 25, 50, 100]}
              pagination
              checkboxSelection
              components={{
                Toolbar: CustomToolbar,
              }}
            />
            <Dialog
              open={deleteDialogOpen}
              onClose={handleClose}
              aria-labelledby="draggable-dialog-title"
            >
              <DialogTitle
                style={{ cursor: "move" }}
                id="draggable-dialog-title"
              >
                Delete Confirm
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure, you want to delete {selectionModel.length} items
                  selected
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitDelete}>Delete</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
}

export default Backup;
