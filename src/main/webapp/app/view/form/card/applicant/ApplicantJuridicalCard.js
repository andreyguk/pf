/**
 * create new applicant juridical person
 */
Ext.define('pf.view.form.card.applicant.ApplicantJuridicalCard', {
    extend: 'pf.view.form.card.applicant.Applicant',
    autoScroll: true,
    itemId: 'applicantJuridicalCardId',
    alias: 'widget.applicantJuridicalCard',
    title: loc.tltNewApplicant,
    biuldFields: function () {
        return [{
                xtype: 'hiddenfield',
                name: 'id'
            }, {
                xtype: 'combobox',
                fieldLabel: loc.lblApplicantType,
                itemId: 'applicantTypeId',
                name: 'applicantType',
                store: Ext.create('pf.store.common.ApplicantTypes'),
                queryMode: 'local',
                minChars: 3,
                editable: false,
                readOnly: true,
                displayField: 'name',
                valueField: 'id',
                afterLabelTextTpl: pf.utils.Validation.required,
                allowBlank: false
            }, {
                name: 'appCompanyName',
                fieldLabel: loc.lblCompanyName
            }, {
                name: 'taxSystemType',
                fieldLabel: loc.lbltaxSystemType,
                xtype: 'combobox',
                displayField: 'name',
                valueField: 'id',
                store: Ext.create('pf.store.common.TaxSystemTypes')
            }, {
                name: 'appCompanyHeadPosition',
                fieldLabel: loc.lblCompanyHeadPosition
            }, {
                name: 'appCompanyHeadName',
                fieldLabel: loc.lblCompanyHeadName
            }, {
                name: 'appCompanyHeadReason',
                fieldLabel: loc.lblCompanyHeadReason
            }, {
                name: 'appCompanyOKPO',
                fieldLabel: loc.lblCompanyOKPO
            }, {
                name: 'appINN',
                fieldLabel: loc.lblAppINN
            }, {
                name: 'appVATNum',
                fieldLabel: loc.lblappVATNum
            }, {
                name: 'appCompanyAddress',
                fieldLabel: loc.lblCompanyAddress
            }, {
                name: 'appContactPhone',
                fieldLabel: loc.lblappContactPhone
            }, {
                name: 'appAddPhone',
                fieldLabel: loc.lblappAddPhone
            }, {
                name: 'appCompanyEmail',
                fieldLabel: loc.lblCompanyEmail
            }];
    }
});
