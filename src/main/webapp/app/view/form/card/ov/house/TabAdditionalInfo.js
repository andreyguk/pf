Ext.require([ 'Ext.selection.CellModel' ]);
Ext.define('pf.view.form.card.ov.house.TabAdditionalInfo', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.ov.house.tabAdditionalInfo',
	itemId : 'houseTabAdditionalInfo',
	disabled : true,
	listeners : {
		// загрузка корректировок - start
		beforeshow : function() {
			var mask = new Ext.LoadMask(Ext.getBody(), {
				msg : "Будь ласка, зачекайте ..."
			});
			mask.show();
			var me = this;
			if (me.$className == 'pf.view.form.card.ov.simple.OVSimpleCard') {
				return;
			}
			Ext.Ajax.request({
				url : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.Read.cls',
				params : {
					classname : 'correctionsHouse',
					objectValuation : me.ovID
				},
				success : function(response, options) {
					var result = Ext.decode(response.responseText);
					if (result.success) {
						if (result.total === 0) {
							mask.hide();
							return;
						}
						var data = result.data[0];
						for ( var key in data) {
							if (data.hasOwnProperty(key)) {
								var val = data[key];
								var fld = me.down('[itemId=' + key + ']');
								if (fld) {
									fld.setValue(val);
								}
							}
						}
						mask.hide();
					} else {
						me.showError(result.message + '' + result.code + '<br/>' + result.data);
					}
				},
				failure : function(response, options) {
					var result = Ext.decode(response.responseText);
					me.showError(result.message + '_' + result.code + '<br/>' + result.data);
				}

			});
			// загрузка корректировок - end

		},
		show : function() {
			this.calcAnalogueplotCost(this.down('[itemId=an1corrOnDate]'));
			for ( var i = 1; i < 5; i++) {
				this.calcCostCorrected(this.down('[itemId=gridOV2Analogue]'), i, this.down('[itemId=an' + i + 'totalCorr]').getRawValue());
			}
			this.calcStats(this.down('[itemId=gridOV2Analogue]'));
		}
	},
	initComponent : function() {
		var me = this;
		var storeValuator = Ext.create('pf.store.common.Valuators');
		storeValuator.filter('objectValuation', me.ovID);
		var storeOV2Analogue = Ext.create('pf.store.OV2Analogue');
		storeOV2Analogue.filter('objectValuation', me.ovID);
		var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
			clicksToEdit : 1
		});
		var storeBlank2PrimaryDocs = Ext.create('pf.store.Blank2PrimaryDocs');
		storeBlank2PrimaryDocs.filter('blankId', me.blankID);
		Ext.applyIf(me, {
			items : [ {
				xtype : 'fieldset',
				layout : 'anchor',
				title : '',
				items : [ {
					xtype : 'textfield',
					fieldLabel : loc.lblFDMUNum,
					itemId : 'fdmuNum',
					name : 'fdmuNum',
					padding : '10 0 0 0',
					margin : '0,10,0,0',
					hidden : !(pf.LoggedInUser.inRole('SUPERVISOR'))
				}, {
					xtype : 'container',
					anchor : '100%',
					defaults : {
						xtype : 'textfield',
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
						xtype : 'datefield',
						fieldLabel : 'Дата проведення оцінки',
						name : 'valuationDate',
						flex : 1,
						fieldCls : 'body-style-readOnly',
						readOnly : true,
						format : 'd.m.Y'
					}, {
						xtype : 'container',
						flex : 1,
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
							text : 'Файл  звіту:',
							margin : '0 5 0 0'
						}, {
							xtype : 'label',
							html : '<a href="pf.printForms.pdf.OVHouse.cls?ovId=' + me.ovID + '"target="_blank""> ' + '<b>' + me.contractNum + '</b>' + '</a>',
							margin : '0 20 0 0'
						} ]
					}, {
						xtype : 'container',
						flex : 3,
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
							text : 'Фото об’єкту оціники:',
							margin : '0 5 0 0'
						}, {
							xtype : 'label',
							html : '<a href="pf.proxy.manager.FileManager.cls?objType=ov&fileType=doc_archive&objId=' + me.ovID + '">' + me.attachmentDocs + '</a>',
							margin : '0 20 0 0'
						} ]
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
				}, {
					xtype : 'container',
					anchor : '50%',
					layout : {
						type : 'hbox'
					},
					items : [ {
						xtype : 'combobox',
						flex : 1,
						labelAlign : 'top',
						margin : '0 25 0 0',
						msgTarget : 'side',
						afterLabelTextTpl : pf.utils.Validation.required,
						allowBlank : false,
						fieldLabel : 'Оцінювач',
						itemId : 'valuatorId',
						store : storeValuator,
						name : 'valuator',
						queryMode : 'local',
						minChars : 3,
						editable : false,
						displayField : 'shortFio',
						valueField : 'id',
						plugins : [ {
							ptype : 'cleartrigger'
						} ]
					}, {
						xtype : 'combobox',
						flex : 1,
						labelAlign : 'top',
						msgTarget : 'side',
						fieldLabel : 'Довіреність директора',
						itemId : 'attorneyUserId',
						store : Ext.create('pf.store.common.Signer'),
						name : 'signer',
						queryMode : 'local',
						minChars : 3,
						editable : false,
						displayField : 'shortFio',
						valueField : 'id',
						plugins : [ {
							ptype : 'cleartrigger'
						} ]
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
					xtype : 'container',
					margin : '10 0 0 0',
					anchor : '75%',
					defaults : {
						xtype : 'textfield',
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
						flex : 1,
						fieldLabel : 'Сумма передбачуваної угоди, (грн.)',
						emptyText : '0.00',
						name : 'contractSum'
					}, {
						flex : 1,
						fieldLabel : 'Кошторисна вартість, (грн.)',
						emptyText : '0.00',
						name : 'budgetCost'
					}, {
						flex : 1,
						fieldLabel : 'Інвентарізаційна вартість, (грн.)',
						emptyText : '0.00',
						name : 'inventoryCost'
					} ]
				}, {
					xtype : 'checkboxgroup',
					columns : 1,
					vertical : true,
					items : [ {
						boxLabel : "Потрібна ретроспективна оцінка",
						name : 'needsRetrospectiveValuation',
						inputValue : 'true',
						uncheckedValue : 'false',
						listeners : {
							'change' : function(comp) {
								var retrospectiveValuation = comp.up('form').down('[itemId=retrospectiveValuation]');
								if (comp.getValue()) {
									retrospectiveValuation.show();
								} else {
									retrospectiveValuation.setRawValue('');
									retrospectiveValuation.hide();
								}
							}

						}
					} ]
				}, {
					xtype : 'textareafield',
					hidden : true,
					anchor : '73%',
					labelAlign : 'top',
					rows : 1,
					itemId : 'retrospectiveValuation',
					fieldLabel : 'Мета ретроспективної оцінки',
					name : 'retrospectiveValuation'
				}, {
					xtype : 'textareafield',
					fieldLabel : 'Додаткова інформація, яка може істотно вплинути на результат оцінки',
					anchor : '73%',
					labelAlign : 'top',
					name : 'addInfo',
					rows : 1,
					flex : 1
				}, {
					xtype : 'fieldset',
					layout : 'anchor',
					title : 'Аналоги',
					items : [ {
						xtype : 'grid',
						store : storeOV2Analogue,
						selType : 'rowmodel',
						anchor : '100%',
						columnLines : true,
						itemId : 'gridOV2Analogue',
						tbar : [ {
							text : 'Додати',
							iconCls : 'add',
							itemId : 'addOVHouse2Analogue'
						}, '->', {
							html : '<b>Аналоги</b>'
						} ],
						dockedItems : [ {
							xtype : 'pagingtoolbar',
							dock : 'bottom',
							store : storeOV2Analogue,
							displayInfo : true
						} ],
						columns : me.buildColumns()
					} ]

				}, {
					xtype : 'fieldset',
					layout : 'anchor',
					collapsible : true,
					collapsed : true,
					title : 'Коефіціенти коригування',
					listeners : {
						beforeexpand : function(comp) {
							me.onExpandCorr(comp);
						}

					},
					items : [ {
						xtype : 'container',
						layout : 'anchor',
						items : [ {
							xtype : 'container',
							anchor : '70%',
							defaults : {
								margin : '2 2 2 2',
								flex : 1,
								xtype : 'label',
								style : 'font-weight: bold;'
							},
							layout : {
								type : 'hbox',
								align : 'stretch',
								defaultMargins : {
									top : 0,
									right : 0,
									bottom : 0,
									left : 0
								}
							},
							items : [ {
								flex : 3,
								text : 'Назва коригування'
							}, {
								text : 'Аналог №1'
							}, {
								text : 'Аналог №2'
							}, {
								text : 'Аналог №3'
							}, {
								text : 'Аналог №4'
							} ]
						}, {
							xtype : 'container',
							anchor : '70%',
							defaults : {
								margin : '2 2 2 2',
								flex : 1,
								xtype : 'textfield',
								enableKeyEvents : true,
								fieldLabel : '',
								value : '1.00',
								vtype : 'isIntFloat'
							},
							layout : {
								type : 'hbox',
								align : 'stretch'
							},
							items : [ {
								xtype : 'label',
								flex : 3,
								text : 'На торг'
							}, {
								itemId : 'an1corrOnBargain',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(1, comp);
									}
								}
							}, {
								itemId : 'an2corrOnBargain',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(2, comp);
									}
								}
							}, {
								itemId : 'an3corrOnBargain',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(3, comp);
									}
								}
							}, {
								itemId : 'an4corrOnBargain',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(4, comp);
									}
								}
							} ]
						}, {
							xtype : 'container',
							anchor : '70%',
							defaults : {
								margin : '2 2 2 2',
								flex : 1,
								xtype : 'textfield',
								enableKeyEvents : true,
								fieldLabel : '',
								value : '1.00',
								vtype : 'isIntFloat'
							},
							layout : {
								type : 'hbox',
								align : 'stretch'
							},
							items : [ {
								xtype : 'label',
								flex : 3,
								text : 'на дату пропозиції'
							}, {
								itemId : 'an1corrOnDate',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(1, comp);
									}
								}
							}, {
								itemId : 'an2corrOnDate',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(2, comp);
									}
								}
							}, {
								itemId : 'an3corrOnDate',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(3, comp);
									}
								}
							}, {
								itemId : 'an4corrOnDate',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(4, comp);
									}
								}
							} ]
						}, {
							xtype : 'container',
							anchor : '70%',
							defaults : {
								margin : '2 2 2 2',
								flex : 1,
								xtype : 'textfield',
								enableKeyEvents : true,
								vtype : 'isIntFloat',
								fieldLabel : '',
								value : '1.00'
							},
							layout : {
								type : 'hbox',
								align : 'stretch'
							},
							items : [ {
								xtype : 'label',
								flex : 3,
								text : 'На стан обробки приміщень'
							}, {
								itemId : 'an1corrOnCondition',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(1, comp);
									}
								}
							}, {
								itemId : 'an2corrOnCondition',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(2, comp);
									}
								}
							}, {
								itemId : 'an3corrOnCondition',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(3, comp);
									}
								}
							}, {
								itemId : 'an4corrOnCondition',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(4, comp);
									}
								}
							} ]
						}, {
							xtype : 'container',
							anchor : '70%',
							defaults : {
								vtype : 'isIntFloat',
								margin : '2 2 2 2',
								flex : 1,
								xtype : 'textfield',
								enableKeyEvents : true,
								fieldLabel : '',
								value : '1.00'
							},
							layout : {
								type : 'hbox',
								align : 'stretch'
							},
							items : [ {
								xtype : 'label',
								flex : 3,
								text : 'На рік побудови'
							}, {
								itemId : 'an1corrOnYear',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(1, comp);
									}
								}
							}, {
								itemId : 'an2corrOnYear',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(2, comp);
									}
								}
							}, {
								itemId : 'an3corrOnYear',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(3, comp);
									}
								}
							}, {
								itemId : 'an4corrOnYear',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(4, comp);
									}
								}
							} ]
						}, {
							xtype : 'container',
							anchor : '70%',
							defaults : {
								vtype : 'isIntFloat',
								margin : '2 2 2 2',
								flex : 1,
								xtype : 'textfield',
								enableKeyEvents : true,
								fieldLabel : '',
								value : '1.00'
							},
							layout : {
								type : 'hbox',
								align : 'stretch'
							},
							items : [ {
								xtype : 'label',
								flex : 3,
								text : 'На якість будівельних і оздоблювальних матеріалів'
							}, {
								itemId : 'an1corrOnMaterialQuality',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(1, comp);
									}
								}
							}, {
								itemId : 'an2corrOnMaterialQuality',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(2, comp);
									}
								}
							}, {
								itemId : 'an3corrOnMaterialQuality',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(3, comp);
									}
								}
							}, {
								itemId : 'an4corrOnMaterialQuality',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(4, comp);
									}
								}
							} ]
						}, {
							xtype : 'container',
							anchor : '70%',
							defaults : {
								vtype : 'isIntFloat',
								margin : '2 2 2 2',
								flex : 1,
								xtype : 'textfield',
								enableKeyEvents : true,
								fieldLabel : '',
								value : '1.00'
							},
							layout : {
								type : 'hbox',
								align : 'stretch'

							},
							items : [ {
								xtype : 'label',
								flex : 3,
								text : 'На архітектурно-планувальні рішення'
							}, {
								itemId : 'an1corrOnArchitecture',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(1, comp);
									}
								}
							}, {
								itemId : 'an2corrOnArchitecture',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(2, comp);
									}
								}
							}, {
								itemId : 'an3corrOnArchitecture',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(3, comp);
									}
								}
							}, {
								itemId : 'an4corrOnArchitecture',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(4, comp);
									}
								}
							} ]
						}, {
							xtype : 'container',
							anchor : '70%',
							defaults : {
								vtype : 'isIntFloat',
								margin : '2 2 2 2',
								flex : 1,
								xtype : 'textfield',
								enableKeyEvents : true,
								fieldLabel : '',
								value : '1.00'
							},
							layout : {
								type : 'hbox',
								align : 'stretch'
							},
							items : [ {
								xtype : 'label',
								flex : 3,
								text : 'На ступінь готовності та рівень оздоблення'
							}, {
								itemId : 'an1corrOnReadinessRate',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(1, comp);
									}
								}
							}, {
								itemId : 'an2corrOnReadinessRate',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(2, comp);
									}
								}
							}, {
								itemId : 'an3corrOnReadinessRate',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(3, comp);
									}
								}
							}, {
								itemId : 'an4corrOnReadinessRate',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(4, comp);
									}
								}
							} ]
						}, {
							xtype : 'container',
							anchor : '70%',
							defaults : {
								vtype : 'isIntFloat',
								margin : '2 2 2 2',
								flex : 1,
								xtype : 'textfield',
								enableKeyEvents : true,
								fieldLabel : '',
								value : '1.00'
							},
							layout : {
								type : 'hbox',
								align : 'stretch'
							},
							items : [ {
								xtype : 'label',
								flex : 3,
								text : 'На наявність меблів, техніки та іншого рухомого майна'
							}, {
								itemId : 'an1corrOnFurniture',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(1, comp);
									}
								}
							}, {
								itemId : 'an2corrOnFurniture',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(2, comp);
									}
								}
							}, {
								itemId : 'an3corrOnFurniture',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(3, comp);
									}
								}
							}, {
								itemId : 'an4corrOnFurniture',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(4, comp);
									}
								}
							} ]
						}, {
							xtype : 'container',
							anchor : '70%',
							defaults : {
								vtype : 'isIntFloat',
								margin : '2 2 2 2',
								flex : 1,
								xtype : 'textfield',
								enableKeyEvents : true,
								fieldLabel : '',
								value : '1.00'

							},
							layout : {
								type : 'hbox',
								align : 'stretch'
							},
							items : [ {
								xtype : 'label',
								flex : 3,
								text : 'На відношення площі земельної ділянки до загальної площі будинку'
							}, {
								itemId : 'an1corrOnAreaRatio',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(1, comp);
									}
								}
							}, {
								itemId : 'an2corrOnAreaRatio',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(2, comp);
									}
								}
							}, {
								itemId : 'an3corrOnAreaRatio',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(3, comp);
									}
								}
							}, {
								itemId : 'an4corrOnAreaRatio',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(4, comp);
									}
								}
							} ]
						}, {
							xtype : 'container',
							anchor : '70%',
							defaults : {
								vtype : 'isIntFloat',
								margin : '2 2 2 2',
								flex : 1,
								xtype : 'textfield',
								enableKeyEvents : true,
								fieldLabel : '',
								value : '1.00'
							},
							layout : {
								type : 'hbox',
								align : 'stretch'
							},
							items : [ {
								xtype : 'label',
								flex : 3,
								text : 'На місце розташування'
							}, {
								itemId : 'an1corrOnLocation',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(1, comp);
									}
								}
							}, {
								itemId : 'an2corrOnLocation',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(2, comp);
									}
								}
							}, {
								itemId : 'an3corrOnLocation',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(3, comp);
									}
								}
							}, {
								itemId : 'an4corrOnLocation',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(4, comp);
									}
								}
							} ]
						}, {
							xtype : 'container',
							anchor : '70%',
							defaults : {
								vtype : 'isIntFloat',
								margin : '2 2 2 2',
								flex : 1,
								xtype : 'textfield',
								enableKeyEvents : true,
								fieldLabel : '',
								value : '1.00'
							},
							layout : {
								type : 'hbox',
								align : 'stretch'
							},
							items : [ {
								xtype : 'label',
								flex : 3,
								text : 'На різницю в комунікаціях'
							}, {
								itemId : 'an1corrOnCom',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(1, comp);
									}
								}
							}, {
								itemId : 'an2corrOnCom',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(2, comp);
									}
								}
							}, {
								itemId : 'an3corrOnCom',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(3, comp);
									}
								}
							}, {
								itemId : 'an4corrOnCom',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(4, comp);
									}
								}
							} ]
						}, {
							xtype : 'container',
							anchor : '70%',
							defaults : {
								vtype : 'isIntFloat',
								margin : '2 2 2 2',
								flex : 1,
								xtype : 'textfield',
								enableKeyEvents : true,
								fieldLabel : '',
								value : '1.00'
							},
							layout : {
								type : 'hbox',
								align : 'stretch'
							},
							items : [ {
								xtype : 'label',
								flex : 3,
								text : 'На стан конструктивних ел. Будівлі'
							}, {
								itemId : 'an1corrOnConstructState',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(1, comp);
									}
								}
							}, {
								itemId : 'an2corrOnConstructState',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(2, comp);
									}
								}
							}, {
								itemId : 'an3corrOnConstructState',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(3, comp);
									}
								}
							}, {
								itemId : 'an4corrOnConstructState',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(4, comp);
									}
								}
							} ]
						}, {
							xtype : 'container',
							anchor : '70%',
							defaults : {
								vtype : 'isIntFloat',
								margin : '2 2 2 2',
								flex : 1,
								xtype : 'textfield',
								enableKeyEvents : true,
								fieldLabel : '',
								value : '1.00'
							},
							layout : {
								type : 'hbox',
								align : 'stretch'
							},
							items : [ {
								xtype : 'label',
								flex : 3,
								text : 'На правовий статус земельної ділянки'
							}, {
								itemId : 'an1corrOnLandRights',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(1, comp);
									}
								}
							}, {
								itemId : 'an2corrOnLandRights',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(2, comp);
									}
								}
							}, {
								itemId : 'an3corrOnLandRights',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(3, comp);
									}
								}
							}, {
								itemId : 'an4corrOnLandRights',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(4, comp);
									}
								}
							} ]
						}, {
							xtype : 'container',
							anchor : '70%',
							defaults : {
								vtype : 'isIntFloat',
								margin : '2 2 2 2',
								flex : 1,
								xtype : 'textfield',
								enableKeyEvents : true,
								fieldLabel : '',
								value : '1.00'
							},
							layout : {
								type : 'hbox',
								align : 'stretch'
							},
							items : [ {
								xtype : 'label',
								flex : 3,
								text : 'На вартість зем. ділянки '
							}, {
								itemId : 'an1corrOnplotCost',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(1, comp);
									}
								}
							}, {
								itemId : 'an2corrOnplotCost',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(2, comp);
									}
								}
							}, {
								itemId : 'an3corrOnplotCost',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(3, comp);
									}
								}
							}, {
								itemId : 'an4corrOnplotCost',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(4, comp);
									}
								}
							} ]
						}, {
							xtype : 'container',
							anchor : '70%',
							defaults : {
								vtype : 'isIntFloat',
								margin : '2 2 2 2',
								flex : 1,
								xtype : 'textfield',
								enableKeyEvents : true,
								fieldLabel : '',
								value : '1.00'
							},
							layout : {
								type : 'hbox',
								align : 'stretch'
							},
							items : [ {
								xtype : 'label',
								flex : 3,
								text : 'Інше коригування'
							}, {
								itemId : 'an1corrOther',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(1, comp);
									}
								}
							}, {
								itemId : 'an2corrOther',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(2, comp);
									}
								}
							}, {
								itemId : 'an3corrOther',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(3, comp);
									}
								}
							}, {
								itemId : 'an4corrOther',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(4, comp);
									}
								}
							} ]
						}, {
							xtype : 'container',
							anchor : '70%',
							defaults : {
								vtype : 'isIntFloat',
								margin : '2 2 2 2',
								flex : 1,
								readOnly : true,
								fieldCls : 'body-style-readOnly',
								xtype : 'textfield',
								style : 'font-weight: bold;'
							},
							layout : {
								type : 'hbox',
								align : 'stretch'
							},
							items : [ {
								xtype : 'label',
								flex : 3,
								text : 'Загальне коригування'
							}, {
								itemId : 'an1totalCorr'
							}, {
								itemId : 'an2totalCorr'
							}, {
								itemId : 'an3totalCorr'
							}, {
								itemId : 'an4totalCorr'
							} ]
						}, {
							xtype : 'container',
							anchor : '70%',
							defaults : {
								vtype : 'isIntFloat',
								margin : '2 2 2 2',
								flex : 1,
								readOnly : true,
								fieldCls : 'body-style-readOnly',
								xtype : 'textfield',
								style : 'font-weight: bold;'
							},
							layout : {
								type : 'hbox',
								align : 'stretch'
							},
							items : [ {
								xtype : 'label',
								flex : 3,
								text : 'Вартість зем. ділянки'
							}, {
								itemId : 'an1plotCost'
							}, {
								itemId : 'an2plotCost'
							}, {
								itemId : 'an3plotCost'
							}, {
								itemId : 'an4plotCost'
							} ]
						}, {
							xtype : 'container',
							anchor : '70%',
							defaults : {
								vtype : 'isIntFloat',
								margin : '2 2 2 2',
								flex : 1,
								readOnly : true,
								fieldCls : 'body-style-readOnly',
								xtype : 'textfield',
								style : 'font-weight: bold;'
							},
							layout : {
								type : 'hbox',
								align : 'stretch'
							},
							items : [ {
								xtype : 'label',
								flex : 3,
								text : 'Відкоригована вартість'
							}, {
								itemId : 'an1costCorrected',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(1, comp);
									}
								}
							}, {
								itemId : 'an2costCorrected',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(2, comp);
									}
								}
							}, {
								itemId : 'an3costCorrected',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(2, comp);
									}
								}
							}, {
								itemId : 'an4costCorrected',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(2, comp);
									}
								}
							} ]
						} ]
					} ]

				}, {
					xtype : 'fieldset',
					layout : 'anchor',
					title : 'Статистичні показники',
					items : [ {
						xtype : 'container',
						anchor : '100%',
						defaults : {
							xtype : 'textfield',
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
							flex : 1,
							fieldLabel : 'Мінімум',
							itemId : 'statsMinId',
							fieldCls : 'body-style-readOnly',
							readOnly : true,
							name : 'statsMin',
							afterLabelTextTpl : pf.utils.Validation.required
						}, {
							flex : 1,
							fieldLabel : 'Максимум',
							itemId : 'statsMaxId',

							fieldCls : 'body-style-readOnly',
							readOnly : true,
							name : 'statsMax',
							afterLabelTextTpl : pf.utils.Validation.required
						}, {
							flex : 1,
							fieldLabel : 'Середнє',
							itemId : 'statsMidId',
							fieldCls : 'body-style-readOnly',
							readOnly : true,
							name : 'statsMid',
							afterLabelTextTpl : pf.utils.Validation.required
						}, {
							flex : 1,
							fieldLabel : 'Медіана',
							itemId : 'medianaId',
							fieldCls : 'body-style-readOnly',
							readOnly : true,
							name : 'statsMed',
							afterLabelTextTpl : pf.utils.Validation.required
						} ]
					} ]
				}, {
					xtype : 'fieldset',
					layout : 'anchor',
					title : 'Оціночна вартість',
					items : [ {
						xtype : 'container',
						itemId : 'contOZ',
						anchor : '100%',
						defaults : {
							xtype : 'textfield',
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
							flex : 1,
							fieldLabel : 'Загальна площа, кв.м.',
							itemId : 'areaAllId',
							emptyText : '0.00',
							name : 'areaAll',
							fieldCls : 'body-style-readOnly',
							readOnly : true,
							afterLabelTextTpl : pf.utils.Validation.required,
							listeners : {
								'change' : function(comp) {
									me.calcValuationCost(comp);
								}
							}
						}, {
							flex : 1,
							fieldLabel : 'Курс грн./дол.',
							vtype : 'isIntFloat4',
							itemId : 'currencyRateId',
							emptyText : '0.0000',
							name : 'currencyRate',
							value : '1.00',
							listeners : {
								'change' : function(comp) {
									me.calcValuationCost(comp);
								}
							},
							afterLabelTextTpl : pf.utils.Validation.required
						}, {
							flex : 1,
							fieldLabel : 'Доларів США',
							fieldCls : 'body-style-readOnly',
							readOnly : true,
							itemId : 'valuationCostUSDId',
							name : 'valuationCostUSD',
							afterLabelTextTpl : pf.utils.Validation.required
						}, {
							flex : 1,
							fieldLabel : 'Гривень',
							fieldCls : 'body-style-readOnly',
							readOnly : true,
							itemId : 'valuationCostUAHId',
							name : 'valuationCostUAH',
							afterLabelTextTpl : pf.utils.Validation.required
						} /*
							 * , { flex : 2, xtype : 'button', margin : '18 0 0
							 * 0', text : 'Розрахувати оціночну вартість',
							 * formBind : false, cls : 'btnSave', itemId :
							 * 'calcValuationCost' }
							 */]
					} ]

				} ]
			} ]
		});
		me.callParent(arguments);
	},

	buildColumns : function() {
		return [ {
			xtype : 'rownumberer'
		}, {
			header : 'id',
			dataIndex : 'id',
			hidden : true,
			hideable : false
		}, {
			text : 'Дата пропозиції',
			dataIndex : 'proposeDate',
			flex : 1
		}, {
			text : 'Населений пункт',
			dataIndex : 'location',
			flex : 3
		}, {
			text : 'Адреса',
			dataIndex : 'address',
			flex : 2
		}, {
			text : 'Джерело',
			dataIndex : 'origin',
			flex : 3,
			hidden : true
		}, {
			text : 'Площа, кв.м.',
			dataIndex : 'area',
			flex : 1
		}, {
			text : 'Приватизована </br> земельна </br> ділянка',
			flex : 1,
			dataIndex : 'isPrivateLand',
			renderer : function(value, metaData, record, row, col, store, gridView) {
				var value = (value) ? 'Так' : 'Ні';
				return value;
			}
		}, {
			text : 'Площа </br> земельної </br> ділянки',
			dataIndex : 'plotArea',
			flex : 1
		}, {
			text : 'Вартість, дол.',
			dataIndex : 'costAll',
			flex : 1
		}, {
			text : 'Вартість, дол./кв.м.',
			dataIndex : 'costMetre',
			flex : 1
		}, {
			xtype : 'actioncolumn',
			items : [ {
				iconCls : 'delete',
				handler : function(grid, rowIndex, colIndex) {
					var rec = grid.getStore().getAt(rowIndex), store = grid.getStore();
					store.remove(rec);
					var form = grid.up('form');
					form.down('[name=statsMin]').setValue('');
					form.down('[name=statsMax]').setValue('');
					form.down('[name=statsMid]').setValue('');
					form.down('[name=statsMed]').setValue('');

					form.down('[name=valuationCostUAH]').setValue('');
					form.down('[name=valuationCostUSD]').setValue('');

				},
				scope : this
			} ],
			width : '10px',
			align : 'center'
		} ];
	},
	onChangeCorr : function(anN, comp) {
		var me = this;
		me.calcAncorr(anN, comp)
	},
	calcAncorr : function(anN, comp) {
		var corrOnBargain = parseFloat(comp.up('form').down('[itemId=an' + anN + 'corrOnBargain]').getValue());
		var corrOnDate = parseFloat(comp.up('form').down('[itemId=an' + anN + 'corrOnDate]').getValue());
		var corrOnCondition = parseFloat(comp.up('form').down('[itemId=an' + anN + 'corrOnCondition]').getValue());
		var corrOnYear = parseFloat(comp.up('form').down('[itemId=an' + anN + 'corrOnYear]').getValue());
		var corrOnMaterialQuality = parseFloat(comp.up('form').down('[itemId=an' + anN + 'corrOnMaterialQuality]').getValue());
		var corrOnArchitecture = parseFloat(comp.up('form').down('[itemId=an' + anN + 'corrOnArchitecture]').getValue());
		var corrOnReadinessRate = parseFloat(comp.up('form').down('[itemId=an' + anN + 'corrOnReadinessRate]').getValue());
		var corrOnFurniture = parseFloat(comp.up('form').down('[itemId=an' + anN + 'corrOnFurniture]').getValue());
		var corrOnAreaRatio = parseFloat(comp.up('form').down('[itemId=an' + anN + 'corrOnAreaRatio]').getValue());
		var corrOnLocation = parseFloat(comp.up('form').down('[itemId=an' + anN + 'corrOnLocation]').getValue());
		var corrOnCom = parseFloat(comp.up('form').down('[itemId=an' + anN + 'corrOnCom]').getValue());
		var corrOnConstructState = parseFloat(comp.up('form').down('[itemId=an' + anN + 'corrOnConstructState]').getValue());
		var corrOnLandRights = parseFloat(comp.up('form').down('[itemId=an' + anN + 'corrOnLandRights]').getValue());
		var corrOnplotCost = parseFloat(comp.up('form').down('[itemId=an' + anN + 'corrOnplotCost]').getValue());
		var corrOther = parseFloat(comp.up('form').down('[itemId=an' + anN + 'corrOther]').getValue());

		var totalCorr = this.calcTotalCorr([ corrOnBargain, corrOnDate, corrOnCondition, corrOnYear, corrOnMaterialQuality, corrOnArchitecture, corrOnReadinessRate, corrOnFurniture, corrOnAreaRatio, corrOnLocation, corrOnCom, corrOnConstructState, corrOnLandRights, corrOnplotCost, corrOther ]);
		var costCorrected = this.calcCostCorrected(comp.up('form').down('[itemId=gridOV2Analogue]'), anN, totalCorr);
		comp.up('form').down('[itemId=an' + anN + 'totalCorr]').setValue(totalCorr);
		// comp.up('form').down('[itemId=an' + anN +
		// 'costCorrected]').setValue(costCorrected);
		this.calcStats(comp.up('form').down('[itemId=gridOV2Analogue]'));
		this.calcValuationCost(comp.up('form').down('[itemId=gridOV2Analogue]'));
	},
	calcTotalCorr : function(corrs) {
		var res = 1;
		for ( var i = 0; i < corrs.length; i++) {
			res = res * corrs[i];
		}

		return res.toFixed(2);
	},
	calcCostCorrected : function(OV2Analogue, anN, totalCorr) {
		var me = this, form = me, analogueStore = OV2Analogue.getStore();
		var items = analogueStore.data.items;
		if (items.length < 4) {
			return;
		}
		// значение общей стоимости по аналогу
		var costAll = items[anN - 1].get('costAll');

		// Площа дома кв.м. (берется из соответствующего аналога)
		var area = items[anN - 1].get('area');
		if (!area) {
			area = 1;
		}
		// Вартість зем. Ділянки
		var plotCost = form.down('[itemId=an' + anN + 'plotCost]').getRawValue();
		if (!plotCost) {
			plotCost = 0;
		}
		// Загальне коригування
		// var totalCorr = form.down('[itemId=an' + anN +
		// 'totalCorr]').getRawValue();
		// Відкоригована вартість

		var costCorrected = ((costAll - plotCost) / area) * totalCorr;
		form.down('[itemId=an' + anN + 'costCorrected]').setValue(costCorrected.toFixed(2));

		// return parseFloat(costCorrected).toFixed(2);
	},
	calcStats : function(OV2Analogue) {
		var form = OV2Analogue.up('form'), midCost = 0, medCost = 0, cost = [];
		var maxItemId, minItemId, maxCost, minCost;
		for ( var i = 1; i <= 4; i++) {
			costCorrected = parseFloat(form.down('[itemId=an' + i + 'costCorrected]').getRawValue());

			if (!costCorrected) {
				continue;
			}
			if (!maxCost) {
				maxCost = costCorrected;
				maxItemId = 'an' + i + 'costCorrected';
			}
			if (!minCost) {
				minCost = costCorrected;
				minItemId = 'an' + i + 'costCorrected';
			}
			midCost = midCost + costCorrected;
			cost.push(costCorrected);
			if (maxCost < costCorrected) {
				maxCost = costCorrected;
				maxItemId = 'an' + i + 'costCorrected';

			}
			if (minCost > costCorrected) {
				minCost = costCorrected;
				minItemId = 'an' + i + 'costCorrected';
			}

		}
		for ( var i = 1; i <= 4; i++) {
			if (('an' + i + 'costCorrected' != maxItemId) && ('an' + i + 'costCorrected' != minItemId) && (form.down('[itemId=an' + i + 'costCorrected]').getRawValue() != '')) {
				medCost = medCost + parseFloat(form.down('[itemId=an' + i + 'costCorrected]').getRawValue());

			}
		}
		form.down('[itemId=statsMidId]').setRawValue((midCost / 4).toFixed(2));
		form.down('[itemId=medianaId]').setRawValue((medCost / 2).toFixed(2));
		form.down('[itemId=statsMinId]').setRawValue(minCost);
		form.down('[itemId=statsMaxId]').setRawValue(maxCost);
	},
	calcValuationCost : function(comp) {
		var form = comp.up('form');
		var maxVal = 0, values = form.getValues(), statsMed = parseFloat(form.down('[itemId=medianaId]').getValue()), statsMid = parseFloat(form.down('[itemId=statsMidId]').getValue());
		if (statsMed > statsMid) {
			maxVal = statsMed;
		} else {
			maxVal = statsMid;
		}
		area = parseFloat(form.down('[itemId=areaAllId]').getValue());
		rate = parseFloat(form.down('[itemId=currencyRateId]').getValue());
		form.down('[itemId=valuationCostUAHId]').setRawValue((area * rate * maxVal).toFixed(2));
		form.down('[itemId=valuationCostUSDId]').setRawValue((area * maxVal).toFixed(2));

	},
	onExpandCorr : function(comp) {
		var grid = comp.up('form').down('[itemId=gridOV2Analogue]');
		var values = grid.getStore().data.items, cost = [];
		this.calcAnalogueplotCost(comp);
		if (values.length < 4) {
			Ext.MessageBox.show({
				title : errorType.error,
				msg : validMsg.calcStatsAnalogueCountError,
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.ERROR
			});
			return false;
		}
	},
	calcAnalogueplotCost : function(comp) {
		var form = comp.up('form'), grid = form.down('[itemId=gridOV2Analogue]'), costLandSquareM = form.down('[itemId=costLandSquareM]').getRawValue();
		// console.log(costLandSquareM)
		var items = grid.getStore().data.items;
		for ( var i = 0; i < items.length; i++) {
			var plotArea = items[i].get('plotArea');
			// console.log(plotArea)
			if (plotArea == '') {
				continue;
			}
			var anNum = i + 1;
			form.down('[itemId=an' + anNum + 'plotCost]').setValue(parseFloat((plotArea * costLandSquareM).toFixed(2)));
		}

	}

})