import { IOrganization, IRole } from "../common";

export interface UsersType {
  id: number;
  username: string;
  status: string;
  firstName: string;
  lastName: string;
  middleName: string;
  phone: any;
  mobile: string;
  email: any;
  address: any;
  passportNumber: any;
  pnfl: string;
  inn: any;
  uuid: string;
  dateOfBirth: string;
  isAnonymous: boolean;
  gender: any;
  nationality: any;
  district: any;
  region: any;
  photo: any;
  passportSerial: any;
  roles: IRole[];
  permissions: any[];
  parentIOrganizations: IOrganization[];
  departments: IOrganization[];
  nurseInteriorNumber: any;
  createdDate: number;
}
