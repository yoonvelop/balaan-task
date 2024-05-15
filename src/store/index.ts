import { createStore } from 'vuex';

interface UserInfo {
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  detailAddress: string;
  cardNumbers: string[];
}

interface State {
  userInfo: UserInfo;
}

interface UserInfoPayload {
  field: keyof UserInfo;
  value: string | string[];
}

export default createStore<State>({
  state: {
    userInfo: {
      userName: '',
      email: '',
      password: '',
      phoneNumber: '',
      address: '',
      detailAddress: '',
      cardNumbers: ['', '', '', ''],
    },
  },
  mutations: {
    setUserInfo(state, payload: UserInfoPayload) {
      if (payload.field === 'cardNumbers') {
        if (Array.isArray(payload.value)) {
          // cardNumbers 만 Array를 받도록 처리
          state.userInfo.cardNumbers = payload.value as string[];
        }
      } else {
        if (typeof payload.value === 'string') {
          // 나머지는 string을 받도록 처리
          state.userInfo[
            payload.field as Exclude<keyof UserInfo, 'cardNumbers'>
          ] = payload.value;
        }
      }
    },
  },
  actions: {
    updateUserInfo({ commit }, payload: UserInfoPayload) {
      commit('setUserInfo', payload);
    },
  },
});
