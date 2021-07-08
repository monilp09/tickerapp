import { INIT_DATA } from "./action-type";

export const addInitData = (data) => ({
  type: INIT_DATA,
  payload: data,
});
