/***********************************************************************************************************************/
// TODO PBN : refactor loading of init domains and ref in a global way
//Load dependencies.
var domain = {
    "DO_TEXT": {
        style: "do_text",
        type: "text",
        component: "PapaSinge",
        validator: [{
            type: "function",
            options:{
                translationKey: 'domain.doTEXT.test'
            },
            value: function (d) {
                return _.isString(d);
            }
        }]
    },
    "DO_EMAIL": {
        style: "do_email",
        type: "email",
        component: "PapaMail",
        validator: [{
            type: "function",
            value: function () {
                return true;
            }
        }]
    },
    'DO_DATE': {
        'InputComponent': FocusComponents.common.input.date.component,
        'formatter': function (date) {
            var monthNames = [
                'January', "February", "March",
                "April", "May", "June", "July",
                "August", "September", "October",
                "November", "December"
            ];
            date = new Date(date);
            var day = date.getDate();
            var monthIndex = date.getMonth();
            var year = date.getFullYear();
            return "" + day + " " + monthNames[monthIndex] + " " + year;
        }
    },
    'DO_OUI_NON': {
        InputComponent: FocusComponents.common.select.radio.component,
        refContainer: {ouiNonList: [{code: true, label: "select.oui"}, {code: false, label: "select.non"}]},
        listName: 'ouiNonList'
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

const actionBuilder = Focus.application.actionBuilder;
const Block = FocusComponents.common.block.component;
const formMixin = FocusComponents.common.form.mixin;
const Panel = FocusComponents.common.panel.component;
const MessageCenter = FocusComponents.application.messageCenter.component;

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
    birthDate: new Date().toISOString(),
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
    }]
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
            <Block title="Fiche de l'utilisateur" actions={this._renderActions}>
            {this.fieldFor("firstName")}
            {this.fieldFor("lastName")}
            {
                this.textFor("birthDate", {
                    formatter: function (date) {
                        return "formatted date" + date
                    }
                })
            }
            {this.fieldFor('papaCode', {listName: 'papas'})}
            {this.fieldFor('monkeyCode', {listName: 'monkeys', valueKey: 'myCustomCode', labelKey: 'myCustomLabel' })}
            {this.fieldFor("bio")}
            {this.fieldFor("isCool")}
            {this.fieldFor("isNice")}
            {this.fieldFor("birthDate")}
            {this.listFor("commandes", {lineComponent: ListLine})}
            </Block>
        );
    }
});

return (
    <div>
    <MessageCenter />
    <FormExample isEdit={false}/>
    </div>
);
