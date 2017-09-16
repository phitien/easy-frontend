import {Wrapper} from 'easy/common'
import * as actions from './actions'

export const wrap = (cmp) => {
    return new Wrapper(cmp, actions).container
}
