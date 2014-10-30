Ext.define('pf.view.form.support.UserInstructionsList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.userInstructionsList',
    layout: 'fit',
    cls: 'move-icon',
    columnLines: true,
    plugins: [{
            ptype: 'filterbar',
            renderHidden: false,
            showShowHideButton: false,
            showClearAllButton: false
        }],
    initComponent: function () {
        var me = this;
        this.store = me.getStore();
        Ext.apply(me, {
            tbar: [{
                    text: loc.btnAdd,
                    iconCls: 'add',
                    itemId: 'newUserInstructions',
                    hidden: !(pf.LoggedInUser.inRole('ADMIN_HEAD')),
                    listeners: {
                        click: function () {
                            me.fireEvent('uploadUserInstructions', 'uploadUserInstructions', this);
                        }
                    }
                }],
            dockedItems: [{
                    xtype: 'pagingtoolbar',
                    store: this.store,
                    dock: 'bottom',
                    displayInfo: true,
                    plugins: [{
                            ptype: 'pageSize'
                        }]
                }],
            columns: me.getColumns()
        }), me.callParent(arguments);
    },
    getStore: function () {
        return Ext.create('pf.store.common.UserInstructions');
    },
    getColumns: function () {
        return [{
                xtype: 'rownumberer'
            }, {
                header: 'id',
                dataIndex: 'id',
                hidden: true,
                filter: true
            }, {
                text: 'Назва файлу',
                flex: 1,
                dataIndex: 'attachmentDocs',
                renderer: function (value, metaData, record, row, col, store, gridView) {
                    value = '<a href="pf.proxy.manager.FileManager.cls?objType=USER_INSTRUCTIONS&objId=' + record.get('id') + '">' + record.get('attachmentDocs') + '</b>' + '</a>'

                    return value
                }
            }, {
                header: "Дата створення",
                width: 130,
                dataIndex: 'createDate',
                renderer: Ext.util.Format.dateRenderer('d.m.Y'),
                filter: false
            }, {
                header: "Актуально до",
                width: 130,
                dataIndex: 'actualDate',
                renderer: Ext.util.Format.dateRenderer('d.m.Y'),
                filter: false
            }]
    }
});