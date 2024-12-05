import api from "../ax/axiosSetting";

/**
 * 아이템 리스트
 * @param {*} param
 * @returns
 */
export const itemList = (param) => {
  return api.get("/item/all", { params: param });
};

/**
 * 아이템 추천
 * @param {*} obj
 * @returns
 */
export const itemgood = (obj) => {
  return api.get("/item/good", { params: obj });
};
