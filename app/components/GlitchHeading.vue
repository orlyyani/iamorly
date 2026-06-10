<script setup lang="ts">
interface Props {
  text: string
  tag?: 'h1' | 'h2' | 'h3'
  border?: 'left' | 'right' | 'none'
  mode?: 'always' | 'hover'
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'h2',
  border: 'none',
  mode: 'hover'
})
</script>

<template>
  <component
    :is="props.tag"
    class="inline-block tracking-[0.5em]"
    :class="[
      props.border === 'left' && 'border-l-[3px] border-ink pl-2.5',
      props.border === 'right' && 'border-r-[3px] border-ink pr-2.5',
      props.mode === 'hover' ? 'glitch-parent cursor-pointer' : 'glitch-always'
    ]"
  >
    <span
      class="glitch-text"
      :data-text="props.text"
    >{{ props.text }}</span>
  </component>
</template>
