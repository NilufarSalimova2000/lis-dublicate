import { nanoid } from "nanoid";
import { Dashboard } from "../pages/dashboard";
import { Users } from "../pages/users";
import { Patients } from "../pages/patients";
import { Worksheets } from "../pages/worksheets";
import { WFA } from "../pages/waiting-for-admission";
import { Warehouse } from "../pages/warehouse";
import { CreateUser } from "../pages/create-user";
import { CreatePatients } from "../pages/create-patients";
import { PatientDetail } from "../pages/patient-detail";
import { Analyses } from "../pages/analyses";
import { LaboratoryTestTube } from "../pages/laboratory-test-tube";
import { Organization } from "../pages/directories/organization";
import { Biomaterials } from "../pages/directories/biomaterials";

interface Type {
    id: string,
    path?: string,
    component: React.FC
}

export const Router: Type[] = [
    {
        id: nanoid(),
        component: Dashboard
    },
    {
        id: nanoid(),
        path: "/users",
        component: Users
    },
    {
        id: nanoid(),
        path: "/nurse/patients",
        component: Patients
    },
    {
        id: nanoid(),
        path: "/nurse/journal",
        component: Worksheets
    },
    {
        id: nanoid(),
        path: "/appointment/patients",
        component: Patients
    },
    {
        id: nanoid(),
        path: "/appointment/wfa",
        component: WFA
    },
    {
        id: nanoid(),
        path: "/warehouse",
        component: Warehouse
    },
    {
        id: nanoid(),
        path: "/create",
        component: CreateUser
    },
    {
        id: nanoid(),
        path: "/appointment/create",
        component: CreatePatients
    },
    {
        id: nanoid(),
        path: "/appointment/detail/:id",
        component: PatientDetail
    },
    {
        id: nanoid(),
        path: "/appointment/analyses/:id",
        component: Analyses
    },
    {
        id: nanoid(),
        path: "/labrant/patients",
        component: Patients
    },
    {
        id: nanoid(),
        path: "/labrant/tube-list",
        component: Worksheets
    },
    {
        id: nanoid(),
        path: "/labrant/journal",
        component: LaboratoryTestTube
    },
    {
        id: nanoid(),
        path: "/cashier/patients",
        component: Patients
    },
    {
        id: nanoid(),
        path: "/references/organizations",
        component: Organization
    },
    {
        id: nanoid(),
        path: "/references/biomaterials",
        component: Biomaterials
    },
    {
        id: nanoid(),
        path: "/references/result-measurements",
        component: Organization
    },
    {
        id: nanoid(),
        path: "/references/measurements",
        component: Organization
    },
    {
        id: nanoid(),
        path: "/references/loinc",
        component: Organization
    },
]