/**
 * create new applicant
 */
Ext.define('pf.view.form.card.applicant.Applicant', {
    extend: 'Ext.window.Window',
    alias: 'widget.applicantAbstract',
    autoScroll: true,
    plain: true,
    modal: true,
    layout: 'fit',
    closable: false,
    buttonAlign: 'center',
    border: false,
    autoShow: false,
    titleCollapse: false,
    title: loc.ttlNewApplicant,
    listeners: {
        show: function () {
            var me = this;
            me.down('form').getComponent('applicantTypeId').setValue(me.applicantType);
        }
    },
    initComponent: function () {
        var me = this;
        me.height = Ext.getBody().getViewSize().height * 0.7;
        me.width = Ext.getBody().getViewSize().width * 0.3;
        Ext.apply(me, {
            items: me.biuldItems()
        }), this.callParent(arguments);
    },
    biuldItems: function () {
        return [{
                xtype: 'form',
                autoScroll: true,
                frame: false,
                bodyPadding: 10,
                defaults: {
                    xtype: 'textfield',
                    labelAlign: 'top',
                    anchor: '100%',
                    labelWidth: 100,
                    allowBlank: false,
                    msgTarget: 'side',
                    afterLabelTextTpl: pf.utils.Validation.required
                },
                items: this.biuldFields(),
                dockedItems: this.buildDockedItems()
            }];
    },
    biuldFields: function (param) {
        return [];
    },
    buildDockedItems: function () {
        var me = this;
        return [{
                xtype: 'toolbar',
                dock: 'bottom',
                items: ['->', {
                        xtype: 'button',
                        itemId: 'save',
                        formBind: true,
                        text: loc.bntSave,
                        cls: 'btnSave',
                        iconCls: 'save',
                        hidden: !(me.action == 'create')
                    }, {
                        xtype: 'button',
                        itemId: 'update',
                        formBind: true,
                        text: loc.bntSave,
                        cls: 'btnSave',
                        iconCls: 'save',
                        hidden: !(me.action == 'edit') || !(pf.LoggedInUser.inRole('ADMIN,ADMIN_HEAD'))
                    }, {
                        xtype: 'button',
                        text: loc.btnExit,
                        scope: this,
                        handler: this.close,
                        cls: 'btnExit',
                        iconCls: 'exit'
                    }]
            }];
    }

});
