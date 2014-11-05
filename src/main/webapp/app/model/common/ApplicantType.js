Ext.define('pf.model.common.ApplicantType', {
    extend: 'pf.model.Abstract',
    fields: [{
            name: 'id',
            type: 'string'
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
            classname: 'ApplicantType'
        },
        api: {
            read: 'pf/common/simple/findAll'
        }
    }

});
