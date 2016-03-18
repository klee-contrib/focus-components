import i18n from 'focus-core/translation';
import actionBuilder from 'focus-core/application/action-builder';
import {container as domainContainer}  from 'focus-core/definition/domain';
import {container as definitionContainer}  from 'focus-core/definition/entity';


export function initEnvironment() {
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
}

/*
module.exports = {
    initEnvironment: initEnvironment
};
*/
