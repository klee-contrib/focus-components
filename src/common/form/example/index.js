const actionBuilder = Focus.application.actionBuilder;
const Panel = FocusComponents.components.Panel;
const formMixin = FocusComponents.common.form.mixin;
const MessageCenter = FocusComponents.application.messageCenter.component;

/***********************************************************************************************************************/
/* to test internationalisation. */
var resources = {
    dev: {
        translation: {
            'button': {
                'edit': 'Editer',
                'save': 'Sauvegarder',
                'cancel': 'Abandonner'
            },
            'select': {
                'yes': 'Oui',
                'no': 'Non',
                'unSelected': '-'
            },
            'contact': {
                'firstName': 'Prénom',
                'lastName': 'Nom',
                'papaCOde': 'Le code du papa',
                'monkeyCode': 'Le code du singe',
                'bio': 'Biography',
                'isCool': 'Est-il cool ?',
                'isNice': 'Est-il gentil ?',
                'birthDate': 'Date de naissance',
                'city': 'Lieu de naissance'
            }
        }
    }
};

i18n.init({resStore: resources});

/***********************************************************************************************************************/
// TODO PBN : refactor loading of init domains and ref in a global way
//Load dependencies.
var domain = {
    'DO_TEXT': {
        style: 'do_text',
        type: 'text',
        component: 'PapaSinge',
        validator: [{
            type: 'function',
            options:{
                translationKey: 'domain.doTEXT.test'
            },
            value: function (d) {
                return _.isString(d);
            }
        }]
    },
    'DO_EMAIL': {
        style: 'do_email',
        type: 'email',
        component: 'PapaMail',
        validator: [{
            type: 'function',
            value: function () {
                return true;
            }
        }]
    },
    'DO_DATE': {
        'InputComponent': FocusComponents.components.input.Date,
        formatter: date => date ? moment(date, moment.ISO_8601).format('D MMMM YYYY') : '',
        format: ['DD/MM/YYYY', 'DD-MM-YYYY', 'D MMM YYYY'],
        locale: 'fr'
    },
    'DO_OUI_NON': {
        SelectComponent: FocusComponents.common.select.radio.component,
        refContainer: {yesNoList: [{code: true, label: "select.yes"}, {code: false, label: "select.no"}]},
        listName: 'yesNoList'
    }
};
Focus.definition.domain.container.setAll(domain);
/*global focus*/
var entities = {
    "contact": {
        "firstName": {
            "domain": "DO_TEXT",
            "required": false,
            "validator": [{options:{translationKey: 'entityContactValidation.test'}, type:'function', value: function (data) {
                return data.length <= 3 ? false : true;
            }}]
        },
        "lastName": {
            "domain": "DO_TEXT",
            "required": true
        },
        "papaCode": {
            "domain": "DO_TEXT",
            "required": true
        },
        "age": {
            "domain": "DO_NUMBER",
            "required": false,
            "type": "number"
        },
        "email": {
            "domain": "DO_EMAIL",
            "required": false
        },
        "bio": {
            "domain": "DO_EMAIL",
            "InputComponent": FocusComponents.common.input.textarea.component
        },
        "isCool": {
            "domain": "DO_OUI_NON"
        },
        "isNice": {
            "domain": "DO_BOOLEAN",
            "FieldComponent": FocusComponents.common.input.toggle.component
        },
        "birthDate": {
            "domain": "DO_DATE",
            "required": false
        },
        "city": {
            "domain": "DO_TEXT"
        }
    },
    "commande": {
        "name": {
            "domain": "DO_TEXT",
            "required": true
        },
        "number": {
            "domain": "DO_NUMBER",
            "required": false,
            "type": "number"
        }
    }
};
Focus.definition.entity.container.setEntityConfiguration(entities);

