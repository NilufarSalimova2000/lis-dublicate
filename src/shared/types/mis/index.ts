export interface CitizenRootT {
  result: string;
  data: CitizenType[];
  comments: string;
}

export interface CitizenType {
  transaction_id: number;
  current_pinpp: string;
  pinpps: string[];
  current_document: string;
  documents: DocumentType[];
  surnamelat: string;
  namelat: string;
  patronymlat: string;
  surnamecyr: string;
  namecyr: string;
  patronymcyr: string;
  engsurname: string;
  engname: string;
  birth_date: string;
  birthplace: string;
  birthcountry: string;
  birthcountryid: number;
  livestatus: number;
  nationality: string;
  nationalityid: number;
  citizenship: string;
  citizenshipid: number;
  sex: number;
  photo: string;
}

export interface DocumentType {
  document: string;
  type: string;
  docgiveplace: string;
  docgiveplaceid: number;
  datebegin: string;
  dateend: string;
  status: number;
}

export interface LegalRootT {
  company: CompanyType;
  director: DirectorType;
}

export interface CompanyType {
  name: string;
  shortName: string;
  tin: string;
  oked: string;
  registrationDate: string;
  registrationNumber: string;
  reregistrationDate: string;
  status: number;
  statusUpdated: any;
  taxStatus: any;
  taxMode: number;
  vatNumber: number;
  vatRegistrationDate: any;
}

export interface DirectorType {
  lastName: string;
  firstName: string;
  middleName: string;
}

export interface RegionsType {
  id: number;
  name: string;
}
