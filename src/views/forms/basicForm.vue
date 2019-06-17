<template>
  <div>
    <a-form :layout="formLayout">
      <a-form-item
        label="Field A"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        :validate-status="fieldAStatus"
        :help="fieldAHelp"
      >
        <a-input v-model="fieldA" placeholder="input placeholder" />
      </a-form-item>
      <a-form-item
        label="Field B"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input v-model="fieldB" placeholder="input placeholder" />
      </a-form-item>
      <a-form-item
        :wrapper-col="buttonItemLayout.wrapperCol"
      >
        <a-button type="primary">
          Submit
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formLayout: 'horizontal',
      fieldA: '',
      fieldB: '',
      fieldAStatus: '',
      fieldAHelp: ''
    }
  },
  computed: {
    formItemLayout () {
      const { formLayout } = this
      return formLayout === 'horizontal' ? {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      } : {}
    },
    buttonItemLayout () {
      const { formLayout } = this
      return formLayout === 'horizontal' ? {
        wrapperCol: { span: 14, offset: 4 }
      } : {}
    }
  },
  methods: {
    handleFormLayoutChange  (e) {
      this.formLayout = e.target.value
    }
  },
  watch: {
    fieldA (val) {
      if (val.length < 5) {
        this.fieldAStatus = 'error'
        this.fieldAHelp = '必须大于5个字符'
      } else {
        this.fieldAStatus = ''
        this.fieldAHelp = ''
      }
    }
  }
}
</script>
