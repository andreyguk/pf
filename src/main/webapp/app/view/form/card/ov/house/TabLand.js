Ext.define('pf.view.form.card.ov.house.TabLand', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.ov.house.tabLand',
	layout : 'anchor',
	listeners : {
		show : function() {
			var me = this;
			me.up().down('[itemId=houseTabAdditionalInfo]').setDisabled(false);
			if (!me.down('[itemId=privateLandId]').getValue().isPrivateLand) {
				return;
			}
			var mask = new Ext.LoadMask(Ext.getBody(), {
				msg : "Будь ласка, зачекайте ..."
			});
			mask.show();

			Ext.Ajax.request({
				url : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.Read.cls',
				params : {
					classname : 'correctionsHousePlot',
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
								var fld = me.down('[itemId=' + key + 'Land]');
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

		}
	},
	initComponent : function() {
		var me = this;
		var storeTerr = Ext.create('pf.store.common.Territory');
		storeTerr.ovID = me.ovID;
		var storeOV2Analogue = Ext.create('pf.store.HousePlot2Analogue');
		storeOV2Analogue.filter('objectValuation', me.ovID);
		Ext.applyIf(me, {
			items : [ {
				xtype : 'fieldset',
				title : 'Земельна ділянка приватизована?',
				anchor : '35%',
				items : [ {
					xtype : 'radiogroup',
					itemId : 'privateLandId',
					columns : 1,
					listeners : {
						'change' : function(comp, newVal, oldval) {
							comp.up('form').down('[itemId=typeLoadInfoId]').reset();
							comp.up('form').down('[itemId=landInfoId]').setDisabled(true);
							if (newVal.isPrivateLand) {
								comp.up('form').down('[itemId=fldSetTypeLoadInfoId]').show();
								comp.up('form').down('[itemId=landInfoId]').show();
								comp.up('form').down('[itemId=landCorrsId]').show();
								me.setRequiredFld(me, false);
							} else {
								comp.up('form').down('[itemId=fldSetTypeLoadInfoId]').hide();
								comp.up('form').down('[itemId=landInfoId]').hide();
								comp.up('form').down('[itemId=landCorrsId]').hide();
								comp.up('form').down('[itemId=costLandSquareM]').setValue('');
								me.setRequiredFld(me, true);
								// me.clearAnalogue(storeOV2Analogue);
								// me.clearCorrs();

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
				xtype : 'fieldset',
				anchor : '35%',
				hidden : true,
				itemId : 'fldSetTypeLoadInfoId',
				items : [ {
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
							bottom : 5,
							left : 0
						}
					},
					items : [ {
						xtype : 'radiogroup',
						columns : 1,
						itemId : 'typeLoadInfoId',
						listeners : {
							change : function(comp, newVal, oldval) {
								comp.up('form').down('[name=notFillBox]').setValue(false);
								if (newVal.linkWithOVLandReport) {
									comp.up('form').down('[itemId=landInfoId]').setDisabled(true);
									comp.up('form').down('[itemId=housePlotCorrs]').setDisabled(true);
									comp.up('form').down('[itemId=gridHousePlot2Analogue]').setDisabled(true);
									me.fireEvent('showListOVLand', comp);
								} else {
									comp.up('form').down('[itemId=landInfoId]').setDisabled(false);
									comp.up('form').down('[itemId=landCorrsId]').setDisabled(false);
									comp.up('form').down('[itemId=housePlotCorrs]').setDisabled(false);
									comp.up('form').down('[itemId=gridHousePlot2Analogue]').setDisabled(false);
									comp.up('form').down('[name=ovLandNum]').setValue('');
									comp.up('form').down('[name=ovLandLink]').setValue('');

								}
							}
						},
						items : [ {
							boxLabel : 'Завантажити дані зі звіту',
							name : 'linkWithOVLandReport',
							inputValue : 1
						}, {
							boxLabel : 'Заповнити самостійно',
							name : 'linkWithOVLandReport',
							inputValue : 0
						} ]
					}, {
						xtype : 'textfield',
						fieldLabel : 'Номер звіту',
						name : 'ovLandNum'
					} ]
				} ]
			}, {
				xtype : 'hidden',
				name : 'ovLandLink'
			}, {
				xtype : 'fieldset',
				layout : 'anchor',
				anchor : '100%',
				disabled : true,
				itemId : 'landInfoId',
				hidden : true,
				collapsible : true,
				collapsed : false,
				title : 'Місцезнаходження та основні характеристики об\'єкту',
				items : [ {
					xtype : 'tbspacer',
					height : 10
				}, {
					xtype : 'fieldset',
					title : 'Місцезнаходження об\'єкту',
					anchor : '80%',
					items : [ {
						xtype : 'container',
						anchor : '52%',
						defaults : {
							xtype : 'textfield',
							allowBlank : true,
							labelAlign : 'top',
							msgTarget : 'side'
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
							name : 'landLocationStreet'
						}, {
							flex : 1,
							fieldLabel : 'Будинок',
							name : 'landLocationBuilding',
							listeners : {
								change : function() {
									me.up('form').down('[name=landLocationPlot]').setValue('');
								}
							}
						}, {
							flex : 1,
							fieldLabel : 'Ділянка',
							name : 'landLocationPlot',
							listeners : {
								change : function() {
									me.up('form').down('[name=landLocationBuilding]').setValue('');
								}
							}
						} ]
					}, {
						xtype : 'label',
						anchor : '10%',
						html : "<span style='color:red;'>*у разі необхідності заповнювати інформацію щодо знаходження ділянки у межах сільської ради, садівничого товариства та ін.<span/>"
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
							vtype : 'isInt',
							flex : 1,
							fieldLabel : 'Нахил ділянки',
							name : 'plotIncline'
						}, {
							xtype : 'textfield',
							labelAlign : 'top',
							msgTarget : 'side',
							afterLabelTextTpl : pf.utils.Validation.required,
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
							afterLabelTextTpl : pf.utils.Validation.required,
							name : 'plotQty'
						}, {
							fieldLabel : "Площа земельної (их) </br> ділянки(ок), кв.м.",
							emptyText : '0.00',
							afterLabelTextTpl : pf.utils.Validation.required,
							name : 'plotArea'
						}, {
							fieldLabel : "Забудована </br> площа, (кв.м)",
							emptyText : '0.00',
							name : 'usedArea'
						} ]
					} ]
				} ]

			}, {
				xtype : 'fieldset',
				layout : 'anchor',
				title : 'Аналоги та коригування',
				itemId : 'landCorrsId',
				hidden : true,
				// collapsible : true,
				// collapsed : true,

				items : [ {
					xtype : 'checkboxgroup',
					columns : 1,
					vertical : true,
					items : [ {
						boxLabel : "Не заповнювати блок",
						name : 'notFillBox',
						inputValue : 'true',
						uncheckedValue : 'false',
						listeners : {
							'change' : function(comp) {
								if (comp.getValue()) {
									me.clearAnalogue(storeOV2Analogue);
									me.clearCorrs();
								}
							}

						}
					} ]
				}, {
					xtype : 'grid',
					store : storeOV2Analogue,
					selType : 'rowmodel',
					anchor : '100%',
					columnLines : true,
					disabled : true,
					itemId : 'gridHousePlot2Analogue',
					tbar : [ {
						text : 'Додати',
						iconCls : 'add',
						itemId : 'addHousePlot2Analogue'
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
				}, {
					xtype : 'fieldset',
					disabled : true,
					itemId : 'housePlotCorrs',
					layout : 'anchor',
					// collapsible : true,
					// collapsed : true,
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
								itemId : 'an1corrOnBargainLand',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(1, comp)
									}
								}
							}, {
								itemId : 'an2corrOnBargainLand',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(2, comp)
									}
								}
							}, {
								itemId : 'an3corrOnBargainLand',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(3, comp)
									}
								}
							}, {
								itemId : 'an4corrOnBargainLand',
								listeners : {
									'keyup' : function(comp, newValue) {
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
								text : 'На площу'
							}, {
								itemId : 'an1corrOnAreaLand',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(1, comp)
									}
								}
							}, {
								itemId : 'an2corrOnAreaLand',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(2, comp)
									}
								}
							}, {
								itemId : 'an3corrOnAreaLand',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(3, comp)
									}
								}
							}, {
								itemId : 'an4corrOnAreaLand',
								listeners : {
									'keyup' : function(comp, newValue) {
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
								text : 'На наявність земельних поліпшень'
							}, {
								itemId : 'an1corrOnLandImprovementsLand',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(1, comp)
									}
								}
							}, {
								itemId : 'an2corrOnLandImprovementsLand',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(2, comp)
									}
								}
							}, {
								itemId : 'an3corrOnLandImprovementsLand',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(3, comp)
									}
								}
							}, {
								itemId : 'an4corrOnLandImprovementsLand',
								listeners : {
									'keyup' : function(comp, newValue) {
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
								text : 'На правовий статус зем. ділянки'
							}, {
								itemId : 'an1corrOnLandRightsLand',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(1, comp)
									}
								}
							}, {
								itemId : 'an2corrOnLandRightsLand',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(2, comp)
									}
								}
							}, {
								itemId : 'an3corrOnLandRightsLand',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(3, comp)
									}
								}
							}, {
								itemId : 'an4corrOnLandRightsLand',
								listeners : {
									'keyup' : function(comp, newValue) {
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
								text : 'На цільове призначення'
							}, {
								itemId : 'an1corrOnLandPurposeLand',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(1, comp)
									}
								}
							}, {
								itemId : 'an2corrOnLandPurposeLand',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(2, comp)
									}
								}
							}, {
								itemId : 'an3corrOnLandPurposeLand',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(3, comp)
									}
								}
							}, {
								itemId : 'an4corrOnLandPurposeLand',
								listeners : {
									'keyup' : function(comp, newValue) {
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
								text : 'На місцерозташування'
							}, {
								itemId : 'an1corrOnLocationLand',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(1, comp)
									}
								}
							}, {
								itemId : 'an2corrOnLocationLand',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(2, comp)
									}
								}
							}, {
								itemId : 'an3corrOnLocationLand',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(3, comp)
									}
								}
							}, {
								itemId : 'an4corrOnLocationLand',
								listeners : {
									'keyup' : function(comp, newValue) {
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
								text : 'На відмінність у фізичних характеристиках ділянки (рельєф, нахил)'
							}, {
								itemId : 'an1corrOnLandDescrLand',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(1, comp)
									}
								}
							}, {
								itemId : 'an2corrOnLandDescrLand',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(2, comp)
									}
								}
							}, {
								itemId : 'an3corrOnLandDescrLand',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(3, comp)
									}
								}
							}, {
								itemId : 'an4corrOnLandDescrLand',
								listeners : {
									'keyup' : function(comp, newValue) {
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
								text : 'На інженерно-технічні комунікації'
							}, {
								itemId : 'an1corrOnComLand',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(1, comp)
									}
								}
							}, {
								itemId : 'an2corrOnComLand',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(2, comp)
									}
								}
							}, {
								itemId : 'an3corrOnComLand',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(3, comp)
									}
								}
							}, {
								itemId : 'an4corrOnComLand',
								listeners : {
									'keyup' : function(comp, newValue) {
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
								text : "На транспортну доступність ділянки (розміщення ділянки щодо вулиці, під'їзд)"
							}, {
								itemId : 'an1corrOnLandTransportLand',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(1, comp)
									}
								}
							}, {
								itemId : 'an2corrOnLandTransportLand',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(2, comp)
									}
								}
							}, {
								itemId : 'an3corrOnLandTransportLand',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(3, comp)
									}
								}
							}, {
								itemId : 'an4corrOnLandTransportLand',
								listeners : {
									'keyup' : function(comp, newValue) {
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
								text : 'На відмінність в оточенні ділянки'
							}, {
								itemId : 'an1corrOnLandEnvironmentLand',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(1, comp)
									}
								}
							}, {
								itemId : 'an2corrOnLandEnvironmentLand',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(2, comp)
									}
								}
							}, {
								itemId : 'an3corrOnLandEnvironmentLand',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(3, comp)
									}
								}
							}, {
								itemId : 'an4corrOnLandEnvironmentLand',
								listeners : {
									'keyup' : function(comp, newValue) {
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
								itemId : 'an1totalCorrLand',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(4, comp)
									}
								}
							}, {
								itemId : 'an2totalCorrLand',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(4, comp)
									}
								}
							}, {
								itemId : 'an3totalCorrLand',
								listeners : {
									'keyup' : function(comp, newValue) {
										me.onChangeCorr(4, comp)
									}
								}
							}, {
								itemId : 'an4totalCorrLand',
								listeners : {
									'keyup' : function(comp, newValue) {
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
								text : 'Відкоригована вартість'
							}, {
								itemId : 'an1costCorrectedLand',
								listeners : {
									'change' : function(comp) {
										me.calcStats(comp);
									}
								}
							}, {
								itemId : 'an2costCorrectedLand',
								listeners : {
									'change' : function(comp) {
										me.calcStats(comp);
									}
								}
							}, {
								itemId : 'an3costCorrectedLand',
								listeners : {
									'change' : function(comp) {
										me.calcStats(comp);
									}
								}
							}, {
								itemId : 'an4costCorrectedLand',
								listeners : {
									'change' : function(comp) {
										me.calcStats(comp);
									}
								}
							} ]
						} ]
					} ]

				}, {
					xtype : 'container',
					anchor : '90%',

					layout : {
						type : 'hbox',
						align : 'stretch'
					},
					items : [ {
						xtype : 'label',
						text : 'Оцінювач отримав наступне медіане значення 1 кв.м. земельної ділянки з розрахованого вище числового ряду:'
					}, {
						readOnly : true,
						fieldCls : 'body-style-readOnly',
						xtype : 'textfield',
						itemId : 'costLandSquareM',
						margin : '0 0 5 0'
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
					return;
				},
				scope : this
			} ],
			width : '10px',
			align : 'center'
		} ];
	},
	onChangeCorr : function(anN, comp) {
		var me = this;
		console.log(comp)
		me.calcAncorr(anN, comp);
		me.calcStats(comp);
	},
	calcAncorr : function(anN, comp) {
		var corrOnBargain = parseFloat(comp.up('form').down('[itemId=an' + anN + 'corrOnBargainLand]').getValue());
		var corrOnArea = parseFloat(comp.up('form').down('[itemId=an' + anN + 'corrOnAreaLand]').getValue());
		var corrOnDate = parseFloat(comp.up('form').down('[itemId=an' + anN + 'corrOnLandImprovementsLand]').getValue());
		var corrOnFloor = parseFloat(comp.up('form').down('[itemId=an' + anN + 'corrOnLandRightsLand]').getValue());
		var corrOnCondition = parseFloat(comp.up('form').down('[itemId=an' + anN + 'corrOnLandPurposeLand]').getValue());
		var corrOnLocation = parseFloat(comp.up('form').down('[itemId=an' + anN + 'corrOnLocationLand]').getValue());
		var corrOnBuildingType = parseFloat(comp.up('form').down('[itemId=an' + anN + 'corrOnLandDescrLand]').getValue());
		var corrOnWalls = parseFloat(comp.up('form').down('[itemId=an' + anN + 'corrOnComLand]').getValue());
		var corrOnFurniture = parseFloat(comp.up('form').down('[itemId=an' + anN + 'corrOnLandTransportLand]').getValue());
		var corrOnCom = parseFloat(comp.up('form').down('[itemId=an' + anN + 'corrOnLandEnvironmentLand]').getValue());

		var totalCorr = this.calcTotalCorr(corrOnBargain, corrOnArea, corrOnDate, corrOnFloor, corrOnCondition, corrOnLocation, corrOnBuildingType, corrOnWalls, corrOnFurniture, corrOnCom);

		var costCorrected = totalCorr * this.calcCostCorrected(comp.up('form').down('[itemId=gridHousePlot2Analogue]'), anN);

		comp.up('form').down('[itemId=an' + anN + 'totalCorrLand]').setValue(totalCorr.toFixed(2));
		comp.up('form').down('[itemId=an' + anN + 'costCorrectedLand]').setValue(costCorrected.toFixed(2));

	},
	calcTotalCorr : function(corrOnBargain, corrOnArea, corrOnDate, corrOnFloor, corrOnCondition, corrOnLocation, corrOnBuildingType, corrOnWalls, corrOnFurniture, corrOnCom) {
		console.log(arguments)
		return corrOnBargain * corrOnArea * corrOnDate * corrOnFloor * corrOnCondition * corrOnLocation * corrOnBuildingType * corrOnWalls * corrOnFurniture * corrOnCom
	},
	calcCostCorrected : function(OV2Analogue, anN) {
		var me = this, analogueStore = OV2Analogue.getStore();
		if (analogueStore.data.items.length) {
			return parseFloat(analogueStore.data.items[anN - 1].get('costMetre'));
		}
	},
	onExpandCorr : function(comp) {
		var grid = comp.up('form').down('[itemId=gridHousePlot2Analogue]');
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
	},
	clearAnalogue : function(store) {
		store.removeAll();
	},
	clearCorrs : function() {
		var me = this;
		for ( var i = 1; i <= 4; i++) {
			me.down('[itemId=an' + i + 'corrOnBargainLand]').setValue(1);
			me.down('[itemId=an' + i + 'corrOnAreaLand]').setValue(1);
			me.down('[itemId=an' + i + 'corrOnLandImprovementsLand]').setValue(1);
			me.down('[itemId=an' + i + 'corrOnLandRightsLand]').setValue(1);
			me.down('[itemId=an' + i + 'corrOnLandPurposeLand]').setValue(1);
			me.down('[itemId=an' + i + 'corrOnLocationLand]').setValue(1);
			me.down('[itemId=an' + i + 'corrOnLandDescrLand]').setValue(1);
			me.down('[itemId=an' + i + 'corrOnComLand]').setValue(1);
			me.down('[itemId=an' + i + 'corrOnLandTransportLand]').setValue(1);
			me.down('[itemId=an' + i + 'corrOnLandEnvironmentLand]').setValue(1);
			me.down('[itemId=an' + i + 'totalCorrLand]').setValue('');
			me.down('[itemId=an' + i + 'costCorrectedLand]').setValue('');
		}
	},
	calcStats : function(textFld) {
		var form = textFld.up('form'), midCost = 0, medCost = 0, cost = [];
		for ( var i = 1; i <= 4; i++) {
			costCorrected = parseFloat(form.down('[itemId=an' + i + 'costCorrectedLand]').getRawValue());

			midCost = midCost + costCorrected;
			if (i == 1) {
				maxCost = costCorrected;
				minCost = costCorrected;
				maxItemId = 'an' + i + 'costCorrectedLand';
				minItemId = 'an' + i + 'costCorrectedLand';
			}
			cost.push(costCorrected);
			if (maxCost < costCorrected) {
				maxCost = costCorrected;
				maxItemId = 'an' + i + 'costCorrectedLand';

			}
			if (minCost > costCorrected) {
				minCost = costCorrected;
				minItemId = 'an' + i + 'costCorrectedLand';
			}
		}
		for ( var i = 1; i <= 4; i++) {
			if (('an' + i + 'costCorrectedLand' != maxItemId) && ('an' + i + 'costCorrectedLand' != minItemId)) {
				medCost = medCost + parseFloat(form.down('[itemId=an' + i + 'costCorrectedLand]').getRawValue());
			}
		}
		form.down('[itemId=costLandSquareM]').setRawValue((medCost / 2).toFixed(2));
	},
	setRequiredFld : function(me, isRequired) {
		var flds = [ 'plotPurpose', 'roadLocation', 'roadType', 'plotIncline', 'plotForm', 'plotQty', 'plotArea' ].forEach(setRequiredElm);
		function setRequiredElm(element, index, array) {
			var fld = me.down('[name=' + element + ']');
			Ext.apply(fld, {
				allowBlank : isRequired
			});
			fld.validateValue(fld.getValue());

		}
	}
})