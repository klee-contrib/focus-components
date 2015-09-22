import {clone} from 'lodash/lang';
import {InputCheckbox} from './input/checkbox';
import {InputToggle} from './input/toggle';
import {Select} from './input/select';
const legacy = {
    common: {
        input: {
            text: {component: InputText, mixin: InputText},
            checkbox: {component: InputCheckbox, mixin: InputCheckbox},
            toggle: {component: InputToggle, mixin: InputToggle}
        },
        select: {
            classic: {component: Select, mixin: Select}
        }
    }
}
