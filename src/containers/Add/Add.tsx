import axiosApi from '../../axiosApi';
import { useCallback, useEffect, useState } from 'react';
import { TextData, TextForm } from '../../types';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';

const Add = () => {
  const navigate = useNavigate();
  const [textForm, setTextForm] = useState<TextForm>({
    id: Math.random().toString(),
    date: new Date().toLocaleString(),
    title: '',
    text: '',
  });
  const [loading, setLoading] = useState(true);
  const param = useParams() as { id: string };

  useEffect(() => {
    const getPostData = async () => {
      try {
        const responseData = await axiosApi.get(`/posts/${param.id}.json`);
        if (responseData.status === 200) {
          setTextForm(responseData.data.textForm);
        }
      } catch (error) {
        console.error('Error:', error);
      }finally {
        setLoading(false);
      }
    };

    if (param.id) {
      void getPostData();
    }else {
      setLoading(false);
    }
  }, [param.id]);

  const textChanged = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setTextForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    []
  );

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const sendForm: TextData = {
      textForm,
    };

    try {
      if (param.id) {
        await axiosApi.put(`/posts/${param.id}.json`, sendForm);
      } else {
        await axiosApi.post('posts.json', sendForm);
      }

      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="row mt-2">
      <div className="col">
        {loading ? (
          <Spinner/>
        ) : (
          <form onSubmit={onFormSubmit}>
            <h3>{param.id ? 'Edit post' : 'Add new post'}</h3>
            <p>{textForm.date}</p>
            <div className="form-group">
              <label htmlFor="title" className="mb-2">
                Title
              </label>
              <input
                id={textForm.id}
                type="text"
                name="title"
                required
                className="form-control"
                value={textForm.title}
                onChange={textChanged}
              />
            </div>
            <div className="form-group d-flex flex-column my-3">
              <label htmlFor="post" className="mb-2">
                Description
              </label>
              <textarea
                className="p-2"
                id={textForm.id}
                name="text"
                required
                rows={10}
                cols={40}
                value={textForm.text}
                onChange={textChanged}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {param.id ? 'UPDATE' : 'SAVE'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Add;
