import i18n from 'focus-core/translation';
import actionBuilder from 'focus-core/application/action-builder';
import {container as domainContainer}  from 'focus-core/definition/domain';
import {container as definitionContainer}  from 'focus-core/definition/entity';
import {config as configContainer} from 'focus-core/reference';
var _ = require("lodash");

/*
 Focus.reference.config.set({papas: loadEmptyList, singe: loadRefList('singe'), monkeys: loadMonkeyList});
 Focus.definition.entity.container.setEntityConfiguration(entities);

 */


function initEnvironment() {
    console.log("init start");
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

    i18n.init({resStore: resources});


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
        DO_TEXT: {
            type: 'number',
            validator: [{
                type: 'number'
            }]
        }

    };
    domainContainer.setAll(domain);

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
            age: {
                domain: 'DO_NUMBER',
                required: false,
                type: 'number'
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
    definitionContainer.setEntityConfiguration(entities);
    configContainer.set({papas: loadEmptyList, singe: loadRefList('singe'), monkeys: loadMonkeyList});
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

/*
function loadRefList(name) {
    const name1 = name;
    return function (name1) {
        return Promise.resolve(loadRef(name1));
    }
}
*/

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



/*
 const contactStore = new Focus.store.CoreStore({
 definition: {
 contact: 'contact',
 commandes: 'commande'
 }
 });
 */
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
    action:action,
    loadRef : loadRef,
}

//Focus.reference.config.set({papas: loadEmptyList, singe: loadRefList('singe'), monkeys: loadMonkeyList});


/*
 module.exports = {
 initEnvironment: initEnvironment
 };
 */
