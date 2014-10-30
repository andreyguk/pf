Ext.define('pf.view.form.card.ov.flat.OVFlatCard', {
	extend : 'pf.view.form.card.ov.OVAbstract',
	alias : 'widget.ovFlatCard',
	itemId : 'OVCreate',
	biuldItems : function() {
		extraParams = {
			'ovID' : this.ovID,
			'contractNum' : this.contractNum,
			'blankID' : this.blankID,
			attachmentDocs : this.attachmentDocs
		};

		var tabOwner = Ext.widget('ov.flat.tabOwner', extraParams);
		tabOwner.title = 'Загальні дані власника';
		tabOwner.bodyCls = 'cmp-body-style';

		var tabGeneral = Ext.widget('ov.flat.tabGeneral', extraParams);
		tabGeneral.title = 'Основні характеристики об\'єкту';
		tabGeneral.bodyCls = 'cmp-body-style';

		var tabJuridicalInfo = Ext.widget('ov.flat.tabJuridicalInfo', extraParams);
		tabJuridicalInfo.title = 'Юридична інформація'
		tabJuridicalInfo.bodyCls = 'cmp-body-style';

		var tabConditionApartment = Ext.widget('ov.flat.tabConditionApartment', extraParams);
		tabConditionApartment.title = 'Стан квартири';
		tabConditionApartment.bodyCls = 'cmp-body-style';

		var tabInfrastructure = Ext.widget('ov.flat.tabInfrastructure', extraParams);
		tabInfrastructure.title = 'Інфраструктура';
		tabInfrastructure.bodyCls = 'cmp-body-style';

		var tabAdditionalInfo = Ext.widget('ov.flat.tabAdditionalInfo', extraParams);
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
				xtype : tabConditionApartment
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
