import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, deletePost, getPosts, updatePost } from '../../redux/apiCalls';
import '../../assets/sass/general/list.scss';
import { Button } from '@mui/material';
import FormDialog from './FormDialog';
const initialValue = {
  PostTitle: '',
  Thumbnail: '',
  PostImage: '',
  Description: '',
  Content: '',
  ReadingTime: '',
  MetaDescription: '',
  MetaTitle: '',
  MetaKeyword: '',
  Published: '',
  PublishedDate: '',
  UpdatedDate: '',
  AuthorInfo: '',
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

  // setting update row data to form data and opening pop up window
  const handleUpdate = (
    PostID,
    Thumbnail,
    PostImage,
    Description,
    Content,
    ReadingTime,
    PostTitle,
    Published,
    PublishedDate,
    UpdatedDate,
    MetaDescription,
    MetaTitle,
    MetaKeyword,
    AuthorInfo
  ) => {
    setFormData({
      PostID: PostID,
      PostTitle: PostTitle,
      Thumbnail: Thumbnail,
      PostImage: PostImage,
      Description: Description,
      Content: Content,
      ReadingTime: ReadingTime,
      MetaDescription: MetaDescription,
      MetaTitle: MetaTitle,
      MetaKeyword: MetaKeyword,
      PublishedDate: PublishedDate,
      UpdatedDate: UpdatedDate,
      Published: Published,
      AuthorInfo: AuthorInfo,
    });
    handleClickOpen();
  };

  //Deletepost
  const handleDelete = (id) => {
    const confirm = window.confirm('Are you sure, you want to delete this row', id);
    if (confirm) {
      deletePost(id, dispatch);
    }
  };

  const onChange = (e) => {
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFormSubmit = () => {
    if (formData.PostID) {
      updatePost(
        formData.PostID,
        {
          PostID: formData.PostID,
          PostTitle: formData.PostTitle,
          Content: formData.Content,
          Thumbnail: formData.Thumbnail,
          PostImage: formData.PostImage,
          ReadingTime: formData.ReadingTime,
          Published: formData.Published,
          Description: formData.Description,
          MetaDescription: formData.MetaDescription,
          MetaKeyword: formData.MetaKeyword,
          MetaTitle: formData.MetaTitle,
          UpdatedDate: formData.UpdatedDate,
          PublishedDate: formData.PublishedDate,
          AuthorInfo: formData.AuthorInfo,
        },
        dispatch
      );
      handleClose();
    } else {
      // adding new user
      addPost(
        {
          PostTitle: formData.PostTitle,
          Content: formData.Content,
          Thumbnail: formData.Thumbnail,
          PostImage: formData.PostImage,
          Description: formData.Description,
          MetaKeyword: formData.MetaKeyword,
          ReadingTime: formData.ReadingTime,
          MetaDescription: formData.MetaDescription,
          MetaTitle: formData.MetaTitle,
          Published: 'active',
        },
        dispatch
      );
      handleClose();
    }
  };

  //set column show in page
  const columns = [
    {
      field: 'PostTitle',
      headerName: 'Title',
      minWidth: 350,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.Thumbnail} alt="" />
            {params.row.PostTitle}
          </div>
        );
      },
    },
    {
      field: 'AuthorInfo',
      headerName: 'Author',
      minWidth: 350,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.AuthorInfo.FullName}</div>;
      },
    },
    {
      field: 'PublishedDate',
      headerName: 'Published Date',
      width: 175,
    },
    {
      field: 'UpdatedDate',
      headerName: 'Updated Date',
      width: 175,
    },
    {
      field: 'ReadingTime',
      headerName: 'Reading Time',
      width: 180,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.ReadingTime} Min read</div>;
      },
    },
    {
      field: 'Published',
      headerName: 'Status',
      width: 160,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.Published}</div>;
      },
    },
    {
      field: 'PostID',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <button
              className="productListEdit"
              onClick={() =>
                handleUpdate(
                  params.row.PostID,
                  params.row.Thumbnail,
                  params.row.PostImage,
                  params.row.Description,
                  params.row.Content,
                  params.row.ReadingTime,
                  params.row.PostTitle,
                  params.row.Published,
                  params.row.PublishedDate,
                  params.row.UpdatedDate,
                  params.row.MetaDescription,
                  params.row.MetaTitle,
                  params.row.MetaKeyword,
                  params.row.AuthorInfo
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
        <div className="productList" style={{ width: 'auto' }}>
          <div className="datatableTitle">
            <Button onClick={handleClickOpen}>Add New</Button>
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
  );
}

export default Post;
