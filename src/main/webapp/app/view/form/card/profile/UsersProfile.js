/**
 * user's profile
 * 
 * controller-card.Common
 */
Ext.define('pf.view.form.card.profile.UsersProfile', {
	extend : 'Ext.window.Window',
	alias : 'widget.usersProfile',
	autoScroll : true,
	modal : true,
	closable : false,
	buttonAlign : 'center',
	border : false,
	autoShow : false,
	titleCollapse : false,
	title : 'Зміна паролю для входу',
	requires : [ 'Ext.form.Label', 'Ext.form.FieldSet', 'Ext.form.field.TextArea' ],
	height : 300,
	width : 300,
	layout : 'fit',
	initComponent : function() {
		var me = this;
		var user = pf.LoggedInUser.getCurrUserData(), userName = user.get('userName');
		Ext.apply(me, {
			items : [ {
				buttons : [ {
					xtype : 'button',
					text : 'Зберегти',
					formBind : true,
					itemId : 'save',
					action : 'userChangePass',
					cls : 'btnSave',
					iconCls : 'save'
				}, {
					xtype : 'button',
					text : loc.btnExit,
					scope : this,
					handler : this.close,
					cls : 'btnExit',
					iconCls : 'exit'
				} ],
				xtype : 'form',
				items : [ {
					xtype : 'container',
					margin : '10px 5px 5px 10px',
					title : loc.ttlUserChangePass,
					defaults : {
						labelAlign : 'top',
						margin : '0 5 5 0',
						msgTarget : 'under'
					},
					layout : {
						type : 'vbox',
						align : 'stretch'
					},
					items : [ {
						xtype : 'textfield',
						flex : 1,
						fieldLabel : 'Логін',
						itemId : 'userName',
						value : userName,
						readOnly : true,
						fieldCls : 'body-style-readOnly'
					}, {
						xtype : 'textfield',
						flex : 1,
						fieldLabel : "Старий пароль",
						inputType : 'password',
						itemId : 'oldPass',
						allowBlank : false,
						enforceMaxLength : true,
						maxLength : 10,
						afterLabelTextTpl : pf.utils.Validation.required
					}, {
						xtype : 'textfield',
						flex : 1,
						fieldLabel : "Новий пароль",
						enforceMaxLength : true,
						inputType : 'password',
						itemId : 'newPass',
						name : 'password',
						allowBlank : false,
						maxLength : 10,
						minLength : 6,
						afterLabelTextTpl : pf.utils.Validation.required
					}, {
						xtype : 'textfield',
						flex : 1,
						fieldLabel : "Підтвердження паролю",
						inputType : 'password',
						itemId : 'confirmPass',
						allowBlank : false,
						enforceMaxLength : true,
						maxLength : 10,
						minLength : 6,
						afterLabelTextTpl : pf.utils.Validation.required
					} ]
				}, {
					xtype : 'label',
					html : "<span style='color:green;padding:0px;'>*Пароль повинен бути не менше 6 і не більше 10 символів!<span/>"
				} ]
			} ]
		});

		me.callParent(arguments);
	}

});