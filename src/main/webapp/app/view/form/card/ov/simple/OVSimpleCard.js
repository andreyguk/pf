Ext.define('pf.view.form.card.ov.simple.OVSimpleCard', {
	extend : 'pf.view.form.card.ov.OVAbstract',
	alias : 'widget.ovSimpleCard',
	itemId : 'OVSimple',
	biuldItems : function() {
		extraParams = {
			'ovID' : this.ovID,
			'contractNum' : this.contractNum,
			blankID : this.blankID,
			attachmentDocs : this.attachmentDocs
		};
		var tabSimple = Ext.widget('ov.simple.tabSimple', extraParams);
		tabSimple.title = 'Загальні дані';
		tabSimple.bodyCls = 'cmp-body-style';

		var tabActivity = Ext.widget('ov.simple.TabActivity', extraParams);
		tabActivity.title = 'Історія';
		tabActivity.bodyCls = 'cmp-body-style';

		return [ {
			xtype : 'tabpanel',
			autoScroll : true,
			bodyPadding : 5,
			bodyCls : 'cmp-body-style',
			deferredRender : false,
			items : [ {
				xtype : tabSimple
			}, {
				xtype : tabActivity
			} ]

		} ];
	},
	buildDockedItems : function() {
		return [ {
			xtype : 'button',
			itemId : 'save',
			action : 'finishOVSimple',
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
