/**
 * ассоциация - Аналоги
 */
Ext.define('pf.view.form.cardAssociation.OV2Analogue', {
	extend : 'Ext.window.Window',
	alias : 'widget.OV2Analogue',
	autoScroll : true,
	plain : true,
	modal : true,
	closable : false,
	buttonAlign : 'center',
	border : false,
	autoShow : false,
	titleCollapse : false,
	title : "Аналоги (об'єкти порівняння)",
	
	layout : 'fit',
	initComponent : function() {
		var me = this;
me.height = Ext.getBody().getViewSize().height * 0.7;
	me.width = Ext.getBody().getViewSize().width * 0.5;
		var storeTerr = Ext.create('pf.store.common.AnalogueTerritory');
		storeTerr.analogueId = me.analogueId;
		storeTerr.locationTerritory = me.locationTerritory;
		Ext.apply(me, {
			items : [ {
				xtype : 'form',
				autoScroll : true,
				frame : false,
				buttonAlign : 'center',
				bodyCls : 'cmp-body-style',
				anchor : '100%',
				buttons : [ {
					xtype : 'button',
					itemId : 'update',
					formBind : true,
					text : loc.btnOK,
					hidden : !(me.action == 'edit'),
					cls : 'btnSave'
				}, {
					xtype : 'button',
					formBind : true,
					itemId : 'save',
					text : loc.btnOK,
					cls : 'btnSave',
					hidden : !(me.action == 'add')
				}, {
					xtype : 'button',
					text : loc.btnExit,
					scope : this,
					handler : this.close,
					cls : 'btnExit',
					iconCls : 'exit'
				} ],
				items : [ {
					xtype : 'fieldset',
					layout : 'anchor',
					anchor : '100%',
					title : 'Характеристики об\'єкту порівняння',
					items : [ {
						xtype : 'hiddenfield',
						name : 'id'
					}, {
						xtype : 'hiddenfield',
						name : 'objFuncType'
					}, {
						xtype : 'combobox',
						anchor : '100%',
						labelAlign : 'top',
						msgTarget : 'side',
						editable : false,
						queryMode : 'local',
						hidden : !((me.ovFuncType == 'LAND') || (me.ovFuncType == 'HOUSEPLOT')),
						allowBlank : !((me.ovFuncType == 'LAND') || (me.ovFuncType == 'HOUSEPLOT')),
						afterLabelTextTpl : pf.utils.Validation.required,
						plugins : [ {
							ptype : 'cleartrigger'
						} ],
						fieldLabel : 'Цільове призначення </br> земельної ділянки',
						store : Ext.create('pf.store.common.LandSitePurpose'),
						name : 'plotPurpose',
						itemId : 'plotPurposeId',
						minChars : 3,
						displayField : 'name',
						valueField : 'id'
					}, {
						xtype : 'container',
						anchor : '100%',
						defaults : {
							xtype : 'textfield',
							labelAlign : 'top',
							msgTarget : 'side',
							margin : '0 0 0 0'
						},
						layout : {
							type : 'hbox'
						},
						items : [ {
							xtype : 'combobox',
							flex : 1,
							fieldLabel : 'Населений пункт',
							itemId : 'locationId',
							store : storeTerr,
							queryMode : 'remote',
							name : 'locationId',
							pageSize : 10,
							minChars : 3,
							displayField : 'fullName',
							valueField : 'id',
							allowBlank : false,
							afterLabelTextTpl : pf.utils.Validation.required,
							listeners : {
								scope : this,
								afterRender : function(combo) {
									if (me.locationTerritory) {
										combo.setValue(me.locationTerritory)
									}
								}
							},
							plugins : [ {
								ptype : 'cleartrigger'
							} ]
						} ]
					}, {
						xtype : 'container',
						anchor : '100%',
						defaults : {
							xtype : 'textfield',
							labelAlign : 'top',
							msgTarget : 'side',
							margin : '0 25 0 0'
						},
						layout : {
							type : 'hbox'
						},
						items : [ {
							flex : 1,
							fieldLabel : 'Район',
							name : 'rayon'
						}, {
							flex : 2,
							fieldLabel : 'Адреса',
							allowBlank : false,
							afterLabelTextTpl : pf.utils.Validation.required,
							name : 'address'
						}, {
							flex : 1,
							fieldLabel : 'Контакти',
							name : 'contacts'
						}, {
							flex : 1,
							fieldLabel : "Об'єкт",
							name : 'object',
							margin : '0 0 0 0'
						} ]
					}, {
						xtype : 'container',
						layout : 'anchor',
						items : [ {
							xtype : 'textareafield',
							anchor : '100%',
							fieldLabel : 'Джерело',
							labelAlign : 'top',
							name : 'origin',
							rows : 1
						}, {
							xtype : 'textareafield',
							anchor : '100%',
							fieldLabel : 'Характеристика',
							labelAlign : 'top',
							name : 'description',
							afterLabelTextTpl : pf.utils.Validation.required,
							allowBlank : false,
							rows : 2
						} ]
					}, {
						xtype : 'container',
						anchor : '100%',
						layout : {
							type : 'hbox'
						},
						items : [ {
							xtype : 'filefield',
							labelAlign : 'top',
							name : 'screenShot',
							fieldLabel : 'Скріншот аналогу',
							afterLabelTextTpl : (me.isScreenExist) ? '' : pf.utils.Validation.required,
							msgTarget : 'side',
							allowBlank : (me.isScreenExist) ? true : false,
							flex : 1,
							buttonText : 'Оберіть файл'
						}, {
							xtype : 'label',
							hidden : (me.isScreenExist) ? false : true,
							flex : 1,
							margin : '15 0 0 50',
							html : '<a href="pf.proxy.manager.FileManager.cls?objType=analogue&objId=' + me.analogueId + '">Скріншот аналогу'
						} ]
					}, {
						xtype : 'label',
						margin : '0 0 0 0',
						html : "<span style='color:red;font-size: 1em;'>*Дозволено завантажувати файли типу (.JPG,.GIF,.PNG)<span/>"
					}, {
						xtype : 'container',
						anchor : '100%',
						flex : 1,
						defaults : {
							labelAlign : 'top',
							xtype : 'textfield',
							margin : '0 25 10 0',
							emptyText : '0.00'
						},
						layout : {
							type : 'hbox'
						},
						items : [ {
							xtype : 'datefield',
							flex : 1,
							fieldLabel : 'Дата пропозиції',
							emptyText : 'дд.мм.рррр',
							name : 'proposeDate',
							format : 'd.m.Y',
							afterLabelTextTpl : pf.utils.Validation.required,
							allowBlank : false
						}, {
							flex : 1,
							fieldLabel : 'Площа, кв.м.',
							itemId : 'areaId',
							name : 'area',
							afterLabelTextTpl : pf.utils.Validation.required,
							allowBlank : false,
							vtype : 'isIntFloat'
						}, {
							flex : 1,
							fieldLabel : 'Вартість, дол.',
							name : 'costAll',
							afterLabelTextTpl : pf.utils.Validation.required,
							allowBlank : false,
							vtype : 'isIntFloat',
							itemId : 'costAllId',
							listeners : {
								blur : function() {
									var form = this.up();
									var val = this.getValue() / form.getComponent('areaId').getValue()
									form.getComponent('costMetreId').setValue(val.toFixed(2));
								}
							}
						}, {
							flex : 1,
							fieldLabel : 'Вартість, дол./кв.м.',
							itemId : 'costMetreId',
							name : 'costMetre',
							afterLabelTextTpl : pf.utils.Validation.required,
							allowBlank : false,
							vtype : 'isIntFloat',
							listeners : {
								blur : function() {
									var form = this.up();
									var val = this.getValue() * form.getComponent('areaId').getValue()
									form.getComponent('costAllId').setValue(val.toFixed(2));
								}
							},
							margin : '0 0 0 0'
						} ]
					}, {
						xtype : 'container',
						hidden : ((me.ovFuncType == 'LAND') || (me.ovFuncType == 'HOUSE') || (me.ovFuncType == 'HOUSEPLOT')),
						anchor : '100%',
						flex : 1,
						defaults : {
							labelAlign : 'top',
							xtype : 'textfield',
							margin : '0 25 10 0',
							afterLabelTextTpl : pf.utils.Validation.required,
							allowBlank : ((me.ovFuncType == 'LAND') || (me.ovFuncType == 'HOUSE') || (me.ovFuncType == 'HOUSEPLOT'))

						},
						layout : {
							type : 'hbox'
						},
						items : [ {
							flex : 1,
							fieldLabel : 'Кількість кімнат',
							name : 'roomQty',
							vtype : 'isInt',
							msgTarget : 'under'
						}, {
							flex : 1,
							fieldLabel : 'Номер поверху',
							name : 'floorNum',
							vtype : 'isInt',
							msgTarget : 'under'
						}, {
							flex : 1,
							fieldLabel : 'К-ть поверхів в будинку',
							name : 'floorsQty',
							vtype : 'isInt',
							msgTarget : 'under'
						}, {
							xtype : 'combobox',
							flex : 1,
							fieldLabel : 'Тип будівлі',
							name : 'buildingType',
							store : Ext.create('pf.store.common.BuildingType'),
							queryMode : 'local',
							editable : false,
							displayField : 'name',
							valueField : 'id',
							margin : '0 0 0 0',
							afterLabelTextTpl : '',
							allowBlank : true
						} ]
					}, {
						xtype : 'fieldset',
						title : 'Земельна ділянка приватизована?',
						hidden : !(me.ovFuncType == 'HOUSE'),
						anchor : '40%',
						items : [ {
							xtype : 'radiogroup',
							itemId : 'privateLandId',
							columns : 2,
							listeners : {
								change : function(comp, newVal, oldval) {
									if (newVal.isPrivateLand) {
										comp.up('form').down('[itemId=plotInfoId]').show();
									} else {
										comp.up('form').down('[itemId=plotInfoId]').hide();
										comp.up('form').down('[itemId=plotAreaIsUndefinedId]').setValue(false);
										comp.up('form').down('[itemId=plotAreaId]').setValue('');

									}
								}
							},
							items : [ {
								boxLabel : 'Так',
								name : 'isPrivateLand',
								inputValue : 1
							}, {
								boxLabel : 'Hi',
								name : 'isPrivateLand',
								inputValue : 0,
								checked : true
							} ]
						} ]
					}, {
						xtype : 'container',
						hidden : true,
						itemId : 'plotInfoId',
						anchor : '60%',
						defaults : {
							labelAlign : 'left',
							msgTarget : 'side',
							margin : '0 25 10 0'
						},
						layout : {
							type : 'hbox'
						},
						items : [ {
							xtype : 'textfield',
							flex : 1,
							fieldLabel : 'Площа земельної ділянки, кв.м',
							itemId : 'plotAreaId',
							afterLabelTextTpl : pf.utils.Validation.required,
							name : 'plotArea',
							vtype : 'isIntFloat',
							listeners : {
								'change' : function(comp) {
									if (comp.getValue() != '') {
										comp.up('form').down('[itemId=plotAreaIsUndefinedId]').setDisabled(true);
										comp.up('form').down('[itemId=plotAreaIsUndefinedId]').setValue(false);
									} else {
										comp.up('form').down('[itemId=plotAreaIsUndefinedId]').setDisabled(false);
									}
								}
							}
						}, {
							xtype : 'checkboxgroup',
							columns : 1,
							vertical : true,
							itemId : 'plotAreaIsUndefinedId',
							listeners : {
								'change' : function(comp) {
									if (comp.getValue().plotAreaIsUndefined) {
										comp.up('form').down('[itemId=plotAreaId]').setDisabled(true);
									} else {
										comp.up('form').down('[itemId=plotAreaId]').setDisabled(false);
									}

								}
							},
							items : [ {
								boxLabel : "Площа ділянки не вказана",
								afterLabelTextTpl : pf.utils.Validation.required,
								name : 'plotAreaIsUndefined',
								inputValue : '1',
								uncheckedValue : '0'
							} ]
						} ]
					} ]

				} ]
			} ]
		});
		me.callParent(arguments);
		me.addEvents('onDeleteAnalogue2Corr');
	}
})
