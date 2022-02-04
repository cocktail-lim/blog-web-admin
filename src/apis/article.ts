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

export const getArticleTags: RequestFunc<never, TagListResponse> = (
  config: RequestConfig<never>
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

export const getArticleCategory: RequestFunc<never, CategoryResponse> = (
  config: RequestConfig<never>
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
  isDraft?: boolean;
}
export const establishArticle: RequestFunc<EstablishArticleParam, any> = (
  config: RequestConfig<EstablishArticleParam>
): Promise<any> => {
  return request(config);
};
