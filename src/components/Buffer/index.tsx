import { Component, Prop } from 'vue-property-decorator'
import { VueComponent } from '@/shims-vue'
import styles from './index.css?module'

interface Props {
  buffer: string
}

@Component
export default class Buffer extends VueComponent<Props> {

  @Prop()
  private buffer!: string;

  render() {
    return (
      <div class={styles.bufferRoot}>
        {this.buffer}
      </div>
    )
  }
}
