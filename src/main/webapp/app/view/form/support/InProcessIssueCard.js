Ext.define('pf.view.form.support.InProcessIssueCard', {
    extend: 'Ext.window.Window',
    alias: 'widget.inProcessIssueCard',
    layout: 'fit',
    autoScroll: true,
    plain: true,
    modal: true,
    closable: false,
    buttonAlign: 'center',
    border: false,
    autoShow: false,
    titleCollapse: false,
    initComponent: function () {
        var me = this;
        me.height = Ext.getBody().getViewSize().height * 0.7;
        me.width = Ext.getBody().getViewSize().width * 0.5;

        Ext.apply(me, {
            items: [{
                    xtype: 'form',
                    buttonAlign: 'center',
                    // bodyCls : 'cmp-body-style',
                    cls: 'formButtons',
                    bodyPadding: 10,
                    buttons: [{
                            xtype: 'button',
                            text: 'Виконати заявку',
                            formBind: true,
                            itemId: 'resolveIssue',
                            action: 'resolveIssue',
                            cls: 'btnSave',
                            hidden: true,
                            iconCls: 'save'
                        }, {
                            xtype: 'button',
                            text: 'Відхилити заявку',
                            hidden: !me.isInProcess,
                            formBind: true,
                            itemId: 'rejectIssue',
                            action: 'rejectIssue',
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
                    defaults: {
                        anchor: '100%',
                        labelAlign: 'right',
                        margin: '0 0 15 0',
                        msgTarget: 'side'
                    },
                    items: [{
                            xtype: 'hiddenfield',
                            name: 'id'
                        }, {
                            xtype: 'combobox',
                            anchor: '30%',
                            fieldLabel: 'Тип заявки',
                            store: Ext.create('pf.store.common.RequestType'),
                            queryMode: 'local',
                            minChars: 3,
                            editable: false,
                            displayField: 'name',
                            valueField: 'id',
                            fieldCls: 'body-style-readOnly',
                            readOnly: true,
                            allowBlank: true,
                            name: 'requestType'
                        }, /*{
                         xtype : 'combobox',
                         anchor : '30%',
                         fieldLabel : 'Номер звіту',
                         store : Ext.create('pf.store.AllReports'),
                         queryMode : 'remote',
                         minChars : 2,
                         editable : true,
                         fieldCls : 'body-style-readOnly',
                         readOnly : true,
                         displayField : 'contractNum',
                         valueField : 'id',
                         name : 'objectValuation'
                         }*/, {
                            xtype: 'textfield',
                            anchor: "100%",
                            fieldLabel: 'Номер звіту',
                            fieldCls: 'body-style-readOnly',
                            readOnly: true,
                            name: 'contractNum'
                        }, {
                            xtype: 'textfield',
                            anchor: "100%",
                            fieldLabel: 'Короткий опис',
                            fieldCls: 'body-style-readOnly',
                            readOnly: true,
                            name: 'subject'
                        }, {
                            xtype: 'textareafield',
                            anchor: "100%",
                            fieldLabel: 'Опис',
                            fieldCls: 'body-style-readOnly',
                            readOnly: true,
                            name: 'description'
                        }, {
                            xtype: 'combobox',
                            anchor: '30%',
                            fieldLabel: 'Приорітет',
                            store: Ext.create('pf.store.common.RequestPriority'),
                            queryMode: 'local',
                            minChars: 3,
                            editable: false,
                            fieldCls: 'body-style-readOnly',
                            readOnly: true,
                            displayField: 'name',
                            valueField: 'id',
                            name: 'priority'
                        }, {
                            xtype: 'combobox',
                            anchor: '30%',
                            fieldLabel: 'Статус',
                            store: Ext.create('pf.store.common.RequestState'),
                            queryMode: 'local',
                            minChars: 3,
                            editable: false,
                            displayField: 'name',
                            valueField: 'id',
                            fieldCls: 'body-style-readOnly',
                            readOnly: true,
                            value: '1',
                            name: 'state'
                        }, {
                            xtype: 'textareafield',
                            anchor: "100%",
                            fieldLabel: 'Коментар про виконання',
                            afterLabelTextTpl: pf.utils.Validation.required,
                            allowBlank: false,
                            name: 'executorDescription'
                        }]
                }]
        });
        this.callParent(arguments);
    }
});