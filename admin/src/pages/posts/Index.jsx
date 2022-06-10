import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPost,
  deletePost,
  getPosts,
  updatePost,
} from "../../redux/apiCalls";
import { toast } from "react-toastify";
import "../../assets/sass/general/list.scss";
import { Button } from "@mui/material";
import FormDialog from "./FormDialog";
import { baseImageUrl, publicRequest } from "../../requestMethods";
const initialValue = {
  PostTitle: "",
  Thumbnail: undefined,
  PostImage: undefined,
  Description: "",
  Content: "",
  ReadingTime: "5",
  MetaDescription: "",
  MetaTitle: "",
  MetaKeyword: "",
  Published: "active",
  PublishedDate: "",
  UpdatedDate: "",
  AuthorInfo: "",
  EmptyImage: "",
  EmptyThumbnail: "",
  Tags: [],
  Categories: [],
};

function Post() {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(10);
  const posts = useSelector((state) => state.post.posts);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialValue);

  useEffect(() => {
    getPosts(dispatch);
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue);
  };

  const handleUpdate = (
    PostID,
    PostImage,
    Description,
    ReadingTime,
    PostTitle,
    MetaDescription,
    MetaTitle,
    MetaKeyword,
    Tags,
    Categories,
    PublishedDate,
    Published,
    AuthorInfo,
    Thumbnail
  ) => {
    setFormData({
      PostID: PostID,
      PostTitle: PostTitle,
      Description: Description,
      ReadingTime: ReadingTime,
      MetaDescription: MetaDescription,
      MetaTitle: MetaTitle,
      MetaKeyword: MetaKeyword,
      PublishedDate: PublishedDate,
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
    });
    handleClickOpen();
  };

  //Deletepost
  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure, you want to delete this row",
      id
    );
    if (confirm) {
      deletePost(id, dispatch);
      toast.success("Post deleted successfully", {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }
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

  const handleFormSubmit = async () => {
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
          MetaTitle: formData.MetaTitle,
          UpdatedDate: formData.UpdatedDate,
          PublishedDate: formData.PublishedDate,
          AuthorInfo: formData.AuthorInfo,
          Tags: formData.Tags,
          Categories: formData.Categories,
        },
        dispatch
      );
      //close modal
      handleClose();
      toast.success("Post updated successfully", {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
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
          MetaTitle: formData.MetaTitle,
          Published: "active",
        },
        dispatch
      );
      handleClose();
      toast.success("Post created successfully", {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }
  };

  //set column show in page
  const columns = [
    {
      field: "PostTitle",
      headerName: "Title",
      minWidth: 300,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img
              className="productListImg"
              src={baseImageUrl + params.row.PostImage}
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
      minWidth: 130,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.AuthorInfo.FullName}
          </div>
        );
      },
    },
    {
      field: "PublishedDate",
      headerName: "Published Date",
      width: 150,
    },
    {
      field: "UpdatedDate",
      headerName: "Updated Date",
      width: 160,
    },
    {
      field: "ReadingTime",
      headerName: "Reading Time",
      width: 130,
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
      width: 160,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.Published}</div>;
      },
    },
    {
      field: "PostID",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          // {user.exportData.}
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
                  params.row.MetaTitle,
                  params.row.MetaKeyword,
                  params.row.Tags,
                  params.row.Categories,
                  params.row.PublishedDate,
                  params.row.Published,
                  params.row.AuthorInfo,
                  params.row.Thumbnail
                )
              }
            >
              Edit
            </button>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.PostID)}
            />
          </>
        );
      },
    },
  ];
  //custom toolbar
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  return (
    <div className="list">
      <Sidebar />
      <div className="list__container">
        <Navbar />
        <div className="productList" style={{ width: "auto" }}>
          <div className="datatableTitle">
            <Button onClick={handleClickOpen}>Add New Post</Button>
          </div>
          <DataGrid
            autoHeight
            {...posts}
            rows={posts}
            disableSelectionOnClick
            columns={columns}
            getRowId={(row) => row.PostID}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            pagination
            checkboxSelection
            components={{
              Toolbar: CustomToolbar,
            }}
          />
        </div>
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
