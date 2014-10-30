Ext.define('pf.view.form.support.dataUpdateList.ChangeOVStateList', {
	extend : 'pf.view.form.support.dataUpdateList.AbstractDataChangeList',
	alias : 'widget.changeOVStateList',
	getStore : function() {
		return Ext.create('pf.store.dataUpdate.ChangeOVState');
	}
});