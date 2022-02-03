import React from 'react';
import './index.scss';

interface HeaderProps {
  title: string;
}

const PageHeader: React.FC<HeaderProps> = (props) => {
  return (
    <div className='page-header'>
      <h3>{props.title}</h3>
    </div>
  );
};

export default PageHeader;
