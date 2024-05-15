<template>
  <input
    :type="type"
    :value="internalValue"
    @input="handleInput"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';

export default defineComponent({
  name: 'BaseInput',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    type: {
      type: String as PropType<'text' | 'password'>,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    autocomplete: {
      type: String,
      default: 'off',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const internalValue = computed({
      get: () => props.modelValue,
      set: (newValue) => {
        emit('update:modelValue', newValue);
      },
    });

    const handleInput = (event: Event) => {
      internalValue.value = (event.target as HTMLInputElement).value;
    };

    return { internalValue, handleInput };
  },
});
</script>

<style>
input {
  width: 100%;
  height: 30px;
}
</style>
