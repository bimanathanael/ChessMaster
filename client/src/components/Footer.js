import React from "react";
import { AiFillGithub } from 'react-icons/ai';

export default () => {
  return (
    <>
      <footer class="footer mt-auto py-3" style={{backgroundColor: '#206a5d', borderTop: '3px solid ghostwhite'}}>
        <div class="container bg-white text-center" style={{ width: '12%', }}>
          <a href="https://github.com/bimanathanael/ChessMaster" style={{margin:'5px'}}>
            <span class="text-muted"> <AiFillGithub style={{marginBottom: '5px'}}/> View on Github </span>
          </a>
        </div>
      </footer>
    </>
  );
};
