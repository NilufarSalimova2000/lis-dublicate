export interface LoincType {
  createdDate: string;
  updatedDate: number;
  id: number;
  loincNumber: string;
  component: string;
  property: string;
  timeAspect: string;
  system: string;
  scaleType: string;
  methodType: string;
  className: string;
  shortName: string;
  longCommonName: string;
  relatedNames2: string;
  linguisticVariantDisplayName: string;
  isForHepatitis: any;
  comment: any;
  status: string;
  measurementUnit: any;
}

export interface BiomaterialType {
  createdDate: string;
  updatedDate: number;
  id: number;
  nameUz: string;
  nameRu: string;
  status: string;
}

export interface ApplicationType {
  id: number;
  nameUz: string;
  nameRu: string;
  status: string;
}

export interface AnalyseCreateT {
  fundingStatus: string;
  organizationId: number;
  initialConclusion: string;
  applicationTypeId: number;
  analyseCodeOfLoinc: string;
  analyseNameOfLoinc: string;
  analyseDetails: {
    comment: string;
    analyseTypeId: number;
    executionPriority: string;
    measurementUnitId: number;
    typeBiomaterialId: number;
  };
  patient: {
    email: string;
    passportSerial: string;
    passportNumber: string;
    address: string;
    pnfl: string;
    dateOfBirth: string;
    districtId: number;
    firstName: string;
    gender: boolean;
    isAnonymous: boolean;
    lastName: string;
    middleName: string;
    nationality: string;
    photo: string;
    regionId: number;
    username: string;
  };
  sendDetails: {
    sendDateOfAnalyse: string;
    sampleArrivedDate: string;
    numberOfSamples: number;
    fullNameOfRecipient: string;
    fullNameOfDeliveryMan: string;
    fullNameOfReferringDoctor: string;
    phoneNumberDeliveryMan: string;
    senderOrganizationInn: string;
    senderOrganizationName: string;
  };
}

export interface AnalyseResponseT {
  analyses: {
    createdDate: string;
    updatedDate: number;
    id: number;
    personalDataIssuedDate: string | null;
    analyseNameOfLoinc: string;
    analyseCodeOfLoinc: string;
    resultAnalyse: string | null;
    status: string;
    fundingStatus: string;
    initialConclusion: string;
    analyseDetails: {
      id: number;
      analyseType: BiomaterialType;
      measurementUnit: BiomaterialType;
      typeBiomaterial: BiomaterialType;
      comment: string;
      executionPriority: string;
      fullNameRegistrar: string;
    };
    analyseSendDetails: AnalyseSendDetails;
    applicationType: ApplicationType;
  }[];
  notFoundAnalysesByLoincCode: any[];
  alreadyRegisteredAnalyses: any[];
  totalCreated: number;
}

export interface AnalyseSendDetails {
  id: number;
  senderOrganizationInn: string;
  senderOrganizationName: string;
  fullNameOfReferringDoctor: string;
  sendDateOfAnalyse: string | null;
  sampleArrivedDate: string | null;
  numberOfSamples: number;
  fullNameOfDeliveryMan: string;
  phoneNumberDeliveryMan: string;
  fullNameOfRecipient: string;
  createdDate: string;
  updatedDate: number;
}



export interface AnalyseListT {
  createdDate: string
  updatedDate: number
  id: number
  personalDataIssuedDate: any
  analyseNameOfLoinc: string
  analyseCodeOfLoinc: string
  resultAnalyse?: string
  status: string
  fundingStatus: string
  initialConclusion: string
  analyseDetails: AnalyseDetails
  analyseSendDetails: AnalyseSendDetails
  applicationType: ApplicationType
  analyseContractDetails: any
  analyseResultDetails: any
  userId: number
  file: any
  analyseAnswerFile: any
  moduleName: any
  analysisUuid: any
  isRetest?: boolean
  aiAnswer: any
}

export interface AnalyseDetails {
  id: number
  analyseType: AnalyseType
  measurementUnit: BiomaterialType
  resultMeasurementUnit: any
  typeBiomaterial: BiomaterialType
  analyseDangerLevel: any
  executionPriority: string
  analyseMethodType: any
  takenDate: any
  issuedDate: any
  analyseFile: any
  answerDate: any
  comment?: string
  internalNumber: any
  fullNameRegistrar?: string
  fullNameNurse: any
  fullNameCashier: any
  fullNameOfLabrant: any
  fullNameOfAffirmator: any
  storePlace: any
  sampleStoreDate: any
  labrantComment: any
}

export interface AnalyseType {
  createdDate: string
  updatedDate: number
  id: number
  nameUz: string
  nameRu: string
  status: string
  investigationType: any
  viewType: any
  typeBiomaterial: any
}

export interface CreateInteriorNumberArgs {
  userId: number;
  departmentId: number;
  internalNumber: string;
}

export interface CreateInteriorNumberResponse {
  id: number;
  number: string;
}
