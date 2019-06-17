<template>
  <div>
    <a-form :form="form">
      <a-form-item
        label="付款账户"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 10 }"
      >
      <a-input
        v-decorator="[
          'payAccount',
          { initialValue: this.step.payAccount, rules: [{required: true, message: '请输入付款账号'}] }
        ]"
        placeholder="Please input your Account"
      ></a-input>
      </a-form-item>
      <a-form-item
        :wrapper-col="{ span: 12, offset: 5 }"
      >
      <a-button
        type="primary"
        html-type="submit"
        @click="handleSubmit"
      >
        下一步
      </a-button>
    </a-form-item>
    </a-form>
  </div>
</template>

<script>

export default {
  data () {
    return {
      form: this.$form.createForm(this)
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
          this.$store.commit('saveStepFormData', values)
          this.$router.push('/form/step-form/confirm')
        }
      })
    }
  }
}
</script>

<style>

</style>
