import axiosApi from '../../axiosApi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import {TextForm} from '../../types';

interface Props {
  textForm: TextForm;
}
const PostsPage = () => {
  const [postData, setPostData] = useState<Props | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const getPostData = async () => {
      try {
        const responseData = await axiosApi.get(`/posts/${id}.json`);
        if (responseData.status !== 200) {
          throw new Error('ERROR ' + responseData.status);
        }
        setPostData(responseData.data);
      } catch (error) {
        console.error('Error:', error);
      }finally {
        setLoading(false);
      }
    };
    void getPostData();
  }, [id]);

  if (loading) {
    return <Spinner/>;
  }
  if (!postData) {
    return null;
  }

  return (
    <div id={id} className="post-details">
      <p><strong>Created on: </strong>{postData.textForm.date}</p>
      <div><strong>Title: </strong>{postData.textForm.title}</div>
      <div className="mt-2">{postData.textForm.text}</div>
      <div className="m-3">
        <button type="button" className="btn btn-secondary">Edit</button>
        <button type="button" className="btn btn-secondary ms-3">Delete</button>
      </div>
    </div>
  );
};

export default PostsPage;
