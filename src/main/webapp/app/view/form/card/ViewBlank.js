/**
 * класс для создания новой анкеты
 */
Ext.require(['Ext.form.*', 'Ext.Img', 'Ext.tip.QuickTipManager']);
Ext.define('pf.view.form.card.ViewBlank', {
    extend: 'Ext.window.Window',
    alias: 'widget.viewBlank',
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
                            text: loc.btnAcceptPayment,
                            formBind: true,
                            action: 'acceptPayment',
                            itemId: 'acceptPayment',
                            hidden: !(pf.LoggedInUser.inRole('SUPERVISOR,BRANCH_HEAD')),
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
                            handler: function (btn) {
                                btn.up('window').close();
                            },
                            cls: 'btnExit',
                            iconCls: 'exit'
                        }],
                    items: [{
                            xtype: 'container',
                            itemId: 'conrDatePaymentId',
                            layout: {
                                type: 'hbox',
                                defaultMargins: {
                                    top: 10,
                                    right: 10,
                                    bottom: 10,
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
                                    xtype: 'label',
                                    // html : '<a
                                    // href="pf.proxy.manager.FileManager.cls?objType=blank&fileType=payment&objId='
                                    // + 82 + '">Файл рахунку ' + '<b>' + me.contractNum +
                                    // '</b>' + '</a>'
                                    html: '<a href="pf.printForms.pdf.Contract.cls?blankId=' + me.blankID + '"target="_blank">Файл рахунку ' + '<b>' + me.contractNum + '</b>' + '</a>'

                                }]
                        }, {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                defaultMargins: {
                                    top: 10,
                                    right: 10,
                                    bottom: 10,
                                    left: 0
                                }
                            },
                            items: [/*
                             * { xtype : 'datefield', fieldLabel :
                             * loc.lblDatePayment, itemId : 'datePaymentId',
                             * name : 'paymentDate', format : 'd.m.Y',
                             * margin : '5 0 0 0', afterLabelTextTpl :
                             * pf.utils.Validation.required, allowBlank :
                             * false, hidden :
                             * !(pf.LoggedInUser.inRole('ACCOUNTANT') ||
                             * pf.LoggedInUser.inRole('SUPERVISOR')) },
                             */{
                                    xtype: 'filefield',
                                    // labelAlign : 'top',
                                    name: 'file',
                                    fieldLabel: 'Скан квитанції про оплату',
                                    msgTarget: 'side',
                                    allowBlank: false,
                                    anchor: '100%',
                                    margin: '0 0 0 0',
                                    buttonText: 'Оберіть файл',
                                    afterLabelTextTpl: pf.utils.Validation.required
                                }]
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
                                    xtype: 'container',
                                    anchor: '100%',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    defaults: {
                                        xtype: 'textfield',
                                        labelAlign: 'top',
                                        msgTarget: 'side',
                                        readOnly: true,
                                        fieldCls: 'body-style-readOnly',
                                        margin: '0 25 10 10'
                                    },
                                    items: [{
                                            fieldLabel: loc.lblApplicantType,
                                            flex: 1,
                                            name: 'applicantType'
                                        }, {
                                            fieldLabel: loc.lblApplicant,
                                            flex: 1,
                                            name: 'applicant',
                                            margin: '0 0 10 10'
                                        }, {
                                            xtype: 'button',
                                            iconCls: 'btn-search',
                                            itemId: 'viewApplicant',
                                            margin: '18 0 0 0',
                                            width: 22
                                        }]
                                }, {
                                    xtype: 'container',
                                    anchor: '100%',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    defaults: {
                                        xtype: 'textfield',
                                        labelAlign: 'top',
                                        msgTarget: 'side',
                                        readOnly: true,
                                        fieldCls: 'body-style-readOnly',
                                        flex: 1,
                                        margin: '0 25 10 10'
                                    },
                                    items: [{
                                            fieldLabel: 'Спосіб доставки звіту',
                                            name: 'reportDeliveryType'
                                        }, {
                                            fieldLabel: 'Спосіб доставки рахунку',
                                            name: 'paymentDeliveryType'
                                        }]
                                }, {
                                    xtype: 'container',
                                    anchor: '100%',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    defaults: {
                                        xtype: 'textfield',
                                        labelAlign: 'top',
                                        msgTarget: 'side',
                                        readOnly: true,
                                        fieldCls: 'body-style-readOnly',
                                        flex: 1,
                                        margin: '0 25 10 10'
                                    },
                                    items: [{
                                            fieldLabel: 'Мета оцінки',
                                            name: 'valuationPurpose'
                                        }, {
                                            fieldLabel: 'Вид вартості, що визначається',
                                            name: 'costType'
                                        }]
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