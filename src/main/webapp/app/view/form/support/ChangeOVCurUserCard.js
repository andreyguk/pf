Ext.define('pf.view.form.support.ChangeOVCurUserCard', {
    extend: 'Ext.window.Window',
    alias: 'widget.changeOVCurUserCard',
    layout: 'fit',
    autoScroll: true,
    border: false,
    initComponent: function () {
        var me = this;
        me.height = Ext.getBody().getViewSize().height * 0.5;
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
                            text: 'Змінити користувача',
                            formBind: true,
                            itemId: 'changeUser',
                            action: 'changeUser',
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
                            fieldLabel: 'Поточний користувач',
                            fieldCls: 'body-style-readOnly',
                            readOnly: true,
                            name: 'ovCurUser'
                        }, {
                            xtype: 'combobox',
                            anchor: '60%',
                            fieldLabel: 'Новий користувач',
                            store: Ext.create('pf.store.common.User'),
                            queryMode: 'local',
                            minChars: 3,
                            afterLabelTextTpl: pf.utils.Validation.required,
                            allowBlank: false,
                            editable: true,
                            displayField: 'shortFio',
                            valueField: 'id',
                            name: 'newUser'
                        }]
                }]
        });
        this.callParent(arguments);
    }
});