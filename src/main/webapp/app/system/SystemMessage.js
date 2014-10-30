Ext.define('pf.system.SystemMessage', {
    message: [{
            code: 100,
            value: 'Запис збережено!'
        }, {
            code: 200,
            value: 'Запис вилучено!'
        }, {
            code: 50,
            value: 'Помилка при збережені запису!'
        }, {
            code: 501,
            value: 'Користувач с таким логіном уже існує!'
        }, {
            code: 1000,
            value: 'Пароль успішно було змінено!'
        }, {
            code: 'TAKE_OV_IN_PROCESS',
            value: 'Анкету взято в роботу!'
        }, {
            code: 'TAKE_OV_TO_ADD_NUM',
            value: 'Анкету взято на синхронізацію!'
        }],
    getMessage: function (code) {
        var msg = this.message;
        for (var i = 0; i <= msg.length - 1; i++) {
            if (msg[i].code == code)
                return msg[i].value
        }
    }

})
