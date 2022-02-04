import React, { ChangeEvent, useCallback, useRef, useState, useEffect } from 'react';
import { Input, Button, Modal, message } from 'antd';
import PageHeader from '@/components/pageHeader';
import EstablishModal from '@/components/articleEstablishModal';
import Vditor from 'vditor';
import { establishArticle } from '@/apis/article';
import type { EstablishArticleParam } from '@/apis/article';
import type { ChangeArticleCategory, ChangeArticleTag } from '@/components/articleEstablishModal';
import type { RequestConfig } from '@/utils/commonTypes';
import type { RequestError } from '@/utils/request';

import 'vditor/src/assets/scss/index.scss';
import './index.scss';

const BlogAdd: React.FC = () => {
  const titleRef = useRef<string>('');
  const vditorRef = useRef<Vditor>();
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const curCategory = useRef<number>(-1);
  const curTags = useRef<number[]>([]);
  const curCover = useRef<string>('');
  const curSticky = useRef<boolean>(false);
  const isDraft = useRef<boolean>(false);

  useEffect(() => {
    vditorRef.current = new Vditor('vditor', {
      toolbarConfig: {
        pin: true,
      },
      cache: {
        enable: true,
        id: 'vditor-blog',
      },
      after() {
        vditorRef.current?.setValue('');
      },
    });
  }, []);

  const articleEstablish = useCallback(async (): Promise<void> => {
    const articleCotent = vditorRef.current?.getValue();
    const config: RequestConfig<EstablishArticleParam> = {
      api: 'api/admin/article/saveOrUpdateArticle',
      method: 'post',
      data: {
        articleTitle: titleRef.current,
        articleContent: articleCotent,
        articleCover: curCover.current,
        categoryId: curCategory.current,
        tagList: curTags.current,
        isTop: curSticky.current,
        isDraft: isDraft.current,
      },
    };
    try {
      await establishArticle(config);
      setModalVisible(false);
      message.success('发布成功');
    } catch (e) {
      const err: RequestError = e as RequestError;
      message.error(err.message);
    }
  }, []);

  const handleChangeCategory: ChangeArticleCategory = (value: number): void => {
    curCategory.current = value;
  };

  const handleChangeTags: ChangeArticleTag = (value: number[]): void => {
    curTags.current = value;
  };

  const handleChangeCover = (e: ChangeEvent<HTMLInputElement>): void => {
    curCover.current = e.target.value;
  };

  const handleChangeSticky = (checked: boolean): void => {
    curSticky.current = checked;
  };

  const onEstablishArticle = (draftFlag: boolean): void => {
    isDraft.current = draftFlag;
    setModalVisible(true);
  };

  const handleCancel = (): void => {
    setModalVisible(false);
  };

  const handleOk = (): void => {
    articleEstablish();
  };

  return (
    <div className='editor-content'>
      <div className='title-box'>
        <PageHeader title='发布文章' />
        <div className='operation-box'>
          <Input
            className='title-input'
            onChange={(value: ChangeEvent<HTMLInputElement>) =>
              (titleRef.current = value.target.value)
            }
            placeholder='请输入标题'
          />
          <div className='article-operation'>
            <Button
              className='operation-button'
              type='primary'
              onClick={() => onEstablishArticle(false)}>
              保存草稿
            </Button>
            <Button
              className='operation-button'
              type='primary'
              onClick={() => onEstablishArticle(true)}>
              发布文章
            </Button>
          </div>
        </div>
      </div>
      <div className='editor-box'>
        <div id='vditor'></div>
      </div>
      <Modal visible={isModalVisible} onCancel={handleCancel} onOk={handleOk}>
        <EstablishModal
          onChangeCategory={handleChangeCategory}
          onChangeTags={handleChangeTags}
          onChangeCover={handleChangeCover}
          onChangeSticky={handleChangeSticky}
        />
      </Modal>
    </div>
  );
};

export default BlogAdd;
