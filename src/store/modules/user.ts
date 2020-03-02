import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { setToken, removeToken, getToken } from '@/utils/cookies'

export interface IUserState {
  name: string
  avatar: string
  token: string
  roles: string[]
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public name = ''
  public avatar = ''
  public token = getToken() ? getToken()! : ''
  public roles: string[] = []

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
  }

  @Mutation
  private SET_NAME(name: string) {
    this.name = name
  }

  @Mutation
  private SET_AVATAR(avatar: string) {
    this.avatar = avatar
  }

  @Mutation
  private SET_ROLES() {
    this.roles = ['admin']
  }

  @Action
  public async Login(userInfo: { username: string, password: string }) {
    return new Promise((resolve, reject) => {
      let { username, password } = userInfo
      username = username.trim()
      password = password.trim()
      this.SET_NAME(username)
      this.SET_TOKEN(username + '-' + password)
      setToken(username + '-' + password)
      resolve()
    })
  }

  @Action
  public GetUserInfo() {
    return new Promise((resolve, reject) => {
      this.SET_ROLES()
      resolve()
    })
  }

  @Action
  public ResetToken() {
    return new Promise((resolve, reject) => {
      this.SET_TOKEN('')
      removeToken()
      resolve()
    })
  }

  @Action
  public async LogOut() {
    return new Promise((resolve, reject) => {
      this.SET_TOKEN('')
      removeToken()
      location.reload()
      resolve()
    })
  }
}

export const UserModule = getModule(User)
