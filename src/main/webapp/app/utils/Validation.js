/**
 * validation service
 */
Ext.define('pf.utils.Validation', {
    singleton: true,
    /**
     * required field
     */
    required: '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',
    /**
     * Validate a integer vtype=isInt
     */
    isIntValidation: function () {
        Ext.form.field.VTypes.isIntVal = /^[0-9]+$/;
        Ext.form.field.VTypes.isInt = function (toCheck) {
            return Ext.form.field.VTypes.isIntVal.test(toCheck);
        }
        Ext.form.field.VTypes.isIntText = validMsg.isInt;
    },
    /**
     * ввод целых и дробных чисел. разделитель - "." vtype=isIntFloat
     */
    isIntFloatValidation: function () {
        Ext.form.field.VTypes.isIntFloatVal = /^\d*[\.]?\d{0,2}$/;
        Ext.form.field.VTypes.isIntFloat = function (toCheck) {
            return Ext.form.field.VTypes.isIntFloatVal.test(toCheck);
        }
        Ext.form.field.VTypes.isIntFloatText = validMsg.isIntFloat;
    },
    /**
     * ввод целых и дробных чисел. разделитель - "." vtype=isIntFloat4 (4 знака
     * после запятой) * vtype=isIntFloat4
     */
    isIntFloat4Validation: function () {
        Ext.form.field.VTypes.isIntFloat4Val = /^\d*[\.]?\d{0,4}$/;
        Ext.form.field.VTypes.isIntFloat4 = function (toCheck) {
            return Ext.form.field.VTypes.isIntFloat4Val.test(toCheck);
        }
        Ext.form.field.VTypes.isIntFloat4Text = validMsg.isIntFloat4;
    }
}, function () {
    this.isIntValidation();
    this.isIntFloatValidation();
    this.isIntFloat4Validation();
}

);