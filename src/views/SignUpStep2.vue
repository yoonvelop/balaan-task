<template>
  <form @submit.prevent="handleSubmit">
    <field-wrapper label="이름" id="userName" :error="userNameError">
      <base-input
        type="text"
        v-model="userName"
        :validators="[validateUserName]"
        placeholder="이름 입력"
      />
    </field-wrapper>
    <field-wrapper label="연락처" id="phoneNumber" :error="phoneNumberError">
      <base-input
        type="text"
        v-model="phoneNumber"
        :validators="[validatePhoneNumber]"
        placeholder="연락처 입력"
      />
    </field-wrapper>
    <field-wrapper label="주소" id="address" :error="addressError">
      <post-code @update-address="address = $event" />
      <base-input type="text" v-model="detailAddress" placeholder="상세 주소" />
    </field-wrapper>
    <div class="button-group">
      <base-button type="button" size="half" @click="goToPrevPage">
        이전
      </base-button>
      <base-button type="submit" size="half"> 다음 </base-button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { validateUserName, validatePhoneNumber } from '@/utils/validators';
import FieldWrapper from '@/components/FieldWrapper.vue';
import BaseInput from '@/components/Input.vue';
import BaseButton from '@/components/Button.vue';
import PostCode from '@/components/PostCode.vue';

export default defineComponent({
  methods: { validatePhoneNumber, validateUserName },
  components: {
    PostCode,
    BaseButton,
    FieldWrapper,
    BaseInput,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const userName = computed({
      get: () => store.state.userInfo.userName,
      set: (value) =>
        store.dispatch('updateUserInfo', { field: 'userName', value }),
    });

    const phoneNumber = computed({
      get: () => store.state.userInfo.phoneNumber,
      set: (value) =>
        store.dispatch('updateUserInfo', { field: 'phoneNumber', value }),
    });

    const address = computed({
      get: () => store.state.userInfo.address,
      set: (value) =>
        store.dispatch('updateUserInfo', { field: 'address', value }),
    });

    const detailAddress = computed({
      get: () => store.state.userInfo.detailAddress,
      set: (value) =>
        store.dispatch('updateUserInfo', { field: 'detailAddress', value }),
    });

    const userNameError = ref('');
    const phoneNumberError = ref('');
    const addressError = ref('');

    const handleSubmit = () => {
      if (validateInputs()) {
        router.push('/signup/step3');
      }
    };

    const validateInputs = () => {
      let isValid = true;
      if (!validateUserName(userName.value)) {
        userNameError.value = '유효하지 않은 이름 형식입니다.';
        isValid = false;
      } else {
        userNameError.value = '';
      }
      if (!validatePhoneNumber(phoneNumber.value)) {
        phoneNumberError.value = '유효하지 않은 전화번호 형식입니다.';
        isValid = false;
      } else {
        phoneNumberError.value = '';
      }
      if (!address.value) {
        addressError.value = '주소를 입력해주세요.';
        isValid = false;
      } else {
        addressError.value = '';
      }
      return isValid;
    };

    const goToPrevPage = () => {
      router.go(-1);
    };

    return {
      userName,
      phoneNumber,
      address,
      detailAddress,
      userNameError,
      phoneNumberError,
      addressError,
      goToPrevPage,
      handleSubmit,
    };
  },
});
</script>

<style>
.button-group {
  display: flex;
  justify-content: space-between;
}
</style>
