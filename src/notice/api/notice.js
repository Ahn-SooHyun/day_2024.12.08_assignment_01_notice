import api from "../ax/axiosSetting";

/**
 * 아이템 리스트
 * @param {*} param
 * @returns
 */
export const noticeList = (param) => {
  return api.get("/notice/list", { params: param });
};
