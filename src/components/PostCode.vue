<template>
  <div class="postcode-wrapper">
    <base-button
      class="postcode-btn"
      type="button"
      size="half"
      @click="handleAddressSearch"
    >
      우편번호
    </base-button>
  </div>
  <input class="address-input" type="text" v-model="address" readonly />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { openPostcodeModal } from '@/utils/addressSearch';
import BaseButton from '@/components/Button.vue';

export default defineComponent({
  components: { BaseButton },
  setup(_, { emit }) {
    const store = useStore();

    // 주소 데이터가 스토어에 존재하는 경우 이를 가져와서 입력 필드에 표시
    const address = computed({
      get: () => store.state.userInfo.address,
      set: (value) => {
        store.dispatch('updateUserInfo', { field: 'address', value });
        emit('update-address', value);
      },
    });

    const handleAddressSearch = (event: MouseEvent) => {
      event.preventDefault();
      openPostcodeModal((newAddress: string) => {
        address.value = newAddress; // 스토어 업데이트 및 부모 컴포넌트 이벤트 발생
      });
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
  justify-content: flex-end;
  margin-bottom: 10px;
}
.postcode-btn {
  margin: 0;
}
.address-input {
  margin-bottom: 10px;
}
</style>
