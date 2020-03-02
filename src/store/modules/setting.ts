import { Module, Action, Mutation, getModule, VuexModule } from 'vuex-module-decorators'
import store from '@/store'
import { title, logo } from '@/settings'

export interface ISettingState {
  /** 系统标题 */
  title: string
  logo: string
}

interface KeyValue {
  key: string
  value: any
}

@Module({ dynamic: true, store, name: 'Setting' })
class Setting extends VuexModule implements ISettingState {
  public title: string = title

  public logo: string = logo

  @Mutation
  private CHANGE_SETTING({ key, value }: KeyValue) {
    if (this.hasOwnProperty(key)) {
      (this as any)[key] = value
    }
  }

  @Action
  public changeSetting(data: KeyValue) {
    this.CHANGE_SETTING(data)
  }
}

export const SettingModule = getModule(Setting)
