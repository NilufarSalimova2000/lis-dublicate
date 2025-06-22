import { LoincType } from "../analyse";

export interface AuthPayloadT {
  state: string;
  status: string;
  statusCode: number;
  message: any;
  data: AuthPayloadDataT;
}

export interface AuthPayloadDataT {
  pinfl: string;
  address: any;
  role: string[];
  phone: any;
  permissions: any[];
  inn: any;
  organizations: SelectOrganizationT[];
  fullName: string;
  photo: any;
  id: number;
  email: any;
  username: string;
}

export interface SelectOrganizationT {
  createdDate: string;
  updatedDate: number;
  id: number;
  name: string;
  shortName: any;
  address: any;
  hierarchy: string;
  status: string;
  uuid: string;
  loincs: LoincType[];
}

export interface ILogoutResponse {
  success: boolean;
  message: string;
}
