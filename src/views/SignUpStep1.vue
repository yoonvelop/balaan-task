<template>
  <form @submit.prevent="handleSubmit">
    <field-wrapper label="이메일" id="email" :error="emailError">
      <base-input
        type="text"
        v-model="email"
        :validators="[validateEmail]"
        placeholder="이메일 입력"
      />
    </field-wrapper>
    <field-wrapper label="비밀번호" id="password" :error="passwordError">
      <base-input
        type="password"
        v-model="password"
        :validators="[validatePassword]"
        placeholder="비밀번호 입력"
      />
    </field-wrapper>
    <field-wrapper
      label="비밀번호 확인"
      id="confirmPassword"
      :error="confirmPasswordError"
    >
      <base-input
        type="password"
        v-model="confirmPassword"
        :validators="[
          () => validatePasswordConfirmation(password, confirmPassword),
        ]"
        placeholder="비밀번호 재입력"
      />
    </field-wrapper>
    <button type="submit">다음</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirmation,
} from '@/utils/validators';
import FieldWrapper from '@/components/FieldWrapper.vue';
import BaseInput from '@/components/Input.vue';

export default defineComponent({
  methods: { validatePasswordConfirmation, validatePassword, validateEmail },
  components: {
    FieldWrapper,
    BaseInput,
  },
  setup() {
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const emailError = ref('');
    const passwordError = ref('');
    const confirmPasswordError = ref('');
    const router = useRouter();

    const handleSubmit = () => {
      let isValid = true;
      if (!validateEmail(email.value)) {
        emailError.value = '유효하지 않은 이메일 주소입니다.';
        isValid = false;
      } else {
        emailError.value = '';
      }
      if (!validatePassword(password.value)) {
        passwordError.value =
          '비밀번호는 8자 이상이어야 하며, 대소문자와 특수문자를 포함해야 합니다.';
        isValid = false;
      } else {
        passwordError.value = '';
      }
      if (
        !validatePasswordConfirmation(password.value, confirmPassword.value)
      ) {
        confirmPasswordError.value = '비밀번호가 일치하지 않습니다.';
        isValid = false;
      } else {
        confirmPasswordError.value = '';
      }

      if (isValid) {
        router.push('/signup/step2');
      }
    };

    return {
      email,
      password,
      confirmPassword,
      emailError,
      passwordError,
      confirmPasswordError,
      handleSubmit,
    };
  },
});
</script>
