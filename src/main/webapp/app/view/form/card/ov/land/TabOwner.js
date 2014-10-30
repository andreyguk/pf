Ext.define('pf.view.form.card.ov.land.TabOwner', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.ov.land.tabOwner',
	layout : 'anchor',
	autoShow : false,
	initComponent : function() {
		var me = this;
		console.log(me)
		var storeTerr = Ext.create('pf.store.common.ApplicantTerritory');
		var storeBlank2ValParts = Ext.create('pf.store.Blank2ValuationParts');
		storeBlank2ValParts.filter('blank', me.blankID);
		// storeTerr.clearFilter(true);
		storeTerr.blankID = me.blankID;
		Ext.applyIf(me, {
			items : [ {
				xtype : 'fieldset',
				anchor : '100%',
				title : loc.lblObjectDesc,
				defaults : {
					labelAlign : 'top',
					fieldCls : 'body-style-readOnly',
					readOnly : true
				},
				items : [ {
					xtype : 'textareafield',
					itemId : 'objectTypesId',
					anchor : '50%',
					labelAlign : 'top',
					fieldLabel : loc.lblObjectType,
					name : 'objectType',
					rows : 1,
					readOnly : true
				}, {
					xtype : 'textareafield',
					itemId : 'objectSubTypesId',
					anchor : '50%',
					labelAlign : 'top',
					fieldLabel : loc.lblObjectSubType,
					name : 'objectSubType',
					rows : 2,
					readOnly : true
				}, {
					xtype : 'textareafield',
					anchor : '50%',
					labelAlign : 'top',
					fieldLabel : loc.lblObjectName,
					name : 'objectName',
					rows : 2,
					readOnly : true
				} ]
			}, {
				xtype : 'fieldset',
				itemId : 'flSetOwnerInfo',
				layout : 'anchor',
				anchor : '100%',
				title : 'Дані власника',
				items : [ {
					xtype : 'container',
					anchor : '50%',
					itemId : 'contDeliveryType',
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
						xtype : 'textfield',
						itemId : 'paymentDeliveryTypeId',
						flex : 1,
						// anchor : "50%",
						labelAlign : 'top',
						fieldCls : 'body-style-readOnly',
						readOnly : true,
						fieldLabel : 'Спосіб доставки рахунку',
						name : 'paymentDeliveryType'
					}, {
						xtype : 'textfield',
						itemId : 'reportDeliveryTypeId',
						flex : 1,
						// anchor : "50%",
						labelAlign : 'top',
						fieldCls : 'body-style-readOnly',
						readOnly : true,
						fieldLabel : 'Спосіб доставки звіту',
						name : 'reportDeliveryType',
						margin : '0 0 0 0'
					} ]
				}, {
					xtype : 'textfield',
					fieldLabel : loc.lblApplicantType,
					name : 'applicantType',
					itemId : 'applicantTypeID',
					fieldCls : 'body-style-readOnly',
					readOnly : true,
					hidden : true
				}, {
					xtype : 'radiogroup',
					anchor : "20%",
					itemId : 'radiogroupApplicant',
					fieldLabel : 'Заявник є власником? ',
					items : [ {
						boxLabel : 'Так',
						name : 'isAppOwner',
						inputValue : 1
					}, {
						boxLabel : 'Hi',
						name : 'isAppOwner',
						inputValue : 0
					} ]
				}, {
					anchor : "50%",
					labelAlign : 'top',
					xtype : 'combobox',
					fieldLabel : 'Тип власника',
					itemId : 'ownerTypeId',
					store : Ext.create('pf.store.common.ApplicantTypes'),
					queryMode : 'local',
					editable : false,
					displayField : 'name',
					valueField : 'id',
					name : 'ownerType',
					afterLabelTextTpl : pf.utils.Validation.required,
					allowBlank : false,
					listeners : {
						change : function(comp) {
							var physicalCont = me.getComponent('flSetOwnerInfo').getComponent('physicalCont');
							var juridicalCont = me.getComponent('flSetOwnerInfo').getComponent('juridicalCont');
							// juridical
							if (comp.getValue() == '') {
								physicalCont.hide();
								juridicalCont.hide();
							} else if ((comp.getValue() != 4) && (comp.getValue() != '')) {
								physicalCont.show();
								juridicalCont.getComponent('ownerCompanyNameId').setRawValue('');
								juridicalCont.hide();

							} else if (comp.getValue() == 4) {
								physicalCont.hide();
								physicalCont.getComponent('ownerLastNameId').setRawValue('');
								physicalCont.getComponent('ownerFirstNameId').setRawValue('');
								physicalCont.getComponent('ownerMiddleNameId').setRawValue('');
								juridicalCont.show();
							}
						}
					}
				}, {
					xtype : 'container',
					itemId : 'physicalCont',
					anchor : '50%',
					hidden : true,
					listeners : {
						'render' : function(cont) {
							if (me.getComponent('flSetOwnerInfo').getComponent('ownerTypeId').getValue() == 4)
								cont.setHiddenState(true);
						}
					},
					defaults : {
						xtype : 'textfield',
						labelAlign : 'top',
						msgTarget : 'side',
						margin : '0 25 10 0',
						afterLabelTextTpl : pf.utils.Validation.required,
						allowBlank : true
					},
					layout : {
						type : 'hbox'
					},
					items : [ {
						flex : 1,
						fieldLabel : 'Прізвище власника',
						itemId : 'ownerLastNameId',
						name : 'ownerLastName'
					}, {
						flex : 1,
						fieldLabel : "Ім'я власника",
						itemId : 'ownerFirstNameId',
						name : 'ownerFirstName'
					}, {
						flex : 1,
						fieldLabel : 'По батькові власника',
						itemId : 'ownerMiddleNameId',
						name : 'ownerMiddleName',
						margin : '0 0 0 0'
					} ]
				}, {
					xtype : 'container',
					hidden : true,
					anchor : '50%',
					itemId : 'juridicalCont',
					listeners : {
						'render' : function(cont) {
							if (me.getComponent('flSetOwnerInfo').getComponent('ownerTypeId').getValue() != 4)
								cont.setHiddenState(true)
						}
					},
					defaults : {
						xtype : 'textfield',
						labelAlign : 'top',
						margin : '0 0 0 0',
						msgTarget : 'side'

					},
					layout : {
						type : 'hbox'
					},
					items : [ {
						flex : 1,
						fieldLabel : 'Назва юридичної особи власника',
						itemId : 'ownerCompanyNameId',
						name : 'ownerCompanyName'
					} ]
				}, {
					xtype : 'container',
					itemId : 'cntrOwnerAttorneyId',
					anchor : '50%',
					defaults : {
						xtype : 'textfield',
						labelAlign : 'top',
						msgTarget : 'side',
						margin : '0 25 10 0',
						afterLabelTextTpl : pf.utils.Validation.required
					// allowBlank : false
					},
					layout : {
						type : 'hbox'
					},
					items : [ {
						flex : 1,
						itemId : 'ownerAttorneyNumberId',
						fieldLabel : 'Серія та номер довіреності замовника',
						name : 'ownerAttorneyNumber'
					}, {
						xtype : 'datefield',
						fieldLabel : 'Дата видачі довіреності замовника',
						name : 'ownerAttorneyDate',
						itemId : 'ownerAttorneyDateId',
						flex : 1,
						format : 'd.m.Y',
						margin : '0 0 0 0'
					} ]
				} ]
			}, {
				xtype : 'fieldset',
				layout : 'anchor',
				anchor : '100%',
				hidden : true,
				listeners : {
					'render' : function(cont) {
						var paymentDeliveryTypeId = me.getComponent('flSetOwnerInfo').getComponent('contDeliveryType').getComponent('paymentDeliveryTypeId').getRawValue()
						var reportDeliveryTypeId = me.getComponent('flSetOwnerInfo').getComponent('contDeliveryType').getComponent('reportDeliveryTypeId').getRawValue()
						if ((paymentDeliveryTypeId === 'Пошта') || (reportDeliveryTypeId === 'Пошта'))
							cont.setHiddenState(false);
					}
				},
				title : 'Поштова адреса замовника',
				items : [ {
					xtype : 'container',
					anchor : '50%',
					defaults : {
						xtype : 'textfield',
						labelAlign : 'top',
						msgTarget : 'side',
						margin : '0 0 0 0',
						afterLabelTextTpl : pf.utils.Validation.required,
						allowBlank : true
					},
					layout : {
						type : 'hbox'
					},
					items : [ {
						xtype : 'combobox',
						flex : 2,
						fieldLabel : 'Територія',
						store : storeTerr,
						queryMode : 'remote',
						name : 'appAddressTerritory',
						pageSize : 10,
						minChars : 3,
						displayField : 'fullName',
						valueField : 'id',
						afterLabelTextTpl : pf.utils.Validation.required,
						plugins : [ {
							ptype : 'cleartrigger'
						} ]
					} ]
				}, {
					xtype : 'container',
					anchor : '50%',
					defaults : {
						xtype : 'textfield',
						labelAlign : 'top',
						msgTarget : 'side',
						margin : '0 25 10 0',
						afterLabelTextTpl : pf.utils.Validation.required,
						allowBlank : true
					},
					layout : {
						type : 'hbox'
					},
					items : [ {
						fieldLabel : 'Індекс',
						name : 'appAddressIndex',
						flex : 1
					// width : 50
					}, {
						flex : 5,
						fieldLabel : 'Вулиця',
						name : 'appAddressStreet'
					}, {
						fieldLabel : 'Будинок',
						name : 'appAddressHouse',
						flex : 1
					// width : 50
					}, {
						fieldLabel : 'Квартира',
						name : 'appAddressFlat',
						flex : 1,
						// width : 100,
						margin : '0 0 0 0'
					} ]
				} ]
			}, {
				xtype : 'fieldset',
				layout : 'anchor',
				anchor : '50%',
				title : 'Тип власності',

				items : [ {
					xtype : 'radiogroup',
					anchor : "20%",
					itemId : 'radiogroupJointOwnership',
					fieldLabel : 'Cпільна сумісна',
					items : [ {
						boxLabel : 'Так',
						name : 'isJointOwnership',
						inputValue : 1

					}, {
						boxLabel : 'Hi',
						name : 'isJointOwnership',
						inputValue : 0

					} ]

				}, {
					xtype : 'textareafield',
					fieldLabel : 'П.І.Б. інших власників:',
					name : 'otherOwners',
					anchor : '100%',
					labelAlign : 'top',
					rows : 2,
					cols : 85,
					itemId : 'otherOwnersField',
					hidden : true
				} ]
			}, {
				xtype : 'fieldset',
				itemId : 'partValFieldset',
				layout : 'anchor',
				anchor : '50%',
				title : 'Частка, що оцінюється',
				items : [ {
					xtype : 'container',
				itemId : 'partValContain',
					defaults : {
						xtype : 'textfield',
						afterLabelTextTpl : pf.utils.Validation.required,
						allowBlank : false,
						labelAlign : 'top'
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
						fieldLabel : 'Числове значення частки,</br> що оцінюється (чисельник)',
						name : 'valuationPartNumer',
						value : 1,
						vtype : 'isInt',
						flex : 1
					}, {
						fieldLabel : 'Числове значення частки,</br> що оцінюється (знаменник)',
						name : 'valuationPartDenom',
						value : 1,
						vtype : 'isInt',
						margin : '0 0 0 0',
						flex : 1
					} ]
				} ]
			}, {
				xtype : 'fieldset',
				layout : 'anchor',
				anchor : '50%',
				title : 'Дані власників часток майна, що оцінюється',
				items : [ {
					xtype : 'grid',
					store : storeBlank2ValParts,
					selType : 'rowmodel',
					anchor : '100%',
					columnLines : true,
					itemId : 'gridBlank2ValParts',
					tbar : [ {
						text : 'Додати',
						iconCls : 'add',
						itemId : 'addBlank2ValParts'
					}, '->', {
						html : '<b>Дані власників часток майна</b>'
					} ],
					dockedItems : [ {
						xtype : 'pagingtoolbar',
						dock : 'bottom',
						store : storeBlank2ValParts,
						displayInfo : true
					} ],
					columns : me.getBlank2ValParts()
				}, {
					xtype : 'label',
					margin : '0 0 0 0',
					// html : "<span style='color:red;font-size:
					// 1em;'>Приклад:Земельні поліпшення: Іванов Іван Іванович
					// (1/2); Іванов Петро Іванович (1/4); Іванов Михайло
					// Іванович (1/4)<span/>"
					html : "<span style='color:red;font-size: 1em;'>Заповнюється лише у тому разі, якщо потрібно додатково вказати власників, окрім того, що вже вказаний у розділі «Частка, що оцінюється» (дублювати дані з розділу «Частка, що оцінюється» не потрібно)<span/>"
				} ]
			} ]
		});
		me.callParent(arguments);
	},
	getBlank2ValParts : function() {
		return [ {
			xtype : 'rownumberer'
		}, {
			header : 'id',
			dataIndex : 'id',
			hidden : true,
			hideable : false
		}, {
			text : 'blank',
			flex : 1,
			dataIndex : 'blank',
			hidden : true,
			hideable : false
		}, {
			text : 'П.І.Б. власника',
			dataIndex : 'ownerFio',
			flex : 2
		}, {
			text : 'Частка, що оцінюється',
			dataIndex : 'valuationPart',
			flex : 1,
			renderer : function(value, metaData, record, row, col, store, gridView) {
				var value = record.get('valuationPartNumer') + '/' + record.get('valuationPartDenom')
				return value
			}
		}, {
			xtype : 'actioncolumn',
			items : [ {
				iconCls : 'delete',
				handler : function(grid, rowIndex, colIndex) {
					var rec = grid.getStore().getAt(rowIndex), store = grid.getStore();
					store.remove(rec);
				},
				scope : this
			} ],
			width : '10px',
			align : 'center'
		} ];
	}
})