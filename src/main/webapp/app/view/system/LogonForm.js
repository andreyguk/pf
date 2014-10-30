Ext.define('pf.view.system.LogonForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.logonForm',
    autoShow: true,
    height: 170,
    width: 360,
    layout: {
        type: 'fit'
    },
    closeAction: 'hide',
    closable: false,
    resizable: false,
    draggable: false,
    items: [{
            xtype: 'form',
            frame: false,
            bodyPadding: 15,
            defaults: {
                xtype: 'textfield',
                anchor: '100%',
                labelWidth: 60,
                allowBlank: false,
                msgTarget: 'side'
            },
            items: [{
                    name: 'login',
                    fieldLabel: 'login'
                }, {
                    inputType: 'password',
                    name: 'password',
                    fieldLabel: 'password',
                    vtype: 'alphanum'
                }],
            buttons: [{
                    xtype: 'tbfill'
                }, {
                    xtype: 'button',
                    itemId: 'loginBtn',
                    formBind: true,
                    text: 'login'
                }]
        }]
});