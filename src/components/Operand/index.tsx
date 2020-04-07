import { Component, Prop } from 'vue-property-decorator'
import { VueComponent } from '@/shims-vue'
import styles from './index.css?module'

interface Props {
  name: string
}

@Component
export default class Operand extends VueComponent<Props> {

  @Prop()
  private name!: number;

  render() {
    return (
      <button type="button" class={styles.operandRoot}>
        { this.name }
      </button>
    )
  }
}
