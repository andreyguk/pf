Ext.define('pf.view.form.card.ov.house.TabGeneral', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.ov.house.tabGeneral',
	initComponent : function() {
		var me = this;
		var storeTerr = Ext.create('pf.store.common.Territory');
		storeTerr.ovID = me.ovID;
		Ext.applyIf(me, {
			items : [ {
				xtype : 'fieldset',
				layout : 'anchor',
				anchor : '100%',
				title : 'Місцезнаходження та основні характеристики об\'єкту',
				items : [ {
					xtype : 'tbspacer',
					height : 10
				}, {
					xtype : 'fieldset',
					title : 'Місцезнаходження об\'єкту',
					anchor : '80%',
					items : [ {
						xtype : 'combobox',
						anchor : '50%',
						fieldLabel : 'Територія',
						labelAlign : 'top',
						store : storeTerr,
						queryMode : 'remote',
						name : 'locationTerritory',
						pageSize : 10,
						minChars : 3,
						// editable : true,
						displayField : 'fullName',
						valueField : 'id',
						afterLabelTextTpl : pf.utils.Validation.required,
						plugins : [ {
							ptype : 'cleartrigger'
						} ],
						forceselection : false
					}, {
						xtype : 'container',
						anchor : '52%',
						defaults : {
							xtype : 'textfield',
							labelAlign : 'top',
							msgTarget : 'side',
							afterLabelTextTpl : pf.utils.Validation.required,
							allowBlank : false
						},
						layout : {
							type : 'hbox',
							defaultMargins : {
								top : 0,
								right : 25,
								bottom : 10,
								left : 0
							}
						},
						items : [ {
							flex : 4,
							fieldLabel : 'Вулиця',
							name : 'locationStreet'
						}, {
							flex : 1,
							fieldLabel : 'Будинок',
							name : 'locationBuilding'
						} ]
					}, {
						xtype : 'container',
						anchor : '80%',
						defaults : {
							xtype : 'combobox',
							flex : 1,
							labelAlign : 'top',
							msgTarget : 'side',
							afterLabelTextTpl : pf.utils.Validation.required,
							allowBlank : false,
							plugins : [ {
								ptype : 'cleartrigger'
							} ]
						},
						layout : {
							type : 'hbox',
							defaultMargins : {
								top : 0,
								right : 25,
								bottom : 10,
								left : 0
							}
						},
						items : [ {
							fieldLabel : 'Знаходження в плані </br> населеного пункту',
							itemId : 'localityStandingId',
							store : Ext.create('pf.store.common.LocalityStanding'),
							name : 'localityStanding',
							queryMode : 'local',
							minChars : 3,
							editable : false,
							displayField : 'name',
							valueField : 'id'

						}, {
							fieldLabel : 'Структура </br> населеного пункту',
							itemId : 'localityStructureId',
							store : Ext.create('pf.store.common.LocalityStructure'),
							name : 'localityStructure',
							queryMode : 'local',
							minChars : 3,
							editable : false,
							displayField : 'name',
							valueField : 'id'
						}, {
							fieldLabel : 'Категорія </br> населеного пункту',
							itemId : 'localityCategoryId',
							store : Ext.create('pf.store.common.LocalityCategory'),
							name : 'localityCategory',
							queryMode : 'local',
							minChars : 3,
							editable : false,
							displayField : 'name',
							valueField : 'id'
						} ]
					} ]
				}, {
					xtype : 'fieldset',
					title : 'Основні характеристики об\'єкту',
					anchor : '80%',
					items : [ {
						xtype : 'container',
						anchor : '80%',
						defaults : {
							flex : 1,
							labelAlign : 'top',
							msgTarget : 'side'
						},
						layout : {
							type : 'hbox',
							defaultMargins : {
								top : 0,
								right : 25,
								bottom : 10,
								left : 0
							}
						},
						items : [ {
							xtype : 'combobox',
							fieldLabel : 'Тип ринку, </br> на якому здійснюється угода',
							store : Ext.create('pf.store.common.MarketType'),
							name : 'marketType',
							queryMode : 'local',
							minChars : 3,
							editable : false,
							displayField : 'name',
							valueField : 'id',
							plugins : [ {
								ptype : 'cleartrigger'
							} ]
						}, {
							xtype : 'textfield',
							vtype : 'isIntFloat',
							fieldLabel : 'Незавершене будівництво </br> (коефіцієнт готовності), %',
							name : 'readyCoeff'
						}, {
							xtype : 'textfield',
							vtype : 'isInt',
							fieldLabel : 'Рік введення </br> в  експлуатацію',
							name : 'maintenanceYearHouse',
							allowBlank : false,
							afterLabelTextTpl : pf.utils.Validation.required
						} ]
					}, {
						xtype : 'container',
						anchor : '80%',
						defaults : {
							xtype : 'combobox',
							flex : 1,
							labelAlign : 'top',
							msgTarget : 'side',
							allowBlank : false,
							afterLabelTextTpl : pf.utils.Validation.required,
							plugins : [ {
								ptype : 'cleartrigger'
							} ]
						},
						layout : {
							type : 'hbox',
							defaultMargins : {
								top : 0,
								right : 25,
								bottom : 10,
								left : 0
							}
						},
						items : [ {
							fieldLabel : 'Клас капітальності будівлі',
							store : Ext.create('pf.store.common.BuildingMainClass'),
							name : 'buildingMainClass',
							queryMode : 'local',
							minChars : 3,
							editable : false,
							displayField : 'name',
							valueField : 'id'

						}, {
							fieldLabel : 'Матеріал стін',
							store : Ext.create('pf.store.common.MaterialOfWalls'),
							name : 'materialOfWalls',
							queryMode : 'local',
							minChars : 3,
							editable : false,
							displayField : 'name',
							valueField : 'id'
						}, {
							fieldLabel : 'Матеріал перекриття',
							store : Ext.create('pf.store.common.MaterialOfCover'),
							name : 'materialOfCover',
							queryMode : 'local',
							minChars : 3,
							editable : false,
							displayField : 'name',
							valueField : 'id'
						} ]
					}, {
						xtype : 'container',
						anchor : '80%',
						defaults : {
							xtype : 'combobox',
							flex : 1,
							labelAlign : 'top',
							msgTarget : 'side',
							queryMode : 'local',
							minChars : 3,
							editable : false,
							displayField : 'name',
							valueField : 'id',
							allowBlank : false,
							afterLabelTextTpl : pf.utils.Validation.required,
							plugins : [ {
								ptype : 'cleartrigger'
							} ]
						},
						layout : {
							type : 'hbox',
							defaultMargins : {
								top : 0,
								right : 25,
								bottom : 10,
								left : 0
							}
						},
						items : [ {
							fieldLabel : 'Матеріал зовнішніх дверей',
							store : Ext.create('pf.store.common.MaterialOfExternalDoors'),
							name : 'materialOfExternalDoors'
						}, {
							fieldLabel : 'Матеріал внутрішніх дверей',
							store : Ext.create('pf.store.common.MaterialOfInternalDoors'),
							name : 'materialOfInternalDoors'
						}, {
							fieldLabel : 'Матеріал вікон',
							itemId : 'localityStructureId',
							store : Ext.create('pf.store.common.MaterialOfWindows'),
							name : 'materialOfWindows'
						} ]
					}, {
						xtype : 'container',
						anchor : '80%',
						layout : {
							type : 'hbox',
							defaultMargins : {
								top : 10,
								right : 25,
								bottom : 10,
								left : 0
							}
						},
						items : [ {
							fieldLabel : 'Кількість поверхів(в будинку)',
							name : 'locationStreet',
							xtype : 'textfield',
							labelAlign : 'top',
							msgTarget : 'side',
							afterLabelTextTpl : pf.utils.Validation.required,
							allowBlank : false,
							vtype : 'isInt',
							name : 'floorsQty'
						}, {
							xtype : 'checkboxgroup',
							columns : 1,
							vertical : true,
							items : [ {
								boxLabel : "Цокольний поверх (якщо об'єкт розташовано в цоколі)",
								name : 'isSocleFloor',
								inputValue : 'true',
								uncheckedValue : 'false'
							}, {
								boxLabel : "Мансардний поверх (якщо об'єкт розташовано в мансарді)",
								name : 'isAtticFloor',
								inputValue : 'true',
								uncheckedValue : 'false'
							} ]
						} ]
					}, {
						xtype : 'container',
						layout : {
							type : 'hbox',
							defaultMargins : {
								top : 0,
								right : 25,
								bottom : 10,
								left : 0
							}
						},
						items : [ {
							xtype : 'textfield',
							labelAlign : 'top',
							msgTarget : 'side',
							allowBlank : true,
							vtype : 'isInt',
							margin : '0 35 0 0',
							fieldLabel : 'Кількість кімнат(од)',
							name : 'roomQty'
						}, {
							xtype : 'combobox',
							anchor : '30%',
							labelAlign : 'top',
							msgTarget : 'side',
							allowBlank : false,
							afterLabelTextTpl : pf.utils.Validation.required,
							fieldLabel : 'Тип планування кімнат',
							store : Ext.create('pf.store.common.RoomPlanningType'),
							name : 'roomPlanningType',
							queryMode : 'local',
							minChars : 3,
							editable : false,
							displayField : 'name',
							valueField : 'id',
							plugins : [ {
								ptype : 'cleartrigger'
							} ]
						} ]
					} ]
				}, {
					xtype : 'fieldset',
					title : 'Характеристики приміщень',
					anchor : '80%',
					items : [ {
						xtype : 'container',
						defaults : {
							xtype : 'textfield',
							flex : 1,
							labelAlign : 'top',
							msgTarget : 'side',
							allowBlank : false,
							vtype : 'isIntFloat',
							afterLabelTextTpl : pf.utils.Validation.required,
							emptyText : '0.00'
						},
						layout : {
							type : 'hbox',
							defaultMargins : {
								top : 0,
								right : 25,
								bottom : 10,
								left : 0
							}
						},
						items : [ {
							fieldLabel : "S загальна (м<sup>2</sup>)",
							name : 'totalArea',
							listeners : {
								'change' : function(textfield, value) {
									var form = textfield.up('form');
									var areaAll = form.down('[name=areaAll]');
									areaAll.setValue(value)
								}
							}
						}, {
							fieldLabel : "S житлова (м<sup>2</sup>)",
							name : 'livingArea'
						}, {
							fieldLabel : "S кухні (м<sup>2</sup>)",
							name : 'kitchenArea'
						}, {
							fieldLabel : "S підсобних приміщень (м<sup>2</sup>)",
							name : 'storeroomArea'
						} ]
					}, {
						xtype : 'container',
						anchor : '75%',
						defaults : {
							xtype : 'textfield',
							flex : 1,
							labelAlign : 'top',
							msgTarget : 'side',
							emptyText : '0.00',
							vtype : 'isIntFloat'
						},
						layout : {
							type : 'hbox',
							defaultMargins : {
								top : 0,
								right : 25,
								bottom : 10,
								left : 0
							}
						},
						items : [ {
							fieldLabel : "Висота </br>приміщень (м)",
							allowBlank : false,
							afterLabelTextTpl : pf.utils.Validation.required,
							name : 'floorHeight'
						}, {
							fieldLabel : "Висота надземного </br> поверху (м)",
							name : 'cellarHeight'
						}, {
							fieldLabel : "Будівельний </br>об'єм (куб. м.)",
							name : 'constructiveDimension'
						} ]
					} ]
				} ]
			} ]
		});
		me.callParent(arguments);
	}
})