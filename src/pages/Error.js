import React from 'react';

function Error(props) {
  return (
    <main>
      <h1>Error</h1>
      <div className="help">{props.msg
        ? props.msg
        : "The page you are looking for does not exist!"
      }</div>
    </main>
  );
}

export default Error;
