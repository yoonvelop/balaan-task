<template>
  <button :class="['btn', sizeClass]" @click="onClick">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';

export default defineComponent({
  name: 'BaseButton',
  props: {
    type: {
      type: String as PropType<'button' | 'submit' | 'reset'>,
      default: 'button',
    },
    size: {
      type: String as PropType<'full' | 'half'>,
      default: '',
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const sizeClass = computed(() => {
      switch (props.size) {
        case 'full':
          return 'btn-full';
        case 'half':
          return 'btn-half';
        default:
          return '';
      }
    });

    function onClick(event: Event) {
      emit('click', event);
    }

    return { sizeClass, onClick };
  },
});
</script>

<style>
.btn {
  padding: 10px 20px;
  margin: 5px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-full {
  width: 100%;
}

.btn-half {
  width: 48%;
  margin-right: 2%;
}
</style>
