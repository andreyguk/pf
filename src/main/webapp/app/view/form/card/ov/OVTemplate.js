Ext.require(['Ext.form.*', 'Ext.Img', 'Ext.tip.QuickTipManager']);
Ext.define('pf.view.form.card.ov.OVTemplate', {
    extend: 'Ext.window.Window',
    alias: 'widget.OVTemplate',
    autoScroll: true,
    plain: true,
    modal: true,
    closable: false,
    buttonAlign: 'center',
    border: false,
    autoShow: false,
    titleCollapse: false,
    title: loc.ttlViewBlank,
    requires: ['Ext.form.Label', 'Ext.form.FieldSet', 'Ext.form.field.TextArea'],
    layout: 'anchor',
    initComponent: function () {
        var me = this;
        me.height = Ext.getBody().getViewSize().height * 0.3;
        me.width = Ext.getBody().getViewSize().width * 0.3;
        Ext.apply(me, {
            items: [{
                    xtype: 'form',
                    buttons: [{
                            xtype: 'button',
                            text: 'Зберегти шаблон',
                            formBind: true,
                            itemId: 'btnAddOVTemplate',
                            action: 'addOVTemplate',
                            cls: 'btnSave',
                            iconCls: 'save'
                        }, {
                            xtype: 'button',
                            text: loc.btnExit,
                            scope: this,
                            handler: this.close,
                            cls: 'btnExit',
                            iconCls: 'exit'
                        }],
                    items: [{
                            xtype: 'fieldset',
                            title: 'Введіть назву шаблону',
                            defaults: {
                                xtype: 'textfield',
                                anchor: '100%',
                                labelAlign: 'top'
                            },
                            items: [{
                                    name: 'templateName'
                                }]
                        }]
                }]
        });

        me.callParent(arguments);
    }

});