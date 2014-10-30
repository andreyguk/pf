Ext.define('pf.view.form.card.ov.house.OVHouseCard', {
	extend : 'pf.view.form.card.ov.OVAbstract',
	alias : 'widget.ovHouseCard',
	biuldItems : function() {
		extraParams = {
			'ovID' : this.ovID,
			'contractNum' : this.contractNum,
			'blankID' : this.blankID,
			attachmentDocs : this.attachmentDocs
		};

		var tabOwner = Ext.widget('ov.house.tabOwner', extraParams);
		tabOwner.title = 'Загальні дані власника';
		tabOwner.bodyCls = 'cmp-body-style';

		var tabGeneral = Ext.widget('ov.house.tabGeneral', extraParams);
		tabGeneral.title = 'Основні хар-ки об\'єкту';
		tabGeneral.bodyCls = 'cmp-body-style';

		var tabJuridicalInfo = Ext.widget('ov.house.tabJuridicalInfo', extraParams);
		tabJuridicalInfo.title = 'Юридична інф-ція'
		tabJuridicalInfo.bodyCls = 'cmp-body-style';

		var tabConditionApartment = Ext.widget('ov.house.tabConditionApartment', extraParams);
		tabConditionApartment.title = 'Cтан об’єкту оцінки';
		tabConditionApartment.bodyCls = 'cmp-body-style';

		var tabInfrastructure = Ext.widget('ov.house.tabInfrastructure', extraParams);
		tabInfrastructure.title = 'Будівлі та інфраструктура';
		tabInfrastructure.bodyCls = 'cmp-body-style';

		var tabLand = Ext.widget('ov.house.tabLand', extraParams);
		tabLand.title = 'Земельна ділянка';
		tabLand.bodyCls = 'cmp-body-style';

		var tabAdditionalInfo = Ext.widget('ov.house.tabAdditionalInfo', extraParams);
		tabAdditionalInfo.title = 'Оціночна інф-ція';
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
				xtype : tabLand
			}, {
				xtype : tabAdditionalInfo
			}, {
				xtype : tabActivity
			} ]

		} ];
	}
});
