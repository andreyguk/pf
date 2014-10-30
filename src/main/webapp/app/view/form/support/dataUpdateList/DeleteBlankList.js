Ext.define('pf.view.form.support.dataUpdateList.DeleteBlankList', {
	extend : 'pf.view.form.support.dataUpdateList.AbstractDataChangeList',
	alias : 'widget.deleteBlankList',
	getStore : function() {
		return Ext.create('pf.store.dataUpdate.DeleteBlank');
	}
});