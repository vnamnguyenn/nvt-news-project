import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@material-ui/data-grid";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTag, deleteTag, getTags, updateTag } from "../../redux/apiCalls";
import { baseImageUrl, publicRequest } from "../../requestMethods";
import { Button } from "@mui/material";
import FormDialog from "./FormDialog";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

const initialValue = {
  TagName: "",
  Thumbnail: undefined,
  EmptyThumnail: "",
};

function Tag() {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(10);
  const tags = useSelector((state) => state.tag.tags); //fetch tags data
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectionModel, setSelectionModel] = useState([]);
  const [formData, setFormData] = useState(initialValue);
  const userId =
    "ACCT_" +
    useSelector((state) => state.user.currentUser.exportData.AccountId);
  useEffect(() => {
    getTags(dispatch);
    document.title = "Admin Dashboard - Tags";
  }, [dispatch]);

  useEffect(() => {
    document.getElementById("delete-button").style.display =
      selectionModel.length === 0 ? "none" : "";
    document.getElementById("item-selected").style.display =
      selectionModel.length === 0 ? "none" : "";

    document.getElementById("add-button").style.display =
      selectionModel.length !== 0 ? "none" : "";
  }, [selectionModel.length]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteDialogOpen(false);
    setFormData(initialValue);
  };

  const handleUpdate = (TagId, TagName, Thumbnail, CreatedDate, PK) => {
    setFormData({
      TagId: TagId,
      TagName: TagName,
      EmptyThumnail: Thumbnail,
      CreatedDate: CreatedDate,
      PK: PK,
    });
    handleClickOpen();
  };

  const handleOpenDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleSubmitDelete = () => {
    deleteTag(selectionModel, dispatch);
    setDeleteDialogOpen(false);
  };

  const onChange = (e, val) => {
    const { value, id } = e.target;
    switch (id) {
      case "Thumbnail":
        return setFormData({ ...formData, [id]: e.target.files[0] });
      default:
        return setFormData({ ...formData, [id]: value });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    const imageName =
      formData.Thumbnail === undefined
        ? formData.EmptyThumnail
        : Date.now() + formData.Thumbnail.name;
    data.append("name", imageName);
    data.append("file", formData.Thumbnail);
    publicRequest.post("/upload", data);
    if (formData.TagId) {
      updateTag(
        formData.TagId,
        formData.TagName,
        {
          TagId: formData.TagId,
          TagName: formData.TagName,
          Thumbnail: imageName,
          CreatedDate: formData.CreatedDate,
          PK: formData.PK,
          UpdatedDate:
            new Date().toLocaleDateString("vi-VN") +
            " " +
            new Date().toLocaleTimeString("vi-VN"),
        },
        dispatch
      );
      //close modal
      handleClose();
    } else {
      addTag(
        {
          TagName: formData.TagName,
          Thumbnail: imageName,
        },
        dispatch
      );
      handleClose();
    }
  };
  //set column show in page
  const columns = [
    {
      field: "TagName",
      headerName: "Name",
      minWidth: 400,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img
              className="productListImg"
              src={
                baseImageUrl +
                (params.row.Thumbnail ? params.row.Thumbnail : "favicon.png")
              }
              alt=""
            />
            {params.row.TagName}
          </div>
        );
      },
    },
    {
      field: "CreatedDate",
      headerName: "Created Date",
      width: 200,
    },
    {
      field: "UpdatedDate",
      headerName: "Updated Date",
      width: 200,
    },
    {
      field: "TagId",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        if (userId === params.row.PK) {
          return (
            <>
              <button
                className="productListEdit"
                onClick={() =>
                  handleUpdate(
                    params.row.TagId,
                    params.row.TagName,
                    params.row.Thumbnail,
                    params.row.CreatedDate,
                    params.row.PK
                  )
                }
              >
                Edit
              </button>
            </>
          );
        } else {
          return (
            <>
              <button className="productListEditDisabled">Disabled</button>
            </>
          );
        }
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
            <div className="datatableTitle">
              <Button
                onClick={handleClickOpen}
                id="add-button"
                className="add-new"
              >
                Add Tag
              </Button>
              <Button
                onClick={handleOpenDialog}
                id="delete-button"
                className="delete-item delete-button"
              >
                Delete selected
              </Button>
              <span id="item-selected"> {selectionModel.length} Selected</span>
            </div>
            <DataGrid
              autoHeight
              {...tags}
              rows={tags}
              sortModel={[
                {
                  field: "CreatedDate",
                  sort: "desc",
                },
              ]}
              // isRowSelectable={(params) => params.row.PK === userId}
              columns={columns}
              getRowId={(row) => row.TagId}
              pageSize={pageSize}
              disableSelectionOnClick
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              onSelectionModelChange={(TagId) => {
                setSelectionModel(TagId);
              }}
              selectionModel={selectionModel}
              rowsPerPageOptions={[10, 25, 50, 100]}
              pagination
              checkboxSelection
              components={{
                Toolbar: CustomToolbar,
              }}
            />
          </div>
          <Dialog
            open={deleteDialogOpen}
            onClose={handleClose}
            aria-labelledby="draggable-dialog-title"
          >
            <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
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
          <FormDialog
            open={open}
            handleClose={handleClose}
            data={formData}
            onChange={onChange}
            handleFormSubmit={handleFormSubmit}
          />
        </div>
      </div>
    </>
  );
}

export default Tag;
