type Token = {
    token: string
    refresh_token: string
}
export type LoginActionType = {
    type: 'login/token' | 'login/logout'
    payload: Token
}
// 初始状态
const initialState = {
    token: '',
    refresh_token: ''
}

// 操作 Token 状态信息的 reducer 函数
export const login = (state = initialState, action:LoginActionType) => {
    const { type, payload } = action
    switch (type) {
        case 'login/token': return { ...payload }
        case 'login/logout': return {} as Token
        default: return state
    }

}
