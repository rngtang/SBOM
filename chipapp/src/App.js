import React from 'react';
import SyftParser from './SyftParser';
import CodeVisualizer from './CodeVisualizer';
import SendJSON from './SendJSON';
import { CodeVisualizer } from './CodeVisualizer';


const App = () => {
  return (
    <div>
      {/* Other components and content */}
      <SendJSON />
      {/* <SyftParser /> */}
      <CodeVisualizer />
    </div>
  );
};

export default App;
