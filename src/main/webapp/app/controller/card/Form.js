Ext.define('pf.controller.card.Form', {
    extend: 'pf.controller.Abstract',
    views: ['pf.view.form.card.CreateBlank', 'pf.view.form.card.applicant.ApplicantList', 'pf.view.form.card.applicant.ApplicantPhysicalCard', 'pf.view.form.card.ViewBlank', 'pf.view.form.card.ViewBlankPaid', 'pf.view.form.list.UnpaidList', 'pf.view.form.list.PaidList', 'pf.view.form.list.AllBlanksList', 'pf.view.form.list.AccountedList', 'pf.view.form.list.NewList', 'pf.view.form.list.FinishedList', 'pf.view.form.list.InProcessList', 'pf.view.form.list.ToSyncList', 'pf.view.form.list.SynchedList', 'pf.view.form.list.ReadyList', 'pf.view.form.list.HandedList', 'pf.view.form.list.AllReportsList', 'pf.view.form.card.EditBlank', 'pf.view.form.support.UserInstructionsList'],
    fileName: '',
    refs: [{
            ref: 'createBlank',
            selector: '[xtype=createBlank]'
        }, {
            ref: 'viewBlank',
            selector: '[xtype=viewBlank]'
        }, {
            ref: 'viewBlankPaid',
            selector: '[xtype=viewBlankPaid]'
        }, {
            ref: 'applicantType',
            selector: '[xtype=createBlank] combobox#applicantTypeId'
        }, {
            ref: 'btnPrintBlank',
            selector: '[xtype=createBlank] button#printBlankId'
        }, {
            ref: 'gridInProcessList',
            selector: '[xtype=inProcessList]'
        }, {
            ref: 'gridUnpaid',
            selector: '[xtype=unpaidList]'
        }, {
            ref: 'gridPaid',
            selector: '[xtype=paidList]'
        }, {
            ref: 'gridAccounted',
            selector: '[xtype=accountedList]'
        }],
    init: function () {
        this.listen({
            component: {
                '[xtype=createBlank] button#searchApplicant': {
                    click: this.searchApplicant
                },
                '[xtype=createBlank] button#saveBlank': {
                    click: this.saveObject
                },
                '[xtype=createBlank] button#printBlankId': {
                    click: this.printBlank
                },
                '[xtype=applicantList] button#newApplicant': {
                    click: this.newApplicant
                },
                '[xtype=applicantList] grid#gridApplicantListId': {
                    itemdblclick: this.selectApplicant
                },
                '[xtype=createBlank] combobox#objectTypesId': {
                    change: this.onChangeObjectType
                },
                '[xtype=createBlank] combobox#objectSubTypesId': {
                    beforequery: this.checkObjectType
                },
                'viewport content unpaidList': {
                    itemdblclick: this.openBlank
                },
                'viewport content paidList': {
                    itemdblclick: this.openBlankPaid
                },
                'viewport content allBlanksList': {
                    itemdblclick: this.openBlankPaid
                },
                'viewport content accountedList': {
                    itemdblclick: this.openBlankPaid
                },
                '[xtype=viewBlank] button#acceptPayment': {
                    click: this.saveObject
                },
                '[xtype=viewBlankPaid] button#acceptPayment': {
                    click: this.saveObject
                },
                '[xtype=viewBlankPaid] button#confirmTo1S': {
                    click: this.saveObject
                },
                '[xtype=viewBlank] button#confirmTo1S': {
                    click: this.saveObject
                },
                '[xtype=viewBlank] button#viewApplicant': {
                    click: this.viewApplicant
                },
                '[xtype=viewBlankPaid] button#viewApplicant': {
                    click: this.viewApplicant
                },
                '[xtype=editBlank] button#viewApplicant': {
                    click: this.viewApplicant
                },
                '[xtype=viewBlank] button#editBlank': {
                    click: this.onEditBlank
                },
                '[xtype=viewBlankPaid] button#editBlank': {
                    click: this.onEditBlank
                },
                '[xtype=editBlank] button#updateBlank': {
                    click: this.saveObject
                },
                '[xtype=viewBlank]': {
                    uploadAdditionalDocs: this.uploadAdditionalDocs,
                    deletePrimaryDoc: this.onDelete
                },
                '[xtype=viewBlankPaid]': {
                    uploadAdditionalDocs: this.uploadAdditionalDocs,
                    deletePrimaryDoc: this.onDelete
                },
                '[xtype=userInstructionsList]': {
                    uploadUserInstructions: this.uploadAdditionalDocs
                }
            },
            store: {}
        });
    },
    saveObject: function (button) {
        var me = this;
        switch (button.action) {
            case 'saveBlank':
                me.save(button, me, me.saveBlank);
                break;
            case 'acceptPayment':
                me.save(button, me, me.acceptPayment);
                break;
            case 'confirmPayment':
                me.save(button, me, me.savePaidBlank);
                break;
            case 'confirmTo1S':
                me.save(button, me, me.confirmTo1S);
                break;
            case 'updateBlank':
                me.save(button, me, me.editBlank);
                break;
        }
    },
    onDelete: function (grid, record) {
        var me = this;
        me.destroy(grid, record, me, me.deleteObject);
    },
    deleteObject: function (grid, record) {
        var me = this;
        var store = grid.getStore();
        store.remove(record);
        callbacks = {
            success: function (records, operation) {
                var result = Ext.decode(records.operations[0].response.responseText);
                me.showInfo(me.getMessage(result.code));
            },
            failure: function (records, operation) {
                store.rejectChanges();
            }
        };
        store.sync(callbacks);
    },
    searchApplicant: function (btn) {
        var applicantType = this.getApplicantType().getValue();
        if (!applicantType) {
            this.showError("Виберіть тип замовника!");
            return;
        }
        extraParams = {
            'applicantType': applicantType
        };
        var win = Ext.create('pf.view.form.card.applicant.ApplicantList', extraParams);
        
        win.show();
    },
    /**
     * add new applicant
     */
    newApplicant: function () {
        var applicantType = this.getApplicantType().getValue();
        extraParams = {
            applicantType: applicantType,
            action: 'create'
        };
        if (applicantType == 4) {
            var win = Ext.create('pf.view.form.card.applicant.ApplicantJuridicalCard', extraParams);
            var record = Ext.create('pf.model.common.ApplicantJuridical');
        } else {
            var win = Ext.create('pf.view.form.card.applicant.ApplicantPhysicalCard', extraParams);
            var record = Ext.create('pf.model.common.ApplicantPhysical');
        }

        win.down('form').loadRecord(record);
        win.show();

    },
    /**
     * select applicant in applicant's grid
     */
    selectApplicant: function (grid, record, item, index) {
        var applicantId = record.get('id'), applicantName = '', win = grid.up('applicantList');
        if (record.get('appCompanyOKPO')) {
            applicantName = record.get('appCompanyName');
        } else {
            applicantName = record.get('appPersonLastName') + ' ' + record.get('appPersonFirstName') + ' ' + record.get('appPersonMiddleName');
        }
        var createBlank = this.getCreateBlank();
        var compApplicantId = createBlank.down('form').down('container').getComponent('fldApplicantDescId').getComponent('cntrApplicant').getComponent('applicantId');
        compApplicantId.setValue(applicantId);

        var compApplicantNameId = createBlank.down('form').down('container').getComponent('fldApplicantDescId').getComponent('cntrApplicant').getComponent('applicantNameId');
        compApplicantNameId.setValue(applicantName);
        win.close();
    },
    /**
     * saveBlank
     */
    saveBlank: function (button) {
        var me = this, form = button.up('panel'), values = form.getValues(), callbacks;
        var shortUrl = "pf.proxy.manager.Create.cls";
        var params = {
            classname: 'createBlank',
            data: JSON.stringify(values)
        };
        me.formSubmit(button, form, me, shortUrl, params, me.afterSaveBlank);
    },
    afterSaveBlank: function (button, options) {
        var me = this;
        var responseResult = Ext.decode(options.response.responseText);
        if (responseResult.success) {
            me.getBtnPrintBlank().setDisabled(false);
            me.PreliminaryInfoId = responseResult.recordID;
            Ext.Msg.confirm('Підтвердження дії!', 'Анкету успішно збережено!	  <br/>Бажаєте роздрукувати рахунок-договір?', function (btn) {
                if (btn == 'yes') {
                    me.printBlank();
                    me.getController('App').onMenuClick({
                        itemId: 'unpaid'
                    });
                }
                if (btn == 'no') {
                    me.getController('App').onMenuClick({
                        itemId: 'unpaid'
                    });
                }
            });
        }
    },
    /**
     * print saved blank
     */
    printBlank: function () {
        var id = this.PreliminaryInfoId;
        var params = "target='_blank',menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes"
        // var url =
        // 'pf.proxy.manager.FileManager.cls?objType=blank&fileType=payment&objId='
        // + id
        var url = 'pf.printForms.pdf.Contract.cls?blankId=' + id
        window.open(url, "Документ", params)
    },
    /**
     * 
     */
    checkObjectType: function (queryPlan, eOpts) {
        var me = this, objectType = queryPlan.combo.up('form').down('[name=objectType]');
        if (Ext.isEmpty(objectType.getValue())) {
            me.showError("Будь-ласка, виберіть тип об'єкту!")
            queryPlan.cancel = true;
        }
    },
    onChangeObjectType: function (combo, value) {
        var objType = combo.getValue(), objSubType = combo.up().getComponent('objectSubTypesId'), store, objTypeStore = combo.getStore();
        var objTypeCode = objTypeStore.findRecord('id', value).get('code');
        if (!objTypeCode) {
            return;
        }
        if ((objTypeCode == 5) || (objTypeCode == 6) || (objTypeCode == 7) || (objTypeCode == 8)) {
            objSubType.allowBlank = true;
            objSubType.setFieldLabel(loc.lblObjectSubType);
        } else {
            objSubType.allowBlank = false;
            objSubType.setFieldLabel(loc.lblObjectSubTypeRequired);
        }
        objSubType.setValue('');
        store = objSubType.getStore();
        filters = [{
                property: 'objectType',
                value: objType
            }];
        store.clearFilter(true);
        store.filter(filters);
    },
    /**
     * open blank to enter the date of payment
     */
    openBlank: function (grid, record) {
        var me = this;
        var selection = grid.getSelectionModel().getSelection()[0];
        var extraParams = {
            'blankID': selection.get('id'),
            'contractNum': selection.get('contractNum'),
            'isAppIn1S': selection.get('isAppIn1S'),
            attachmentDocs: selection.get('attachmentDocs'),
            gridId: grid.ownerCt.itemId
        };
        var win = Ext.widget('viewBlank', extraParams);
        win.setTitle('Номер договору : ' + selection.get('contractNum'));
        win.down('form').loadRecord(selection);
        win.show();
    },
    openBlankPaid: function (grid, record) {
        var selection = grid.getSelectionModel().getSelection()[0];
        var extraParams = {
            'blankID': selection.get('id'),
            'contractNum': selection.get('contractNum'),
            'isAppIn1S': selection.get('isAppIn1S'),
            'gridId': grid.panel.itemId,
            attachmentDocs: selection.get('attachmentDocs'),
            gridId : grid.ownerCt.itemId
        };
        var win = Ext.widget('viewBlankPaid', extraParams);
        win.setTitle('Номер договору : ' + selection.get('contractNum'));
        win.down('form').loadRecord(selection);
        win.show();
    },
    acceptPayment: function (button) {
        var me = this, win = button.up('window'), form = win.down('form'), blankId = form.getValues().id;
        params = {
            blankId: blankId,
            action: 'createObjectValuation'
        }, me.formSubmit(button, form, me, 'pf.proxy.manager.Create.cls', params, me.afterAcceptPayment)
    },
    afterAcceptPayment: function (button) {
        var me = this, paidStr = (Ext.getStore('storePaidId')) ? Ext.getStore('storePaidId') : Ext.create('pf.store.Paid');
        stores = [paidStr, Ext.getStore('storeUnpaidlId')];
        button.up('form').up('window').close();
        me.reloadStores(stores)
    },
    savePaidBlank: function (button) {
        var me = this, win = button.up('window'), form = win.down('form'), values = form.getValues(), url = 'pf.proxy.manager.Create.cls';
        var params = {
            blankId: values.id,
            action: 'confirmBlankPayment',
            paymentDate: values.paymentDate
        }
        me.ajaxRequest(button, form, params, url, me, me.afterSavePaidBlank)
    },
    afterSavePaidBlank: function (button) {
        button.up('form').up('window').close();
        var accountedStr = (Ext.getStore('storeAccountedId')) ? Ext.getStore('storeAccountedId') : Ext.create('pf.store.Accounted')
        var stores = [Ext.getStore('storePaidId'), accountedStr];
        this.reloadStores(stores);
    },
    confirmTo1S: function (button) {
        var me = this, win = button.up('window'), form = win.down('form'), blankId = form.getValues().id, url = 'pf.proxy.manager.Create.cls'
        var params = {
            blankId: blankId,
            action: 'addAppTo1S'
        }
        me.ajaxRequest(button, form, params, url, me, me.afterConfirmTo1S)
    },
    afterConfirmTo1S: function (button) {
        button.up('form').up('window').close();
        var stores = [];
        if (Ext.getStore('storeUnpaidlId')) {
            stores.push(Ext.getStore('storeUnpaidlId'));
        }
        if (Ext.getStore('storePaidId')) {
            stores.push(Ext.getStore('storePaidId'));
        }
        if (Ext.getStore('storeAccountedId')) {
            stores.push(Ext.getStore('storeAccountedId'));
        }

        this.reloadStores(stores);
    },
    /**
     * view applicant
     */
    viewApplicant: function (btn) {
        var me = this, record = btn.up('form').getRecord();
        var applicantType = record.get('applicantTypeId'), applicantId = record.get('applicantId')
        extraParams = {
            applicantType: applicantType,
            action: 'edit'
        };
        if (applicantType == 4) {
            var win = Ext.create('pf.view.form.card.applicant.ApplicantJuridicalCard', extraParams);
            var record = Ext.create('pf.model.common.ApplicantJuridical');
        } else {
            var win = Ext.create('pf.view.form.card.applicant.ApplicantPhysicalCard', extraParams);
            var record = Ext.create('pf.model.common.ApplicantPhysical');
        }
        win.title = 'Картка замовника';
        me.disabledFld(win, 'SUPERVISOR')
        me.loadApplicantDataById(win, record, applicantId, applicantType, me, me.showApplicantCard);

    },
    /**
     * load data for applicant
     */
    loadApplicantDataById: function (win, record, applicantId, applicantType, scope, callbackFn, extraData) {
        Ext.Ajax.request({
            url: pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.common.Common.cls',
            params: {
                classname: 'getApplicantById',
                applicantId: applicantId,
                applicantType: applicantType
            },
            callback: function (options, success, response) {
                var result = Ext.decode(response.responseText);
                if (result.success) {
                    data = Ext.decode(response.responseText, true);
                    record.set(result.data[0]);
                    callbackFn.call(scope, win, record, extraData);
                }
            }
        });
    },
    /**
     * show applicant's card
     */
    showApplicantCard: function (win, record) {
        win.down('form').loadRecord(record);
        win.show();
    },
    /*
     * ?
     */
    onEditBlank: function (btn) {
        var me = this, grid, recorcd;
        switch (btn.up('window').gridId) {
            case 'gridUnpaidList':
                grid = me.getGridUnpaid();
                break;
            case 'gridPaidList':
                grid = me.getGridPaid();
                break;
            case 'gridAccountedList':
                grid = me.getGridAccounted();
                break;
        }
        recorcd = grid.getSelectionModel().getSelection()[0];
        var record = btn.up('form').getRecord();
        var extraParams = {
            'blankID': recorcd.get('id'),
            'contractNum': recorcd.get('contractNum'),
            'isAppIn1S': recorcd.get('isAppIn1S')
        };
        var win = Ext.widget('editBlank', extraParams);
        win.setTitle('Номер договору : ' + recorcd.get('contractNum'));
        win.down('form').loadRecord(record);
        win.show();
    },
    /**
     * update data on blank
     */
    editBlank: function (button) {
        var me = this, form = button.up('form'), record = form.getRecord(), values = form.getValues();
        var url = 'pf.proxy.manager.Create.cls';
        var params = {
            action: 'updateBlank',
            data: Ext.encode(values)
        };
        me.formSubmit(button, form, me, url, params, me.afterEditBlank)
    },
    afterEditBlank: function (button) {
        var me = this;
        button.up('form').up('window').close();

    },
    uploadAdditionalDocs: function (event, button) {
        var me = this;
        var win = Ext.create('Ext.window.Window', {
            autoScroll: true,
            plain: true,
            modal: true,
            closable: false,
            buttonAlign: 'center',
            border: false,
            autoShow: false,
            titleCollapse: false,
            title: 'Картка прикріплення файлу',
            height: Ext.getBody().getViewSize().height * 0.2,
            width: Ext.getBody().getViewSize().width * 0.4,
            layout: 'fit',
            items: [{
                    xtype: 'form',
                    buttons: [{
                            xtype: 'button',
                            text: loc.btnOK,
                            formBind: true,
                            cls: 'btnSave',
                            handler: function () {
                                me.uploadFile(me, event, button, this);
                            }
                        }, {
                            xtype: 'button',
                            text: loc.btnExit,
                            cls: 'btnExit',
                            iconCls: 'exit',
                            handler: function () {
                                this.up('.window').close();
                            }
                        }],
                    items: [{
                            margin: '20 5 5 5',
                            xtype: 'filefield',
                            itemId: 'fileId',
                            afterLabelTextTpl: pf.utils.Validation.required,
                            allowBlank: false,
                            name: 'file',
                            anchor: '100%',
                            buttonText: 'Оберіть файл',
                            listeners: {
                                change: function (comp, value) {
                                    me.fileName = value;
                                }
                            }
                        }]
                }]
        });
        win.show();
    },
    uploadFile: function (me, event, button, windowBtn) {
        var action = '', window = windowBtn.up('form'), shortUrl = "pf.proxy.manager.Create.cls";

        switch (event) {
            case 'uploadAddDocsUnpaidBlank':
                action = 'uploadAddDocsUnpaidBlank';
                break;
            case 'uploadAddDocsPaidBlank':
                action = 'uploadAddDocsPaidBlank';
                break;
            case 'uploadUserInstructions':
                action = 'uploadUserInstructions';
                break;
        }
        if (button.itemId != 'newUserInstructions') {
            var form = button.up('form'), values = form.getValues();
            var params = {
                action: action,
                objId: values.id
            }
        } else {
            var params = {
                action: action
            }
        }

        me.formSubmit([windowBtn, button], window, me, shortUrl, params, me.afterUploadFile);
    },
    afterUploadFile: function (array, options) {
        var me = this, windowBtn = array[0], button = array[1];
        var responseResult = Ext.decode(options.response.responseText);
        if (responseResult.success) {
            windowBtn.up('.window').close();
            if (button.itemId != 'newUserInstructions') {
                var link = button.up('form').down('[itemId=linkId]');
                link.setText('<a href="pf.proxy.manager.FileManager.cls?objType=blank&fileType=doc_archive&objId=' + button.up('form').up().blankID + '">' + me.fileName + '</a>', false);
                me.fileName = '';
            } else {
                me.getController('App').onMenuClick({
                    itemId: 'listUserManual'
                });
            }
        } else {
            me.showError('');
        }
    }
});