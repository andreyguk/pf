Ext.define('pf.ux.form.field.GenPassFld', {
	extend : 'Ext.form.field.Trigger',
	alias : 'widget.genpassfld',
	initComponent : function() {
		var me = this;
		me.callParent(arguments);
	},
	// override onTriggerClick
	onTriggerClick : function() {
		var passwd = '';
		var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		for (i = 1; i < 8; i++) {
			var c = Math.floor(Math.random() * chars.length + 1);
			passwd += chars.charAt(c)
		}
		this.setRawValue(passwd);
	}
});