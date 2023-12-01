import axiosApi from '../../axiosApi';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import { TextForm } from '../../types';

interface Props {
  textForm: TextForm;
}

const PostsPage = () => {
  const [postData, setPostData] = useState<Props | null>(null);
  const [loading, setLoading] = useState(true);
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

  const editPost = () => {
    navigate(`/posts/${param.id}/edit`, {
      state: { postData },
    });
  };

  return (
    <div id={param.id}>
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
          onClick={editPost}
        >
          Edit
        </button>
        <button type="button" className="btn btn-secondary ms-3" onClick={deletePost}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostsPage;
