type User = {
    id: string
    name: string
    photo: string
    art_count: number
    follow_count: number
    fans_count: number
    like_count: number
}

type Profile = {
    id: string
    photo: string
    name: string
    mobile: string
    gender: number
    birthday: string
}

type InitType = {
    user: User
    profile: Profile
}
type ProfileAction =
| {
    type: 'profile/user'
    payload: User
}
| {
    type: 'profile/profile'
    payload: Profile
}
// 初始状态
const initialState :InitType = {
    // 基本信息
    user: {},
    profile: {}
}as InitType

// 操作用户个人信息状态的 reducer 函数
export const profile = (state = initialState, action: ProfileAction) => {
    const {type, payload} = action;
    switch (type) {
        // 设置基本信息
        case "profile/user":
            return {
                ...state,
                user: {...payload}
            };
        case "profile/profile" :
            return {
                ...state,
                profile: {...payload}
            };
        // 默认
        default:
            return state;
    }
};

