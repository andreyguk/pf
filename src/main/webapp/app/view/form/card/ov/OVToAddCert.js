Ext.require(['Ext.form.*', 'Ext.Img', 'Ext.tip.QuickTipManager']);
Ext.define('pf.view.form.card.ov.OVToAddCert', {
    extend: 'Ext.window.Window',
    alias: 'widget.OVToAddCert',
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
        var me = this, html;
        me.height = Ext.getBody().getViewSize().height * 0.7;
        me.width = Ext.getBody().getViewSize().width * 0.5;
        var objFuncType = me.objFuncType;
        if ((objFuncType == 2) && (me.isManual == 0)) {
            html = '<a href="pf.printForms.pdf.OVFlat.cls?ovId=' + me.ovID + '"target="_blank"">Файл  звіту ' + '<b>' + me.contractNum + '</b>' + '</a>';
        } else if ((objFuncType == 3) && (me.isManual == 0)) {
            html = '<a href="pf.printForms.pdf.OVLand.cls?ovId=' + me.ovID + '"target="_blank"">Файл  звіту ' + '<b>' + me.contractNum + '</b>' + '</a>';
        } else if ((objFuncType == 4) && (me.isManual == 0)) {
            html = '<a href="pf.printForms.pdf.OVHouse.cls?ovId=' + me.ovID + '"target="_blank"">Файл  звіту ' + '<b>' + me.contractNum + '</b>' + '</a>';
        } else {
            html = '<a href="pf.proxy.manager.FileManager.cls?objType=ov&objId=' + me.ovID + '">Файл звіту ' + '<b>' + me.contractNum + '</b>' + '</a>';
        }
        Ext.apply(me, {
            items: [{
                    xtype: 'form',
                    buttons: [{
                            xtype: 'button',
                            text: loc.btnCertFile,
                            formBind: true,
                            itemId: 'addCertFile',
                            action: 'addCertFile',
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
                            xtype: 'filefield',
                            labelAlign: 'top',
                            name: 'file',
                            fieldLabel: loc.lblcertFile,
                            msgTarget: 'side',
                            allowBlank: false,
                            anchor: '50%',
                            margin: '5,5,5,5',
                            buttonText: 'Оберіть файл',
                            afterLabelTextTpl: pf.utils.Validation.required
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
                                    fieldLabel: 'Номер ФДМУ',
                                    name: 'fdmuNum'
                                }, {
                                    xtype: 'label',
                                    html: html
                                }, {
                                    xtype: 'label',
                                    html: '</br>'
                                }, {
                                    xtype: 'label',
                                    html: '<a href="pf.proxy.manager.FileManager.cls?objType=ov&fileType=fdmu_report&objId=' + me.ovID + '">Файл (від ФДМУ) із додатком до звіту ' + '<b>' + me.contractNum + '</b>' + '</a>'
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