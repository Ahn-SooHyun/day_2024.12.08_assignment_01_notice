import api from "../ax/axiosSetting";

/**
 * 아이템 리스트
 * @param {*} param
 * @returns
 */
export const noticeList = (param) => {
  return api.get("/notice/list", { params: param });
};

export const noticeDetail = (param) => {
  return api.get("/notice/detail", { params: param });
};

export const noticeGood = (obj) => {
  return api.post("/notice/good", JSON.stringify(obj), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const noticedDelete = (obj) => {
  return api.post("/notice/delete", JSON.stringify(obj), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const noticedEdit = (obj) => {
  return api.post("/notice/edit", JSON.stringify(obj), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
