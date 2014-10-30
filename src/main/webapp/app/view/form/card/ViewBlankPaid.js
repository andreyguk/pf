/**
 * класс для создания новой анкеты
 */
Ext.require(['Ext.form.*', 'Ext.Img', 'Ext.tip.QuickTipManager']);
Ext.define('pf.view.form.card.ViewBlankPaid', {
    extend: 'Ext.window.Window',
    alias: 'widget.viewBlankPaid',
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
        var storeBlank2PrimaryDocs = Ext.create('pf.store.Blank2PrimaryDocs');
        storeBlank2PrimaryDocs.filter('blankId', me.blankID);
        Ext.apply(me, {
            items: [{
                    xtype: 'form',
                    bodyPadding: 10,
                    autoScroll: true,
                    frame: false,
                    buttonAlign: 'center',
                    buttons: [{
                            xtype: 'button',
                            text: 'Редагування',
                            action: 'editBlank',
                            itemId: 'editBlank',
                            cls: 'btnSaveToInProcess',
                            // hidden : !(pf.LoggedInUser.inRole('SUPERVISOR')),
                            hidden: true,
                            iconCls: 'edit'
                        }, {
                            xtype: 'button',
                            text: loc.btnAcceptPaymentAcc,
                            formBind: true,
                            hidden: (me.gridId != 'gridPaidList' || pf.LoggedInUser.inRole('OPERATOR')),
                            itemId: 'acceptPayment',
                            action: 'confirmPayment',
                            cls: 'btnSave',
                            iconCls: 'save'
                        }, {
                            xtype: 'button',
                            text: loc.btnconfirmTo1S,
                            hidden: !((!me.isAppIn1S) && ((pf.LoggedInUser.inRole('ACCOUNTANT,SUPERVISOR')))),
                            formBind: false,
                            itemId: 'confirmTo1S',
                            action: 'confirmTo1S',
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
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                defaultMargins: {
                                    top: 5,
                                    right: 5,
                                    bottom: 5,
                                    left: 0
                                }
                            },
                            items: [{
                                    xtype: 'textfield',
                                    fieldLabel: 'Номер договору',
                                    name: 'contractNum',
                                    readOnly: true,
                                    fieldCls: 'body-style-readOnly'
                                }, {
                                    xtype: 'tbspacer',
                                    width: 10
                                }, {
                                    xtype: 'label',
                                    // html : '<a
                                    // href="pf.proxy.manager.FileManager.cls?objType=blank&fileType=payment&objId='
                                    // + me.blankID + '">Файл рахунку-договору ' + '<b>' +
                                    // me.contractNum + '</b>' + '</a>'
                                    html: '<a href="pf.printForms.pdf.Contract.cls?blankId=' + me.blankID + '"target="_blank">Файл  рахунку-договору ' + '<b>' + me.contractNum + '</b>' + '</a>'

                                }, {
                                    xtype: 'tbspacer',
                                    width: 10
                                }, {
                                    xtype: 'label',
                                    html: '<a href="pf.proxy.manager.FileManager.cls?objType=blank&fileType=paymentScan&objId=' + me.blankID + '">Скан квитанції про оплату' + '</a>'
                                }]
                        }, {
                            xtype: 'datefield',
                            fieldLabel: 'Дата надходження грошей',
                            itemId: 'datePaymentId',
                            name: 'paymentDate',
                            format: 'd.m.Y',
                            margin: '5 0 10 0',
                            width: '100',
                            afterLabelTextTpl: pf.utils.Validation.required,
                            allowBlank: false,
                            hidden: !(pf.LoggedInUser.inRole('ACCOUNTANT,SUPERVISOR'))
                        }, {
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
                                    fieldLabel: loc.lblApplicantType,
                                    name: 'applicantType'
                                }, {
                                    xtype: 'container',
                                    anchor: '100%',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    defaults: {},
                                    items: [{
                                            xtype: 'textfield',
                                            flex: 1,
                                            labelAlign: 'top',
                                            readOnly: true,
                                            fieldCls: 'body-style-readOnly',
                                            fieldLabel: loc.lblApplicant,
                                            itemId: 'applicant',
                                            name: 'applicant'
                                        }, {
                                            xtype: 'button',
                                            iconCls: 'btn-search',
                                            itemId: 'viewApplicant',
                                            margin: '18 0 0 0',
                                            width: 22
                                        }]
                                }, {
                                    fieldLabel: 'Спосіб доставки звіту',
                                    name: 'reportDeliveryType'
                                }, {
                                    fieldLabel: 'Спосіб доставки рахунку',
                                    name: 'paymentDeliveryType'
                                }, {
                                    fieldLabel: 'Мета оцінки',
                                    name: 'valuationPurpose'
                                }, {
                                    fieldLabel: 'Вид вартості, що визначається',
                                    name: 'costType'
                                }]
                        }, {
                            xtype: 'fieldset',
                            defaults: {
                                labelAlign: 'top',
                                xtype: 'textfield',
                                anchor: '100%',
                                readOnly: true,
                                fieldCls: 'body-style-readOnly'
                            },
                            title: loc.lblObjectDesc,
                            items: [{
                                    fieldLabel: loc.lblObjectType,
                                    name: 'objectType'
                                }, {
                                    fieldLabel: loc.lblObjectSubType,
                                    name: 'objectSubType'
                                }, {
                                    xtype: 'textareafield',
                                    anchor: '100%',
                                    fieldLabel: loc.lblObjectName,
                                    name: 'objectName'
                                }, {
                                    fieldLabel: loc.lblPaymentSum,
                                    name: 'paymentSum'
                                }]
                        }, {
                            xtype: 'fieldset',
                            defaults: {
                                labelAlign: 'top',
                                anchor: '100%',
                                readOnly: true,
                                fieldCls: 'body-style-readOnly'
                            },
                            title: 'Додаткова інформація для оцінювача',
                            items: [{
                                    xtype: 'textareafield',
                                    name: 'addInfo'
                                }]
                        }, {
                            xtype: 'button',
                            iconCls: 'add',
                            text: 'Прикріпити файл',
                            listeners: {
                                click: function () {
                                    me.fireEvent('uploadAdditionalDocs', 'uploadAddDocsUnpaidBlank', this);
                                }
                            }
                        }, {
                            xtype: 'container',
                            anchor: '100%',
                            margin: '5 5 0 0',
                            layout: {
                                type: 'hbox'
                            },
                            items: [{
                                    xtype: 'label',
                                    itemId: 'imgId',
                                    cls: 'attachmentFile',
                                    style: {
                                        color: '#000000'
                                    },
                                    html: '&nbsp &nbsp &nbsp'
                                }, {
                                    xtype: 'label',
                                    itemId: 'attFileTxtId',
                                    text: 'Прикріплені файли:',
                                    margin: '0 5 0 0'
                                }, {
                                    xtype: 'label',
                                    itemId: 'linkId',
                                    html: '<a href="pf.proxy.manager.FileManager.cls?objType=blank&fileType=doc_archive&objId=' + me.blankID + '">' + me.attachmentDocs + '</a>',
                                    margin: '0 20 0 0'
                                }]
                        }, {
                            xtype: 'tbspacer',
                            height: 10
                        }, {
                            xtype: 'grid',
                            tbar: [{
                                    text: 'Додати',
                                    iconCls: 'add',
                                    itemId: 'addPrimaryDocs',
                                    handler: function () {
                                        var extraParams = {
                                            title: 'Картка завантаження файлу(ів)',
                                            fieldLabel: 'Обрані файли',
                                            buttonText: 'Виберіть файл(и)',
                                            btnUpload: 'Завантажити',
                                            name: 'primaryDocs',
                                            btnCancel: 'Вихід',
                                            submitParams: {
                                                url: pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.Create.cls',
                                                waitMsg: 'Збереження',
                                                params: {
                                                    action: 'uploadPrimaryDocs',
                                                    blankId: me.blankID
                                                }
                                            },
                                            callbackFnParams: {
                                                scope: me,
                                                callbackFn: me.loadUploadedFiles
                                            }

                                        }
                                        Ext.widget('uploadmultifilewin', extraParams)
                                    }
                                }, '->', {
                                    text: 'Первинні документи'
                                }],
                            store: storeBlank2PrimaryDocs,
                            selType: 'rowmodel',
                            anchor: '100%',
                            columnLines: true,
                            columns: [{
                                    xtype: 'rownumberer'
                                }, {
                                    header: 'id',
                                    dataIndex: 'id',
                                    hidden: true,
                                    hideable: false
                                }, {
                                    text: 'Назва файлу',
                                    flex: 1,
                                    dataIndex: 'fileName',
                                    renderer: function (value, metaData, record, row, col, store, gridView) {
                                        value = '<a href="pf.proxy.manager.FileManager.cls?objType=PRIMARY_DOCS&attId=' + record.get('id') + '">' + record.get('fileName') + '</b>' + '</a>'
                                        return value
                                    }
                                }, {
                                    xtype: 'actioncolumn',
                                    items: [{
                                            iconCls: 'delete',
                                            handler: function (grid, rowIndex, colIndex) {
                                                var rec = grid.getStore().getAt(rowIndex);
                                                me.fireEvent('deletePrimaryDoc', grid, rec);
                                            },
                                            scope: this
                                        }],
                                    width: '5px',
                                    align: 'center'
                                }]
                        }]
                }]
        });

        me.callParent(arguments);
        me.addEvents('deletePrimaryDoc');
    },
    loadUploadedFiles: function (options) {
        Ext.getStore('storeBlank2PrimaryDocsId').reload();
    }
});