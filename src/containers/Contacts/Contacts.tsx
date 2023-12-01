import {useEffect, useState} from 'react';
import axiosApi from '../../axiosApi';
import Spinner from '../../components/Spinner/Spinner';
import {ContactData} from '../../types';

const Contacts = () => {
  const [contactData, setContactData] = useState<ContactData | null>(null)
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getPostData = async () => {
      try {
        const responseData = await axiosApi.get(`contacts.json`);
        if (responseData.status !== 200) {
          throw new Error('ERROR ' + responseData.status);
        }
        setContactData(responseData.data);
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
  if (!contactData) {
    return <div>No contact data available</div>;
  }

  return (
    <div>
      <h3>Contacts:</h3>
      <div><strong>Страна: </strong>{contactData.country}</div>
      <div><strong>Город: </strong>{contactData.from}</div>
      <div><strong>Адрес: </strong>{contactData.address} <strong>, дом: </strong>{contactData.home}</div>
      <div><strong>Тел.: </strong>{contactData.phoneNumber}</div>
      <div style={{cursor: 'pointer'}}><strong>Email: </strong>{contactData.email}</div>
    </div>
  );
};

export default Contacts;