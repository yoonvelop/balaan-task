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
    <div class="button-group">
      <base-button type="button" size="half" @click="goToPrevPage">
        이전
      </base-button>
      <base-button type="submit" size="half" @click="handleSubmit">
        다음
      </base-button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { validateUserName, validatePhoneNumber } from '@/utils/validators';
import FieldWrapper from '@/components/FieldWrapper.vue';
import BaseInput from '@/components/Input.vue';
import BaseButton from '@/components/Button.vue';

export default defineComponent({
  methods: {
    validatePhoneNumber,
    validateUserName,
  },
  components: {
    BaseButton,
    FieldWrapper,
    BaseInput,
  },
  setup() {
    const userName = ref('');
    const phoneNumber = ref('');
    const userNameError = ref('');
    const phoneNumberError = ref('');
    const router = useRouter();
    const goToPrevPage = (event: MouseEvent) => {
      event.preventDefault();
      // TODO: 스토어 구현 후 데이터 가지고 이전 페이지 이동 구현
      console.log('이전');
    };
    const handleSubmit = () => {
      let isValid = true;
      if (!validateUserName(userName.value)) {
        userNameError.value =
          '이름은 2글자 이상의 한글 또는 3글자 이상의 알파벳만 가능합니다.';
        isValid = false;
      } else {
        userNameError.value = '';
      }
      if (!validatePhoneNumber(phoneNumber.value)) {
        phoneNumberError.value = '연락처 형식이 유효하지 않습니다.';
        isValid = false;
      } else {
        phoneNumberError.value = '';
      }

      if (isValid) {
        router.push('/signup/step3');
      }
    };

    return {
      userName,
      phoneNumber,
      userNameError,
      phoneNumberError,
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
