import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Table, Pagination, Image, Tag, Button, message, Switch, Input } from 'antd';
import { ClockCircleOutlined, SearchOutlined } from '@ant-design/icons';
import PageHeader from '@/components/pageHeader';
import { getArticleList, stickArticle } from '@/apis/article';
import dayjs from 'dayjs';
import type { ColumnsType } from 'antd/lib/table';
import type { RequestConfig } from '@/utils/commonTypes';
import type {
  ArticleListParams,
  ArticleItem,
  ArticleListReponse,
  ArticleStickyParams,
} from '@/apis/article';
import type { RequestError } from '@/utils/request';
import './index.scss';

const BlogList: React.FC = () => {
  const searchInputRef = useRef<string>('');
  const [total, setTotal] = useState<number>(0);
  const [cur, setCur] = useState<number>(1);
  const [size, setSize] = useState<number>(5);
  const [isLoading, setLoading] = useState<boolean>(true);
  const changeArticleSticky = async (checked: boolean, item: ArticleItem) => {
    const config: RequestConfig<ArticleStickyParams> = {
      api: '/api/admin/article/topArticleById',
      method: 'post',
      data: {
        articleId: item.articleId,
        isTop: checked,
      },
    };
    try {
      await stickArticle(config);
      message.success('修改成功');
    } catch (e) {
      const err: RequestError = e as RequestError;
      message.error(err.message);
    }
  };

  const columns: ColumnsType<ArticleItem> = useMemo(
    () => [
      {
        key: 'cover',
        title: '文章封面',
        dataIndex: 'cover',
        align: 'center',
        render: (text: string) => <Image width={200} src={text} />,
      },
      {
        key: 'articleTitle',
        title: '标题',
        dataIndex: 'articleTitle',
        align: 'center',
      },
      {
        key: 'categoryName',
        title: '分类',
        dataIndex: 'categoryName',
        align: 'center',
      },
      {
        key: 'tagList',
        title: '标签',
        dataIndex: 'tagList',
        align: 'center',
        render: (text: string[]) => (
          <div className='tags-box'>
            {text.map((textItem: string, index: number) => (
              <Tag color={'blue'} key={index}>
                {textItem}
              </Tag>
            ))}
          </div>
        ),
      },
      {
        key: 'createTime',
        title: '发表时间',
        dataIndex: 'createTime',
        align: 'center',
        render: (text: string) => (
          <div className='time-box'>
            <ClockCircleOutlined style={{ marginRight: 5 }} />
            {dayjs(text).format('YYYY-MM-DD HH:mm:ss')}
          </div>
        ),
      },
      {
        key: 'isTop',
        title: '置顶',
        align: 'center',
        dataIndex: 'isTop',
        render: (text: boolean, record: ArticleItem) => (
          <Switch
            defaultChecked={text}
            onChange={(checked) => changeArticleSticky(checked, record)}
          />
        ),
      },
      {
        key: 'operation',
        title: '操作',
        align: 'center',
        render: (text, record) => (
          <div className='operation-box'>
            <Button className='operation-button' type='primary'>
              编辑
            </Button>
            <Button className='operation-button' type='primary' danger>
              删除
            </Button>
          </div>
        ),
      },
    ],
    [changeArticleSticky]
  );
  const [articleList, setArticleList] = useState<ArticleItem[]>([]);
  const getArticle = useCallback(async (): Promise<void> => {
    const config: RequestConfig<ArticleListParams> = {
      api: '/api/admin/article/getArticleListPage',
      method: 'get',
      params: {
        current: cur,
        size,
        articleTitle: searchInputRef.current,
      },
    };
    try {
      setLoading(true);
      const response: ArticleListReponse = await getArticleList(config);
      const { articleList: newArticleList, total: newTotal } = response;
      setArticleList(newArticleList);
      setTotal(newTotal);
    } catch (e) {
      const err: RequestError = e as RequestError;
      message.error(err.message);
    }
    setLoading(false);
  }, [cur, size]);

  useEffect(() => {
    getArticle();
  }, [cur, size]);

  const searchArticle = (): void => {
    getArticle();
  };

  const changeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    searchInputRef.current = e.target.value;
  };

  const changePage = (page: number, pageSize: number) => {
    setSize(pageSize);
    setCur(page);
  };

  return (
    <div className='blog-list-content'>
      <PageHeader title='Blog List' />
      <div className='search-tool'>
        <Input
          className='search-input'
          placeholder='请输入文章名'
          prefix={<SearchOutlined />}
          onChange={changeSearchInput}
        />
        <Button
          type='primary'
          className='search-button'
          icon={<SearchOutlined />}
          onClick={searchArticle}>
          Search
        </Button>
      </div>
      <Table<ArticleItem>
        columns={columns}
        dataSource={articleList}
        rowKey='articleId'
        pagination={false}
        loading={isLoading}
      />
      <Pagination
        className='table-pagination'
        showSizeChanger
        pageSizeOptions={['5', '10', '50']}
        defaultCurrent={1}
        defaultPageSize={5}
        current={cur}
        total={total}
        onChange={changePage}
      />
    </div>
  );
};

export default BlogList;
