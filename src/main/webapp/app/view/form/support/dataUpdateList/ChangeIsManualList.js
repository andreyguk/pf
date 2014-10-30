Ext.define('pf.view.form.support.dataUpdateList.ChangeIsManualList', {
	extend : 'pf.view.form.support.dataUpdateList.AbstractDataChangeList',
	alias : 'widget.changeIsManualList',
	getStore : function() {
		return Ext.create('pf.store.dataUpdate.ChangeIsManual');
	}
});