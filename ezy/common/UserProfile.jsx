import assign from 'object-assign'
import {Model} from './Model'
import {cache} from './cache'

export class UserProfile extends Model {
    get defaultModelData() {
        return assign({
            account: null,
            first_name: null,
            last_name: null,
            middle_name: null,
            name: null,
            short_name: null,
            birthday: null,
            gender: null,
            hometown: null,
            locale: null,
            link: null,
            email: null,
            avatar: null,
            right: []
        }, this.config.standardUserData)
    }
    set loadFromCache(v) {
        if (v) this.data = cache.get(this.config.userProfileName)
    }
    cache() {
        cache.set(this.config.userProfileName, this.data)
    }
    remove() {
        this.default()
        this.cache()
    }
    afterSave() {
        this.cache()
    }
    afterPropSave(k, v) {
        this.cache()
    }
}

export const user = new UserProfile()
user.loadFromCache = true
