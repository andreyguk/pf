/**
 * Довідник ролей
 */
Ext.define('pf.model.common.UserRoles', {
    extend: 'pf.model.Abstract',
    fields: [{
            name: 'id',
            type: 'int'
        }, {
            name: 'code',
            type: 'string'
        }, {
            name: 'name',
            type: 'string'
        }],
    proxy: {
        type: 'baseAjax',
        extraParams: {
            classname: 'UserRoles'
        },
        api: {
            read: 'pf/common/simple/findAll'
        }
    }

});