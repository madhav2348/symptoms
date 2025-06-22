/* eslint-disable @typescript-eslint/no-unused-vars */
export type State = {
  count: number;
};

export type Action = {
  type: "REFRESH";
};

export const initialCount: State = { count: 0 };
 export function stateReducer(state: State, action: Action) {
  switch (action.type) {
    case "REFRESH":
      return { counter : state.count + 1 };
    default:
      return state;
  }
}
