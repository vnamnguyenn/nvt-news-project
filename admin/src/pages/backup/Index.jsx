import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { DeleteOutline } from "@material-ui/icons";
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

import "../../assets/sass/general/list.scss";
import { Button } from "@mui/material";

function Backup() {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(10);
  const backup = useSelector((state) => state.backup.backup); //fetch tags data
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);
  const userId =
    "ACCT_" +
    useSelector((state) => state.user.currentUser.exportData.AccountId);
  useEffect(() => {
    getbackup(dispatch);
    document.title = "Admin Dashboard - Backup";
  }, []);
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

  //Deletepost
  const handleDelete = (id, name) => {
    const confirm = window.confirm(
      `Are you sure, you want to delete '${name}'`
    );
    if (confirm) {
      deleteBackup(id, name, dispatch);
    }
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
      field: "BackupID2",
      headerName: "ID",
      width: 200,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.BackupID}</div>;
      },
    },
    {
      field: "BackupName",
      headerName: "Name",
      width: 250,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.BackupName}</div>;
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
      field: "BackupID",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        if (userId === params.row.PK) {
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
                className="productListEdit"
              >
                Download
              </button>
              <DeleteOutline
                className="productListDelete"
                onClick={() =>
                  handleDelete(params.row.BackupID, params.row.BackupName)
                }
              />
            </>
          );
        } else {
          return (
            <>
              <button className="productListEditDisabled">Download</button>
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
            <div style={{ display: "flex", gap: "5px" }}>
              <div className="datatableTitle">
                <Button className="add-new" onClick={handleCreate}>
                  Add New
                </Button>
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
                <Button className="add-new" onClick={handleOpenChooseFile}>
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
    </>
  );
}

export default Backup;
