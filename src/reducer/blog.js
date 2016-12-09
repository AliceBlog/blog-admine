import { fromJS, List, toJS } from 'immutable'

const initialState = fromJS({
    blogList: [],
    tagList: []
})
export default (state = initialState, action) => {
    console.log(action.type)

    switch (action.type) {
        case 'GETBLOGLIST':
            return state.set('blogList', action.data)
        case 'GETTAGLIST':
            return state.set('tagList', action.data)

        default:
            return state
    }
}