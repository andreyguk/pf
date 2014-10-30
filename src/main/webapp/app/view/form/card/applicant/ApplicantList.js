/**
 * list of applicant
 * 
 */
Ext.define('pf.view.form.card.applicant.ApplicantList', {
    extend: 'Ext.window.Window',
    alias: 'widget.applicantList',
    autoScroll: true,
    plain: true,
    modal: true,
    closable: false,
    buttonAlign: 'center',
    border: false,
    autoShow: false,
    titleCollapse: false,
    title: 'Замовник',
    initComponent: function () {
        var me = this, fields = [], store, applicantType = me.applicantType;
        me.height = Ext.getBody().getViewSize().height * 0.6;
        me.width = Ext.getBody().getViewSize().width * 0.6;
        if (me.applicantType === 4) {
            store = Ext.create('pf.store.common.ApplicantJuridicals');
            fields = [{
                    xtype: 'rownumberer'
                }, {
                    header: 'id',
                    dataIndex: 'id',
                    flex: 1,
                    hidden: true,
                    hideable: false
                }, {
                    header: 'Тип замовника',
                    dataIndex: 'applicantType',
                    flex: 1
                }, {
                    header: 'Назва організації',
                    dataIndex: 'appCompanyName',
                    filter: true,
                    flex: 1
                }, {
                    header: 'Код ЕДРПОУ',
                    dataIndex: 'appCompanyOKPO',
                    filter: true,
                    flex: 1
                }, {
                    header: 'Юридична адреса',
                    dataIndex: 'appCompanyAddress',
                    filter: true,
                    flex: 1
                }];
        } else {
            store = Ext.create('pf.store.common.ApplicantPhysicals');
            fields = [{
                    xtype: 'rownumberer'
                }, {
                    header: 'id',
                    dataIndex: 'id',
                    hidden: true,
                    hideable: false
                }, {
                    header: 'Тип замовника',
                    dataIndex: 'applicantType'
                }, {
                    header: 'Прізвище',
                    dataIndex: 'appPersonLastName',
                    filter: true,
                    flex: 1
                }, {
                    header: "Ім'я",
                    dataIndex: 'appPersonFirstName',
                    filter: true,
                    flex: 1
                }, {
                    header: 'По батькові',
                    dataIndex: 'appPersonMiddleName',
                    filter: true,
                    flex: 1
                }, {
                    header: 'Серія та номер паспорту',
                    dataIndex: 'appPersonPassport',
                    filter: true,
                    flex: 2
                }, {
                    header: 'Телефону',
                    dataIndex: 'appContactPhone',
                    filter: true,
                    flex: 1
                }, {
                    header: 'ІПН',
                    filter: true,
                    dataIndex: 'appINN',
                    flex: 1
                }, {
                    header: 'Громадянство',
                    dataIndex: 'appCitizenship',
                    filter: true,
                    flex: 1
                }];
        }
        store.applicantType = applicantType;
        Ext.apply(me, {
            tbar: [{
                    text: loc.btnAdd,
                    iconCls: 'add',
                    itemId: 'newApplicant'
                }],
            buttons: [{
                    text: loc.btnExit,
                    scope: this,
                    handler: this.close,
                    cls: 'btnExit',
                    iconCls: 'exit'
                }],
            items: [{
                    xtype: 'grid',
                    itemId: 'gridApplicantListId',
                    store: store,
                    plugins: [{
                            ptype: 'filterbar',
                            renderHidden: false,
                            showShowHideButton: false,
                            showClearAllButton: false
                        }],
                    columnLines: true,
                    dockedItems: [{
                            xtype: 'pagingtoolbar',
                            store: store,
                            dock: 'bottom',
                            displayInfo: true
                        }],
                    columns: fields
                }]

        }), this.callParent(arguments);
    }
});
