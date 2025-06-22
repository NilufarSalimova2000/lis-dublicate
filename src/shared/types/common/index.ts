export interface IBaseResponse<T> {
  data: {
    list: T[];
    total: number;
  };
  message: string | null;
  state: string;
  status: string;
  statusCode: number;
}

export interface IRole {
  createdDate: string;
  updatedDate: number;
  id: number;
  name: string;
  code: string;
  status: string;
  permissions: any[];
}

export interface IOrganization {
  id: number;
  name: string;
  shortName: string | null;
  address: string | null;
  hierarchy: string;
  parent: null;
  parentId: number | null;
  status: string;
  uuid: string | null;
  children: null;
}

export interface IPagination extends ISearchParams {
  page: number;
  limit: number;
}

export interface ISearchParams {
  search: {
    value: string;
  };
}
