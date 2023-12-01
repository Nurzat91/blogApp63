import axiosApi from '../../axiosApi';
import { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import { TextForm } from '../../types';

interface Props {
  textForm: TextForm;
}

const PostsPage = () => {
  const [postData, setPostData] = useState<Props | null>(null);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const param = useParams() as { id: string };
  const navigate = useNavigate();

  useEffect(() => {
    const getPostData = async () => {
      try {
        const responseData = await axiosApi.get(`/posts/${param.id}.json`);
        if (responseData.status !== 200) {
          throw new Error('ERROR ' + responseData.status);
        }
        setPostData(responseData.data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    void getPostData();
  }, [param.id]);

  const editClick = () => {
    setEdit(true);
  };

  const saveChanges = async () => {
    try {
      await axiosApi.put(`/posts/${param.id}.json`, postData);
      setEdit(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deletePost = async () => {
    try {
      await axiosApi.delete(`/posts/${param.id}.json`);

      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (!postData) {
    return null;
  }


  return (
    <div id={param.id}>
      {edit ? (
        <div className="d-block mt-3">
          <div className="form-group">
            <label htmlFor="title" className="mb-2 fw-bold">Title:</label>
            <input
              className="ms-3 p-1"
              type="text"
              value={postData.textForm.title}
              onChange={(e) =>
                setPostData({
                  ...postData,
                  textForm: { ...postData.textForm, title: e.target.value },
                })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="post" className="mb-2 fw-bold">Description:</label>
            <textarea
              className="p-2"
              rows={10} cols={160}
              value={postData.textForm.text}
              onChange={(e) =>
                setPostData({
                  ...postData,
                  textForm: { ...postData.textForm, text: e.target.value },
                })
              }
            ></textarea>
          </div>
          <button type="button" className="btn btn-success" onClick={saveChanges}>Save</button>
        </div>
      ) : (
        <>
          <p>
            <strong>Created on: </strong>
            {postData.textForm.date}
          </p>
          <div>
            <strong>Title: </strong>
            {postData.textForm.title}
          </div>
          <div className="mt-2">{postData.textForm.text}</div>
          <div className="m-3">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={editClick}
            > Edit</button>
            <button type="button" className="btn btn-secondary ms-3" onClick={deletePost}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default PostsPage;
