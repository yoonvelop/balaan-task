<template>
  <div class="field-wrapper">
    <div class="label-wrapper">
      <label :for="id">{{ label }}</label>
      <div class="input-wrapper">
        <slot></slot>
        <p v-if="error" class="error-message">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FieldWrapper',
  props: {
    label: String,
    id: String,
    error: String,
  },
});
</script>

<style>
.field-wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 0 10px;
}
.label-wrapper {
  display: flex;
}
.input-wrapper {
  flex: 1;
}
label {
  width: 30%;
  text-align: left;
  margin-bottom: 5px;
}
.error-message {
  color: red;
  font-size: 0.8em;
  margin: 5px 0 0;
  text-align: left;
}
</style>
