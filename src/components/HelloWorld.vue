<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="login">登录</button>
    <button @click="log">按钮</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'

@Component({
  name: 'HelloWorld'
})
export default class extends Vue {
  @Prop() private msg!: string

  private baseMsg: string = '基础使用方法'

  private mounted() {
    console.log('启动')
  }

  private login() {
    UserModule.Login({
      username: 'admin',
      password: '123456'
    })
  }

  private log() {
    console.log(this.$store)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
