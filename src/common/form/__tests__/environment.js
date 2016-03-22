import i18n from 'focus-core/translation';
import actionBuilder from 'focus-core/application/action-builder';
import {container as domainContainer}  from 'focus-core/definition/domain';
import {container as definitionContainer}  from 'focus-core/definition/entity';
import {config as configContainer} from 'focus-core/reference';
import {CoreStore} from 'focus-core/store';


var _ = require("lodash");

const entities = {
    contact: {
        firstName: {
            domain: 'DO_TEXT',
            required: false,
            validator: [{
                options: {translationKey: 'entityContactValidation.test'}, type: 'function', value: data => {
                    return data.length <= 3 ? false : true;
                }
            }]
        },
        lastName: {
            domain: 'DO_TEXT',
            required: true
        },
        papaCode: {
            domain: 'DO_TEXT',
            required: true
        },
        age: {
            domain: 'DO_NUMBER',
            required: false,
            type: 'number'
        },
        email: {
            domain: 'DO_EMAIL',
            required: false
        },
        bio: {
            domain: 'DO_EMAIL',
            //InputComponent: FocusComponents.common.input.textarea.component
        },
        isCool: {
            domain: 'DO_BOOLEAN'
        },
        isNice: {
            domain: 'DO_BOOLEAN',
            //FieldComponent: FocusComponents.common.input.toggle.component
        },
        birthDate: {
            domain: 'DO_DATE',
            required: false
        },
        city: {
            domain: 'DO_TEXT'
        }
    },
    commande: {
        name: {
            domain: 'DO_TEXT',
            required: true
        },
        number: {
            domain: 'DO_NUMBER',
            required: false,
            type: 'number'
        }
    }
};

const resources = {
    dev: {
        translation: {
            button: {
                edit: 'Editer',
                save: 'Sauvegarder',
                cancel: 'Abandonner'
            },
            select: {
                yes: 'Oui',
                no: 'Non',
                unSelected: '-'
            },
            contact: {
                firstName: 'Prénom',
                lastName: 'Nom',
                papaCOde: 'Le code du papa',
                monkeyCode: 'Le code du singe',
                bio: 'Biography',
                isCool: 'Est-il cool ?',
                isNice: 'Est-il gentil ?',
                birthDate: 'Date de naissance',
                city: 'Lieu de naissance'
            }
        }
    }
};

const domain = {
    DO_TEXT: {
        style: 'do_text',
        type: 'text',
        component: 'PapaSinge',
        validator: [{
            type: 'function',
            options: {
                translationKey: 'domain.doTEXT.test'
            },
            //value: _.isString
        }]
    },
    DO_NUMBER: {
        type: 'number',
        validator: [{
            type: 'number'
        }]
    },
    DO_EMAIL: {
        style: 'do_email',
        type: 'email',
        component: 'PapaMail',
        validator: [{
            type: 'function',
            value: () => true
        }]
    },
    DO_DATE: {
        //InputComponent: FocusComponents.components.input.Date,
        formatter: date => date ? moment(date, moment.ISO_8601).format('D MMMM YYYY') : '',
        format: ['DD/MM/YYYY', 'DD-MM-YYYY', 'D MMM YYYY'],
        locale: 'fr'
    },
    DO_BOOLEAN: {
        //SelectComponent: FocusComponents.common.select.radio.component,
        refContainer: {yesNoList: [{code: true, label: 'select.yes'}, {code: false, label: 'select.no'}]},
        listName: 'yesNoList',
        formatter: i18n.t
    }

};

function initEnvironment() {
    console.log("init start");


    i18n.init({resStore: resources});
    domainContainer.setAll(domain);
    definitionContainer.setEntityConfiguration(entities);

}
function loadEmptyList() {
    return Promise.resolve([]);
}

function loadRef(name) {
    const name1 = name;
    const refLst = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(cd => {
        return {
            code: '' + cd,
            label: ('' + cd + ' ' + name1)
        };
    });
    return refLst;
}

function loadRefList(name) {
    return function loadRef() {
        const refLst = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(cd => {
            return {
                code: '' + cd,
                label: ('' + cd + ' ' + name)
            };
        });
        return Promise.resolve(refLst);
    };
}


function loadMonkeyList() {
    return loadRefList('monkey')().then(data => {
        return data.map(element => {
            return {myCustomCode: element.code, myCustomLabel: element.label};
        });
    });
}

configContainer.set({papas: loadEmptyList, singe: loadRefList('singe'), monkeys: loadMonkeyList});

const contactStore = new CoreStore({
    definition: {
        contact: 'contact',
        commandes: 'commande'
    }
});


const jsonContact = {
    firstName: 'Zeus',
    lastName: 'God',
    isCool: true,
    birthDate: null,
    commandes: [{
        name: 'commande1',
        number: '1'
    }, {
        name: 'commande2',
        number: '2'
    }, {
        name: 'commande3',
        number: '3'
    }, {
        name: 'commande4',
        number: '4'
    }, {
        name: 'commande5',
        number: '5'
    }, {
        name: 'commande6',
        number: '6'
    }],
    city: 'PAR'
};

const action = {
    load: actionBuilder({
        status: 'loaded',
        node: 'contact',
        service() {
            return new Promise((s, e) => {
                _.delay(() => {
                    s(jsonContact);
                }, 1);
            })
        }
    }),
    save: actionBuilder({
        status: 'saved',
        preStatus: 'saving',
        node: 'contact',
        service(data) {
            console.log('save', data);
            return Promise.resolve(data);
        }
    })
};

export default {
    initEnvironment: initEnvironment,
    action: action,
    loadRef: loadRef,
    contactStore: contactStore,
    jsonContact: jsonContact,
    entities :entities,
}

