import { IOrganization } from "../common";
import { UsersType } from "../users";

export interface IWarehouse {
  id: number;
  name: string;
  uniqueIdentifier: string;
  itemDescription: string;
  manufacturedDate: string;
  expirationDate: string;
  reserveNorm: number;
  serialNumber: string;
  storePlace: string;
  storageConditions: string;
  minimumRemainder: number;
  notes: string;
  category: IWarehouseReference;
  categoryId: number | null;
  itemMeasurementUnit: IWarehouseReference | null;
  itemMeasurementUnitId: number | null;
  organization: IOrganization;
  parentIOrganization: IOrganization;
  organizationId: number;
  equipment: IWarehouseReference | null;
  labaratoryEquipmentId: number | null;
  count: number | null;
  outCount: number | null;
}

export interface IWarehouseReference {
  id: number;
  name: string;
}

export interface ILaboratory extends IWarehouseReference {
  organization: IOrganization;
  parentOrg: IOrganization;
}

export interface ItemRequestType {
  count: number;
  description: string;
  itemId: number;
}

export interface IController {
  id?: number;
  docNumber: string;
  deliveryDate: string;
  requirementsStatus?: "CREATED";
  comment: string;
  executionPriority: "LOW" | "MEDIUM" | "HIGH";
  itemRequestDTOS: ItemRequestType[];
  supervisor?: UsersType;
  organization?: IOrganization;
  supervisorId: number;
  receiverId: number;
  receiver?: {
    id: number;
    name: string;
  };
}

export interface IControllerCreate {
  docNumber: string;
  receiverId: number;
  supervisorId: number;
  executionPriority: string;
  comment: string;
  deliveryDate: string;
  itemRequestDTOS: ItemRequestType[];
}
