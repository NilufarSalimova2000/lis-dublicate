import { AnalyseListT } from "../analyse";

export interface LabrantTestTubeT {
  id: number;
  title: string;
  description: string;
  analyses: AnalyseListT[];
  analyseIds: any;
}

export interface CreateLabrantTestTubeT {
  analyseIds: string[]; 
  title: string;
  description: string;
} 
