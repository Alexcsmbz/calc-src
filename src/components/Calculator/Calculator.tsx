import { Component } from 'vue-property-decorator'
import { VueComponent } from '@/shims-vue'

import Loader from '@/components/Loader'
import Buffer from '@/components/Buffer'
import Result from '@/components/Result'
import Operator from '@/components/Operator'
import Operand from '@/components/Operand'

import styles from './Calculator.css?module'

interface IOperator {
  name: string
  operation: (name: string) => void
}

@Component
export default class Calculator extends VueComponent {

  get buffer() {
    return this.$store.getters.buffer
  }

  get result() {
    return this.$store.getters.result
  }

  input(name: string): void {
    this.$store.commit('input', name)
  }

  operators: IOperator[] = [
    {
      name: 'C',
      operation: () => this.$store.commit('reset'),
    },
    {
      name: '-',
      operation: (name: string) => this.input(name),
    },
    {
      name: '+',
      operation: (name: string) => this.input(name),
    },
    {
      name: '=',
      operation: () => this.$store.dispatch('getResult'),
    },
  ]

  operands: string[] = ['9', '8', '7', '6', '5', '4', '3', '2', '1', '0']

  render() {
    const operands = this.operands.map((operand) => {
      return (
        <div class={styles.operand} onclick={() => this.input(operand)}>
          <Operand name={operand} />
        </div>
      )
    })

    const operators = this.operators.map(operator => {
      return (
        <div onclick={() => operator.operation(operator.name)}>
          <Operator name={operator.name} />
        </div>
      )
    })

    const loader = this.$store.getters.isLoading ? <Loader /> : ''

    return (
      <div class={styles.calculatorRoot}>
        {loader}
        <div class={styles.info}>
          <Buffer buffer={this.buffer} />
          <Result result={this.result} />
        </div>
        <div class={styles.workArea}>
          <div class={styles.operators}>
            {operators}
          </div>
          <div class={styles.operands}>
            {operands}
          </div>
        </div>
      </div>
    )
  }
}
