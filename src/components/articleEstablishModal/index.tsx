import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Select, Input, Switch, message } from 'antd';
import { getArticleTags, getArticleCategory } from '@/apis/article';
import type { RequestConfig } from '@/utils/commonTypes';
import type { RequestError } from '@/utils/request';
import type { TagItem, TagListResponse, CategoryItem, CategoryResponse } from '@/apis/article';
import type { DefaultOptionType } from 'antd/lib/select';
import './index.scss';

export type ChangeArticleCategory = (value: number) => void;
export type ChangeArticleTag = (value: number[]) => void;
export type ChangeCover = (e: ChangeEvent<HTMLInputElement>) => void;
export type ChangeSticky = (checked: boolean) => void;

interface EstablishProps {
  onChangeCategory: ChangeArticleCategory;
  onChangeTags: ChangeArticleTag;
  onChangeCover: ChangeCover;
  onChangeSticky: ChangeSticky;
}

const EstablishModal: React.FC<EstablishProps> = (props) => {
  const [tagList, setTagList] = useState<TagItem[]>([]);
  const [categoryList, setCategoryList] = useState<CategoryItem[]>([]);
  const [tagOptions, setTagOptions] = useState<DefaultOptionType[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<DefaultOptionType[]>([]);

  const getTags = useCallback(async (): Promise<void> => {
    const config: RequestConfig<never> = {
      api: '/api/admin/tag/getTag',
      method: 'get',
    };
    try {
      const response: TagListResponse = await getArticleTags(config);
      const { tagList: newTagList } = response;
      setTagList(newTagList);
    } catch (e) {
      const err: RequestError = e as RequestError;
      message.error(err.message);
    }
  }, [setTagList]);

  const getTypes = useCallback(async (): Promise<void> => {
    const config: RequestConfig<never> = {
      api: '/api/admin/category/getCategory',
      method: 'get',
    };
    try {
      const response: CategoryResponse = await getArticleCategory(config);
      const { categoryList } = response;
      setCategoryList(categoryList);
    } catch (e) {
      const err: RequestError = e as RequestError;
      message.error(err.message);
    }
  }, [setCategoryList]);

  useEffect(() => {
    getTags();
    getTypes();
  }, []);

  useEffect(() => {
    const newTagOptions: DefaultOptionType[] = tagList.map(
      (tagItem: TagItem): DefaultOptionType => ({ label: tagItem.tagName, value: tagItem.tagId })
    );
    setTagOptions(newTagOptions);
  }, [tagList, setTagOptions]);

  useEffect(() => {
    const newCategoryOptions: DefaultOptionType[] = categoryList.map(
      (categoryItem: CategoryItem): DefaultOptionType => ({
        label: categoryItem.categoryName,
        value: categoryItem.categoryId,
      })
    );
    setCategoryOptions(newCategoryOptions);
  }, [categoryList, setCategoryOptions]);

  return (
    <div className='establish-modal-content'>
      <div className='establish-item'>
        <span className='item-label'>文章类别:</span>
        <Select
          className='select-input'
          options={categoryOptions}
          onChange={props.onChangeCategory}
        />
      </div>
      <div className='establish-item'>
        <span className='item-label'>文章标签:</span>
        <Select
          mode='multiple'
          className='select-input'
          options={tagOptions}
          onChange={props.onChangeTags}
        />
      </div>
      <div className='establish-item'>
        <span className='item-label'>文章封面URL:</span>
        <Input onChange={props.onChangeCover} />
      </div>
      <div className='establish-item'>
        <span className='item-label'>置顶:</span>
        <Switch onChange={props.onChangeSticky} />
      </div>
    </div>
  );
};

export default EstablishModal;
