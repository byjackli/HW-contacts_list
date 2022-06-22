import React from 'react';
import Editor from '../components/Editor';

function MyCard() {
  return (
    <main>
      <h1>My Contact Card</h1>
      <Editor id="me" fixed expanded />
    </main>
  );
}

export default MyCard;
