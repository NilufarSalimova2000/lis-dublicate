import { UsersType } from ".";
import { AnalyseListT, AnalyseType } from "../analyse";

export interface NurseTestTubeType {
  id: number;
  title: string;
  description: string;
  patients: NursePatientType[];
  patientIds: string[];
  analyseTypeIds: string[];
  analyseType: AnalyseType[];
}

export interface NursePatientType extends UsersType {
  nurseInteriorNumber: string;
  analyses: AnalyseListT[];
}

export interface NurseTestTubeRequestT {
  orgId: number;
  title: string;
  description: string;
  patientIds: string[];    
  analyseTypeIds: string[];
}