function loadRefList(name) {
    return function loadRef() {
        var refLst = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (cd) {
            return {
                code: ''+cd,
                label: ('' + cd + ' ' + name)
            };
        });
        return Promise.resolve(refLst);
    };
}
function loadMonkeyList(){
    return loadRefList('monkey')().then(function(data){
        return data.map(function(element){
            return {myCustomCode: element.code, myCustomLabel: element.label};
        });
    });
}


Focus.reference.config.set({papas: loadRefList('papas'), singe: loadRefList('singe'), monkeys: loadMonkeyList});
Focus.definition.entity.container.setEntityConfiguration(entities);
/***********************************************************************************************************************/

const ListLine = React.createClass({
    mixins: [FocusComponents.list.selection.line.mixin],
    definitionPath: "commande",
    renderLineContent(data){
        const firstName = this.displayFor("name", {});
        const lastName = this.displayFor("number", {});
        return <div>{firstName} {lastName}</div>;
        }
    });

    const contactStore = new Focus.store.CoreStore({
        definition: {
            'contact': 'contact',
            'commandes': 'commande'
        }
    });

    const jsonContact= {
        firstName: "Zeus",
        lastName: "God",
        isCool: true,
        birthDate: null,
        commandes: [{
            name: "commande1",
            number: "1"
        }, {
            name: "commande2",
            number: "2"
        }, {
            name: "commande3",
            number: "3"
        }, {
            name: "commande4",
            number: "4"
        }, {
            name: "commande5",
            number: "5"
        }, {
            name: "commande6",
            number: "6"
        }],
        city: 'PAR'
    };

    const action = {
        load: actionBuilder({
            status: 'loaded',
            node: 'contact',
            service(){
                return new Promise(function(s,e){
                    _.delay(function(){
                        s(jsonContact);
                    }, 1);
                })//Promise.resolve(jsonContact);
            }
        }),
        save:actionBuilder({
            status: 'saved',
            preStatus: 'saving',
            node: 'contact',
            service(data){
                console.log('save', data);
                return Promise.resolve(data);
            }
        })
    };

    const autocompleteData = [
        {
            code: 'PAR',
            value: 'Paris'
        },
        {
            code: 'LON',
            value: 'Londres'
        },
        {
            code: 'NY',
            value: 'New york'
        }
    ];

    const codeResolver = code =>  {
        return new Promise(success => {
            const candidate = _.find(autocompleteData, {code});
            success(candidate ? candidate.value : 'Unresolved code');
        });
    };

    const searcher = text => {
        return new Promise(success => {
            _.delay(() => {
                const result = autocompleteData.filter(item => {
                    return text === '' || item.value.toLowerCase().indexOf(text.toLowerCase()) !== -1;
                });
                success(result);
            }, 1);
        });
    }

    const FormExample = React.createClass({
        displayName: "FormExample",
        mixins: [formMixin],
        stores: [{
            store: contactStore,
            properties: ["contact", "commandes"],
        }],
        definitionPath: "contact",
        action: action,
        referenceNames: ['papas', 'monkeys'],

        /**
        * Render content form.
        * @return {ReactDOMNode} node REACT
        */
        renderContent() {
            return (
                <Panel title="Fiche de l'utilisateur" actions={this._renderActions}>
                    {this.fieldFor("firstName")}
                    {this.fieldFor("lastName")}
                    {this.fieldFor('papaCode', {listName: 'papas'})}
                    {this.fieldFor('monkeyCode', {listName: 'monkeys', valueKey: 'myCustomCode', labelKey: 'myCustomLabel' })}
                    {this.fieldFor("bio")}
                    {this.fieldFor("isCool")}
                    {this.fieldFor("isNice")}
                    {
                        this.textFor("birthDate", {
                            formatter: function (date) {
                                return "formatted date" + date
                            }
                        })
                    }
                    {this.fieldFor("birthDate")}
                </Panel>
            );
        }
    });


    return (
        <div>
            <MessageCenter />
            <FormExample isEdit={false}/>
        </div>
    );
