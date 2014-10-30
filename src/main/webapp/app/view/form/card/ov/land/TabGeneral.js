Ext.define('pf.view.form.card.ov.land.TabGeneral', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.ov.land.tabGeneral',
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
							msgTarget : 'side'
						// afterLabelTextTpl : pf.utils.Validation.required,
						// allowBlank : false
						},
						layout : {
							type : 'hbox',
							defaultMargins : {
								top : 0,
								right : 25,
								bottom : 5,
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
							name : 'locationBuilding',
							listeners : {
								change : function() {
									me.up('form').down('[name=locationFlat]').setValue('');
								}
							}
						}, {
							flex : 1,
							fieldLabel : 'Ділянка',
							name : 'locationFlat',
							listeners : {
								change : function() {
									me.up('form').down('[name=locationBuilding]').setValue('');
								}
							}
						} ]
					}, {
						xtype : 'label',	
						anchor : '10%',
						html : "<span style='color:red;'>*у разі необхідності заповнювати інформацію щодо знаходження ділянки у межах сільської ради, садівничого товариства та ін.<span/>"
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
							xtype : 'combobox',
							flex : 1,
							labelAlign : 'top',
							msgTarget : 'side',
							editable : false,
							queryMode : 'local',
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
							fieldLabel : 'Цільове призначення </br> земельної ділянки',
							store : Ext.create('pf.store.common.LandSitePurpose'),
							name : 'plotPurpose',
							minChars : 3,
							displayField : 'name',
							valueField : 'id'
						}, {
							fieldLabel : 'Розташування </br> відносно дороги',
							store : Ext.create('pf.store.common.LandSitePlacement'),
							name : 'roadLocation',
							minChars : 3,
							displayField : 'name',
							valueField : 'id'
						}, {
							fieldLabel : 'Тип під’їздної </br> дороги',
							store : Ext.create('pf.store.common.RoadType'),
							name : 'roadType',
							minChars : 3,
							displayField : 'name',
							valueField : 'id'
						} ]
					}, {
						xtype : 'container',
						anchor : '80%',
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
							afterLabelTextTpl : pf.utils.Validation.required,
							allowBlank : false,
							vtype : 'isInt',
							flex : 1,
							fieldLabel : 'Нахил ділянки',
							name : 'plotIncline'
						}, {
							xtype : 'textfield',
							labelAlign : 'top',
							msgTarget : 'side',
							afterLabelTextTpl : pf.utils.Validation.required,
							allowBlank : false,
							flex : 2,
							margin : '0 30 0 0',
							fieldLabel : 'Форма ділянки',
							name : 'plotForm'
						} ]
					}, {
						xtype : 'container',
						anchor : '80%',
						layout : {
							type : 'vbox',
							defaultMargins : {
								top : 0,
								right : 25,
								bottom : 0,
								left : 0
							}
						},
						items : [ {
							xtype : 'textareafield',
							labelAlign : 'top',
							fieldLabel : 'Інженерно-геологічні умови',
							name : 'geologicalConditions',
							cols : 105,
							rows : 1
						}, {
							xtype : 'textareafield',
							labelAlign : 'top',
							fieldLabel : 'Опис оточення земельної ділянки',
							name : 'plotDescription',
							cols : 105,
							rows : 1
						}, {
							xtype : 'textareafield',
							labelAlign : 'top',
							fieldLabel : 'Обмеження щодо забудови та використання',
							name : 'usageLimitation',
							cols : 105,
							rows : 1
						} ]
					} ]
				}, {
					xtype : 'fieldset',
					title : 'Характеристика ділянки',
					anchor : '80%',
					items : [ {
						xtype : 'container',
						anchor : '75%',
						defaults : {
							xtype : 'textfield',
							flex : 1,
							labelAlign : 'top',
							msgTarget : 'side',
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
							fieldLabel : "Кількість </br> земельних ділянок",
							allowBlank : false,
							afterLabelTextTpl : pf.utils.Validation.required,
							name : 'plotQty'
						}, {
							fieldLabel : "Площа земельної (их) </br> ділянки(ок), кв.м.",
							allowBlank : false,
							emptyText : '0.00',
							afterLabelTextTpl : pf.utils.Validation.required,
							name : 'plotArea',
							listeners : {
								'change' : function(textfield, value) {
									var form = textfield.up('form');
									form.down('[itemId=areaAllId]').setRawValue(value);
								}
							}
						}, {
							fieldLabel : "Забудована </br> площа, (кв.м)",
							emptyText : '0.00',
							name : 'usedArea'
						} ]
					} ]
				} ]
			} ]
		});
		me.callParent(arguments);
	}
})