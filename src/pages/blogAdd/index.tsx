import React from 'react';
import { Input } from 'antd';
import Editor from '@/components/editor';
import PageHeader from '@/components/pageHeader';
import './index.scss';

const BlogAdd: React.FC = () => {
  return (
    <div className='editor-content'>
      <div className='title-box'>
        <PageHeader title='发布文章' />
        <div className='operation-box'>
          <Input className='title-input' />
          <div className='article-operation'></div>
        </div>
      </div>
      <div className='editor-box'>
        <Editor />
      </div>
    </div>
  );
};

export default BlogAdd;
