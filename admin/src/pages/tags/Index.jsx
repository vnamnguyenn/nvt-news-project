import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { DeleteOutline } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTag, deleteTag, getTags, updateTag } from "../../redux/apiCalls";
import { baseImageUrl, publicRequest } from "../../requestMethods";
import "../../assets/sass/general/list.scss";
import { Button } from "@mui/material";
import FormDialog from "./FormDialog";

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
  const [formData, setFormData] = useState(initialValue);
  const userId =
    "ACCT_" +
    useSelector((state) => state.user.currentUser.exportData.AccountId);
  useEffect(() => {
    getTags(dispatch);
    document.title = "Admin Dashboard - Tags";
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  //Deletepost
  const handleDelete = (id, name) => {
    const confirm = window.confirm(
      `Are you sure, you want to delete '${name}'`
    );
    if (confirm) {
      deleteTag(id, name, dispatch);
    }
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
              src={baseImageUrl + params.row.Thumbnail}
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
      renderCell: (params) => {
        return <div className="productListItem">{params.row.CreatedDate}</div>;
      },
    },
    {
      field: "UpdatedDate",
      headerName: "Updated Date",
      width: 200,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.UpdatedDate}</div>;
      },
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
              <DeleteOutline
                className="productListDelete"
                onClick={() =>
                  handleDelete(params.row.TagId, params.row.TagName)
                }
              />
            </>
          );
        } else {
          return (
            <>
              <button className="productListEditDisabled">Edit</button>
              <DeleteOutline className="productListDeleteDisabled" />
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
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  return (
    <>
      <div className="list">
        <Sidebar />
        <div className="list__container">
          <Navbar />
          <div className="productList" style={{ width: "auto" }}>
            <div className="datatableTitle">
              <Button onClick={handleClickOpen} className="add-new">
                Add New Tag
              </Button>
            </div>
            <DataGrid
              autoHeight
              {...tags}
              rows={tags}
              disableSelectionOnClick
              columns={columns}
              getRowId={(row) => row.TagId}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[10, 25, 50, 100]}
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
    </>
  );
}

export default Tag;
