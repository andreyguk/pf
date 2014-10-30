Ext.require([ 'Ext.selection.CellModel' ]);
Ext.define('pf.view.form.card.ov.land.TabAdditionalInfo', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.ov.land.tabAdditionalInfo',
	listeners : {
		show : function() {
			var me = this;
			if (me.$className == 'pf.view.form.card.ov.simple.OVSimpleCard') {
				return;
			}
			var mask = new Ext.LoadMask(Ext.getBody(), {
				msg : "Будь ласка, зачекайте ..."
			});

			mask.show();
			Ext.Ajax.request({
				url : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.Read.cls',
				params : {
					classname : 'correctionsLand',
					objectValuation : me.ovID
				},

				success : function(response, options) {
					var result = Ext.decode(response.responseText);
					if (result.success) {
						if (result.total === 0) {
							mask.hide();
							return;
						}
						me.down('[itemId=an1corrOnBargain]').setValue(result.data[0].an1corrOnBargain);
						me.down('[itemId=an1corrOnArea]').setValue(result.data[0].an1corrOnArea);
						me.down('[itemId=an1corrOnLandImprovements]').setValue(result.data[0].an1corrOnLandImprovements);
						me.down('[itemId=an1corrOnLandRights]').setValue(result.data[0].an1corrOnLandRights);
						me.down('[itemId=an1corrOnLandPurpose]').setValue(result.data[0].an1corrOnLandPurpose);
						me.down('[itemId=an1corrOnLocation]').setValue(result.data[0].an1corrOnLocation);
						me.down('[itemId=an1corrOnLandDescr]').setValue(result.data[0].an1corrOnLandDescr);
						me.down('[itemId=an1corrOnCom]').setValue(result.data[0].an1corrOnCom);
						me.down('[itemId=an1corrOnLandTransport]').setValue(result.data[0].an1corrOnLandTransport);
						me.down('[itemId=an1corrOnLandEnvironment]').setValue(result.data[0].an1corrOnLandEnvironment);
						me.down('[itemId=an1totalCorr]').setValue(result.data[0].an1totalCorr);
						me.down('[itemId=an1costCorrected]').setValue(result.data[0].an1costCorrected);

						me.down('[itemId=an2corrOnBargain]').setValue(result.data[0].an2corrOnBargain);
						me.down('[itemId=an2corrOnArea]').setValue(result.data[0].an2corrOnArea);
						me.down('[itemId=an2corrOnLandImprovements]').setValue(result.data[0].an2corrOnLandImprovements);
						me.down('[itemId=an2corrOnLandRights]').setValue(result.data[0].an2corrOnLandRights);
						me.down('[itemId=an2corrOnLandPurpose]').setValue(result.data[0].an2corrOnLandPurpose);
						me.down('[itemId=an2corrOnLocation]').setValue(result.data[0].an2corrOnLocation);
						me.down('[itemId=an2corrOnLandDescr]').setValue(result.data[0].an2corrOnLandDescr);
						me.down('[itemId=an2corrOnCom]').setValue(result.data[0].an2corrOnCom);
						me.down('[itemId=an2corrOnLandTransport]').setValue(result.data[0].an2corrOnLandTransport);
						me.down('[itemId=an2corrOnLandEnvironment]').setValue(result.data[0].an2corrOnLandEnvironment);
						me.down('[itemId=an2totalCorr]').setValue(result.data[0].an2totalCorr);
						me.down('[itemId=an2costCorrected]').setValue(result.data[0].an2costCorrected);

						me.down('[itemId=an3corrOnBargain]').setValue(result.data[0].an3corrOnBargain);
						me.down('[itemId=an3corrOnArea]').setValue(result.data[0].an3corrOnArea);
						me.down('[itemId=an3corrOnLandImprovements]').setValue(result.data[0].an3corrOnLandImprovements);
						me.down('[itemId=an3corrOnLandRights]').setValue(result.data[0].an3corrOnLandRights);
						me.down('[itemId=an3corrOnLandPurpose]').setValue(result.data[0].an3corrOnLandPurpose);
						me.down('[itemId=an3corrOnLocation]').setValue(result.data[0].an3corrOnLocation);
						me.down('[itemId=an3corrOnLandDescr]').setValue(result.data[0].an3corrOnLandDescr);
						me.down('[itemId=an3corrOnCom]').setValue(result.data[0].an3corrOnCom);
						me.down('[itemId=an3corrOnLandTransport]').setValue(result.data[0].an3corrOnLandTransport);
						me.down('[itemId=an3corrOnLandEnvironment]').setValue(result.data[0].an3corrOnLandEnvironment);
						me.down('[itemId=an3totalCorr]').setValue(result.data[0].an3totalCorr);
						me.down('[itemId=an3costCorrected]').setValue(result.data[0].an3costCorrected);

						me.down('[itemId=an4corrOnBargain]').setValue(result.data[0].an4corrOnBargain);
						me.down('[itemId=an4corrOnArea]').setValue(result.data[0].an4corrOnArea);
						me.down('[itemId=an4corrOnLandImprovements]').setValue(result.data[0].an4corrOnLandImprovements);
						me.down('[itemId=an4corrOnLandRights]').setValue(result.data[0].an4corrOnLandRights);
						me.down('[itemId=an4corrOnLandPurpose]').setValue(result.data[0].an4corrOnLandPurpose);
						me.down('[itemId=an4corrOnLocation]').setValue(result.data[0].an4corrOnLocation);
						me.down('[itemId=an4corrOnLandDescr]').setValue(result.data[0].an4corrOnLandDescr);
						me.down('[itemId=an4corrOnCom]').setValue(result.data[0].an4corrOnCom);
						me.down('[itemId=an4corrOnLandTransport]').setValue(result.data[0].an4corrOnLandTransport);
						me.down('[itemId=an4corrOnLandEnvironment]').setValue(result.data[0].an4corrOnLandEnvironment);
						me.down('[itemId=an4totalCorr]').setValue(result.data[0].an4totalCorr);
						me.down('[itemId=an4costCorrected]').setValue(result.data[0].an4costCorrected);

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
						anchor : '100%',
						flex : 1,
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
							// html : '<a
							// href="pf.proxy.manager.FileManager.cls?objType=ov&objId='
							// + me.ovID + '">' + '<b>' + me.contractNum +
							// '</b>' + '</a>',
							html : '<a href="pf.printForms.pdf.OVLand.cls?ovId=' + me.ovID + '"target="_blank""> ' + '<b>' + me.contractNum + '</b>' + '</a>',
							margin : '0 20 0 0'
						} ]
					}, {
						xtype : 'container',
						hidden : !(me.attachmentDocs),
						anchor : '100%',
						flex : 3,
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
							margin : '0 0 0 0'
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
						margin : '0 25 0 0',
						labelAlign : 'top',
						msgTarget : 'side',
						afterLabelTextTpl : pf.utils.Validation.required,
						allowBlank : false,
						fieldLabel : 'Оцінювач',
						itemId : 'valuatorId',
						store : storeValuator,
						name : 'valuator',
						queryMode : 'remote',
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
				},

				{
					xtype : 'checkboxgroup',
					columns : 1,
					margin : '10 0 0 0',
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
							itemId : 'addOVLand2Analogue'
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
							me.onExpandCorr(comp)
						}

					},
					items : [ {
						xtype : 'container',
						layout : 'anchor',
						items : [ {
							xtype : 'container',
							anchor : '65%',
							defaults : {
								margin : '2 2 2 2',
								flex : 1,
								xtype : 'label'
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
							anchor : '65%',
							defaults : {
								margin : '2 2 2 2',
								flex : 1,
								xtype : 'textfield',
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
									'change' : function(comp, newValue) {
										me.onChangeCorr(1, comp)
									}
								}
							}, {
								itemId : 'an2corrOnBargain',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(2, comp)
									}
								}
							}, {
								itemId : 'an3corrOnBargain',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(3, comp)
									}
								}
							}, {
								itemId : 'an4corrOnBargain',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(4, comp)
									}
								}
							} ]
						}, {
							xtype : 'container',
							anchor : '65%',
							defaults : {
								margin : '2 2 2 2',
								flex : 1,
								xtype : 'textfield',
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
								text : 'На площу'
							}, {
								itemId : 'an1corrOnArea',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(1, comp)
									}
								}
							}, {
								itemId : 'an2corrOnArea',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(2, comp)
									}
								}
							}, {
								itemId : 'an3corrOnArea',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(3, comp)
									}
								}
							}, {
								itemId : 'an4corrOnArea',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(4, comp)
									}
								}
							} ]
						}, {
							xtype : 'container',
							anchor : '65%',
							defaults : {
								margin : '2 2 2 2',
								flex : 1,
								xtype : 'textfield',
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
								text : 'На наявність земельних поліпшень'
							}, {
								itemId : 'an1corrOnLandImprovements',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(1, comp)
									}
								}
							}, {
								itemId : 'an2corrOnLandImprovements',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(2, comp)
									}
								}
							}, {
								itemId : 'an3corrOnLandImprovements',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(3, comp)
									}
								}
							}, {
								itemId : 'an4corrOnLandImprovements',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(4, comp)
									}
								}
							} ]
						}, {
							xtype : 'container',
							anchor : '65%',
							defaults : {
								margin : '2 2 2 2',
								flex : 1,
								xtype : 'textfield',
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
								text : 'На правовий статус зем. ділянки'
							}, {
								itemId : 'an1corrOnLandRights',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(1, comp)
									}
								}
							}, {
								itemId : 'an2corrOnLandRights',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(2, comp)
									}
								}
							}, {
								itemId : 'an3corrOnLandRights',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(3, comp)
									}
								}
							}, {
								itemId : 'an4corrOnLandRights',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(4, comp)
									}
								}
							} ]
						}, {
							xtype : 'container',
							anchor : '65%',
							defaults : {
								vtype : 'isIntFloat',
								margin : '2 2 2 2',
								flex : 1,
								xtype : 'textfield',
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
								text : 'На цільове призначення'
							}, {
								itemId : 'an1corrOnLandPurpose',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(1, comp)
									}
								}
							}, {
								itemId : 'an2corrOnLandPurpose',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(2, comp)
									}
								}
							}, {
								itemId : 'an3corrOnLandPurpose',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(3, comp)
									}
								}
							}, {
								itemId : 'an4corrOnLandPurpose',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(4, comp)
									}
								}
							} ]
						}, {
							xtype : 'container',
							anchor : '65%',
							defaults : {
								vtype : 'isIntFloat',
								margin : '2 2 2 2',
								flex : 1,
								xtype : 'textfield',
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
								text : 'На місцерозташування'
							}, {
								itemId : 'an1corrOnLocation',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(1, comp)
									}
								}
							}, {
								itemId : 'an2corrOnLocation',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(2, comp)
									}
								}
							}, {
								itemId : 'an3corrOnLocation',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(3, comp)
									}
								}
							}, {
								itemId : 'an4corrOnLocation',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(4, comp)
									}
								}
							} ]
						}, {
							xtype : 'container',
							anchor : '65%',
							defaults : {
								vtype : 'isIntFloat',
								margin : '2 2 2 2',
								flex : 1,
								xtype : 'textfield',
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
								text : 'На відмінність у фізичних характеристиках ділянки (рельєф, нахил)'
							}, {
								itemId : 'an1corrOnLandDescr',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(1, comp)
									}
								}
							}, {
								itemId : 'an2corrOnLandDescr',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(2, comp)
									}
								}
							}, {
								itemId : 'an3corrOnLandDescr',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(3, comp)
									}
								}
							}, {
								itemId : 'an4corrOnLandDescr',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(4, comp)
									}
								}
							} ]
						}, {
							xtype : 'container',
							anchor : '65%',
							defaults : {
								vtype : 'isIntFloat',
								margin : '2 2 2 2',
								flex : 1,
								xtype : 'textfield',
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
								text : 'На інженерно-технічні комунікації'
							}, {
								itemId : 'an1corrOnCom',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(1, comp)
									}
								}
							}, {
								itemId : 'an2corrOnCom',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(2, comp)
									}
								}
							}, {
								itemId : 'an3corrOnCom',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(3, comp)
									}
								}
							}, {
								itemId : 'an4corrOnCom',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(4, comp)
									}
								}
							} ]
						}, {
							xtype : 'container',
							anchor : '65%',
							defaults : {
								vtype : 'isIntFloat',
								margin : '2 2 2 2',
								flex : 1,
								xtype : 'textfield',
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
								text : "На транспортну доступність ділянки (розміщення ділянки щодо вулиці, під'їзд)"
							}, {
								itemId : 'an1corrOnLandTransport',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(1, comp)
									}
								}
							}, {
								itemId : 'an2corrOnLandTransport',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(2, comp)
									}
								}
							}, {
								itemId : 'an3corrOnLandTransport',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(3, comp)
									}
								}
							}, {
								itemId : 'an4corrOnLandTransport',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(4, comp)
									}
								}
							} ]
						}, {
							xtype : 'container',
							anchor : '65%',
							defaults : {
								vtype : 'isIntFloat',
								margin : '2 2 2 2',
								flex : 1,
								xtype : 'textfield',
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
								text : 'На відмінність в оточенні ділянки'
							}, {
								itemId : 'an1corrOnLandEnvironment',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(1, comp)
									}
								}
							}, {
								itemId : 'an2corrOnLandEnvironment',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(2, comp)
									}
								}
							}, {
								itemId : 'an3corrOnLandEnvironment',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(3, comp)
									}
								}
							}, {
								itemId : 'an4corrOnLandEnvironment',
								listeners : {
									'change' : function(comp, newValue) {
										me.onChangeCorr(4, comp)
									}
								}
							} ]
						}, {
							xtype : 'container',
							anchor : '65%',
							defaults : {
								vtype : 'isIntFloat',
								margin : '2 2 2 2',
								flex : 1,
								readOnly : true,
								fieldCls : 'body-style-readOnly',
								xtype : 'textfield'
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
							anchor : '65%',
							defaults : {
								vtype : 'isIntFloat',
								margin : '2 2 2 2',
								flex : 1,
								readOnly : true,
								fieldCls : 'body-style-readOnly',
								xtype : 'textfield'
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
								itemId : 'an1costCorrected'
							}, {
								itemId : 'an2costCorrected'
							}, {
								itemId : 'an3costCorrected'
							}, {
								itemId : 'an4costCorrected'
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
							itemId : 'statsMedId',
							fieldCls : 'body-style-readOnly',
							readOnly : true,
							name : 'statsMed',
							afterLabelTextTpl : pf.utils.Validation.required
						} /*
							 * , { flex : 2, margin : '18 0 0 0', xtype :
							 * 'button', text : 'Розрахувати статистичні
							 * показники', formBind : false, cls : 'btnSave',
							 * itemId : 'calcStats' }
							 */]
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
							afterLabelTextTpl : pf.utils.Validation.required
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
			text : 'Цільове призначення </br> земельної ділянки',
			dataIndex : 'plotPurposeName',
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
		var corrOnArea = parseFloat(comp.up('form').down('[itemId=an' + anN + 'corrOnArea]').getValue());
		var corrOnDate = parseFloat(comp.up('form').down('[itemId=an' + anN + 'corrOnLandImprovements]').getValue());
		var corrOnFloor = parseFloat(comp.up('form').down('[itemId=an' + anN + 'corrOnLandRights]').getValue());
		var corrOnCondition = parseFloat(comp.up('form').down('[itemId=an' + anN + 'corrOnLandPurpose]').getValue());
		var corrOnLocation = parseFloat(comp.up('form').down('[itemId=an' + anN + 'corrOnLocation]').getValue());
		var corrOnBuildingType = parseFloat(comp.up('form').down('[itemId=an' + anN + 'corrOnLandDescr]').getValue());
		var corrOnWalls = parseFloat(comp.up('form').down('[itemId=an' + anN + 'corrOnCom]').getValue());
		var corrOnFurniture = parseFloat(comp.up('form').down('[itemId=an' + anN + 'corrOnLandTransport]').getValue());
		var corrOnCom = parseFloat(comp.up('form').down('[itemId=an' + anN + 'corrOnLandEnvironment]').getValue());

		var totalCorr = this.calcTotalCorr(corrOnBargain, corrOnArea, corrOnDate, corrOnFloor, corrOnCondition, corrOnLocation, corrOnBuildingType, corrOnWalls, corrOnFurniture, corrOnCom);

		var costCorrected = totalCorr * this.calcCostCorrected(comp.up('form').down('[itemId=gridOV2Analogue]'), anN);

		comp.up('form').down('[itemId=an' + anN + 'totalCorr]').setValue(totalCorr.toFixed(2));
		comp.up('form').down('[itemId=an' + anN + 'costCorrected]').setValue(costCorrected.toFixed(2));
		this.calcStats(comp.up('form').down('[itemId=gridOV2Analogue]'));
		this.calcValuationCost(comp.up('form').down('[itemId=gridOV2Analogue]'));
	},
	calcTotalCorr : function(corrOnBargain, corrOnArea, corrOnDate, corrOnFloor, corrOnCondition, corrOnLocation, corrOnBuildingType, corrOnWalls, corrOnFurniture, corrOnCom) {

		return corrOnBargain * corrOnArea * corrOnDate * corrOnFloor * corrOnCondition * corrOnLocation * corrOnBuildingType * corrOnWalls * corrOnFurniture * corrOnCom
	},
	calcCostCorrected : function(OV2Analogue, anN) {
		var me = this, analogueStore = OV2Analogue.getStore();
		return parseFloat(analogueStore.data.items[anN - 1].get('costMetre'));
	},
	calcStats : function(OV2Analogue) {
		var form = OV2Analogue.up('form'), midCost = 0, medCost = 0, cost = [];
		for ( var i = 1; i <= 4; i++) {
			costCorrected = parseFloat(form.down('[itemId=an' + i + 'costCorrected]').getRawValue());

			midCost = midCost + costCorrected;
			if (i == 1) {
				maxCost = costCorrected;
				minCost = costCorrected;
				maxItemId = 'an' + i + 'costCorrected';
				minItemId = 'an' + i + 'costCorrected';
			}
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
			if (('an' + i + 'costCorrected' != maxItemId) && ('an' + i + 'costCorrected' != minItemId)) {
				medCost = medCost + parseFloat(form.down('[itemId=an' + i + 'costCorrected]').getRawValue());
			}
		}

		form.down('[itemId=statsMidId]').setRawValue((midCost / 4).toFixed(2));
		form.down('[itemId=statsMedId]').setRawValue((medCost / 2).toFixed(2));
		form.down('[itemId=statsMinId]').setRawValue(minCost);
		form.down('[itemId=statsMaxId]').setRawValue(maxCost);
	},
	calcValuationCost : function(comp) {
		var form = comp.up('form');
		var maxVal = 0, values = form.getValues(), maxVal = parseFloat(form.down('[itemId=statsMedId]').getValue());
		area = parseFloat(form.down('[itemId=areaAllId]').getValue());
		rate = parseFloat(form.down('[itemId=currencyRateId]').getValue());
		form.down('[itemId=valuationCostUAHId]').setRawValue((area * rate * maxVal).toFixed(2));
		form.down('[itemId=valuationCostUSDId]').setRawValue((area * maxVal).toFixed(2));

	},
	onExpandCorr : function(comp) {
		var grid = comp.up('form').down('[itemId=gridOV2Analogue]');
		var values = grid.getStore().data.items, cost = [];
		if (values.length < 4) {
			Ext.MessageBox.show({
				title : errorType.error,
				msg : validMsg.calcStatsAnalogueCountError,
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.ERROR
			});
			return false;
		}
	}
})