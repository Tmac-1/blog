<template>
  <el-form
    :model="model"
    :size="size"
    v-bind="$attrs"
    v-on="$listeners"
    ref="form"
    :class="`${isNoLable && 'noLabel'}`"
  >
    <el-row :gutter="gutter">
      <el-col v-for="item in columns" :key="item.prop" :span="item.span || 24">
        <el-form-item
          :label="
            item.hasOwnProperty('showLabel') && item.showLabel === false
              ? ''
              : `${item.label}:`
          "
          :label-width="item.labelWidth || $attrs['label-width']"
          :prop="item.prop"
          :rules="item.rule"
        >
          <slot v-if="$slots[item.prop]" :name="item.prop"></slot>
          <template v-else>
            <el-switch
              v-model="model[item.prop]"
              v-if="item.type === 'switch'"
              v-bind="item.config"
              v-on="item.listeners"
            >
            </el-switch>
            <el-select
              v-model="model[item.prop]"
              v-else-if="item.type === 'select'"
              v-bind="item.config"
              v-on="item.listeners"
            >
              <el-option
                v-for="item in item.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-radio-group
              v-model="model[item.prop]"
              v-else-if="item.type === 'radio'"
              v-bind="item.config"
              v-on="item.listeners"
            >
              <el-radio
                v-for="item in item.options"
                :key="item.value"
                :label="item.value"
              >
                {{ item.label }}</el-radio
              >
            </el-radio-group>
            <el-input-number
              v-else-if="item.type === 'number'"
              v-model="model[item.prop]"
              v-bind="item.config"
              v-on="item.listeners"
            ></el-input-number>
            <div v-else-if="item.type === 'text'">
              {{ model[item.prop] }}
            </div>
            <el-input
              v-model="model[item.prop]"
              :type="item.type"
              :rows="(item.config && item.config.rows) || 2"
              v-else
              :placeholder="
                (item.config && item.config.placeholder) ||
                `请输入${item.label}`
              "
              :clearable="
                item.config && item.config.hasOwnProperty('clearable')
                  ? item.config.clearable
                  : true
              "
              v-bind="item.config"
              v-on="item.listeners"
            ></el-input>
          </template>
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item v-if="showFooter">
      <el-button type="primary" @click="handleSubmit">保存</el-button>
      <el-button @click="resetForm">取消</el-button>
    </el-form-item>
    <el-form-item v-if="$slots.action">
      <slot name="action"></slot>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: "medium",
    },
    gutter: {
      type: Number,
      default: 60,
    },
    model: {
      type: Object,
      default: () => {},
    },
    columns: {
      type: Array,
      default: () => [],
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
    // 表单是否携带标签
    isNoLable: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {};
  },

  created() {},

  methods: {
    async handleSubmit() {
      try {
        await this.$refs.form.validate();
        this.$emit("submit", this.model);
      } catch (err) {}
    },

    async validate() {
      return await this.$refs.form.validate();
    },
    validateField(name) {
      this.$refs.form.validateField(name);
    },

    resetForm() {
      this.$refs.form.resetFields();
      // console.log('resetForm',this.model);
    },
  },
};
</script>
<style scoped lang="scss">
.noLabel {
  ::v-deep .el-form-item {
    width: 100% !important;
    display: flex;
  }
  ::v-deep .el-form-item__content {
    width: 100%;
  }
}
</style>
