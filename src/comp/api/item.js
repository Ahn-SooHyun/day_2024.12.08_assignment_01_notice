import api from "../ax/axiosSetting";

export const itemList = (param) => {
  return api.get("/item/all", { params: param });
};
