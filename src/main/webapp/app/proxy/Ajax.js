/**
 * Abstract AJAX proxy
 */
Ext.define('pf.proxy.Ajax', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.baseAjax',
    timeout: 60000,
    params: {
        requestParam: 'notInRequestBody'
    },
    actionMethods: {
        create: 'POST',
        read: 'POST',
        update: 'POST',
        destroy: 'POST'
    },
    reader: {
        type: 'json',
        root: 'data',
        totalProperty: 'total',
        successProperty: 'success'
    },
    writer: {
        type: 'json',
        encode: true,
        writeAllFields: true,
        root: 'data',
        record: 'row'
    },
    afterRequest: function (request, success) {
        var me = this;
        // fire requestcomplete event        
        me.fireEvent('requestcomplete', request, success);
    }

});