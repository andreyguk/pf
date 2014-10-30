Ext.define('pf.view.form.support.ChangeOVValuationDateCard', {
    extend: 'Ext.window.Window',
    alias: 'widget.changeOVValuationDateCard',
    layout: 'fit',
    autoScroll: true,
    border: false,
    initComponent: function () {
        var me = this;
        me.height = Ext.getBody().getViewSize().height * 0.3;
        me.width = Ext.getBody().getViewSize().width * 0.3;
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
                            itemId: 'changeValuationDate',
                            action: 'changeValuationDate',
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
                            xtype: 'datefield',
                            anchor: '60%',
                            readOnly: true,
                            fieldLabel: 'Поточна дата оцінки',
                            name: 'valuationdate',
                            flex: 1,
                            fieldCls: 'body-style-readOnly',
                            format: 'd.m.Y'
                        }, {
                            xtype: 'datefield',
                            anchor: '60%',
                            fieldLabel: 'Нова дата оцінки',
                            name: 'valuationdateNew',
                            flex: 1,
                            format: 'd.m.Y'
                        }]
                }]
        });
        this.callParent(arguments);
    }
});