import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

type operator = '+' | '-'

export default new Vuex.Store({
  state: {
    buffer: '',
    isLoading: false,
    result: 0,
  },

  getters: {
    buffer: state => state.buffer,
    isLoading: state => state.isLoading,
    result: state => state.result,
  },

  mutations: {
    input: (state, name: string): void => {
      const lastIndex = state.buffer.length - 1
      const bufferArray = state.buffer.split('')
      const lastElement = bufferArray[lastIndex]
      const firstElement = bufferArray[0]
      const isNotCopy = (lastElement: operator | string, name: operator | string): boolean =>
        !(lastElement === '+' && name === '+' || lastElement === '-' && name === '-')
      const switchCharacter = (character: operator): string[] =>
        bufferArray.splice(lastIndex, 2, `${character}`)


      if (isNotCopy(lastElement, name)) {
        if (firstElement === '0') {
          bufferArray.splice(0, 1)
        }

        bufferArray.push(name)

        if (lastElement === '-' && name === '+') {
          switchCharacter('+')
        } else if (lastElement === '+' && name === '-') {
          switchCharacter('-')
        }
      }

      bufferArray.forEach((el, idx, arr) => {
        if ((arr[idx - 1] === '-' || arr[idx - 1] === '+') && arr[idx] === '0') {
          arr.pop()
        }
      })

      state.buffer = bufferArray.join('')
    },
    reset: state => {
      state.result = 0
      state.buffer = ''
    },
    result: state => {
      const lastElement = state.buffer[state.buffer.length - 1]
      const isLastOperation = (lastElement: string): boolean =>
        lastElement === '+' || lastElement === '-'
      const deleteLastOperation = (bufferArray: string[]) =>
        bufferArray.splice(bufferArray.length - 1, 1).join('')

      if (isLastOperation(lastElement)) {
        const bufferArray = state.buffer.split('')
        deleteLastOperation(bufferArray)
        state.result = eval(bufferArray.join(''))
      } else {
        state.result = eval(state.buffer)
      }
    },
  },

  actions: {
    getResult: async ({ state, commit }) => {
      state.isLoading = true
      await new Promise((resolve) => {
        setTimeout(() => {
          commit('result')
          resolve()
        }, 2000)
      })
      state.isLoading = false
    },
  },
})