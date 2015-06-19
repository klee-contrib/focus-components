// Dependencies

let uuid = require('uuid').v4;

let QueryStoreBehaviour = {
    componentWillMount() {
        this._uuid = uuid();
    },
    _updateQuery(query) {
        Focus.search.changeQuery(query, this._uuid);
    },
    _updateScope(scope) {
        Focus.search.changeScope(scope, this._uuid);
    }
};

module.exports = QueryStoreBehaviour;