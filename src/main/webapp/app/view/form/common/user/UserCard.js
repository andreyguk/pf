/**
 * карточка для пользователя
 */
Ext.require(['Ext.form.Panel', 'Ext.ux.form.MultiSelect', 'Ext.ux.form.ItemSelector']);
Ext.define('pf.view.form.common.user.UserCard', {
    extend: 'Ext.window.Window',
    alias: 'widget.userCard',
    autoScroll: true,
    plain: true,
    modal: true,
    closable: false,
    buttonAlign: 'center',
    border: false,
    titleCollapse: false,
    requires: ['Ext.form.Label', 'Ext.form.FieldSet', 'Ext.form.field.TextArea'],
    layout: 'fit',
    requires : ['Ext.form.FieldContainer', 'Ext.form.field.Date', 'Ext.form.field.Text', 'Ext.form.field.ComboBox'],
            initComponent: function () {
                var me = this;
                me.height = Ext.getBody().getViewSize().height * 0.7;
                me.width = Ext.getBody().getViewSize().width * 0.5;
                if (me.action == 'update') {
                    var storeCertUser = Ext.create('pf.store.common.CertUser');
                    storeCertUser.filter('usr', me.id);
                }

                Ext.apply(me, {
                    items: [{
                            xtype: 'form',
                            bodyPadding: 10,
                            autoScroll: true,
                            frame: false,
                            buttonAlign: 'center',
                            buttons: [{
                                    xtype: 'button',
                                    text: "Встановити пароль за замовчуванням",
                                    itemId: 'setDefaultPass',
                                    action: 'setDefaultPass',
                                    cls: 'btnSaveToInProcess',
                                    iconCls: 'exit',
                                    hidden: !(me.action == 'update')
                                }, {
                                    xtype: 'button',
                                    text: loc.bntSave,
                                    formBind: true,
                                    itemId: 'save',
                                    action: 'saveUser',
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
                                    title: 'Місце роботи',
                                    layout: 'anchor',
                                    items: [{
                                            xtype: 'container',
                                            layout: 'anchor',
                                            anchor: '80%',
                                            defaults: {
                                                anchor: '100%',
                                                labelAlign: 'top',
                                                margin: '0 0 5 0',
                                                allowBlank: false,
                                                afterLabelTextTpl: pf.utils.Validation.required
                                            },
                                            items: [{
                                                    xtype: 'combobox',
                                                    itemId: 'organizationId',
                                                    labelAlign: 'top',
                                                    fieldLabel: 'Організація',
                                                    store: Ext.create('pf.store.common.Organization'),
                                                    name: 'workplace',
                                                    queryMode: 'remote',
                                                    minChars: 3,
                                                    displayField: 'name',
                                                    valueField: 'id',
                                                    margin: '0 5 10 0'
                                                }]
                                        }]
                                }, {
                                    xtype: 'fieldset',
                                    title: 'Дані користувача',
                                    defaults: {
                                        anchor: '100%',
                                        labelAlign: 'top',
                                        margin: '0 0 5 0'
                                    },
                                    items: [{
                                            xtype: 'container',
                                            anchor: '100%',
                                            flex: 1,
                                            defaults: {
                                                labelAlign: 'top',
                                                margin: '0 5 5 0',
                                                xtype: 'textfield',
                                                flex: 1,
                                                allowBlank: false,
                                                afterLabelTextTpl: pf.utils.Validation.required
                                            },
                                            layout: {
                                                type: 'hbox'
                                            },
                                            items: [{
                                                    fieldLabel: 'Прізвище',
                                                    name: 'lastName'
                                                }, {
                                                    fieldLabel: "І'мя",
                                                    name: 'firstName'
                                                }, {
                                                    fieldLabel: 'По батькові',
                                                    name: 'middleName',
                                                    margin: '0 0 5 0'
                                                }]
                                        }, {
                                            xtype: 'container',
                                            anchor: '100%',
                                            autoScroll: true,
                                            flex: 1,
                                            defaults: {
                                                labelAlign: 'top',
                                                margin: '0 5 5 0',
                                                xtype: 'textfield',
                                                allowBlank: false,
                                                afterLabelTextTpl: pf.utils.Validation.required
                                            },
                                            layout: {
                                                type: 'hbox'
                                            },
                                            items: [{
                                                    fieldLabel: 'Логін',
                                                    name: 'userName',
                                                    flex: 1
                                                }, {
                                                    xtype: 'itemselector',
                                                    itemId: 'userRoles',
                                                    flex: 2,
                                                    store: Ext.create('pf.store.common.UserRoles'),
                                                    displayField: 'name',
                                                    valueField: 'id',
                                                    allowBlank: false,
                                                    fieldLabel: "Роль",
                                                    afterLabelTextTpl: pf.utils.Validation.required,
                                                    msgTarget: 'side',
                                                    fromTitle: 'Доступні ролі',
                                                    toTitle: 'Вибрані ролі',
                                                    value: me.userRoles,
                                                    buttons: ['add', 'remove'],
                                                    buttonsText: {
                                                        add: "Додати",
                                                        remove: "Видалити"
                                                    },
                                                    delimiter: null
                                                }]
                                        }]
                                }, {
                                    xtype: 'grid',
                                    hidden: !(me.action == 'update'),
                                    tbar: [{
                                            text: 'Додати',
                                            iconCls: 'add',
                                            itemId: 'addUserDocs'
                                        }, '->', {
                                            text: 'Додаткова інформація'
                                        }],
                                    store: storeCertUser,
                                    selType: 'rowmodel',
                                    columnLines: true,
                                    columns: [{
                                            xtype: 'rownumberer'
                                        }, {
                                            header: 'id',
                                            dataIndex: 'id',
                                            hidden: true,
                                            hideable: false
                                        }, {
                                            header: 'Тип документу',
                                            flex: 3,
                                            dataIndex: 'docTypeName'
                                        }, {
                                            header: 'Номер (та серія)',
                                            flex: 1,
                                            dataIndex: 'docNumber'
                                        }, {
                                            header: "Дата видачі",
                                            dataIndex: 'docDate',
                                            flex: 1,
                                            renderer: Ext.util.Format.dateRenderer('d.m.Y')
                                        }, {
                                            header: "Дійсний до",
                                            dataIndex: 'endDate',
                                            flex: 1,
                                            renderer: Ext.util.Format.dateRenderer('d.m.Y')
                                        }, {
                                            text: 'Назва файлу',
                                            flex: 1,
                                            dataIndex: 'fileName',
                                            renderer: function (value, metaData, record, row, col, store, gridView) {
                                                value = '<a href="pf.proxy.manager.FileManager.cls?objType=certUser&attId=' + record.get('id') + '">' + record.get('fileName') + '</b>' + '</a>'

                                                return value
                                            }
                                        }, {
                                            xtype: 'actioncolumn',
                                            // header : 'Редагувати',
                                            items: [{
                                                    iconCls: 'edit',
                                                    handler: function (grid, rowIndex, colIndex) {
                                                        var rec = grid.getStore().getAt(rowIndex);
                                                        me.fireEvent('editUserDocs', this, rec);
                                                    },
                                                    scope: this
                                                }],
                                            width: '5px',
                                            align: 'center'
                                        }, {
                                            xtype: 'actioncolumn',
                                            // header : 'Вилучити',
                                            items: [{
                                                    iconCls: 'delete',
                                                    handler: function (grid, rowIndex, colIndex) {
                                                        var rec = grid.getStore().getAt(rowIndex);
                                                        me.fireEvent('deleteUserDocs', this, rec);
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
                me.addEvents('editUserDocs');
                me.addEvents('deleteUserDocs');
            }

});