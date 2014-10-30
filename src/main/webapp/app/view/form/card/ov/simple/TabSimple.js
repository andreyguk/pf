Ext.define('pf.view.form.card.ov.simple.TabSimple', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.ov.simple.tabSimple',
	layout : 'anchor',
	initComponent : function() {
		var me = this;
		var storeTerr = Ext.create('pf.store.common.Territory');
		var storeBlank2PrimaryDocs = Ext.create('pf.store.Blank2PrimaryDocs');
		storeBlank2PrimaryDocs.filter('blankId', me.blankID);
		Ext.applyIf(me, {
			items : [ {
				xtype : 'textfield',
				fieldLabel : loc.lblFDMUNum,
				itemId : 'fdmuNum',
				name : 'fdmuNum',
				padding : '10 0 10 0',
				margin : '0,10,0,0',
				hidden : !(pf.LoggedInUser.inRole('SUPERVISOR'))
			}, {
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
				}, {
					xtype : 'textareafield',
					hidden : true,
					fieldLabel : 'Інші власники',
					anchor : '50%',
					labelAlign : 'top',
					rows : 2,
					cols : 85,
					hidden : true,
					itemId : 'otherOwnersId',
					name : 'otherOwners'
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
						margin : '0 25 0 0',
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
				anchor : '100%',
				title : "Дані звіту",
				defaults : {
					labelAlign : 'top'
				},
				items : [ {
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
						xtype : 'datefield',
						fieldLabel : 'Дата проведення оцінки',
						name : 'valuationDate',
						allowBlank : false,
						afterLabelTextTpl : pf.utils.Validation.required,
						format : 'd.m.Y'
					}, {
						xtype : 'filefield',
						labelAlign : 'top',
						name : 'file',
						flex : 1,
						fieldLabel : 'Файл звіту',
						msgTarget : 'side',
						allowBlank : false,
						margin : '0,0,0,0',
						buttonText : 'Оберіть файл',
						afterLabelTextTpl : pf.utils.Validation.required
					}, {
						xtype : 'hiddenfield',
						name : 'id'
					} ]
				} ]
			}, {
				xtype : 'container',
				hidden : !(me.attachmentDocs),
				anchor : '100%',
				margin : '18 0 0 0',
				layout : {
					type : 'hbox'
				},
				items : [ {
					xtype : 'label',
					cls : 'attachmentFile',
					style : {
						color : '#000000'
					},
					html : '&nbsp &nbsp'
				}, {
					xtype : 'label',
					itemId : 'attFileTxtId',
					text : 'Додаткова інформація:',
					margin : '0 5 0 0'
				}, {
					xtype : 'label',
					html : '<a href="pf.proxy.manager.FileManager.cls?objType=ov&fileType=doc_archive&objId=' + me.ovID + '">' + me.attachmentDocs + '</a>',
					margin : '0 20 0 0'
				} ]
			}, {
				xtype : 'fieldset',
				margin : '10 0 0 0',
				defaults : {
					labelAlign : 'top',
					anchor : '100%',
					readOnly : true,
					fieldCls : 'body-style-readOnly'
				},
				title : 'Додаткова інформація для оцінювача',
				items : [ {
					xtype : 'textareafield',
					name : 'addInfo'
				} ]
			}, {
				xtype : 'fieldset',
				layout : 'anchor',
				collapsible : true,
				collapsed : true,
				title : 'Первинні документи',
				items : [ {
					xtype : 'grid',
					store : storeBlank2PrimaryDocs,
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
						text : 'Назва файлу',
						flex : 1,
						dataIndex : 'fileName',
						renderer : function(value, metaData, record, row, col, store, gridView) {
							value = '<a href="pf.proxy.manager.FileManager.cls?objType=PRIMARY_DOCS&attId=' + record.get('id') + '">' + record.get('fileName') + '</b>' + '</a>'
							return value
						}
					} ]
				} ]
			} ]
		});
		me.callParent(arguments);
	}
})