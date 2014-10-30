Ext.require([ 'Ext.form.*', 'Ext.Img', 'Ext.tip.QuickTipManager' ]);
Ext.define('pf.view.form.card.ov.OVToAddNumHouse', {
	extend : 'Ext.form.Panel',
	alias : 'widget.OVToAddNumHouse',
	bodyCls : 'cmp-body-style',
	buttonAlign : 'center',
	cls : 'formButtons',
	autoScroll : true,
	initComponent : function() {
		var me = this;
		var storeBlank2ValParts = Ext.create('pf.store.Blank2ValuationPartsAll');
		storeBlank2ValParts.filter('blank', me.blankID);
		var msg = "<div style='text-align: center;'>";
		msg = msg + "<span align='center' style='color: #000000; font-size: 1.3em;'>Дані про об'єкт житлової нерухомості</span>"
		msg = msg + "<br/>"
		msg = msg + "<span align='center' style='color: #104E8B; font-size: 1.5em; display:block;width:100%;word-break:break-all; '>" + me.objectName + "</span>"
		msg = msg + "<br/>"
		msg = msg + "<span align='center' style='color: #000000; font-size: 15m;'>(назва об'єкта)</span>"
		msg = msg + "<br/>"
		msg = msg + "<span align='center' style='color: #104E8B; font-size: 1.5em; display:block;width:100%;word-break:break-all; '>" + me.locationTerritory + "</span>";
		msg = msg + "<br/>"
		msg = msg + "<span align='center' style='color: #104E8B; font-size: 1.5em;'>"
		msg = msg + "вул. " + me.locationStreet;
		msg = msg + ", буд. " + me.locationBuilding;
		msg = msg + ", кв. " + me.locationFlat + "</span>"
		msg = msg + "<br/>"
		msg = msg + "<span align='center' style='color: #000000; font-size: 1em;'>(поштова адреса)</span>"
		msg = msg + "<p align='center' style='color: #ADDFFF; font-size: 1.5em; font-weight: bold; border-bottom: 1px solid #FFFFFF; padding-bottom:15px; text-shadow: 1px 1px 1px #808080;'></p>"
		msg = msg + "</div>";

		var html = "<div style='text-align: center;overflow-y: auto;overflow-x: hidden;' class='CSSTableGenerator' ><table > <tr> <td width='5%'>Код позиції</td><td width='55%' >Показники</td><td width='40%'>Дані</td></tr>";
		html = html + "<tr><td>1.1</td><td>Вид</td><td>" + me.objectSubType + "</td></tr>"
		html = html + "<tr><td>1.2</td><td>Рік введення в експлуатації</td><td>" + me.maintenanceYear + "</td></tr>"
		html = html + "<tr><td>1.3</td><td>Клас(капітальності)</td><td>" + me.buildingMainClass + "</td></tr>"
		html = html + "<tr><td>1.4</td><td>Кількість поверхів (для будівлі)</td><td>" + me.floorsQty + "</td></tr>"
		html = html + "<tr><td>1.5</td><td>Поверх в будівлі (для квартири)</td><td>" + me.objectFloorNum + "</td></tr>"
		html = html + "<tr><td>1.6.1</td><td>Площа загальна, кв.м</td><td>" + me.totalArea.toString().replace('.', ',') + "</td></tr>"
		html = html + "<tr><td>1.6.1.1</td><td>Площа житлових приміщень, кв.м</td><td>" + me.livingArea.toString().replace('.', ',') + "</td></tr>"
		html = html + "<tr><td>1.6.1.2</td><td>Площа допоміжних приміщень, кв.м</td><td>" + me.storeroomArea.toString().replace('.', ',') + "</td></tr>"
		html = html + "<tr><td>1.6.1.2.1</td><td>Площа у тому числі кухні, кв.м</td><td>" + me.kitchenArea.toString().replace('.', ',') + "</td></tr>"
		html = html + "<tr><td>1.7.1</td><td>Висота наземного поверху,м</td><td>" + me.floorHeight.toString().replace('.', ',') + "</td></tr>"
		html = html + "<tr><td>1.7.2</td><td>Висота підвального поверху,м</td><td>" + me.cellarHeight.toString().replace('.', ',') + "</td></tr>"
		html = html + "<tr><td>1.8</td><td>Будівельний об'єм, куб. м</td><td>" + me.constructiveDimension + "</td></tr>"
		html = html + "<tr><td>1.9</td><td>Матеріал стін</td><td>" + me.materialOfWalls + "</td></tr>"
		html = html + "<tr><td>1.10</td><td>Матеріал перекриття</td><td>" + me.materialOfCover + "</td></tr>"

		html = html + "<tr><td>1.11</td><td>Інженерне обладнання</td><td>X</td></tr>"
		html = html + "<tr><td>1.11.1</td><td>електрозабезпечення</td><td>" + me.code01 + "</td></tr>"
		html = html + "<tr><td>1.11.2</td><td>водопровід</td><td>" + me.code03 + "</td></tr>"
		html = html + "<tr><td>1.11.3</td><td>каналізація, водовідведення</td><td>" + me.code04 + "</td></tr>"
		html = html + "<tr><td>1.11.4</td><td>газифікація</td><td>" + me.code05 + "</td></tr>"
		html = html + "<tr><td>1.11.5</td><td>Опалення</td><td>" + me.heatingType + "</td></tr>"
		html = html + "<tr><td>1.11.6</td><td>вентиляція, кондиціонування</td><td>" + me.code06 + "</td></tr>"
		html = html + "<tr><td>1.11.7</td><td>Телекомунікації</td><td>X</td></tr>"
		html = html + "<tr><td>1.11.7.1</td><td>телефонізація</td><td>" + me.code07 + "</td></tr>"
		html = html + "<tr><td>1.11.7.2</td><td>радіофікация</td><td>" + me.code08 + "</td></tr>"
		html = html + "<tr><td>1.11.7.3</td><td>телебачення</td><td>" + me.code09 + "</td></tr>"
		html = html + "<tr><td>1.11.7.4</td><td>інтернет</td><td>" + me.code10 + "</td></tr>"
		html = html + "<tr><td>1.11.8</td><td>автоматизація, диспетчеризація</td><td>0</td></tr>"
		html = html + "<tr><td>1.11.9</td><td>ліфт</td><td>" + me.code015 + "</td></tr>"

		html = html + "<tr><td>1.12</td><td>Господарсько-побутові споруди</td><td>X</td></tr>"
		html = html + "<tr><td>1.12.1</td><td>літня кухня</td><td>" + me.extBuild01 + "</td></tr>"
		html = html + "<tr><td>1.12.2</td><td>підвал, погріб</td><td>" + me.extBuild02 + "</td></tr>"
		html = html + "<tr><td>1.12.3</td><td>баня (сауна)</td><td>" + me.extBuild03 + "</td></tr>"
		html = html + "<tr><td>1.12.4</td><td>літній душ</td><td>" + me.extBuild04 + "</td></tr>"
		html = html + "<tr><td>1.12.5</td><td>плавальний басейн</td><td>" + me.extBuild05 + "</td></tr>"
		html = html + "<tr><td>1.12.6</td><td>господарська будівля для худоби, птиці, сарай</td><td>" + me.extBuild06 + "</td></tr>"
		html = html + "<tr><td>1.12.7</td><td>гараж</td><td>" + me.extBuild07 + "</td></tr>"
		html = html + "<tr><td>1.12.8</td><td>вбиральня</td><td>" + me.extBuild08 + "</td></tr>"
		html = html + "<tr><td>1.12.9</td><td>теплиця (павільйон засклений)</td><td>" + me.extBuild09 + "</td></tr>"
		html = html + "<tr><td>1.12.10</td><td>колодязь</td><td>" + me.extBuild10 + "</td></tr>"
		html = html + "<tr><td>1.12.11</td><td>огорожа</td><td>" + me.extBuild11 + "</td></tr>"

		html = html + "<tr><td>1.13</td><td>Фізичний стан</td><td>" + me.generalRoomCondition + "</td></tr>"
		html = html + "<tr><td>1.14.1</td><td>Категорія населеного пункту</td><td>" + me.localityCategory + "</td></tr>"
		html = html + "<tr><td>1.14.4</td><td>Зона населеного пункту</td><td>" + me.localityStanding + "</td></tr>"
		html = html + "<tr><td>1.14.5</td><td>Функціонально-планувальна структура населеного пункту</td><td>" + me.localityStructure + "</td></tr>"
		html = html + "<tr><td>1.14.6.1</td><td>Відстань від центру населеного пункту (км)</td><td>" + me.distanceFromCentre.toString().replace('.', ',') + "</td></tr>"
		html = html + "<tr><td>1.14.6.1</td><td>Відстань від автовокзалу (км)</td><td>" + me.distanceFromBusStop.toString().replace('.', ',') + "</td></tr>"
		html = html + "<tr><td>1.14.6.1</td><td>Відстань від залізничного вокзалу (км)</td><td>" + me.distanceFromRailway.toString().replace('.', ',') + "</td></tr>"
		html = html + "<tr><td>1.14.6.1</td><td>Відстань від аеропотру (км)</td><td>" + me.distanceFromAirport.toString().replace('.', ',') + "</td></tr>"
		html = html + "<tr><td>1.14.6.1</td><td>Відстань від морського(річного) порту (км)</td><td>" + me.distanceFromSeaport.toString().replace('.', ',') + "</td></tr>"
		html = html + "<tr><td>1.14.7.2</td><td>Цокольний поверх</td><td>" + me.isSocleFloor + "</td></tr>"
		html = html + "<tr><td>1.14.7.2</td><td>Мансардний поверх</td><td>" + me.isAtticFloor + "</td></tr>"
		html = html + "<tr><td>1.15</td><td>Кошторисна вартість, грн( для об'єктів, незавершених будівництвом)</td><td>" + me.budgetCost.toString().replace('.', ',') + "</td></tr>"
		html = html + "<tr><td>1.19.1</td><td>Оціночна вартість (всього об'єкта), грн</td><td>" + me.valuationCostUAH.toString().replace('.', ',') + "</td></tr>"
		html = html + "<tr><td>1.19.2</td><td>Оціночна вартість (1 кв.м. об'єкта ), грн</td><td>" + (me.valuationCostUAH / me.totalArea).toString().replace('.', ',') + "</td></tr>"
		html = html + "<tr><td>2.2.1</td><td>Результат оцінки за методичними підходами (порівняльний), грн.</td><td>" + me.valuationCostUAH.toString().replace('.', ',') + "</td></tr>"
		html = html + "<tr><td>2.2.1</td><td>Результат оцінки за методичними підходами (інший), грн.</td><td>" + 0 + "</td></tr>"
		html = html + "<tr><td>2.3.2</td><td>Найменування СОД</td><td>" + me.orgName + "</td></tr>"
		html = html + "<tr><td>2.3.2</td><td>Місцезнаходження СОД</td><td>" + me.orgAddress + "</td></tr>"
		html = html + "<tr><td>2.3.3</td><td>Сертифікат СОД</td><td>" + me.orgCertNumber + " від " + me.orgCertDate + "</td></tr>"
		html = html + "<tr><td>2.4</td><td>Оцінювач ПІБ</td><td>" + me.valuator + "</td></tr>"
		html = html + "<tr><td>2.4.2</td><td>Номер та дата видачі свідоцтва оцінювача</td><td>" + me.valuatorCertNum + " від " + me.valuatorCertDate + "</td></tr>"
		html = html + "<tr><td>2.5</td><td>Номер анкети</td><td>" + me.contractNum + "</td></tr>"
		html = html + "<table/><div/>";

		Ext.apply(me, {
			buttons : [ {
				xtype : 'button',
				text : loc.btnAddFDMUNum,
				formBind : true,
				itemId : 'addFDMUNum',
				action : 'addFDMUNum',
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
				xtype : 'label',
				html : msg
			}, {
				xtype : 'fieldset',
				margin : '0 150 20 20',
				title : loc.lblFDMUDesc,
				anchor : '75%',
				items : [ {
					xtype : 'filefield',
					labelAlign : 'top',
					name : 'file',
					fieldLabel : 'Файл із додатком до звіту (від ФДМУ)',
					msgTarget : 'side',
					allowBlank : false,
					anchor : '80%',
					margin : '5,5,5,5',
					buttonText : 'Оберіть файл',
					afterLabelTextTpl : pf.utils.Validation.required
				} ]
			}, {
				xtype : 'container',
				margin : '0 150 20 20',
				itemId : 'contId',
				layout : {
					type : 'hbox'
				},
				items : [ {
					xtype : 'hiddenfield',
					name : 'id'
				}, {
					xtype : 'textfield',
					fieldLabel : loc.lblFDMUNum,
					itemId : 'fdmuNum',
					name : 'fdmuNum',
					afterLabelTextTpl : pf.utils.Validation.required,
					allowBlank : false,
					margin : '10,10,10,10'
				}, {
					xtype : 'datefield',
					fieldLabel : 'Дата оцінки',
					name : 'valuationDate',
					value : me.valuationDate,
					// flex : 1,
					fieldCls : 'body-style-readOnly',
					readOnly : true,
					margin : '10,10,10,10',
					format : 'd.m.Y'
				}, {
					xtype : 'container',
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
						// html : '<a
						// href="pf.proxy.manager.FileManager.cls?objType=ov&objId='
						// + me.ovID + '">' + '<b>' + me.contractNum + '</b>' +
						// '</a>',
						html : '<a href="pf.printForms.pdf.OVHouse.cls?ovId=' + me.ovID + '"target="_blank""> ' + '<b>' + me.contractNum + '</b>' + '</a>',
						margin : '0 20 0 0'
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
				} ]
			}, {
				xtype : 'fieldset',
				margin : '0 150 20 20',
				padding : 1,
				anchor : '70%',
				title : 'Дані власників часток майна, що оцінюється',
				items : [ {
					xtype : 'grid',
					store : storeBlank2ValParts,
					selType : 'rowmodel',
					columnLines : true,
					itemId : 'gridBlank2ValParts',
					dockedItems : [ {
						xtype : 'pagingtoolbar',
						dock : 'bottom',
						store : storeBlank2ValParts,
						displayInfo : true
					} ],
					columns : me.getBlank2ValParts()
				} ]
			}, {
				xtype : 'label',
				html : html
			}, {
				xtype : 'label',
				html : "<p align='center' style='color: #ADDFFF; font-size: 1.5em; font-weight: bold; border-bottom: 1px solid #FFFFFF; padding-bottom:15px; text-shadow: 1px 1px 1px #808080;'></p>"
			}, {
				xtype : 'spacer',
				height : '100'
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
		} ];
	}

});