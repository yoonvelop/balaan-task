<template>
  <form @submit.prevent="handleSubmit">
    <div class="card-number-section">
      <field-wrapper label="카드번호" id="cardNumber" :error="cardError">
        <div class="card-number-inputs">
          <base-input
            v-for="index in 4"
            :key="index"
            type="text"
            v-model="cardNumbers[index - 1]"
            maxlength="4"
            placeholder="XXXX"
            autocomplete="cc-number"
          />
        </div>
      </field-wrapper>
    </div>
    <base-button type="submit">완료</base-button>
  </form>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import FieldWrapper from '@/components/FieldWrapper.vue';
import { validateCardNumber } from '@/utils/validators';
import BaseInput from '@/components/Input.vue';
import BaseButton from '@/components/Button.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    BaseButton,
    BaseInput,
    FieldWrapper,
  },
  setup() {
    const cardNumbers = ref(['', '', '', '']);
    const cardError = ref('');
    const router = useRouter();

    const handleSubmit = () => {
      let isValid = true;
      const fullNumber = cardNumbers.value.join('');
      if (fullNumber.length === 16) {
        if (!validateCardNumber(fullNumber)) {
          cardError.value = '유효하지 않은 카드 번호 입니다.';
          isValid = false;
        } else {
          cardError.value = '';
        }
      }

      if (isValid) {
        router.push('/signup/complete');
      }
    };

    return {
      cardNumbers,
      cardError,
      handleSubmit,
    };
  },
});
</script>

<style>
.card-number-inputs {
  display: flex;
  justify-content: space-between;
}

.card-number-inputs input {
  width: calc(25% - 10px);
  margin-right: 5px;
}

.card-number-inputs input:last-child {
  margin-right: 0;
}
</style>
