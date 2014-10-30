Ext.require(['Ext.form.*', 'Ext.Img', 'Ext.tip.QuickTipManager']);
Ext.define('pf.view.form.card.ov.OVTemplatesList', {
    extend: 'Ext.window.Window',
    alias: 'widget.OVTemplatesList',
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
        me.height = Ext.getBody().getViewSize().height * 0.5;
        me.width = Ext.getBody().getViewSize().width * 0.3;
        var storeTemplatesList = Ext.create('pf.store.TemplatesList');
        Ext.apply(me, {
            items: [{
                    xtype: 'form',
                    buttons: [{
                            xtype: 'button',
                            text: 'Перенести дані з шаблону',
                            formBind: true,
                            itemId: 'btnLoadFromTemplate',
                            action: 'loadFromTemplate',
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
                            title: 'Перелік шаблонів',
                            defaults: {
                                anchor: '100%',
                                labelAlign: 'top'
                            },
                            items: [{
                                    xtype: 'grid',
                                    store: storeTemplatesList,
                                    selType: 'rowmodel',
                                    anchor: '100%',
                                    columnLines: true,
                                    itemId: 'gridOVTemplates',
                                    dockedItems: [{
                                            xtype: 'pagingtoolbar',
                                            dock: 'bottom',
                                            store: storeTemplatesList,
                                            displayInfo: true
                                        }],
                                    columns: me.buildColumns()
                                }]
                        }]
                }]
        });

        me.callParent(arguments);
    },
    buildColumns: function () {
        var cntrAbstract = Ext.create('pf.controller.Abstract');
        return [{
                xtype: 'rownumberer'
            }, {
                header: 'id',
                dataIndex: 'id',
                hidden: true,
                hideable: false
            }, {
                text: 'Назва шаблону',
                flex: 2,
                dataIndex: 'templateName'
            }, {
                text: 'Дата створення шаблону',
                dataIndex: 'createDate',
                flex: 1
            }, {
                xtype: 'actioncolumn',
                items: [{
                        iconCls: 'delete',
                        handler: function (grid, rowIndex, colIndex) {
                            Ext.Msg.confirm(loc.msgConfirnmActionTitle, loc.msgConfirnmActionDelText, function (btn) {
                                if (btn == 'yes') {
                                    var rec = grid.getStore().getAt(rowIndex), store = grid.getStore();
                                    store.remove(rec);
                                    callbacks = {
                                        success: function (records, operation) {
                                            var result = Ext.decode(records.operations[0].response.responseText);
                                            if (result.success) {
                                                cntrAbstract.showInfo(cntrAbstract.getMessage(result.code));
                                            } else {
                                                cntrAbstract.showEr(cntrAbstract.cntrAbstract(result.code));
                                            }
                                        },
                                        failure: function (records, operation) {
                                            var result = Ext.decode(records.operations[0].response.responseText);
                                            cntrAbstract.showEr(cntrAbstract.getMessage(result.code));
                                            store.rejectChanges();
                                        }
                                    };
                                    store.sync(callbacks);
                                }
                            });
                        },
                        scope: this
                    }],
                width: '10px',
                align: 'center'
            }];
    }

});