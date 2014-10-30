Ext.define('pf.view.form.card.issue.IssueCard', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.issueCard',
	layout : 'auto',
	autoScroll : true,
	border : false,
	initComponent : function() {
		var me = this;
		Ext.apply(me, {
			items : [ {
				xtype : 'form',
				buttonAlign : 'center',
				bodyCls : 'cmp-body-style',
				cls : 'formButtons',
				bodyPadding : 10,
				defaults : {
					anchor : '100%',
					labelAlign : 'right',
					margin : '0 0 15 0',
					afterLabelTextTpl : pf.utils.Validation.required,
					allowBlank : false,
					msgTarget : 'side'
				},
				buttons : [ {
					xtype : 'button',
					text : loc.bntSave,
					formBind : true,
					itemId : 'saveIssue',
					action : 'saveIssue',
					cls : 'btnSave',
					hidden : me.action == 'read',
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
					xtype : 'combobox',
					anchor : '30%',
					fieldLabel : 'Тип заявки',
					store : Ext.create('pf.store.common.RequestType'),
					queryMode : 'local',
					minChars : 3,
					editable : false,
					displayField : 'name',
					valueField : 'id',
					allowBlank : true,
					name : 'requestType'
				}, {
					xtype : 'combobox',
					anchor : '30%',
					fieldLabel : 'Номер звіту',
					store : Ext.create('pf.store.AllReports'),
					queryMode : 'remote',
					hidden : me.action == 'read',
					minChars : 2,
					editable : true,
					displayField : 'contractNum',
					valueField : 'id',
					name : 'objectValuation'
				}, {
					xtype : 'textfield',
					anchor : "30%",
					hidden : !(me.action == 'read'),
					fieldLabel : 'Номер звіту',
					allowBlank : true,
					name : 'contractNum'
				}, {
					xtype : 'textfield',
					anchor : "100%",
					fieldLabel : 'Короткий опис',
					name : 'subject'
				}, {
					xtype : 'htmleditor',
					anchor : "100%",
					fieldLabel : 'Опис',
					name : 'description',
					enableLinks : false,
					enableColors : false,
					enableAlignments : false,
					enableSourceEdit : false
				}, {
					xtype : 'combobox',
					anchor : '30%',
					fieldLabel : 'Приорітет',
					store : Ext.create('pf.store.common.RequestPriority'),
					queryMode : 'local',
					minChars : 3,
					editable : false,
					displayField : 'name',
					valueField : 'id',
					name : 'priority'
				}, {
					xtype : 'combobox',
					anchor : '30%',
					fieldLabel : 'Статус',
					store : Ext.create('pf.store.common.RequestState'),
					queryMode : 'local',
					minChars : 3,
					editable : false,
					displayField : 'name',
					valueField : 'id',
					fieldCls : 'body-style-readOnly',
					readOnly : true,
					value : '1',
					name : 'state'
				}, {
					xtype : 'fieldset',
					title : 'Інформація про виконання',
					anchor : '100%',
					hideMode : 'offsets',
					hidden : !(((me.state == 'RESOLVED') || (me.state == 'REJECTED')) && (me.action == 'read')),
					items : [ {
						xtype : 'container',
						anchor : '60%',
						margin : '0 0 15 0',
						defaults : {
							anchor : '100%',
							labelAlign : 'right',
							fieldCls : 'body-style-readOnly',
							readOnly : true
						},
						layout : {
							type : 'hbox'
						},
						items : [ {
							xtype : 'textfield',
							flex : 2,
							fieldLabel : 'Виконавець',
							name : 'executor'
						}, {
							xtype : 'datefield',
							flex : 1,
							fieldLabel : 'Дата виконання',
							name : 'executionDate',
							format : 'd.m.Y H:i:s'
						} ]
					}, {
						xtype : 'htmleditor',
						anchor : "100%",
						fieldLabel : 'Коментар',
						name : 'executorDescription',
						labelAlign : 'right',
						fieldCls : 'body-style-readOnly',
						readOnly : true,
						enableLinks : false,
						enableColors : false,
						enableAlignments : false,
						enableSourceEdit : false
					} ]
				} ]
			} ]
		});
		this.callParent(arguments);
	}
});