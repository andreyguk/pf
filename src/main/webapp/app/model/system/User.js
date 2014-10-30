Ext.define('pf.model.system.User', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        }, {
            name: 'fio',
            type: 'string'
        }, {
            name: 'userName',
            type: 'string'
        }, {
            name: 'workplace',
            type: 'string'
        }, {
            name: 'workplaceName',
            type: 'string'
        }, {
            name: 'roleName',
            type: 'auto'
        }],
    inRole: function (roleList) {
        var me = this, roleArr = roleList.split(',');
        for (var i = 0; i < roleArr.length; i++) {
            roleName = roleArr[i];
            res = Ext.Array.contains(me.get('roleName'), roleName);
            if (res)
                return true;
        }
        return false;
    },
    getFIO: function () {
        var me = this;
        return me.get('fio');
    },
    getCurrUserData: function () {
        var me = this;
        return me;
    },
    getUserId: function () {
        var me = this;
        return me.get('id');
    },
    getRoleUK: function () {
        var me = this, role;
        switch (me.get('roleName')) {
            case 'ADMIN':
                role = 'Адміністратор';
                break;
            case 'USER':
                role = 'Оператор';
                break;
        }
        return role;
    }

});