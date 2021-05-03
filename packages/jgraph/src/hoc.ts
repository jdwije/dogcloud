export type AppContext = {

}

const context: AppContext = {}

export const hoc = (fn: Function) => {
  return fn.bind(null, context)
}
