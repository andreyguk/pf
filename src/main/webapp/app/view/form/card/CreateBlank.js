/**
 * класс для создания новой анкеты
 */
Ext.require(['Ext.form.*', 'Ext.Img', 'Ext.tip.QuickTipManager']);
Ext.define('pf.view.form.card.CreateBlank', {
    extend: 'Ext.panel.Panel',
    requires: ['pf.utils.Validation'],
    alias: 'widget.createBlank',
    layout: 'auto',
    autoScroll: true,
    buttonAlign: 'center',
    initComponent: function () {
        var me = this;
        Ext.apply(this, {
            items: [{
                    xtype: 'form',
                    buttonAlign: 'center',
                    autoScroll: true,
                    bodyCls: 'cmp-body-style',
                    cls: 'formButtons',
                    frame: false,
                    bodyPadding: 10,
                    defaults: {
                        anchor: '100%'
                    },
                    listeners: {
                        fieldvaliditychange: function () {
                            var me = this, errorCmp, fields, errors;
                            if (me.getForm().isDirty()) {
                                errorCmp = me.down('#formErrorState');
                                errorCmp = Ext.ComponentQuery.query('createBlank #formErrorState')[0];
                                fields = me.getForm().getFields();
                                errors = [];
                                fields.each(function (field) {
                                    Ext.Array.forEach(field.getErrors(), function (error) {
                                        errors.push({
                                            name: field.getFieldLabel(),
                                            error: error
                                        });
                                    });
                                });
                                errorCmp.setErrors(errors);
                                me.hasBeenDirty = true;
                            }
                        },
                        fielderrorchange: function () {
                            var me = this, errorCmp, fields, errors;

                            if (me.getForm().isDirty()) {
                                errorCmp = me.down('#formErrorState');
                                errorCmp = Ext.ComponentQuery.query('createBlank #formErrorState')[0];
                                fields = me.getForm().getFields();
                                errors = [];
                                fields.each(function (field) {
                                    Ext.Array.forEach(field.getErrors(), function (error) {
                                        errors.push({
                                            name: field.getFieldLabel(),
                                            error: error
                                        });
                                    });
                                });
                                errorCmp.setErrors(errors);
                                me.hasBeenDirty = true;
                            }
                        }
                    },
                    buttons: [{
                            xtype: 'button',
                            text: loc.bntSave,
                            formBind: true,
                            itemId: 'saveBlank',
                            action: 'saveBlank',
                            cls: 'btnSave',
                            iconCls: 'save'
                        }, {
                            xtype: 'button',
                            text: loc.bntPrintBlank,
                            itemId: 'printBlankId',
                            cls: 'btnExit',
                            iconCls: 'print',
                            disabled: true,
                            hidden: true
                        }],
                    items: [{
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                defaultMargins: '10px 5px 5px 10px'

                            },
                            defaults: {
                                anchor: '100%',
                                labelAlign: 'top'
                            },
                            items: [{
                                    xtype: 'fieldset',
                                    itemId: 'fldApplicantDescId',
                                    flex: 1.2,
                                    anchor: '100%',
                                    title: loc.lblApplicantDesc,
                                    items: [{
                                            anchor: "100%",
                                            xtype: 'combobox',
                                            fieldLabel: loc.lblApplicantType,
                                            itemId: 'applicantTypeId',
                                            store: Ext.create('pf.store.common.ApplicantTypes'),
                                            queryMode: 'local',
                                            minChars: 3,
                                            editable: false,
                                            displayField: 'name',
                                            valueField: 'id',
                                            afterLabelTextTpl: pf.utils.Validation.required,
                                            allowBlank: false
                                        }, {
                                            xtype: 'container',
                                            anchor: "100%",
                                            itemId: 'cntrApplicant',
                                            layout: {
                                                type: 'hbox',
                                                defaultMargins: '5px 0px 0px 0px'
                                            },
                                            items: [{
                                                    flex: 1,
                                                    xtype: 'textfield',
                                                    itemId: 'applicantId',
                                                    name: 'applicant',
                                                    hidden: true
                                                }, {
                                                    xtype: 'textareafield',
                                                    flex: 1,
                                                    itemId: 'applicantNameId',
                                                    grow: true,
                                                    width: Ext.getBody().getViewSize().width * 0.22,
                                                    fieldLabel: loc.lblApplicant,
                                                    afterLabelTextTpl: pf.utils.Validation.required,
                                                    allowBlank: false,
                                                    msgTarget: 'under',
                                                    readOnly: true,
                                                    margin: '5px 3 0 0'
                                                }, {
                                                    xtype: 'button',
                                                    iconCls: 'btn-search',
                                                    itemId: 'searchApplicant',
                                                    margin: '5 0 0 0',
                                                    width: 22
                                                }]
                                        }, {
                                            xtype: 'combobox',
                                            anchor: "100%",
                                            labelAlign: 'left',
                                            msgTarget: 'side',
                                            afterLabelTextTpl: pf.utils.Validation.required,
                                            allowBlank: false,
                                            fieldLabel: 'Спосіб доставки рахунку',
                                            // store: Ext.create('pf.store.common.PaymentDeliveryType'),
                                            name: 'paymentDeliveryType',
                                            queryMode: 'local',
                                            minChars: 3,
                                            editable: false,
                                            displayField: 'name',
                                            margin: '5 0 0 0',
                                            valueField: 'id'
                                        }, {
                                            xtype: 'combobox',
                                            anchor: "100%",
                                            labelAlign: 'left',
                                            msgTarget: 'side',
                                            afterLabelTextTpl: pf.utils.Validation.required,
                                            allowBlank: false,
                                            fieldLabel: 'Спосіб доставки звіту',
                                            //store: Ext.create('pf.store.common.ReportDeliveryType'),
                                            name: 'reportDeliveryType',
                                            queryMode: 'local',
                                            minChars: 3,
                                            editable: false,
                                            displayField: 'name',
                                            margin: '5 0 0 0',
                                            valueField: 'id'
                                        }]
                                }, {
                                    xtype: 'fieldset',
                                    anchor: '100%',
                                    title: loc.lblObjectDesc,
                                    flex: 1.8,
                                    defaults: {
                                        labelAlign: 'top',
                                        allowBlank: false,
                                        msgTarget: 'side',
                                        afterLabelTextTpl: pf.utils.Validation.required,
                                        anchor: '100%'
                                    },
                                    items: [{
                                            xtype: 'combobox',
                                            fieldLabel: loc.lblObjectType,
                                            //store: Ext.create('pf.store.common.ObjectTypes'),
                                            itemId: 'objectTypesId',
                                            queryMode: 'local',
                                            minChars: 3,
                                            editable: false,
                                            displayField: 'name',
                                            valueField: 'id',
                                            name: 'objectType',
                                            flex: 2
                                        }, {
                                            xtype: 'combobox',
                                            fieldLabel: loc.lblObjectSubType,
                                            //store: Ext.create('pf.store.common.ObjectSubTypes'),
                                            itemId: 'objectSubTypesId',
                                            queryMode: 'local',
                                            minChars: 3,
                                            editable: false,
                                            displayField: 'name',
                                            valueField: 'id',
                                            name: 'objectSubType',
                                            lastQuery: ''

                                        }, {
                                            xtype: 'textareafield',
                                            grow: true,
                                            labelAlign: 'top',
                                            cols: 114,
                                            fieldLabel: loc.lblObjectName,
                                            afterLabelTextTpl: pf.utils.Validation.required,
                                            allowBlank: false,
                                            msgTarget: 'side',
                                            rows: 2,
                                            name: 'objectName'
                                        }, {
                                            xtype: 'container',
                                            defaults: {
                                                labelAlign: 'top'
                                            },
                                            layout: {
                                                type: 'hbox'

                                            },
                                            items: [{
                                                    labelAlign: 'top',
                                                    xtype: 'textfield',
                                                    fieldLabel: loc.lblPaymentSum,
                                                    name: 'paymentSum',
                                                    readOnly: false,
                                                    value: 300,
                                                    vtype: 'isIntFloat',
                                                    allowBlank: false,
                                                    afterLabelTextTpl: pf.utils.Validation.required,
                                                    margin: '0 10 10 0'
                                                }, {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Дата проведення оцінки',
                                                    name: 'valuationDate',
                                                    allowBlank: false,
                                                    afterLabelTextTpl: pf.utils.Validation.required,
                                                    format: 'd.m.Y',
                                                    value: new Date(),
                                                    margin: '0 0 10 0'
                                                }]
                                        }]
                                }, {
                                    xtype: 'component',
                                    id: 'formErrorState',
                                    labelWidth: 120,
                                    labelAlign: 'left',
                                    msgTarget: 'side',
                                    invalidCls: 'inValid',
                                    validCls: 'valid',
                                    flex: 0.8,
                                    validText: loc.validTextBlank,
                                    invalidText: loc.invalidTextBlank,
                                    tipTpl: Ext.create('Ext.XTemplate', '<ul class="' + Ext.plainListCls + '"><tpl for="."><li><span class="letter">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),
                                    getTip: function () {
                                        var tip = this.tip;
                                        if (!tip) {
                                            tip = this.tip = Ext.widget('tooltip', {
                                                target: this.el,
                                                title: 'Детальніше:',
                                                autoHide: false,
                                                anchor: 'top',
                                                mouseOffset: [-11, 10],
                                                closable: true
                                            });
                                            tip.show();
                                        }
                                        return tip;
                                    },
                                    setErrors: function (errors) {
                                        var me = this, tip = me.getTip();
                                        errors = Ext.Array.from(errors);
                                        // Update CSS class and tooltip content
                                        if (errors.length) {
                                            me.addCls(me.invalidCls);
                                            me.removeCls(me.validCls);
                                            me.update(me.invalidText);
                                            tip.setDisabled(false);
                                            tip.update(me.tipTpl.apply(errors));
                                        } else {
                                            me.addCls(me.validCls);
                                            me.removeCls(me.invalidCls);
                                            me.update(me.validText);
                                            tip.setDisabled(true);
                                            tip.hide();
                                        }
                                    }

                                }]
                        }, {
                            xtype: 'container',
                            layout: 'column',
                            defaults: {
                                margin: '0 10 0 0'
                            },
                            items: [{
                                    columnWidth: .4,
                                    xtype: 'container',
                                    layout: 'fit',
                                    items: [{
                                            xtype: 'combobox',
                                            labelAlign: 'left',
                                            msgTarget: 'side',
                                            afterLabelTextTpl: pf.utils.Validation.required,
                                            allowBlank: false,
                                            fieldLabel: 'Мета оцінки',
                                            //store: Ext.create('pf.store.common.ValuationPurpose'),
                                            name: 'valuationPurpose',
                                            queryMode: 'local',
                                            minChars: 3,
                                            editable: false,
                                            displayField: 'name',
                                            margin: '5 0 0 0',
                                            valueField: 'id'
                                        }, {
                                            xtype: 'combobox',
                                            labelAlign: 'left',
                                            msgTarget: 'side',
                                            afterLabelTextTpl: pf.utils.Validation.required,
                                            allowBlank: false,
                                            fieldLabel: 'Вид вартості, що визначається',
                                            //store: Ext.create('pf.store.common.CostType'),
                                            name: 'costType',
                                            queryMode: 'local',
                                            minChars: 3,
                                            editable: false,
                                            displayField: 'name',
                                            margin: '5 0 0 0',
                                            valueField: 'id'
                                        }, {
                                            xtype: 'filefield',
                                            labelAlign: 'top',
                                            name: 'file',
                                            fieldLabel: 'Фото об’єкту оціники. Прикрікрипити архів: ',
                                            buttonText: 'Оберіть файл'
                                        }]
                                }, {
                                    columnWidth: .5,
                                    xtype: 'uploadmultifile',
                                    title: 'Первинні документи',
                                    gridName: 'Обрані файли',
                                    buttonText: 'Виберіть файл(и)',
                                    allowBlank: true,
                                    name: 'primaryDocs'

                                }]
                        }, {
                            xtype: 'fieldset',
                            anchor: '100%',
                            title: 'Додаткова інформація для оцінювача',
                            anchor : '40%',
                                    items: [{
                                            xtype: 'textareafield',
                                            grow: true,
                                            labelAlign: 'top',
                                            cols: 114,
                                            msgTarget: 'side',
                                            rows: 2,
                                            name: 'addInfo'
                                        }]
                        }]

                }]
        }), this.callParent(arguments);
    }

});
