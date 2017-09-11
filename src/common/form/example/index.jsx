import { actionBuilder } from 'focus-core/application';
import { component as Panel } from 'focus-components/components/panel';
import { mixin as formMixin } from 'focus-components/common/form';
import { component as MessageCenter } from 'focus-components/application/message-center';
import { init } from 'focus-core/translation';

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
                city: 'Lieu de naissance',
                place: 'Ville'
            },
            field: {
                required: 'Ce champs est obligatoire'
            },
            input: {
                date: {
                    invalid: 'Date invalide'
                }
            }
        }
    }
};

init({ resources: resources });

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
            value: _.isString
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
        InputComponent: FocusComponents.components.input.Date,
        formatter: date => date ? moment(date, moment.ISO_8601).format('D MMMM YYYY') : '',
        format: ['DD/MM/YYYY', 'DD-MM-YYYY', 'D MMM YYYY'],
        locale: 'fr',
        validator: [{
            type: 'date'
        }]
    },
    DO_OUI_NON: {
        SelectComponent: FocusComponents.common.select.radio.component,
        refContainer: { yesNoList: [{ code: true, label: 'select.yes' }, { code: false, label: 'select.no' }] },
        listName: 'yesNoList',
        formatter: i18n.t
    }
};
Focus.definition.domain.container.setAll(domain);

const entities = {
    contact: {
        firstName: {
            domain: 'DO_TEXT',
            required: false,
            validator: [{
                options: { translationKey: 'entityContactValidation.test' }, type: 'function', value: data => {
                    return data.length <= 3 ? false : true;
                }
            }]
        },
        lastName: {
            domain: 'DO_TEXT',
            required: true
        },
        place: {
            domain: 'DO_TEXT',
            required: true
        },
        papaCode: {
            domain: 'DO_TEXT',
            required: false
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
            domain: 'DO_TEXT',
            InputComponent: FocusComponents.components.input.Textarea,
            DisplayComponent: FocusComponents.components.input.DisplayTextArea
        },
        isCool: {
            domain: 'DO_OUI_NON'
        },
        isNice: {
            domain: 'DO_BOOLEAN',
            FieldComponent: FocusComponents.components.input.Toggle
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
Focus.definition.entity.container.setEntityConfiguration(entities);

function loadEmptyList() {
    return Promise.resolve([]);
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
            return { myCustomCode: element.code, myCustomLabel: element.label };
        });
    });
}


Focus.reference.config.set({ papas: loadEmptyList, singe: loadRefList('singe'), monkeys: loadMonkeyList });
Focus.definition.entity.container.setEntityConfiguration(entities);
/***********************************************************************************************************************/

const contactStore = new Focus.store.CoreStore({
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
    load: actionBuilder.default({
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
    save: actionBuilder.default({
        status: 'saved',
        preStatus: 'saving',
        node: 'contact',
        service(data) {
            console.log('save', data);
            return Promise.resolve(data);
        }
    })
};

const _querySearcher = query => {
    const data = [
        {
            key: 'NY',
            label: 'New York'
        },
        {
            key: 'PAR',
            label: 'Paris'
        },
        {
            key: 'TOY',
            label: 'Tokyo'
        },
        {
            key: 'BEI',
            label: 'Pékin'
        },
        {
            key: 'LON',
            label: 'Londres'
        },
        {
            key: 'BER',
            label: 'Berlin'
        }
    ].filter(({ key, label }) => label.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                data,
                totalCount: 40
            });
        }, 200);
    });
};

const FormExample = React.createClass({
    displayName: 'FormExample',
    mixins: [formMixin],
    referenceNames: ['papas', 'monkeys'],
    stores: [{
        store: contactStore,
        properties: ['contact', 'commandes']
    }],
    definitionPath: 'contact',
    action: action,

    /**
    * Render content form.
    * @return {ReactDOMNode} node REACT
    */
    renderContent() {
        return (
            <Panel actions={this._renderActions} title="Fiche de l'utilisateur">
                {this.fieldFor('firstName')}
                {this.fieldFor('lastName')}
                {this.fieldFor('place', { querySearcher: _querySearcher })}
                {this.fieldFor('papaCode', { listName: 'papas' })}
                {this.fieldFor('monkeyCode', { listName: 'monkeys', valueKey: 'myCustomCode', labelKey: 'myCustomLabel' })}
                {this.fieldFor('lopezCode', { values: [{ code: 'JOE', label: 'Joe Lopez' }, { code: 'DAVE', label: 'David Lopez' }] })}
                {this.fieldFor('bio')}
                {this.fieldFor('isCool')}
                {this.fieldFor('isNice')}
                {
                    this.textFor('birthDate', {
                        formatter: date => 'formatted date' + date
                    })
                }
                {this.fieldFor('birthDate')}
            </Panel>
        );
    }
});

export default () => (
    <div>
        <MessageCenter />
        <FormExample isEdit={false} />
    </div>
);
