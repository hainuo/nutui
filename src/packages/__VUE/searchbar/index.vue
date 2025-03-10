<template>
  <view class="nut-searchbar" :class="{ 'safe-area-inset-bottom': safeAreaInsetBottom }" :style="searchbarStyle">
    <span v-if="label" class="nut-searchbar__search-label">{{ label }}</span>
    <view v-if="$slots.leftout" class="nut-searchbar__search-icon nut-searchbar__left-search-icon">
      <slot name="leftout"></slot>
    </view>
    <view :class="[`nut-searchbar__search-input`, shape]" :style="{ ...inputSearchbarStyle, ...focusCss }">
      <view
        v-if="$slots.leftin"
        class="nut-searchbar__search-icon nut-searchbar__iptleft-search-icon"
        @click="leftIconClick"
      >
        <slot name="leftin"></slot>
      </view>
      <view :class="['nut-searchbar__input-inner', $slots.rightin && 'nut-searchbar__input-inner-absolute']">
        <form class="nut-searchbar__input-form" action="#" @submit.prevent="handleSubmit">
          <input
            ref="inputsearch"
            :class="['nut-searchbar__input-bar', clearable && 'nut-searchbar__input-bar_clear']"
            :type="inputType"
            :maxlength="maxLength"
            :placeholder="placeholder || translate('placeholder')"
            :value="modelValue"
            :disabled="disabled"
            :readonly="readonly"
            :style="styleSearchbar"
            @click="clickInput"
            @input="valueChange"
            @focus="valueFocus"
            @blur="valueBlur"
          />
        </form>
      </view>
      <view :class="['nut-searchbar__input-inner-icon', $slots.rightin && 'nut-searchbar__input-inner-icon-absolute']">
        <view
          v-if="clearable"
          v-show="String(modelValue).length > 0"
          class="nut-searchbar__search-icon nut-searchbar__input-clear"
          @click="handleClear"
        >
          <template v-if="$slots['clear-icon']">
            <slot name="clear-icon"></slot>
          </template>
          <component :is="renderIcon(clearIcon)" v-else></component>
        </view>
        <view v-if="$slots.rightin" class="nut-searchbar__search-icon nut-searchbar__iptright-search-icon">
          <slot name="rightin"></slot>
        </view>
      </view>
    </view>
    <view v-if="$slots.rightout" class="nut-searchbar__search-icon nut-searchbar__right-search-icon">
      <slot name="rightout"></slot>
    </view>
  </view>
</template>

<script lang="ts">
import { toRefs, reactive, computed, onMounted, ref, Ref, CSSProperties, PropType, toRef } from 'vue'
import { createComponent, renderIcon } from '@/packages/utils/create'
import { CircleClose } from '@nutui/icons-vue'
import { SearchbarInputAlign, SearchbarShape } from './types'
import { useLocale } from '@/packages/utils/useLocale'
import { useFormDisabled } from '../form/common'
const { create } = createComponent('searchbar')

const cN = 'NutSearchbar'

export default create({
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    inputType: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: ''
    },
    shape: {
      type: String as PropType<SearchbarShape>,
      default: 'round'
    },
    maxLength: {
      type: [String, Number],
      default: '9999'
    },
    placeholder: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: true
    },
    clearIcon: {
      type: Object,
      default: () => CircleClose
    },
    background: {
      type: String,
      default: ''
    },
    inputBackground: {
      type: String,
      default: ''
    },
    focusStyle: {
      type: Object,
      default: () => ({})
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    inputAlign: {
      type: String as PropType<SearchbarInputAlign>,
      default: 'left'
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: false
    }
  },

  emits: [
    'change',
    'update:modelValue',
    'blur',
    'focus',
    'clear',
    'search',
    'clickInput',
    'clickLeftIcon',
    'clickRightIcon'
  ],

  setup(props, { emit }) {
    const disabled = useFormDisabled(toRef(props, 'disabled'))
    const translate = useLocale(cN)
    const state = reactive({
      active: false
    })

    const searchbarStyle = computed(() => {
      return {
        background: props.background
      }
    })
    const inputSearchbarStyle = computed(() => {
      return {
        background: props.inputBackground
      }
    })

    const valueChange = (event: Event) => {
      const input = event.target as HTMLInputElement
      let val = input.value

      if (props.maxLength && val.length > Number(props.maxLength)) {
        val = val.slice(0, Number(props.maxLength))
      }
      emit('update:modelValue', val, event)
      emit('change', val, event)
    }

    const focusCss = ref({})
    const valueFocus = (event: Event) => {
      const input = event.target as HTMLInputElement
      let value = input.value
      state.active = true
      focusCss.value = props.focusStyle
      emit('focus', value, event)
    }

    const valueBlur = (event: Event) => {
      setTimeout(() => {
        state.active = false
      }, 0)

      const input = event.target as HTMLInputElement
      let value = input.value
      if (props.maxLength && value.length > Number(props.maxLength)) {
        value = value.slice(0, Number(props.maxLength))
      }
      focusCss.value = {}
      emit('blur', value, event)
    }

    const handleClear = (event: Event) => {
      emit('update:modelValue', '', event)
      emit('change', '', event)
      emit('clear', '')
    }

    const handleSubmit = () => {
      emit('search', props.modelValue)
    }

    const clickInput = (event: Event) => {
      emit('clickInput', event)
    }

    const leftIconClick = (event: Event) => {
      emit('clickLeftIcon', props.modelValue, event)
    }

    const rightIconClick = (event: Event) => {
      emit('clickRightIcon', props.modelValue, event)
    }

    const styleSearchbar = computed(() => {
      const style: CSSProperties = {
        textAlign: props.inputAlign
      }
      return style
    })
    const inputsearch: Ref<HTMLElement | null> = ref(null)
    onMounted(() => {
      if (props.autofocus) {
        (inputsearch.value as HTMLElement).focus()
      }
    })

    return {
      renderIcon,
      inputsearch,
      ...toRefs(state),
      valueChange,
      valueFocus,
      valueBlur,
      handleClear,
      handleSubmit,
      searchbarStyle,
      inputSearchbarStyle,
      focusCss,
      translate,
      clickInput,
      leftIconClick,
      rightIconClick,
      styleSearchbar,
      disabled
    }
  }
})
</script>
