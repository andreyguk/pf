Ext.define('pf.controller.Security', {
    extend: 'pf.controller.Abstract',
    views: ['pf.view.system.LogonForm', 'pf.view.main.container.MainToolBar'],
    init: function () {
        this.listen({
            component: {
                '[xtype=mainToolBar] button#logout': {
                    click: this.onLogout
                }
            },
            global: {
                beforeviewportrender: this.processLoggedIn
            }
        })
    },
    processLoggedIn: function () {
        var me = this;
       /* var roleName = "ADMIN_HEAD,SUPERVISOR_HEAD,OPERATOR";
        pf.LoggedInUser = Ext.create('pf.model.system.User', {
            id: '10',
            fio: 'fio',
            userName: "vasaja",
            workplace: 10,
            workplaceName: "fbi",
            roleName: roleName.split(',')

        });
        Ext.globalEvents.fireEvent('aftervalidateloggedin');
        return;*/

        Ext.Ajax.request({
            url: 'pf/security/checkauth',
            params: {
                action: 'checkauth'
            },
            success: function (response, options) {
                var result = Ext.decode(response.responseText);
                if (result.success) {
                    var data = result.data;
                    pf.LoggedInUser = Ext.create('pf.model.system.User', {
                        id: data.id,
                        fio: data.fio,
                        userName: data.userName,
                        workplace: data.workplace,
                        workplaceName: data.workplaceName,
                        roleName: data.roleName.split(',')

                    });
                    Ext.globalEvents.fireEvent('aftervalidateloggedin');
                } else {
                    window.location.assign("/");
                }
            },
            failure: function (response, options) {
                me.showError('');
            }
        });
    }, onLogout: function (button, e, eOpts) {
        var me = this;
        Ext.Msg.confirm('Увага!', 'Ви бажаєте завершити роботу з системою?', function (button) {
            if (button == 'yes') {
                me.doLogout()
            }
        });
    },
    /**
     * Выход из системы по нажатию на кнопочту Выхода
     */
    doLogout: function () {
        Ext.Ajax.request({
            url: 'pf/security/logout',
            success: function (response, options) {
                var result = Ext.decode(response.responseText);
                if (result.success) {
                    window.location.reload(true);
                }
            }
        });
    }

});