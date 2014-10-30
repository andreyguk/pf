/**
 * карточка для организации
 */
Ext.define('pf.view.form.common.organization.OrganizationCard', {
	extend : 'Ext.window.Window',
	alias : 'widget.organizationCard',
	autoScroll : true,
	plain : true,
	modal : true,
	closable : false,
	buttonAlign : 'center',
	border : false,
	autoShow : false,
	titleCollapse : false,
	requires : [ 'Ext.form.Label', 'Ext.form.FieldSet', 'Ext.form.field.TextArea' ],
	
	layout : 'fit',
	initComponent : function() {
		var me = this;
me.height = Ext.getBody().getViewSize().height * 0.7;
	me.width = Ext.getBody().getViewSize().width * 0.5;
		var storeTerr = Ext.create('pf.store.common.OrganizationTerritory');
		storeTerr.organizationID = me.organizationID;
		var storeCertSOD = Ext.create('pf.store.common.CertSOD');
		if (me.action == 'update') {
			storeCertSOD.filter('objId', me.id);
		}
		Ext.apply(me, {
			items : [ {
				xtype : 'form',
				bodyPadding : 10,
				autoScroll : true,
				frame : false,
				buttonAlign : 'center',
				buttons : [ {
					xtype : 'button',
					text : loc.bntSave,
					formBind : true,
					itemId : 'save',
					action : 'saveOrganization',
					cls : 'btnSave',
					iconCls : 'save'
				}, {
					xtype : 'button',
					text : loc.btnExit,
					scope : this,
					handler : this.close,
					cls : 'btnExit',
					iconCls : 'exit'
				} ],
				items : [ {
					xtype : 'hiddenfield',
					name : 'id'
				}, {
					xtype : 'fieldset',
					title : 'Дані організації',
					defaults : {
						anchor : '100%',
						labelAlign : 'top',
						margin : '0 0 5 0'
					},
					items : [ {
						xtype : 'textfield',
						fieldLabel : 'Назва організації',
						allowBlank : false,
						afterLabelTextTpl : pf.utils.Validation.required,
						name : 'name'
					}, {
						xtype : 'container',
						anchor : '100%',
						flex : 1,
						defaults : {
							labelAlign : 'top',
							margin : '0 0 5 0'
						},
						layout : {
							type : 'hbox'
						},
						items : [ {
							xtype : 'combobox',
							itemId : 'orgTypeId',
							anchor : '100%',
							labelAlign : 'top',
							fieldLabel : 'Тип організації',
							store : Ext.create('pf.store.common.OrgType'),
							queryMode : 'local',
							minChars : 3,
							editable : false,
							displayField : 'name',
							readOnly : pf.LoggedInUser.inRole('ADMIN'),
							valueField : 'code',
							name : 'orgTypeCode',
							allowBlank : false,
							afterLabelTextTpl : pf.utils.Validation.required,
							margin : '0 5 0 0',
							listeners : {
								'change' : function(combo) {
									if (combo.getValue() == 'BRANCH') {
										me.down('[name=orgCode]').hide();
										me.down('[name=orgCode]').allowBlank=true;
										me.down('[name=address]').hide();
										me.down('[name=address]').allowBlank=true;
										me.down('[name=bankReq]').hide();
										me.down('[name=bankReq]').allowBlank=true;
									} else {
										me.down('[name=orgCode]').show();
										me.down('[name=orgCode]').allowBlank=false;
										me.down('[name=address]').show();
										me.down('[name=address]').allowBlank=false;
										me.down('[name=bankReq]').show();
										me.down('[name=bankReq]').allowBlank=false;
									}

								}
							}
						}, {
							xtype : 'textfield',
							fieldLabel : 'Код організації',
							hidden : !(pf.LoggedInUser.inRole('ADMIN_HEAD')),
							name : 'orgCode',
							afterLabelTextTpl : pf.utils.Validation.required,
							allowBlank : false,
							margin : '0 5 0 0'
						}, {
							xtype : 'textfield',
							flex : 1,
							afterLabelTextTpl : pf.utils.Validation.required,
							allowBlank : false,
							fieldLabel : 'Керівник',
							name : 'organHead'
						} ]
					}, {
						xtype : 'textfield',
						allowBlank : false,
						anchor : '100%',
						flex : 1,
						afterLabelTextTpl : pf.utils.Validation.required,
						hidden : !(pf.LoggedInUser.inRole('ADMIN_HEAD')),
						fieldLabel : 'Адреса',
						name : 'address'
					}, {
						xtype : 'textfield',
						allowBlank : false,
						anchor : '100%',
						flex : 1,
						hidden : !(pf.LoggedInUser.inRole('ADMIN_HEAD')),
						afterLabelTextTpl : pf.utils.Validation.required,
						fieldLabel : 'Банківські реквізити',
						name : 'bankReq'
					}, {
						xtype : 'container',
						anchor : '100%',
						flex : 1,
						defaults : {
							labelAlign : 'top',
							margin : '0 0 5 0'
						},
						layout : {
							type : 'hbox'
						},
						items : [ {
							xtype : 'textfield',
							anchor : '100%',
							flex : 1,
							margin : '0 5 0 0',
							fieldLabel : 'Телефон',
							name : 'phone'
						}, {
							xtype : 'textfield',
							anchor : '100%',
							flex : 1,
							fieldLabel : 'E-mail',
							name : 'email'
						} ]
					} ]
				}, {
					xtype : 'grid',
					tbar : [ {
						text : 'Додати',
						iconCls : 'add',
						itemId : 'addOrganizationDocs'
					}, '->', {
						text : 'Додаткова інформація'
					} ],
					hidden : !(me.action == 'update'),
					store : storeCertSOD,
					selType : 'rowmodel',
					anchor : '100%',
					columnLines : true,
					columns : [ {
						xtype : 'rownumberer'
					}, {
						header : 'id',
						dataIndex : 'id',
						hidden : true,
						hideable : false
					}, {
						header : 'Тип документу',
						flex : 3,
						dataIndex : 'docTypeName'
					}, {
						header : 'Номер </br> (та серія)',
						flex : 1,
						dataIndex : 'docNumber'
					}, {
						header : "Дата видачі",
						dataIndex : 'docDate',
						flex : 1,
						renderer : Ext.util.Format.dateRenderer('d.m.Y')
					}, {
						header : "Дійсний до",
						dataIndex : 'endDate',
						flex : 1,
						renderer : Ext.util.Format.dateRenderer('d.m.Y')
					}, {
						text : 'Назва файлу',
						flex : 3,
						dataIndex : 'fileName',
						renderer : function(value, metaData, record, row, col, store, gridView) {
							value = '<a href="pf.proxy.manager.FileManager.cls?objType=certOrg&attId=' + record.get('id') + '">' + record.get('fileName') + '</b>' + '</a>'

							return value
						}
					}, {
						xtype : 'actioncolumn',
						// header : 'Редагувати',
						items : [ {
							iconCls : 'edit',
							handler : function(grid, rowIndex, colIndex) {
								var rec = grid.getStore().getAt(rowIndex);
								me.fireEvent('editOrgDocs', this, rec);
							},
							scope : this
						} ],
						width : '5px',
						align : 'center'
					}, {
						xtype : 'actioncolumn',
						// header : 'Вилучити',
						items : [ {
							iconCls : 'delete',
							handler : function(grid, rowIndex, colIndex) {
								var rec = grid.getStore().getAt(rowIndex);
								me.fireEvent('deleteOrgDocs', this, rec);
							},
							scope : this
						} ],
						width : '5px',
						align : 'center'
					} ]
				} ]
			} ]
		});
		me.callParent(arguments);
		me.addEvents('editOrgDocs');
		me.addEvents('deleteOrgDocs');
	}

});