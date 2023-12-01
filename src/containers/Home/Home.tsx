import axiosApi from '../../axiosApi';
import { useEffect, useState } from 'react';
import { TextForm } from '../../types';
import {Link} from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';

interface Props {
  textForm: TextForm;
}

const Home = () => {
  const [posts, setPosts] = useState<{ [key: string]: Props }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const responseData = await axiosApi.get('posts.json');
        if (responseData.status !== 200) {
          throw new Error('ERROR ' + responseData.status);
        }

        setPosts(responseData.data);
      } catch (error) {
        console.error('Error:', error);
      }finally {
        setLoading(false);
      }
    };
    void getPosts();
  }, []);

  if (loading) {
    return <Spinner/>;
  }

  return (
    <div>
      {Object.keys(posts).map((postKey) => {
        const post = posts[postKey];
        return (
          <div key={postKey} className="card my-3 p-3">
            <div>
              <strong>Created on:</strong> {post.textForm.date}
            </div>
            <div>
              <strong>Title: </strong>
              {post.textForm.title}
            </div>
            <Link className="btn btn-light w-25" to={'/posts/' + postKey}>Read more &gt;&gt;</Link>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
