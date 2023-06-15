import React from 'react';
import SyftParser from './SyftParser';
<<<<<<< HEAD
import CodeVisualizer from './CodeVisualizer';
import SendJSON from './SendJSON';
=======
import { CodeVisualizer } from './CodeVisualizer';

>>>>>>> bb45b5dcdf087217fa8ed9d856aa657b47d5e74f

const App = () => {
  return (
    <div>
      {/* Other components and content */}
      <SendJSON />
      <SyftParser />
      <CodeVisualizer />
    </div>
  );
};

export default App;
