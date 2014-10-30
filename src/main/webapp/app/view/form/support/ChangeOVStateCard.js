Ext.define('pf.view.form.support.ChangeOVStateCard', {
    extend: 'Ext.window.Window',
    alias: 'widget.changeOVStateCard',
    layout: 'fit',
    autoScroll: true,
    border: false,
    initComponent: function () {
        var me = this;
        me.height = Ext.getBody().getViewSize().height * 0.4;
        me.width = Ext.getBody().getViewSize().width * 0.4;
        Ext.apply(me, {
            items: [{
                    xtype: 'form',
                    buttonAlign: 'center',
                    // bodyCls : 'cmp-body-style',
                    cls: 'formButtons',
                    bodyPadding: 10,
                    defaults: {
                        anchor: '100%',
                        labelAlign: 'right',
                        margin: '0 0 15 0',
                        msgTarget: 'side'
                    },
                    buttons: [{
                            xtype: 'button',
                            text: 'Змінити статус',
                            formBind: true,
                            itemId: 'changeState',
                            action: 'changeState',
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
                            xtype: 'hiddenfield',
                            name: 'id'
                        }, {
                            xtype: 'textfield',
                            anchor: '60%',
                            fieldLabel: 'Номер звіту',
                            fieldCls: 'body-style-readOnly',
                            readOnly: true,
                            name: 'contractNum'
                        }, {
                            xtype: 'textfield',
                            anchor: '60%',
                            fieldLabel: 'Поточний статус',
                            fieldCls: 'body-style-readOnly',
                            readOnly: true,
                            name: 'ovState'
                        }, {
                            xtype: 'combobox',
                            anchor: '60%',
                            fieldLabel: 'Новий статус',
                            store: Ext.create('pf.store.common.OVState'),
                            queryMode: 'local',
                            minChars: 3,
                            afterLabelTextTpl: pf.utils.Validation.required,
                            allowBlank: false,
                            editable: false,
                            displayField: 'name',
                            valueField: 'id',
                            name: 'newState'
                        }]
                }]
        });
        this.callParent(arguments);
    }
});