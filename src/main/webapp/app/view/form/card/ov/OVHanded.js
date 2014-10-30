Ext.require([ 'Ext.form.*', 'Ext.Img', 'Ext.tip.QuickTipManager' ]);
Ext.define('pf.view.form.card.ov.OVHanded', {
	extend : 'Ext.window.Window',
	alias : 'widget.OVHanded',
	autoScroll : true,
	plain : true,
	modal : true,
	closable : false,
	buttonAlign : 'center',
	border : false,
	autoShow : false,
	titleCollapse : false,
	title : loc.ttlViewBlank,
	requires : [ 'Ext.form.Label', 'Ext.form.FieldSet', 'Ext.form.field.TextArea' ],
		layout : 'anchor',
	initComponent : function() {
		var me = this, html;
		var objFuncType = me.objFuncType;
		if ((objFuncType == 2) && (me.isManual == 0)) {
			html = '<a href="pf.printForms.pdf.OVFlat.cls?ovId=' + me.ovID + '"target="_blank"">Файл  звіту ' + '<b>' + me.contractNum + '</b>' + '</a>';
		} else if ((objFuncType == 3) && (me.isManual == 0)) {
			html = '<a href="pf.printForms.pdf.OVLand.cls?ovId=' + me.ovID + '"target="_blank"">Файл  звіту ' + '<b>' + me.contractNum + '</b>' + '</a>';
		} else if ((objFuncType == 4) && (me.isManual == 0)) {
			html = '<a href="pf.printForms.pdf.OVHouse.cls?ovId=' + me.ovID + '"target="_blank"">Файл  звіту ' + '<b>' + me.contractNum + '</b>' + '</a>';
		} else {
			html = '<a href="pf.proxy.manager.FileManager.cls?objType=ov&fileType=reportFile&objId=' + me.ovID + '">Файл звіту ' + '<b>' + me.contractNum + '</b>' + '</a>';
		}
		Ext.apply(me, {
			items : [ {
				xtype : 'form',
				buttons : [ {
					xtype : 'button',
					text : loc.btnExit,
					scope : this,
					handler : this.close,
					cls : 'btnExit',
					iconCls : 'exit'
				} ],
				items : [ {
					xtype : 'hiddenfield',
					name : 'id'
				}, {
					xtype : 'fieldset',
					title : loc.lblFDMUDesc,
					defaults : {
						xtype : 'textfield',
						anchor : '100%',
						labelAlign : 'top',
						readOnly : true,
						fieldCls : 'body-style-readOnly'
					},
					items : [ {
						xtype : 'tbspacer',
						heigth : 10
					}, {
						xtype : 'container',
						anchor : '100%',
						margin : '5 5 0 0',
						//layout : {
						//	type : 'hbox'
						//},
						items : [ {
							xtype : 'label',
							cls : 'attachmentFile',
							style : {
								color : '#000000'
							},
							html : '&nbsp &nbsp'
						}, {
							xtype : 'label',
							html : html,
							margin : '0 20 0 0'
						}, {
							xtype : 'label',
							html : '</br>'
						}, {
							xtype : 'label',
							html : '<a href="pf.proxy.manager.FileManager.cls?objType=ov&fileType=fdmu_report&objId=' + me.ovID + '">Файл (від ФДМУ) із додатком до звіту ' + '<b>' + me.contractNum + '</b>' + '</a>'

						} ]
					}, {
						xtype : 'container',
						anchor : '100%',
						margin : '5 5 0 0',
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
							html : '<a href="pf.proxy.manager.FileManager.cls?objType=ov&fileType=certFile&objId=' + me.ovID + '">Файл акту виконаніх робіт ' + '<b>' + me.contractNum + '</b>' + '</a>',
							margin : '0 20 0 0'
						} ]
					}, {
						xtype : 'container',
						hidden : !(me.attachmentDocs),
						anchor : '100%',
						margin : '5 5 0 0',
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
							html : '<a href="pf.proxy.manager.FileManager.cls?objType=ov&fileType=doc_archive&objId=' + me.ovID + '">' + me.attachmentDocs + '</a>',
							margin : '0 20 0 0'
						} ]
					}, {
						fieldLabel : 'Номер ФДМУ',
						name : 'fdmuNumFull'
					}, {
						fieldLabel : loc.lblApplicantType,
						name : 'applicantType'
					}, {
						fieldLabel : loc.lblApplicant,
						name : 'applicant'
					} ]
				}, {
					xtype : 'fieldset',
					defaults : {
						labelAlign : 'top',
						xtype : 'textfield',
						anchor : '100%',
						readOnly : true,
						fieldCls : 'body-style-readOnly'
					},
					title : loc.lblObjectDesc,
					items : [ {
						fieldLabel : loc.lblObjectType,
						name : 'objectType'
					}, {
						fieldLabel : loc.lblObjectSubType,
						name : 'objectSubType'
					}, {
						xtype : 'textareafield',
						anchor : '100%',
						fieldLabel : loc.lblObjectName,
						name : 'objectName'
					} ]
				} ]
			} ]
		});

		me.callParent(arguments);
	}

});