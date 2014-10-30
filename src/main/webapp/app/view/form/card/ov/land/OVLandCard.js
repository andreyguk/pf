Ext.define('pf.view.form.card.ov.land.OVLandCard', {
	extend : 'pf.view.form.card.ov.OVAbstract',
	alias : 'widget.ovLandCard',
	// requires : [ 'pf.view.form.card.ov.land.TabOwner',
	// 'pf.view.form.card.ov.land.TabGeneral' ],
	// itemId : 'OVCreate',

	biuldItems : function() {
		extraParams = {
			'ovID' : this.ovID,
			'contractNum' : this.contractNum,
			'blankID' : this.blankID,
			attachmentDocs : this.attachmentDocs
		};
		var tabOwner = Ext.widget('ov.land.tabOwner', extraParams);
		tabOwner.title = 'Загальні дані власника';
		tabOwner.bodyCls = 'cmp-body-style';

		var tabGeneral = Ext.widget('ov.land.tabGeneral', extraParams);
		tabGeneral.title = 'Основні характеристики об\'єкту';
		tabGeneral.bodyCls = 'cmp-body-style';

		var tabJuridicalInfo = Ext.widget('ov.land.tabJuridicalInfo', extraParams);
		tabJuridicalInfo.title = 'Юридична інформація'
		tabJuridicalInfo.bodyCls = 'cmp-body-style';

		var tabInfrastructure = Ext.widget('ov.land.tabInfrastructure', extraParams);
		tabInfrastructure.title = 'Будівлі,споруди та інженерні комунікації';
		tabInfrastructure.bodyCls = 'cmp-body-style';

		var tabAdditionalInfo = Ext.widget('ov.land.tabAdditionalInfo', extraParams);
		tabAdditionalInfo.title = 'Оціночна інформація';
		tabAdditionalInfo.bodyCls = 'cmp-body-style';
		
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
				xtype : tabOwner
			}, {
				xtype : tabGeneral
			}, {
				xtype : tabInfrastructure
			}, {
				xtype : tabJuridicalInfo
			}, {
				xtype : tabAdditionalInfo
			}, {
				xtype : tabActivity
			} ]

		} ];
	}
});
