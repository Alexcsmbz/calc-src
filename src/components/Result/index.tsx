import { Component, Prop } from 'vue-property-decorator'
import { VueComponent } from '@/shims-vue'
import styles from './index.css?module'

interface Props {
  result: number
}

@Component
export default class Result extends VueComponent<Props> {

  @Prop()
  private result!: number;

  render() {
    return (
      <div class={styles.resultRoot}>
        = {this.result.toString()}
      </div>
    )
  }
}
