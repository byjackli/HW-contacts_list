import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Editor from '../components/Editor';
import Error from "./Error"

function Edit() {
  const
    db = useSelector((state) => state.contacts.db);
  const { id } = useParams();

  return (
    <>
      {
        db[id] || ['demo', 'me'].includes(id)
          ? <main>
            <h1> Editing Contact</h1>
            <Editor id={id} fixed={['demo', 'me'].includes(id)} />
          </main >
          : <Error msg="The user you are trying to edit does not exist!" />
      }
    </>
  );
}

export default Edit;
