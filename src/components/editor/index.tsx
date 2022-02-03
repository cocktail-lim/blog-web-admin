import React, { useEffect } from 'react';
import Vditor from 'vditor';
import 'vditor/src/assets/scss/index.scss';
import './index.scss';

const Editor: React.FC = () => {
  useEffect(() => {
    const vditor = new Vditor('vditor', {
      toolbarConfig: {
        pin: true,
      },
      cache: {
        enable: true,
        id: 'vditor-blog',
      },
      after() {
        vditor.setValue('');
      },
    });
  });
  return <div id='vditor'></div>;
};

export default Editor;
