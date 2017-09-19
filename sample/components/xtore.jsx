import {createXtore} from 'ezy/common'
import {reducers} from '../reducers'
import {middlewares} from '../middlewares'

const initialState = {}

export const xtore = new createXtore(reducers, middlewares, initialState)
