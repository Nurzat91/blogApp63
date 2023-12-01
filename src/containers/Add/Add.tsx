import axiosApi from '../../axiosApi';
import {useCallback, useState} from 'react';
import {TextData, TextForm} from '../../types';
import {useNavigate} from 'react-router-dom';
const Add = () => {
  const navigate = useNavigate();
  const [textForm, setTextForm] = useState<TextForm>({
    id: Math.random().toString(),
    date: new Date().toLocaleString(),
    title: '',
    text: '',
  });

  const textChanged = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;

    setTextForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const onFormSubmit = async (event: React.FormEvent) =>{
    event.preventDefault();

    const sendForm: TextData = {
      textForm,
    }

    try{
      await axiosApi.post('posts.json', sendForm);

      navigate('/');
    }finally {

    }
  };

  return (
    <div className="row mt-2">
      <div className="col">
        <form onSubmit={onFormSubmit}>
          <h3>Add new post</h3>
          <p>{textForm.date}</p>
          <div className="form-group">
            <label htmlFor="title" className="mb-2">Title</label>
            <input
              id={textForm.id} type="text" name="title" required
              className="form-control"
              value={textForm.title}
              onChange={textChanged}
            />
          </div>
          <div className="form-group d-flex flex-column my-3">
            <label htmlFor="post" className="mb-2">Description</label>
            <textarea
              id={textForm.id} name="text" required rows={5} cols={40}
              value={textForm.text}
              onChange={textChanged}
            />
          </div>
          <button type="submit" className="btn btn-primary">SAVE</button>
        </form>
      </div>
    </div>
  );
};

export default Add;