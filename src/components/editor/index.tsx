import React, { useEffect, useRef } from 'react';
import Vditor from 'vditor';
import './index.scss';

interface EditorPorps {
  editorRef: React.RefObject<Vditor>;
}

const Editor: React.FC<EditorPorps> = (props) => {
  return <div id='vditor'></div>;
};

export default Editor;
