<template>
  <form @submit.prevent="handleSubmit">
    <div class="card-number-section">
      <field-wrapper label="카드번호" id="cardNumber" :error="cardError">
        <div class="card-number-inputs">
          <base-input
            v-for="(number, index) in cardNumbers"
            :key="index"
            type="text"
            v-model="cardNumbers[index]"
            maxlength="4"
            placeholder="XXXX"
            autocomplete="cc-number"
          />
        </div>
      </field-wrapper>
    </div>
    <base-button type="submit" size="full">완료</base-button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { validateCardNumber } from '@/utils/validators';
import FieldWrapper from '@/components/FieldWrapper.vue';
import BaseInput from '@/components/Input.vue';
import BaseButton from '@/components/Button.vue';

export default defineComponent({
  components: {
    BaseButton,
    BaseInput,
    FieldWrapper,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const cardNumbers = computed({
      get: () => store.state.userInfo.cardNumbers,
      set: (value) => store.dispatch('updateCardNumbers', value),
    });
    const cardError = ref('');

    const handleSubmit = () => {
      const fullNumber = cardNumbers.value.join('');
      if (fullNumber.length === 16 && !validateCardNumber(fullNumber)) {
        cardError.value = '유효하지 않은 카드 번호입니다.';
      } else {
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
