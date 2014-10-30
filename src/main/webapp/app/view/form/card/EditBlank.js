/**
 * класс для создания новой анкеты
 */
Ext.require(['Ext.form.*', 'Ext.Img', 'Ext.tip.QuickTipManager']);
Ext.define('pf.view.form.card.EditBlank', {
    extend: 'Ext.window.Window',
    alias: 'widget.editBlank',
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
    layout: 'fit',
    initComponent: function () {
        var me = this;
        me.height = Ext.getBody().getViewSize().height * 0.7;
        me.width = Ext.getBody().getViewSize().width * 0.5;
        Ext.apply(me, {
            items: [{
                    xtype: 'form',
                    bodyPadding: 10,
                    autoScroll: true,
                    frame: false,
                    buttonAlign: 'center',
                    buttons: [{
                            xtype: 'button',
                            text: 'Зберегти',
                            formBind: true,
                            action: 'updateBlank',
                            itemId: 'updateBlank',
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
                            xtype: 'fieldset',
                            title: loc.lblApplicantDesc,
                            defaults: {
                                xtype: 'textfield',
                                anchor: '100%',
                                labelAlign: 'top',
                                readOnly: true,
                                fieldCls: 'body-style-readOnly'
                            },
                            items: [{
                                    xtype: 'container',
                                    anchor: '78%',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    defaults: {
                                        xtype: 'textfield',
                                        labelAlign: 'top',
                                        msgTarget: 'side',
                                        margin: '0 25 10 10'
                                    },
                                    items: [{
                                            anchor: "100%",
                                            xtype: 'combobox',
                                            fieldLabel: loc.lblApplicantType,
                                            itemId: 'applicantTypeId',
                                            store: Ext.create('pf.store.common.ApplicantTypes'),
                                            queryMode: 'local',
                                            name: 'applicantTypeId',
                                            minChars: 3,
                                            editable: false,
                                            displayField: 'name',
                                            valueField: 'id',
                                            afterLabelTextTpl: pf.utils.Validation.required,
                                            allowBlank: false,
                                            readOnly: true,
                                            fieldCls: 'body-style-readOnly',
                                            flex: 3
                                        }, {
                                            fieldLabel: loc.lblApplicant,
                                            flex: 3,
                                            readOnly: true,
                                            fieldCls: 'body-style-readOnly',
                                            name: 'applicant'
                                        }]
                                }, {
                                    xtype: 'fieldset',
                                    anchor: '75%',
                                    defaults: {
                                        xtype: 'combobox',
                                        labelAlign: 'top',
                                        anchor: '100%',
                                        msgTarget: 'side',
                                        margin: '0 10 10 10',
                                        afterLabelTextTpl: pf.utils.Validation.required,
                                        allowBlank: false,
                                        minChars: 3,
                                        queryMode: 'local',
                                        displayField: 'name',
                                        valueField: 'id',
                                        editable: false
                                    },
                                    items: [{
                                            fieldLabel: 'Спосіб доставки звіту',
                                            store: Ext.create('pf.store.common.ReportDeliveryType'),
                                            name: 'reportDeliveryTypeId'
                                        }, {
                                            fieldLabel: 'Спосіб доставки рахунку',
                                            store: Ext.create('pf.store.common.PaymentDeliveryType'),
                                            name: 'paymentDeliveryTypeId'
                                        }, {
                                            fieldLabel: 'Мета оцінки',
                                            store: Ext.create('pf.store.common.ValuationPurpose'),
                                            name: 'valuationPurposeId'
                                        }, {
                                            fieldLabel: 'Вид вартості, що визначається',
                                            store: Ext.create('pf.store.common.CostType'),
                                            name: 'costTypeId'
                                        }]
                                }]
                        }, {
                            xtype: 'fieldset',
                            defaults: {
                                labelAlign: 'top',
                                anchor: '100%'
                            },
                            title: loc.lblObjectDesc,
                            items: [{
                                    xtype: 'combobox',
                                    fieldLabel: loc.lblObjectType,
                                    store: Ext.create('pf.store.common.ObjectTypes'),
                                    itemId: 'objectTypesId',
                                    queryMode: 'local',
                                    minChars: 3,
                                    editable: false,
                                    displayField: 'name',
                                    valueField: 'id',
                                    afterLabelTextTpl: pf.utils.Validation.required,
                                    allowBlank: false,
                                    name: 'objectTypeId',
                                    readOnly: true,
                                    fieldCls: 'body-style-readOnly',
                                    flex: 2
                                }, {
                                    xtype: 'combobox',
                                    fieldLabel: loc.lblObjectSubType,
                                    store: Ext.create('pf.store.common.ObjectSubTypes'),
                                    itemId: 'objectSubTypesId',
                                    queryMode: 'local',
                                    minChars: 3,
                                    editable: false,
                                    readOnly: true,
                                    fieldCls: 'body-style-readOnly',
                                    displayField: 'name',
                                    valueField: 'id',
                                    name: 'objectSubTypeId'
                                }, {
                                    xtype: 'textareafield',
                                    anchor: '100%',
                                    fieldLabel: loc.lblObjectName,
                                    afterLabelTextTpl: pf.utils.Validation.required,
                                    allowBlank: false,
                                    name: 'objectName'
                                }, {
                                    xtype: 'textareafield',
                                    anchor: '100%',
                                    fieldLabel: 'Додаткова інформація для оцінювача',
                                    name: 'addInfo'
                                }, {
                                    xtype: 'textfield',
                                    fieldLabel: loc.lblPaymentSum,
                                    afterLabelTextTpl: pf.utils.Validation.required,
                                    allowBlank: false,
                                    name: 'paymentSum'
                                }]
                        }]
                }]
        });

        me.callParent(arguments);
    }

});