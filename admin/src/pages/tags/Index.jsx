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
import { addTag, deleteTag, getTags, updateTag } from "../../redux/apiCalls";
import { toast } from "react-toastify";
import "../../assets/sass/general/list.scss";
import { Button } from "@mui/material";
import FormDialog from "./FormDialog";

function Tag() {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(10);
  const tags = useSelector((state) => state.tag.tags);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState();

  useEffect(() => {
    getTags(dispatch);
  }, []);

  //set column show in page
  const columns = [
    {
      field: "PostTitle",
      headerName: "Title",
      minWidth: 1000,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.Thumbnail} alt="" />
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
      field: "TagId",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <button className="productListEdit">Edit</button>
            <DeleteOutline className="productListDelete" />
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
            <Button>Add New</Button>
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
      </div>
    </div>
  );
}

export default Tag;
