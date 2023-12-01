import {useEffect, useState} from 'react';
import axiosApi from '../../axiosApi';
import Spinner from '../../components/Spinner/Spinner';
import {AboutData} from '../../types';

const About = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getPostData = async () => {
      try {
        const responseData = await axiosApi.get(`about.json`);
        if (responseData.status !== 200) {
          throw new Error('ERROR ' + responseData.status);
        }
        setAboutData(responseData.data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    void getPostData();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  if (!aboutData) {
    return <div>No contact data available</div>;
  }

  return (
    <div>
      <h3>About me:</h3>
      <div><strong>Фамилия: </strong>{aboutData.lastName}</div>
      <div><strong>Имя: </strong> {aboutData.name}</div>
      <div><strong>Группа: </strong> {aboutData.group}</div>
      <div><strong>Литература: </strong>  {aboutData.book}</div>
      <div><strong>Хобби: </strong>{aboutData.hobby}</div>
      <div><strong>Игры: </strong>{aboutData.game}</div>
    </div>
  );
};


export default About;