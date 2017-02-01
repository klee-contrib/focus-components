import {clone} from 'lodash/lang';
import {InputCheckbox} from './components/input/checkbox';
import {InputToggle} from './components/input/toggle';
import {Select} from './components/input/select';
import {ScrollspyContainer} from './components/scrollspy-container'
import {Panel} from './components/panel'

const legacy = {
    common: {
        input: {
            text: {component: InputText, mixin: InputText},
            checkbox: {component: InputCheckbox, mixin: InputCheckbox},
            toggle: {component: InputToggle, mixin: InputToggle}
        },
        select: {
            classic: {component: Select, mixin: Select}
        },
        detail: { component: ScrollspyContainer },
        block: { component: Panel }
    }
}
