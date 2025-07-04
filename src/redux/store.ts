import { configureStore } from "@reduxjs/toolkit";
import crudSlice from "./crud-slice";
import { loadState, saveState } from "../lib/storage";
import { ssoService } from "./services/sso-auth/service";
import { setupListeners } from "@reduxjs/toolkit/query";
import { UsersService } from "./services/lis/users";
import { OrganizationService } from "./services/lis/organization";
import { AuthPayloadService } from "./services/sso-auth/auth-payload";
import { logoutService } from "./services/sso-auth/logout";
import { MisService } from "./services/lis/mis";
import { RegionService } from "./services/lis/region";
import { AnalyseService } from "./services/lis/analyse";
import { WarehouseService } from "./services/lis/warehouse";
import { NurseTestService } from "./services/lis/nurse-test-tube";
import { LabrantTestTubeService } from "./services/lis/labrant-test-tube";
import { BiomaterialService } from "./services/lis/analyse/biomaterials";
import { ResMeasurUnitService } from "./services/lis/result-mesurement-unit";
import { MeasurementUnitService } from "./services/lis/measurement-unit";

export const store = configureStore({
  reducer: {
    crud: crudSlice,
    [ssoService.reducerPath]: ssoService.reducer,
    [UsersService.reducerPath]: UsersService.reducer,
    [AuthPayloadService.reducerPath]: AuthPayloadService.reducer,
    [OrganizationService.reducerPath]: OrganizationService.reducer,
    [logoutService.reducerPath]: logoutService.reducer,
    [MisService.reducerPath]: MisService.reducer,
    [RegionService.reducerPath]: RegionService.reducer,
    [AnalyseService.reducerPath]: AnalyseService.reducer,
    [BiomaterialService.reducerPath]: BiomaterialService.reducer,
    [WarehouseService.reducerPath]: WarehouseService.reducer,
    [NurseTestService.reducerPath]: NurseTestService.reducer,
    [LabrantTestTubeService.reducerPath]: LabrantTestTubeService.reducer,
    [ResMeasurUnitService.reducerPath]: ResMeasurUnitService.reducer,
    [MeasurementUnitService.reducerPath]: MeasurementUnitService.reducer,
  },
  preloadedState: {
    crud: loadState("users"),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ssoService.middleware,
      UsersService.middleware,
      AuthPayloadService.middleware,
      OrganizationService.middleware,
      logoutService.middleware,
      MisService.middleware,
      RegionService.middleware,
      AnalyseService.middleware,
      BiomaterialService.middleware,
      WarehouseService.middleware,
      NurseTestService.middleware,
      LabrantTestTubeService.middleware,
      ResMeasurUnitService.middleware,
      MeasurementUnitService.middleware
    ),
});

setupListeners(store.dispatch);

store.subscribe(() => {
  saveState("users", store.getState().crud);
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
