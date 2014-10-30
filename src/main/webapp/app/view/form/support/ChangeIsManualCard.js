Ext.define('pf.view.form.support.ChangeIsManualCard', {
    extend: 'Ext.window.Window',
    alias: 'widget.changeIsManualCard',
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
                            text: 'Змінити спосіб формування звіту',
                            formBind: true,
                            itemId: 'changeIsManual',
                            action: 'changeIsManual',
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
                            xtype: 'radiogroup',
                            fieldLabel: 'Змінити спосіб формування на:',
                            fieldCls: 'body-style-readOnly',
                            readOnly: true,
                            items: [{
                                    boxLabel: 'Автоматичне',
                                    name: 'isManual',
                                    readOnly: true,
                                    inputValue: 1
                                }, {
                                    boxLabel: 'Ручне',
                                    name: 'isManual',
                                    readOnly: true,
                                    inputValue: 0
                                }]
                        }]
                }]
        });
        this.callParent(arguments);
    }
});