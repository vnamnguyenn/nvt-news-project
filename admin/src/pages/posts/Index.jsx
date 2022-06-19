import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@material-ui/data-grid";
import {
  addPost,
  deletePost,
  getPosts,
  updatePost,
} from "../../redux/apiCalls";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  PostTitle: "",
  Thumbnail: undefined,
  PostImage: undefined,
  Description: "",
  Content: "",
  ReadingTime: "",
  MetaDescription: "",
  MetaKeyword: "",
  Published: "active",
  PublishedDate: "",
  UpdatedDate: "",
  AuthorInfo: "",
  Tags: [],
  Categories: [],
};

function Post() {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(10);
  const posts = useSelector((state) => state.post.posts); //fetch post data
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [formData, setFormData] = useState(initialValue);
  const [selectionModel, setSelectionModel] = useState([]);
  const userId =
    "ACCT_" +
    useSelector((state) => state.user.currentUser.exportData.AccountId);

  useEffect(() => {
    getPosts(dispatch);
    document.title = "Admin Dashboard - Posts";
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

  const handleUpdate = (
    PostID,
    PostImage,
    Description,
    ReadingTime,
    PostTitle,
    MetaDescription,
    MetaKeyword,
    Tags,
    Categories,
    CreatedDate,
    Published,
    AuthorInfo,
    Thumbnail,
    PK,
    Content
  ) => {
    setFormData({
      PostID: PostID,
      PostTitle: PostTitle,
      Description: Description,
      ReadingTime: ReadingTime,
      MetaDescription: MetaDescription,
      MetaKeyword: MetaKeyword,
      CreatedDate: CreatedDate,
      UpdatedDate:
        new Date().toLocaleDateString("vi-VN") +
        " " +
        new Date().toLocaleTimeString("vi-VN"),
      Published: Published,
      AuthorInfo: AuthorInfo,
      Tags: Tags,
      Categories: Categories,
      EmptyImage: PostImage,
      EmptyThumbnail: Thumbnail,
      PK: PK,
      Content: Content,
    });
    handleClickOpen();
  };

  const handleOpenDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleSubmitDelete = () => {
    deletePost(selectionModel, dispatch);
    setDeleteDialogOpen(false);
  };

  const onChange = (e, val) => {
    const { value, id } = e.target;
    let tagId, categoryId;
    if (id.startsWith("Tags-option")) {
      tagId = id;
    }
    if (id.startsWith("Categories-option")) {
      categoryId = id;
    }
    switch (id) {
      case "PostImage":
        return setFormData({ ...formData, [id]: e.target.files[0] });
      case "Thumbnail":
        return setFormData({ ...formData, [id]: e.target.files[0] });
      case tagId:
        return setFormData({ ...formData, Tags: val });
      case categoryId:
        return setFormData({ ...formData, Categories: val });
      default:
        return setFormData({ ...formData, [id]: value });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    document.getElementById("Content").click();
    const data = new FormData();
    const data2 = new FormData();

    const imageName =
      formData.PostImage === undefined
        ? formData.EmptyImage
        : Date.now() + formData.PostImage.name;
    data.append("name", imageName);
    data.append("file", formData.PostImage);

    const ThumbnailName =
      formData.Thumbnail === undefined
        ? formData.EmptyThumbnail
        : Date.now() + formData.Thumbnail.name;
    data2.append("name", ThumbnailName);
    data2.append("file", formData.Thumbnail);

    await publicRequest.post("/upload", data);
    await publicRequest.post("/upload", data2);
    if (formData.PostID) {
      updatePost(
        formData.PostID,
        formData.PostTitle,
        {
          PostID: formData.PostID,
          PostTitle: formData.PostTitle,
          Thumbnail: ThumbnailName,
          PostImage: imageName,
          ReadingTime: formData.ReadingTime,
          Published: formData.Published,
          Description: formData.Description,
          MetaDescription: formData.MetaDescription,
          MetaKeyword: formData.MetaKeyword,
          UpdatedDate: formData.UpdatedDate,
          CreatedDate: formData.CreatedDate,
          AuthorInfo: formData.AuthorInfo,
          Tags: formData.Tags,
          Categories: formData.Categories,
          PK: formData.PK,
          Content: formData.Content,
        },
        dispatch
      );
      handleClose();
    } else {
      addPost(
        {
          PostTitle: formData.PostTitle,
          Content: formData.Content,
          Thumbnail: ThumbnailName,
          PostImage: imageName,
          Description: formData.Description,
          Tags: formData.Tags,
          Categories: formData.Categories,
          MetaKeyword: formData.MetaKeyword,
          ReadingTime: formData.ReadingTime,
          MetaDescription: formData.MetaDescription,
          Published: "active",
        },
        dispatch
      );
      handleClose();
    }
  };

  //set column show in page
  const columns = [
    {
      field: "PostTitle",
      headerName: "Title",
      width: 450,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img
              className="productListImg"
              src={baseImageUrl + params.row.Thumbnail}
              alt=""
            />
            {params.row.PostTitle}
          </div>
        );
      },
    },
    {
      field: "AuthorInfo",
      headerName: "Author",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.AuthorInfo.FullName}
          </div>
        );
      },
    },
    {
      field: "CreatedDate",
      headerName: "Created Date",
      width: 180,
    },
    {
      field: "UpdatedDate",
      headerName: "Updated Date",
      width: 180,
    },
    {
      field: "ReadingTime",
      headerName: "Reading Time",
      width: 165,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.ReadingTime} Min read
          </div>
        );
      },
    },
    {
      field: "Published",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.Published}</div>;
      },
    },
    {
      field: "PostID",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        if (userId === params.row.PK) {
          return (
            <>
              <button
                className="productListEdit"
                onClick={() =>
                  handleUpdate(
                    params.row.PostID,
                    params.row.PostImage,
                    params.row.Description,
                    params.row.ReadingTime,
                    params.row.PostTitle,
                    params.row.MetaDescription,
                    params.row.MetaKeyword,
                    params.row.Tags,
                    params.row.Categories,
                    params.row.CreatedDate,
                    params.row.Published,
                    params.row.AuthorInfo,
                    params.row.Thumbnail,
                    params.row.PK,
                    params.row.Content
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
    <div className="list">
      <Sidebar />
      <div className="list__container" id="main">
        <Navbar />
        <div className="productList" style={{ width: "100%" }}>
          <div className="datatableTitle">
            <Button
              onClick={handleClickOpen}
              id="add-button"
              className="add-new"
            >
              Add Post
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
            {...posts}
            sortModel={[
              {
                field: "CreatedDate",
                sort: "desc",
              },
            ]}
            rows={posts}
            columns={columns}
            getRowId={(row) => row.PostID}
            pageSize={pageSize}
            disableSelectionOnClick
            onSelectionModelChange={(PostID) => {
              setSelectionModel(PostID);
            }}
            selectionModel={selectionModel}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
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
  );
}

export default Post;
