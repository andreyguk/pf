Ext.require(['Ext.form.*', 'Ext.Img', 'Ext.tip.QuickTipManager']);
Ext.define('pf.view.form.card.ov.OVToAddNumSimple', {
    extend: 'Ext.window.Window',
    alias: 'widget.OVToAddNumSimple',
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
                    buttons: [{
                            xtype: 'button',
                            text: loc.btnAddFDMUNum,
                            formBind: true,
                            itemId: 'addFDMUNum',
                            action: 'addFDMUNumSimple',
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
                    xtype: 'form',
                    items: [{
                            xtype: 'fieldset',
                            title: loc.lblFDMUDesc,
                            anchor: '75%',
                            items: [{
                                    xtype: 'filefield',
                                    labelAlign: 'top',
                                    name: 'file',
                                    fieldLabel: 'Файл із додатком до звіту (від ФДМУ)',
                                    msgTarget: 'side',
                                    allowBlank: false,
                                    anchor: '80%',
                                    margin: '5,5,5,5',
                                    buttonText: 'Оберіть файл',
                                    afterLabelTextTpl: pf.utils.Validation.required
                                }]
                        }, {
                            xtype: 'container',
                            itemId: 'contId',
                            layout: {
                                type: 'hbox'
                            },
                            items: [{
                                    xtype: 'textfield',
                                    fieldLabel: loc.lblFDMUNum,
                                    itemId: 'fdmuNum',
                                    afterLabelTextTpl: pf.utils.Validation.required,
                                    allowBlank: false,
                                    margin: '10,10,10,10'
                                }]
                        }, {
                            xtype: 'hiddenfield',
                            name: 'id'
                        }, {
                            xtype: 'fieldset',
                            title: loc.lblFDMUDesc,
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
                                    margin: '10 0 0 0',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [{
                                            xtype: 'label',
                                            cls: 'attachmentFile',
                                            style: {
                                                color: '#000000'
                                            },
                                            html: '&nbsp &nbsp'
                                        }, {
                                            xtype: 'label',
                                            itemId: 'attFileTxtId',
                                            text: 'Файл  звіту:',
                                            margin: '0 5 0 0'
                                        }, {
                                            xtype: 'label',
                                            html: '<a href="pf.proxy.manager.FileManager.cls?objType=ov&objId=' + me.ovID + '">' + '<b>' + me.contractNum + '</b>' + '</a>',
                                            //html : '<a href="pf.printForms.pdf.OVFlat.cls?ovId=' + me.ovID + '"target="_blank""> ' + '<b>' + me.contractNum + '</b>' + '</a>',
                                            margin: '0 20 0 0'
                                        }]
                                }, {
                                    xtype: 'container',
                                    hidden: !(me.attachmentDocs),
                                    anchor: '100%',
                                    margin: '10 0 0 0',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [{
                                            xtype: 'label',
                                            cls: 'attachmentFile',
                                            style: {
                                                color: '#000000'
                                            },
                                            html: '&nbsp &nbsp'
                                        }, {
                                            xtype: 'label',
                                            itemId: 'attFileTxtId',
                                            text: 'Додаткова інформація:',
                                            margin: '0 5 0 0'
                                        }, {
                                            xtype: 'label',
                                            html: '<a href="pf.proxy.manager.FileManager.cls?objType=ov&fileType=doc_archive&objId=' + me.ovID + '">' + me.attachmentDocs + '</a>',
                                            margin: '0 20 0 0'
                                        }]
                                }, {
                                    fieldLabel: loc.lblApplicantType,
                                    name: 'applicantType'
                                }, {
                                    fieldLabel: loc.lblApplicant,
                                    name: 'applicant'
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
                                }]
                        }]
                }]
        });

        me.callParent(arguments);
    }

});