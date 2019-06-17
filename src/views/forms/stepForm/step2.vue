<template>
  <div>
    <a-form layout="horizontal" :form="form">
      <a-form-item
        label="付款账户"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol">
        {{ step.payAccount }}
      </a-form-item>
      <a-form-item
        label="账户密码"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol">
        <a-input
          v-decorator="[
            'password',
            {
              initialValue: '123456',
              rules: [{ required: true, message: '请输入账户密码' }]
            }
          ]"
          type = "password"
          placeholder = "请输入账户密码" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSubmit">提交</a-button>
        <a-button style="margin-left: 8px" @click="onPrev">上一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data () {
    this.form = this.$form.createForm(this)
    return {
      formItemLayout: { // 表单布局
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      }
    }
  },
  computed: {
    step () {
      return this.$store.state.step
    }
  },
  methods: {
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$message.success('OK! Successful...')
        };
      })
    },
    onPrev () {
      this.$router.push('/form/step-form/info')
    }
  }
}
</script>

<style>
</style>
