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
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../redux/apiCalls";
import { toast } from "react-toastify";
import "../../assets/sass/general/list.scss";
import { Button } from "@mui/material";
import FormDialog from "./FormDialog";
import { baseImageUrl, publicRequest } from "../../requestMethods";

const initialValue = {
  CategoryName: "",
  Thumbnail: undefined,
  EmptyThumnail: "",
};
function Category() {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(10);
  const categories = useSelector((state) => state.category.categories);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialValue);

  useEffect(() => {
    getCategories(dispatch);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue);
  };

  const handleUpdate = (CategoryId, CategoryName, Thumbnail, CreatedDate) => {
    setFormData({
      CategoryId: CategoryId,
      CategoryName: CategoryName,
      EmptyThumnail: Thumbnail,
      CreatedDate: CreatedDate,
    });
    handleClickOpen();
  };

  //Deletepost
  const handleDelete = (id, name) => {
    const confirm = window.confirm(
      `Are you sure, you want to delete '${name}'`
    );
    if (confirm) {
      deleteCategory(id, name, dispatch);
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

  const handleFormSubmit = () => {
    const data = new FormData();
    const imageName =
      formData.Thumbnail === undefined
        ? formData.EmptyThumnail
        : Date.now() + formData.Thumbnail.name;
    data.append("name", imageName);
    data.append("file", formData.Thumbnail);
    publicRequest.post("/upload", data);
    if (formData.CategoryId) {
      updateCategory(
        formData.CategoryId,
        formData.CategoryName,
        {
          CategoryId: formData.CategoryId,
          CategoryName: formData.CategoryName,
          Thumbnail: imageName,
          CreatedDate: formData.CreatedDate,
        },
        dispatch
      );
      //close modal
      handleClose();
    } else {
      addCategory(
        {
          CategoryName: formData.CategoryName,
          Thumbnail: imageName,
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
      field: "CategoryName",
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
            {params.row.CategoryName}
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
      field: "CategoryId",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <button
              className="productListEdit"
              onClick={() =>
                handleUpdate(
                  params.row.CategoryId,
                  params.row.CategoryName,
                  params.row.Thumbnail,
                  params.row.CreatedDate
                )
              }
            >
              Edit
            </button>
            <DeleteOutline
              className="productListDelete"
              onClick={() =>
                handleDelete(params.row.CategoryId, params.row.CategoryName)
              }
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
    <>
      <div className="list">
        <Sidebar />
        <div className="list__container">
          <Navbar />
          <div className="productList" style={{ width: "auto" }}>
            <div className="datatableTitle">
              <Button onClick={handleClickOpen}>Add New Category</Button>
            </div>
            <DataGrid
              autoHeight
              {...categories}
              rows={categories}
              disableSelectionOnClick
              columns={columns}
              getRowId={(row) => row.CategoryId}
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

export default Category;