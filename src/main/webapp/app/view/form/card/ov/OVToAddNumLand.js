Ext.require([ 'Ext.form.*', 'Ext.Img', 'Ext.tip.QuickTipManager' ]);
Ext.define('pf.view.form.card.ov.OVToAddNumLand', {
	extend : 'Ext.form.Panel',
	alias : 'widget.OVToAddNumLand',
	bodyCls : 'cmp-body-style',
	buttonAlign : 'center',
	cls : 'formButtons',
	autoScroll : true,
	initComponent : function() {
		var me = this;
		var storeBlank2ValParts = Ext.create('pf.store.Blank2ValuationPartsAll');
		storeBlank2ValParts.filter('blank', me.blankID);
		var area = (me.totalArea / 100).toFixed(2)
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
		html = html + "<tr><td>1</td><td>Площа земельної ділянки, сот.</td><td>" + area.toString().replace('.', ',') + "</td></tr>"
		html = html + "<tr><td>2</td><td>Документи, що посвідчують право власності та/або користування земельними ділянками</td><td>" + me.constDocType + "</td></tr>"
		html = html + "<tr><td>3</td><td>Серія та номер державного акта і дата його реєстрації</td><td>" + me.constDocNum + "</td></tr>"
		html = html + "<tr><td>4</td><td>Кадастровий номер земельної ділянки</td><td>" + me.cadastralNumber + "</td></tr>"
		html = html + "<tr><td>6-20</td><td>Цільове призначення земельної ділянки</td><td>" + me.plotPurpose + "</td></tr>"
		html = html + "<tr><td>22</td><td>Оціночна вартість (всього об'єкта), грн</td><td>" + me.valuationCostUAH.toString().replace('.', ',') + "</td></tr>"
		html = html + "<tr><td>23</td><td>Оціночна вартість (1 кв.м. об'єкта ), грн</td><td>" + (me.valuationCostUAH / me.totalArea).toString().replace('.', ',') + "</td></tr>"
		html = html + "<tr><td>27</td><td>Результат оцінки за методичними підходами (порівняльний), грн.</td><td>" + me.valuationCostUAH.toString().replace('.', ',') + "</td></tr>"
		html = html + "<tr><td>28</td><td>Результат оцінки за методичними підходами (інший), грн.</td><td>" + 0 + "</td></tr>"
		html = html + "<tr><td>30</td><td>Найменування СОД</td><td>" + me.orgName + "</td></tr>"
		html = html + "<tr><td>31</td><td>Місцезнаходження СОД</td><td>" + me.orgAddress + "</td></tr>"
		html = html + "<tr><td>32</td><td>Сертифікат СОД</td><td>" + me.orgCertNumber + " від " + me.orgCertDate + "</td></tr>"
		html = html + "<tr><td>34</td><td>Оцінювач ПІБ</td><td>" + me.valuator + "</td></tr>"
		html = html + "<tr><td>35</td><td>Номер та дата видачі свідоцтва оцінювача</td><td>" + me.valuatorCertNum + " від " + me.valuatorCertDate + "</td></tr>"
		// html = html + "<tr><td>35</td><td>Номер та дата видачі свідоцтва
		// оцінювача</td><td>" + "КСО з ЕГОЗД Серія АК № 00808 від 25.10.2008р."
		// + "</td></tr>"
		// html = html + "<tr><td>36</td><td>Посвідчення про підвищення
		// кваліфікації </td><td>" + "АК №01293 від 30.05.2014" + "</td></tr>"
		html = html + "<tr><td>36</td><td>Посвідчення про підвищення кваліфікації </td><td>" + me.docNumRaise + " від " + me.docDateRaise + "</td></tr>"
		html = html + "<tr><td>37</td><td>Номер анкети</td><td>" + me.contractNum + "</td></tr>"
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
						html : '<a href="pf.printForms.pdf.OVLand.cls?ovId=' + me.ovID + '"target="_blank""> ' + '<b>' + me.contractNum + '</b>' + '</a>',
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