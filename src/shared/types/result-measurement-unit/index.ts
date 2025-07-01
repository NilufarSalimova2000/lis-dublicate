export interface ResMeasurUnitT {
  createdDate: string;
  updatedDate: number;
  id: number;
  nameUz: string;
  nameRu: string;
  status: string;
  resultType: string;
  resultTypeAnswers: string[];
}

export interface ResMeasurUnitRequestT {
  nameUz: string;
  nameRu: string;
  resultType: string;
  resultTypeAnswers: string[];
}

export interface ResMeasurUnitUpdateT {
  id: number;
  data: ResMeasurUnitRequestT;
};
