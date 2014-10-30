Ext.define('pf.view.form.card.ov.OVAbstract', {
	extend : 'Ext.form.Panel',
	alias : 'widget.OVAbstract',
	id : 'OVAbstract',
	requires : [ 'pf.view.form.card.ov.flat.TabGeneral', 'pf.view.form.card.ov.flat.TabConditionApartment', 'pf.view.form.card.ov.flat.TabInfrastructure', 'pf.view.form.card.ov.flat.TabJuridicalInfo', 'pf.view.form.card.ov.flat.TabAdditionalInfo', 'pf.view.form.card.ov.flat.TabOwner', 'pf.view.form.card.ov.simple.TabSimple', 'pf.view.form.card.ov.simple.TabActivity', 'pf.view.form.card.ov.land.TabOwner', 'pf.view.form.card.ov.land.TabGeneral', 'pf.view.form.card.ov.land.TabInfrastructure', 'pf.view.form.card.ov.land.TabJuridicalInfo', 'pf.view.form.card.ov.land.TabAdditionalInfo', 'pf.view.form.card.ov.house.TabOwner', 'pf.view.form.card.ov.house.TabGeneral', 'pf.view.form.card.ov.house.TabInfrastructure', 'pf.view.form.card.ov.house.TabJuridicalInfo', 'pf.view.form.card.ov.house.TabAdditionalInfo',
			'pf.view.form.card.ov.house.TabConditionApartment', 'pf.view.form.card.ov.house.TabLand' ],
	bodyCls : 'cmp-body-style',
	buttonAlign : 'center',
	cls : 'formButtons',
	bodyCls : 'ddd',
	autoScroll : true,
	layout : 'border',
	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
			items : [ {
				region : 'center',
				flex : 4,
				bodyStyle : {
					background : '#D9E7F8'
				},
				layout : 'fit',
				items : [ {
					xtype : 'form',
					id : 'formOVAbstract',
					cls : 'formButtons',
					buttonAlign : 'center',
					autoScroll : true,
					border : false,
					items : me.biuldItems(),
					listeners : {
						fieldvaliditychange : function() {
							var me = this, errorCmp, fields, errors;
							if (me.getForm().isDirty()) {
								errorCmp = Ext.ComponentQuery.query('OVAbstract #formErrorState')[0];

								fields = me.getForm().getFields();
								errors = [];
								fields.each(function(field) {
									Ext.Array.forEach(field.getErrors(), function(error) {
										errors.push({
											name : field.getFieldLabel(),
											error : error
										});
									});
								});
								errorCmp.setErrors(errors);
								me.hasBeenDirty = true;
							}
						},
						fielderrorchange : function() {
							var me = this, errorCmp, fields, errors;

							if (me.getForm().isDirty()) {
								errorCmp = Ext.ComponentQuery.query('OVAbstract #formErrorState')[0];

								fields = me.getForm().getFields();
								errors = [];
								fields.each(function(field) {
									Ext.Array.forEach(field.getErrors(), function(error) {
										errors.push({
											name : field.getFieldLabel(),
											error : error
										});
									});
								});
								errorCmp.setErrors(errors);
								me.hasBeenDirty = true;
							}
						}
					}
				} ]
			}, {
				region : 'east',
				flex : 1,
				title : 'Помилки',
				bodyStyle : {
					background : '#F0F0F0'
				},

				collapsible : true,
				collapsed : false,
				autoWidth : true,
				autoScroll : true,
				items : [ {
					xtype : 'label',
					id : 'formErrorState',
					tipTpl : Ext.create('Ext.XTemplate', '<ul class="' + Ext.plainListCls + '"><tpl for="."><li><span class="letter">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),
					setErrors : function(errors) {
						var me = this;
						errors = Ext.Array.from(errors);
						if (errors.length) {
							me.tipTpl.apply(errors);
							me.update(me.tipTpl.apply(errors));
						} else {
							me.update("<span style='color:green;'> <font size='5px'>Помилки відсутні<font/></span>");
						}
					}
				} ]

			} ],
			buttons : me.buildDockedItems()
		});
		me.callParent(arguments);
	},
	buildItems : function() {

	},
	buildDockedItems : function() {
		return [ {
			xtype : 'button',
			itemId : 'fillFromOV',
			text : 'Заповнити дані зі звіту',
			hidden : (this.className == 'pf.model.AllReports'),
			iconCls : 'copy'
		}, {
			xtype : 'button',
			itemId : 'fillFromTemplate',
			text : 'Заповнити дані з шаблону',
			hidden : (this.className == 'pf.model.AllReports'),
			cls : 'btnSave',
			iconCls : 'save'
		}, {
			xtype : 'button',
			itemId : 'saveAsTemplate',
			text : 'Зберегти як шаблон',
			hidden : (this.className == 'pf.model.AllReports'),
			cls : 'btnSave',
			iconCls : 'save'
		}, {
			xtype : 'button',
			itemId : 'saveToInProcess',
			action : 'saveToInProcess',
			// formBind : true,
			text : loc.bntSave,
			hidden : (this.className == 'pf.model.AllReports'),
			cls : 'btnSaveToInProcess',
			iconCls : 'save'
		}, {
			xtype : 'button',
			itemId : 'saveToInProcessAll',
			action : 'saveToInProcessAll',
			// formBind : true,
			text : loc.bntSave,
			hidden : !(this.className == 'pf.model.AllReports'),
			cls : 'btnSaveToInProcess',
			iconCls : 'save'
		}, {
			xtype : 'button',
			itemId : 'save',
			action : 'finishObjectValuation',
			hidden : (this.className == 'pf.model.AllReports'),
			formBind : true,
			text : 'Завершити роботу зі звітом',
			cls : 'btnSave',
			iconCls : 'save'
		}, {
			xtype : 'button',
			text : loc.btnExit,
			scope : this,
			handler : this.close,
			cls : 'btnExit',
			iconCls : 'exit'
		} ];
	}
});