import { Component, Prop } from 'vue-property-decorator'
import { VueComponent } from '@/shims-vue'
import styles from './index.css?module'

interface Props {
  name: string
}

@Component
export default class Operator extends VueComponent<Props> {

  @Prop()
  private name!: string;

  render() {
    return (
      <button type="button" class={styles.operatorRoot}>
        { this.name }
      </button>
    )
  }
}
