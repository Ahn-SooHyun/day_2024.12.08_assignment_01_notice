import api from "../ax/axiosSetting";

//============================================================================================
/**
 * 아이디 중복 체크
 * @Param {id: 검사 아이디} obj
 * @returns
 */

export const login = (obj) => {
  return api.post("/login-register/login", JSON.stringify(obj), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
