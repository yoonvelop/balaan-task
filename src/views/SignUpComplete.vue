<template>
  <div>
    <div class="main-text">
      "{{ userInfo.userName }}"님,<br />
      회원가입이<br />
      완료되었습니다.
    </div>
    <p>이메일: {{ userInfo.email }}</p>
    <p>주소: {{ userInfo.address }} {{ userInfo.detailAddress }}</p>
    <p>연락처: {{ userInfo.phoneNumber }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();
    const userInfo = computed(() => store.state.userInfo);
    return {
      userInfo,
    };
  },
});
</script>
<style>
.main-text {
  font-size: 40px;
}
</style>
