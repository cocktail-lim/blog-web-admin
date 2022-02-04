import request from '@/utils/request';
import type { RequestFunc, RequestConfig } from '@/utils/commonTypes';

// 获取文章标签列表
export interface TagItem {
  createTime: string;
  tagId: number;
  tagName: string;
  updateTime: string | null;
}

export interface TagListResponse {
  tagList: TagItem[];
}

export const getArticleTags: RequestFunc<void, TagListResponse> = (
  config: RequestConfig<void>
): Promise<TagListResponse> => {
  return request(config);
};

// 获取文章分类
export interface CategoryItem {
  categoryId: number;
  categoryName: string;
  createTime: string;
  updateTime: string | null;
}

export interface CategoryResponse {
  categoryList: CategoryItem[];
}

export const getArticleCategory: RequestFunc<void, CategoryResponse> = (
  config: RequestConfig<void>
): Promise<CategoryResponse> => {
  return request(config);
};

// 发布文章
export interface EstablishArticleParam {
  articleId?: number;
  articleTitle: string;
  articleContent?: string;
  articleCover?: string;
  categoryId?: number;
  tagList?: number[];
  isTop?: boolean;
  isDraft: boolean;
}
export const establishArticle: RequestFunc<EstablishArticleParam, void> = (
  config: RequestConfig<EstablishArticleParam>
): Promise<void> => {
  return request(config);
};

//获取文章列表
export interface ArticleListParams {
  current: number;
  size: number;
  articleTitle?: string;
}

export interface ArticleItem {
  articleId: number;
  articleTitle: string;
  categoryName: string;
  createTime: string;
  isDraft: boolean;
  isTop: boolean;
  tagList: string[];
  updateTime: string;
}
export interface ArticleListReponse {
  articleList: ArticleItem[];
  total: number;
}

export const getArticleList: RequestFunc<ArticleListParams, ArticleListReponse> = (
  config: RequestConfig<ArticleListParams>
): Promise<ArticleListReponse> => {
  return request(config);
};

// 修改置顶状态

export interface ArticleStickyParams {
  articleId: number;
  isTop: boolean;
}

export const stickArticle: RequestFunc<ArticleStickyParams, void> = (
  config: RequestConfig<ArticleStickyParams>
): Promise<void> => {
  return request(config);
};
