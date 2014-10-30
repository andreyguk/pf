Ext.define('pf.view.form.support.dataUpdateList.EditBlankList', {
	extend : 'pf.view.form.support.dataUpdateList.AbstractDataChangeList',
	alias : 'widget.editBlankList',
	getStore : function() {
		return Ext.create('pf.store.dataUpdate.EditBlank');
	}
});