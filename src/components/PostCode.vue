<template>
  <div class="postcode-wrapper">
    <input type="text" v-model="address" readonly />
    <base-button type="button" size="half" @click="handleAddressSearch">
      우편번호 검색
    </base-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { openPostcodeModal } from '@/utils/addressSearch';
import BaseButton from '@/components/Button.vue';

export default defineComponent({
  components: { BaseButton },
  setup(_, { emit }) {
    const address = ref('');

    const updateAddress = (newAddress: string) => {
      address.value = newAddress;
      emit('update-address', newAddress); // 부모 컴포넌트로 주소 업데이트 이벤트 전송
    };

    const handleAddressSearch = (event: MouseEvent) => {
      event.preventDefault();
      openPostcodeModal(updateAddress);
    };

    return {
      address,
      handleAddressSearch,
    };
  },
});
</script>

<style>
.postcode-wrapper {
  display: flex;
}
</style>
