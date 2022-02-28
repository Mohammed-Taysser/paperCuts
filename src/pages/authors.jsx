import React, { useContext, useEffect, useState } from 'react';
import SingleMember from '../components/SingleMember';
import Banner from '../components/Banner';
import { AuthorsAPI, AUTHORS } from '../api/Localhost';
import IsJsonServerDown from '../context/IsJsonServerDown';

function Authors() {
  const [authors, setAuthors] = useState(AUTHORS);
  const is_jsonServer_down = useContext(IsJsonServerDown);

  useEffect(() => {
    if (is_jsonServer_down) {
      setAuthors(AUTHORS);
    } else {
      get_author_api();
    }
  }, [is_jsonServer_down]);

  const get_author_api = () => {
    AuthorsAPI.get(`/`)
      .then((response) => {
        setAuthors(response.data);
      })
      .catch((err) => {
        setAuthors(AUTHORS);
      });
  };

  const authors_list = () => {
    return authors.map((member) => {
      const config = {
        name: `${member.first_name} ${member.last_name}`,
        avatar: member.img,
        position: member.email,
      };
      return <SingleMember key={member.id} member={config} url_id={member.id} />;
    });
  };
  return (
    <>
      <Banner title='authors' subtitle='info' />
      <section className='my-5 py-5'>
        <div className='container'>
          <div className='row justify-content-center align-items-center'>
            {authors_list()}
          </div>
        </div>
      </section>
    </>
  );
}

export default Authors;
