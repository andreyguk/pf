/**
 * класс для создания об'екту оцінки
 */
Ext.define('pf.view.form.card.CreateObjectValuation', {
    extend: 'Ext.form.Panel',
    alias: 'widget.createObjectValuation1',
    requires: ['Ext.tab.Panel', 'Ext.form.FieldSet', 'Ext.form.field.ComboBox', 'Ext.form.RadioGroup', 'Ext.form.field.Radio', 'Ext.tab.Tab', 'Ext.form.field.TextArea', 'Ext.form.Panel', 'Ext.toolbar.Spacer'],
    autoScroll: true,
    layout: 'fit',
    border: false,
    initComponent: function () {
        var me = this;
        me.height = Ext.getBody().getViewSize().height * 0.7;
        me.width = Ext.getBody().getViewSize().width * 0.5;
        var selModel = Ext.create('Ext.selection.CheckboxModel');
        var ObjectValuationStore = Ext.create('pf.store.common.OV2Infrastructure', {
            'ov': me.ovID
        });
        Ext.applyIf(me, {
            items: [{
                    xtype: 'form',
                    autoScroll: true,
                    items: [{
                            xtype: 'tabpanel',
                            bodyPadding: 0,
                            border: false,
                            buttonAlign: 'center',
                            cls: 'formButtons',
                            defaults: {
                                bodyCls: 'cmp-body-style'
                            },
                            buttons: [{
                                    xtype: 'button',
                                    text: 'MyButton',
                                    itemId: 'saveObjectValuation'
                                }, {
                                    xtype: 'button',
                                    text: loc.bntPrintBlank,
                                    itemId: 'printOV',
                                    cls: 'btnExit',
                                    iconCls: 'print'

                                }],
                            items: [{
                                    xtype: 'panel',
                                    title: 'Основні характеристики об\'єкту',
                                    autoScroll: true,
                                    items: [{
                                            xtype: 'fieldset',
                                            margin: '10 5 3 10',
                                            layout: 'fit',
                                            title: 'Місце знаходження та основні характеристики об\'єкту',
                                            items: [{
                                                    xtype: 'container',
                                                    defaults: {
                                                        xtype: 'textfield',
                                                        labelAlign: 'top',
                                                        // allowBlank : false,
                                                        msgTarget: 'side',
                                                        afterLabelTextTpl: pf.utils.Validation.required
                                                    },
                                                    layout: {
                                                        type: 'hbox',
                                                        defaultMargins: {
                                                            top: 0,
                                                            right: 25,
                                                            bottom: 10,
                                                            left: 0
                                                        }
                                                    },
                                                    items: [{
                                                            xtype: 'textfield',
                                                            name: 'gfd',
                                                            flex: 1,
                                                            fieldLabel: 'Територія'

                                                        }, {
                                                            flex: 0.6,
                                                            fieldLabel: 'Вулиця',
                                                            name: 'name'
                                                        }, {
                                                            flex: 0.2,
                                                            fieldLabel: 'Будинок',
                                                            name: 'objectName'
                                                        }, {
                                                            flex: 0.2,
                                                            fieldLabel: 'Квартира',
                                                            name: 'gfd'

                                                        }]
                                                }, {
                                                    xtype: 'container',
                                                    defaults: {
                                                        labelAlign: 'top',
                                                        msgTarget: 'side'

                                                    },
                                                    layout: {
                                                        type: 'hbox',
                                                        defaultMargins: {
                                                            top: 0,
                                                            right: 25,
                                                            bottom: 10,
                                                            left: 0
                                                        }
                                                    },
                                                    items: [{
                                                            xtype: 'combobox',
                                                            flex: 1,
                                                            fieldLabel: 'Тип підїзної дороги',
                                                            // allowBlank : false,
                                                            afterLabelTextTpl: pf.utils.Validation.required
                                                        }, {
                                                            xtype: 'combobox',
                                                            flex: 1,
                                                            fieldLabel: 'Знаходження в плані населеного пункту',
                                                            // allowBlank : false,
                                                            afterLabelTextTpl: pf.utils.Validation.required
                                                        }, {
                                                            xtype: 'textfield',
                                                            flex: 0.5,
                                                            fieldLabel: 'Клас капітальної будівлі'
                                                        }]
                                                }, {
                                                    xtype: 'container',
                                                    defaults: {
                                                        xtype: 'textfield',
                                                        labelAlign: 'top',
                                                        msgTarget: 'side'
                                                    },
                                                    layout: {
                                                        type: 'hbox',
                                                        defaultMargins: {
                                                            top: 0,
                                                            right: 25,
                                                            bottom: 10,
                                                            left: 0
                                                        }
                                                    },
                                                    items: [{
                                                            fieldLabel: 'Площа всієї забудови (м2)'
                                                        }, {
                                                            fieldLabel: 'Площа інших споруд (м2)'
                                                        }, {
                                                            fieldLabel: 'Кількість земельних ділянок (шт)',
                                                            // allowBlank : false,
                                                            afterLabelTextTpl: pf.utils.Validation.required
                                                        }, {
                                                            fieldLabel: 'Загальна площа земельних ділянок (сот)',
                                                            // allowBlank : false,
                                                            afterLabelTextTpl: pf.utils.Validation.required
                                                        }]
                                                }, {
                                                    xtype: 'container',
                                                    layout: {
                                                        type: 'hbox',
                                                        defaultMargins: {
                                                            top: 0,
                                                            right: 50,
                                                            bottom: 0,
                                                            left: 0
                                                        },
                                                        pack: 'center'
                                                    },
                                                    items: [{
                                                            xtype: 'fieldset',
                                                            flex: 1.3,
                                                            layout: 'anchor',
                                                            title: 'Тип ринку, на якому здыйснюэться угода з майном',
                                                            items: [{
                                                                    xtype: 'radiogroup',
                                                                    fieldLabel: 'Новобудова?',
                                                                    items: [{
                                                                            xtype: 'radiofield',
                                                                            boxLabel: 'Так'
                                                                        }, {
                                                                            xtype: 'radiofield',
                                                                            boxLabel: 'Ні'
                                                                        }]
                                                                }]
                                                        }, {
                                                            xtype: 'combobox',
                                                            labelAlign: 'top',
                                                            flex: 2,
                                                            fieldLabel: 'Технічний стан будинку',
                                                            // allowBlank : false,
                                                            afterLabelTextTpl: pf.utils.Validation.required
                                                        }, {
                                                            xtype: 'textfield',
                                                            labelAlign: 'top',
                                                            flex: 1,
                                                            fieldLabel: 'Рік рекомструкції'
                                                        }]
                                                }]
                                        }, {
                                            xtype: 'fieldset',
                                            margin: '10 5 3 10',
                                            title: 'Інфраструктура (наявність та відстань в км)',
                                            items: [{
                                                    xtype: 'container',
                                                    defaults: {
                                                        xtype: 'textfield',
                                                        labelAlign: 'top'
                                                    },
                                                    layout: {
                                                        type: 'hbox',
                                                        defaultMargins: {
                                                            top: 0,
                                                            right: 25,
                                                            bottom: 10,
                                                            left: 0
                                                        }
                                                    },
                                                    items: [{
                                                            flex: 1,
                                                            fieldLabel: 'Відстань до центру населенногопункту'
                                                        }, {
                                                            flex: 1,
                                                            fieldLabel: 'Відстань до автомагістралі'
                                                        }, {
                                                            flex: 1,
                                                            fieldLabel: 'Відстань до лісу(парку)'
                                                        }, {
                                                            flex: 1,
                                                            fieldLabel: 'Відстань до річки(озера, водосховища)'
                                                        }]
                                                }, {
                                                    xtype: 'grid',
                                                    achor: '50%',
                                                    columnLines: true,
                                                    itemId: 'gridInfrastructure',
                                                    store: ObjectValuationStore,
                                                    tbar: [{
                                                            text: 'Додати',
                                                            iconCls: 'add',
                                                            action: 'addInfrastructure'
                                                        }],
                                                    dockedItems: [{
                                                            xtype: 'pagingtoolbar',
                                                            store: ObjectValuationStore,
                                                            dock: 'bottom',
                                                            displayInfo: true
                                                        }],
                                                    columns: me.buildColumns()
                                                }, {
                                                    xtype: 'textareafield',
                                                    labelAlign: 'top',
                                                    anchor: '100%',
                                                    fieldLabel: "Наявність поблизу інших об'єктів (перерахуйте)"
                                                }]
                                        }]
                                }, {
                                    xtype: 'panel',
                                    title: 'Tab 3',
                                    items: [{
                                            xtype: 'fieldset',
                                            height: 558,
                                            padding: '',
                                            title: 'Будинок (забудова)',
                                            items: [{
                                                    xtype: 'container',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [{
                                                            xtype: 'combobox',
                                                            flex: 1,
                                                            fieldLabel: 'Label'
                                                        }, {
                                                            xtype: 'combobox',
                                                            flex: 1,
                                                            fieldLabel: 'Label'
                                                        }, {
                                                            xtype: 'combobox',
                                                            flex: 1,
                                                            fieldLabel: 'Label'
                                                        }, {
                                                            xtype: 'combobox',
                                                            flex: 1,
                                                            fieldLabel: 'Label'
                                                        }, {
                                                            xtype: 'combobox',
                                                            flex: 1,
                                                            fieldLabel: 'Label'
                                                        }, {
                                                            xtype: 'combobox',
                                                            flex: 1,
                                                            fieldLabel: 'Label'
                                                        }]
                                                }, {
                                                    xtype: 'container',
                                                    height: 58,
                                                    defaults: {
                                                        labelAlign: 'top'
                                                    },
                                                    layout: {
                                                        type: 'hbox',
                                                        defaultMargins: {
                                                            top: 0,
                                                            right: 25,
                                                            bottom: 0,
                                                            left: 0
                                                        }
                                                    },
                                                    items: [{
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Label'
                                                        }, {
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Label'
                                                        }, {
                                                            xtype: 'checkboxfield',
                                                            fieldLabel: 'Label',
                                                            boxLabel: ''
                                                        }, {
                                                            xtype: 'checkboxfield',
                                                            flex: 1,
                                                            fieldLabel: 'Label',
                                                            boxLabel: 'Box Label'
                                                        }]
                                                }, {
                                                    xtype: 'container',
                                                    height: 56,
                                                    layout: 'hbox',
                                                    items: [{
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Label'
                                                        }, {
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Label'
                                                        }, {
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Label'
                                                        }, {
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Label'
                                                        }]
                                                }, {
                                                    xtype: 'container',
                                                    height: 44,
                                                    layout: 'hbox',
                                                    items: [{
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Label'
                                                        }, {
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Label'
                                                        }, {
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Label'
                                                        }, {
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Label'
                                                        }]
                                                }, {
                                                    xtype: 'container',
                                                    height: 38,
                                                    layout: 'hbox',
                                                    items: [{
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Label'
                                                        }, {
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Label'
                                                        }, {
                                                            xtype: 'checkboxfield',
                                                            fieldLabel: 'Label',
                                                            boxLabel: 'Box Label'
                                                        }]
                                                }]
                                        }]
                                }, {
                                    xtype: 'form',
                                    bodyPadding: 10,
                                    title: 'My Form',
                                    items: [{
                                            xtype: 'fieldset',
                                            defaults: {
                                                labelAlign: 'top'
                                            },
                                            title: 'Приміщення будинку (зубудови)',
                                            items: [{
                                                    xtype: 'combobox',
                                                    anchor: '50%',
                                                    fieldLabel: 'Label'
                                                }, {
                                                    xtype: 'fieldset',
                                                    height: 164,
                                                    title: 'Кімната 1',
                                                    items: [{
                                                            xtype: 'container',
                                                            defaults: {
                                                                labelAlign: 'top'
                                                            },
                                                            layout: {
                                                                type: 'hbox',
                                                                defaultMargins: {
                                                                    top: 0,
                                                                    right: 25,
                                                                    bottom: 0,
                                                                    left: 0
                                                                }
                                                            },
                                                            items: [{
                                                                    xtype: 'combobox',
                                                                    flex: 1,
                                                                    fieldLabel: 'Підлога'
                                                                }, {
                                                                    xtype: 'textfield',
                                                                    flex: 2,
                                                                    fieldLabel: 'Інше'
                                                                }]
                                                        }, {
                                                            xtype: 'container',
                                                            defaults: {
                                                                labelAlign: 'top'
                                                            },
                                                            layout: {
                                                                type: 'hbox',
                                                                defaultMargins: {
                                                                    top: 0,
                                                                    right: 25,
                                                                    bottom: 0,
                                                                    left: 0
                                                                }
                                                            },
                                                            items: [{
                                                                    xtype: 'combobox',
                                                                    flex: 1,
                                                                    fieldLabel: 'Стіни'
                                                                }, {
                                                                    xtype: 'textfield',
                                                                    flex: 2,
                                                                    fieldLabel: 'Інше'
                                                                }]
                                                        }, {
                                                            xtype: 'container',
                                                            defaults: {
                                                                labelAlign: 'top'
                                                            },
                                                            layout: {
                                                                type: 'hbox',
                                                                defaultMargins: {
                                                                    top: 0,
                                                                    right: 25,
                                                                    bottom: 0,
                                                                    left: 0
                                                                }
                                                            },
                                                            items: [{
                                                                    xtype: 'combobox',
                                                                    flex: 1,
                                                                    fieldLabel: 'Стеля'
                                                                }, {
                                                                    xtype: 'textfield',
                                                                    flex: 2,
                                                                    fieldLabel: 'Інше'
                                                                }]
                                                        }]
                                                }, {
                                                    xtype: 'fieldset',
                                                    height: 164,
                                                    title: 'Кімната 2',
                                                    items: [{
                                                            xtype: 'container',
                                                            defaults: {
                                                                labelAlign: 'top'
                                                            },
                                                            layout: {
                                                                type: 'hbox',
                                                                defaultMargins: {
                                                                    top: 0,
                                                                    right: 25,
                                                                    bottom: 0,
                                                                    left: 0
                                                                }
                                                            },
                                                            items: [{
                                                                    xtype: 'combobox',
                                                                    flex: 1,
                                                                    fieldLabel: 'Підлога'
                                                                }, {
                                                                    xtype: 'textfield',
                                                                    flex: 2,
                                                                    fieldLabel: 'Інше'
                                                                }]
                                                        }, {
                                                            xtype: 'container',
                                                            defaults: {
                                                                labelAlign: 'top'
                                                            },
                                                            layout: {
                                                                type: 'hbox',
                                                                defaultMargins: {
                                                                    top: 0,
                                                                    right: 25,
                                                                    bottom: 0,
                                                                    left: 0
                                                                }
                                                            },
                                                            items: [{
                                                                    xtype: 'combobox',
                                                                    flex: 1,
                                                                    fieldLabel: 'Стіни'
                                                                }, {
                                                                    xtype: 'textfield',
                                                                    flex: 2,
                                                                    fieldLabel: 'Інше'
                                                                }]
                                                        }, {
                                                            xtype: 'container',
                                                            defaults: {
                                                                labelAlign: 'top'
                                                            },
                                                            layout: {
                                                                type: 'hbox',
                                                                defaultMargins: {
                                                                    top: 0,
                                                                    right: 25,
                                                                    bottom: 0,
                                                                    left: 0
                                                                }
                                                            },
                                                            items: [{
                                                                    xtype: 'combobox',
                                                                    flex: 1,
                                                                    fieldLabel: 'Стеля'
                                                                }, {
                                                                    xtype: 'textfield',
                                                                    flex: 2,
                                                                    fieldLabel: 'Інше'
                                                                }]
                                                        }]
                                                }, {
                                                    xtype: 'fieldset',
                                                    height: 162,
                                                    title: 'Кімната 3',
                                                    items: [{
                                                            xtype: 'container',
                                                            defaults: {
                                                                labelAlign: 'top'
                                                            },
                                                            layout: {
                                                                type: 'hbox',
                                                                defaultMargins: {
                                                                    top: 0,
                                                                    right: 25,
                                                                    bottom: 0,
                                                                    left: 0
                                                                }
                                                            },
                                                            items: [{
                                                                    xtype: 'combobox',
                                                                    flex: 1,
                                                                    fieldLabel: 'Підлога'
                                                                }, {
                                                                    xtype: 'textfield',
                                                                    flex: 2,
                                                                    fieldLabel: 'Інше'
                                                                }]
                                                        }, {
                                                            xtype: 'container',
                                                            defaults: {
                                                                labelAlign: 'top'
                                                            },
                                                            layout: {
                                                                type: 'hbox',
                                                                defaultMargins: {
                                                                    top: 0,
                                                                    right: 25,
                                                                    bottom: 0,
                                                                    left: 0
                                                                }
                                                            },
                                                            items: [{
                                                                    xtype: 'combobox',
                                                                    flex: 1,
                                                                    fieldLabel: 'Стіни'
                                                                }, {
                                                                    xtype: 'textfield',
                                                                    flex: 2,
                                                                    fieldLabel: 'Інше'
                                                                }]
                                                        }, {
                                                            xtype: 'container',
                                                            defaults: {
                                                                labelAlign: 'top'
                                                            },
                                                            layout: {
                                                                type: 'hbox',
                                                                defaultMargins: {
                                                                    top: 0,
                                                                    right: 25,
                                                                    bottom: 0,
                                                                    left: 0
                                                                }
                                                            },
                                                            items: [{
                                                                    xtype: 'combobox',
                                                                    flex: 1,
                                                                    fieldLabel: 'Стеля'
                                                                }, {
                                                                    xtype: 'textfield',
                                                                    flex: 2,
                                                                    fieldLabel: 'Інше'
                                                                }]
                                                        }]
                                                }]
                                        }]
                                }, {
                                    xtype: 'form',
                                    bodyPadding: 10,
                                    title: 'My Form',
                                    items: [{
                                            xtype: 'fieldset',
                                            height: 184,
                                            defaults: {
                                                labelAlign: 'top'
                                            },
                                            title: 'Інші надвірні будівлі та поруди',
                                            items: [{
                                                    xtype: 'textfield',
                                                    anchor: '20%',
                                                    fieldLabel: 'Label'
                                                }, {
                                                    xtype: 'container',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [{
                                                            xtype: 'checkboxfield',
                                                            fieldLabel: 'Label',
                                                            boxLabel: 'Box Label'
                                                        }, {
                                                            xtype: 'checkboxfield',
                                                            fieldLabel: 'Label',
                                                            boxLabel: 'Box Label'
                                                        }, {
                                                            xtype: 'checkboxfield',
                                                            fieldLabel: 'Label',
                                                            boxLabel: 'Box Label'
                                                        }, {
                                                            xtype: 'checkboxfield',
                                                            fieldLabel: 'Label',
                                                            boxLabel: 'Box Label'
                                                        }, {
                                                            xtype: 'checkboxfield',
                                                            fieldLabel: 'Label',
                                                            boxLabel: 'Box Label'
                                                        }, {
                                                            xtype: 'checkboxfield',
                                                            flex: 1,
                                                            fieldLabel: 'Label',
                                                            boxLabel: 'Box Label'
                                                        }, {
                                                            xtype: 'checkboxfield',
                                                            flex: 1,
                                                            fieldLabel: 'Label',
                                                            boxLabel: 'Box Label'
                                                        }]
                                                }, {
                                                    xtype: 'container',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [{
                                                            xtype: 'checkboxfield',
                                                            fieldLabel: 'Label',
                                                            boxLabel: 'Box Label'
                                                        }, {
                                                            xtype: 'checkboxfield',
                                                            fieldLabel: 'Label',
                                                            boxLabel: 'Box Label'
                                                        }, {
                                                            xtype: 'checkboxfield',
                                                            fieldLabel: 'Label',
                                                            boxLabel: 'Box Label'
                                                        }, {
                                                            xtype: 'checkboxfield',
                                                            fieldLabel: 'Label',
                                                            boxLabel: 'Box Label'
                                                        }, {
                                                            xtype: 'checkboxfield',
                                                            flex: 1,
                                                            fieldLabel: 'Label',
                                                            boxLabel: 'Box Label'
                                                        }, {
                                                            xtype: 'checkboxfield',
                                                            flex: 1,
                                                            fieldLabel: 'Label',
                                                            boxLabel: 'Box Label'
                                                        }]
                                                }, {
                                                    xtype: 'textfield',
                                                    anchor: '100%',
                                                    fieldLabel: 'Label'
                                                }]
                                        }]
                                }, {
                                    xtype: 'form',
                                    bodyPadding: 10,
                                    title: 'My Form',
                                    items: [{
                                            xtype: 'fieldset',
                                            title: 'Юридична інформація (наявність та дані правостановлюючих документів)',
                                            items: [{
                                                    xtype: 'container',
                                                    layout: 'column',
                                                    items: [{
                                                            xtype: 'container',
                                                            columnWidth: 0.5,
                                                            layout: {
                                                                type: 'vbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [{
                                                                    xtype: 'checkboxfield',
                                                                    flex: 1,
                                                                    fieldLabel: 'Label',
                                                                    boxLabel: 'Box Label'
                                                                }, {
                                                                    xtype: 'textfield',
                                                                    flex: 2,
                                                                    fieldLabel: 'Label'
                                                                }, {
                                                                    xtype: 'checkboxfield',
                                                                    flex: 1,
                                                                    fieldLabel: 'Label',
                                                                    boxLabel: 'Box Label'
                                                                }, {
                                                                    xtype: 'textfield',
                                                                    flex: 1,
                                                                    fieldLabel: 'Label'
                                                                }, {
                                                                    xtype: 'checkboxfield',
                                                                    flex: 1,
                                                                    fieldLabel: 'Label',
                                                                    boxLabel: 'Box Label'
                                                                }, {
                                                                    xtype: 'textfield',
                                                                    flex: 1,
                                                                    fieldLabel: 'Label'
                                                                }, {
                                                                    xtype: 'checkboxfield',
                                                                    flex: 1,
                                                                    fieldLabel: 'Label',
                                                                    boxLabel: 'Box Label'
                                                                }, {
                                                                    xtype: 'textfield',
                                                                    flex: 1,
                                                                    fieldLabel: 'Label'
                                                                }]
                                                        }, {
                                                            xtype: 'tbspacer',
                                                            height: 1,
                                                            width: 20
                                                        }, {
                                                            xtype: 'container',
                                                            columnWidth: 0.5,
                                                            layout: {
                                                                type: 'vbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [{
                                                                    xtype: 'checkboxfield',
                                                                    flex: 1,
                                                                    fieldLabel: 'Label',
                                                                    boxLabel: 'Box Label'
                                                                }, {
                                                                    xtype: 'textfield',
                                                                    flex: 1,
                                                                    fieldLabel: 'Label'
                                                                }, {
                                                                    xtype: 'checkboxfield',
                                                                    flex: 1,
                                                                    fieldLabel: 'Label',
                                                                    boxLabel: 'Box Label'
                                                                }, {
                                                                    xtype: 'textfield',
                                                                    flex: 1,
                                                                    fieldLabel: 'Label'
                                                                }, {
                                                                    xtype: 'checkboxfield',
                                                                    flex: 1,
                                                                    fieldLabel: 'Label',
                                                                    boxLabel: 'Box Label'
                                                                }, {
                                                                    xtype: 'textfield',
                                                                    flex: 1,
                                                                    fieldLabel: 'Label'
                                                                }, {
                                                                    xtype: 'checkboxfield',
                                                                    flex: 1,
                                                                    fieldLabel: 'Label',
                                                                    boxLabel: 'Box Label'
                                                                }, {
                                                                    xtype: 'textfield',
                                                                    flex: 1,
                                                                    fieldLabel: 'Label'
                                                                }]
                                                        }]
                                                }, {
                                                    xtype: 'container',
                                                    height: 40,
                                                    layout: 'hbox',
                                                    items: [{
                                                            xtype: 'combobox',
                                                            flex: 1,
                                                            fieldLabel: 'Label'
                                                        }, {
                                                            xtype: 'textfield',
                                                            flex: 1,
                                                            fieldLabel: 'Label'
                                                        }, {
                                                            xtype: 'textfield',
                                                            flex: 1,
                                                            fieldLabel: 'Label'
                                                        }, {
                                                            xtype: 'textfield',
                                                            flex: 1,
                                                            fieldLabel: 'Label'
                                                        }]
                                                }, {
                                                    xtype: 'checkboxfield',
                                                    fieldLabel: 'Label',
                                                    boxLabel: 'Box Label'
                                                }, {
                                                    xtype: 'textfield',
                                                    anchor: '100%',
                                                    fieldLabel: 'Label'
                                                }, {
                                                    xtype: 'textfield',
                                                    anchor: '100%',
                                                    fieldLabel: 'Label'
                                                }]
                                        }]
                                }, {
                                    xtype: 'form',
                                    bodyPadding: 10,
                                    title: 'My Form',
                                    items: [{
                                            xtype: 'fieldset',
                                            defaults: {
                                                labelAlign: 'top'
                                            },
                                            title: 'Земельна ділянка (ділянки)',
                                            items: [{
                                                    xtype: 'textfield',
                                                    anchor: '100%',
                                                    fieldLabel: 'Label'
                                                }, {
                                                    xtype: 'textfield',
                                                    anchor: '100%',
                                                    fieldLabel: 'Label'
                                                }, {
                                                    xtype: 'container',
                                                    defaults: {
                                                        labelAlign: 'top'
                                                    },
                                                    layout: {
                                                        type: 'hbox',
                                                        defaultMargins: {
                                                            top: 0,
                                                            right: 25,
                                                            bottom: 0,
                                                            left: 0
                                                        }
                                                    },
                                                    items: [{
                                                            xtype: 'textfield',
                                                            flex: 1,
                                                            fieldLabel: 'Label'
                                                        }, {
                                                            xtype: 'combobox',
                                                            flex: 1,
                                                            fieldLabel: 'Label'
                                                        }]
                                                }, {
                                                    xtype: 'container',
                                                    height: 58,
                                                    defaultAlign: 'top',
                                                    defaults: {
                                                        labelAlign: 'top'
                                                    },
                                                    layout: {
                                                        type: 'hbox',
                                                        defaultMargins: {
                                                            top: 0,
                                                            right: 25,
                                                            bottom: 0,
                                                            left: 0
                                                        },
                                                        pack: 'center'
                                                    },
                                                    items: [{
                                                            xtype: 'combobox',
                                                            flex: 1,
                                                            fieldLabel: 'Область'
                                                        }, {
                                                            xtype: 'textfield',
                                                            flex: 1,
                                                            fieldLabel: 'Label'
                                                        }, {
                                                            xtype: 'combobox',
                                                            flex: 1,
                                                            fieldLabel: 'Категорія населенного пункту'
                                                        }]
                                                }, {
                                                    xtype: 'container',
                                                    height: 58,
                                                    defaultAlign: 'top',
                                                    defaults: {
                                                        labelAlign: 'top'
                                                    },
                                                    layout: {
                                                        type: 'hbox',
                                                        defaultMargins: {
                                                            top: 0,
                                                            right: 25,
                                                            bottom: 0,
                                                            left: 0
                                                        },
                                                        pack: 'center'
                                                    },
                                                    items: [{
                                                            xtype: 'textfield',
                                                            flex: 1,
                                                            fieldLabel: 'Label'
                                                        }, {
                                                            xtype: 'textfield',
                                                            flex: 1,
                                                            fieldLabel: 'Label'
                                                        }, {
                                                            xtype: 'textfield',
                                                            flex: 1,
                                                            fieldLabel: 'Label'
                                                        }, {
                                                            xtype: 'textfield',
                                                            flex: 1,
                                                            fieldLabel: 'Label'
                                                        }]
                                                }, {
                                                    xtype: 'container',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [{
                                                            xtype: 'checkboxfield',
                                                            fieldLabel: 'Label',
                                                            boxLabel: 'Box Label'
                                                        }, {
                                                            xtype: 'checkboxfield',
                                                            fieldLabel: 'Label',
                                                            boxLabel: 'Box Label'
                                                        }, {
                                                            xtype: 'checkboxfield',
                                                            fieldLabel: 'Label',
                                                            boxLabel: 'Box Label'
                                                        }, {
                                                            xtype: 'checkboxfield',
                                                            fieldLabel: 'Label',
                                                            boxLabel: 'Box Label'
                                                        }, {
                                                            xtype: 'checkboxfield',
                                                            fieldLabel: 'Label',
                                                            boxLabel: 'Box Label'
                                                        }]
                                                }, {
                                                    xtype: 'container',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [{
                                                            xtype: 'checkboxfield',
                                                            fieldLabel: 'Label',
                                                            boxLabel: 'Box Label'
                                                        }, {
                                                            xtype: 'checkboxfield',
                                                            fieldLabel: 'Label',
                                                            boxLabel: 'Box Label'
                                                        }, {
                                                            xtype: 'checkboxfield',
                                                            fieldLabel: 'Label',
                                                            boxLabel: 'Box Label'
                                                        }, {
                                                            xtype: 'checkboxfield',
                                                            fieldLabel: 'Label',
                                                            boxLabel: 'Box Label'
                                                        }, {
                                                            xtype: 'checkboxfield',
                                                            fieldLabel: 'Label',
                                                            boxLabel: 'Box Label'
                                                        }]
                                                }, {
                                                    xtype: 'container',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [{
                                                            xtype: 'checkboxfield',
                                                            fieldLabel: 'Label',
                                                            boxLabel: 'Box Label'
                                                        }, {
                                                            xtype: 'checkboxfield',
                                                            fieldLabel: 'Label',
                                                            boxLabel: 'Box Label'
                                                        }, {
                                                            xtype: 'checkboxfield',
                                                            fieldLabel: 'Label',
                                                            boxLabel: 'Box Label'
                                                        }, {
                                                            xtype: 'checkboxfield',
                                                            fieldLabel: 'Label',
                                                            boxLabel: 'Box Label'
                                                        }, {
                                                            xtype: 'checkboxfield',
                                                            fieldLabel: 'Label',
                                                            boxLabel: 'Box Label'
                                                        }]
                                                }, {
                                                    xtype: 'container',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [{
                                                            xtype: 'checkboxfield',
                                                            fieldLabel: 'Label',
                                                            boxLabel: 'Box Label'
                                                        }, {
                                                            xtype: 'checkboxfield',
                                                            fieldLabel: 'Label',
                                                            boxLabel: 'Box Label'
                                                        }, {
                                                            xtype: 'checkboxfield',
                                                            fieldLabel: 'Label',
                                                            boxLabel: 'Box Label'
                                                        }, {
                                                            xtype: 'checkboxfield',
                                                            fieldLabel: 'Label',
                                                            boxLabel: 'Box Label'
                                                        }]
                                                }, {
                                                    xtype: 'textfield',
                                                    anchor: '100%',
                                                    fieldLabel: 'Label'
                                                }, {
                                                    xtype: 'container',
                                                    defaults: {
                                                        labelAlign: 'top'
                                                    },
                                                    layout: {
                                                        type: 'hbox',
                                                        defaultMargins: {
                                                            top: 0,
                                                            right: 25,
                                                            bottom: 0,
                                                            left: 0
                                                        }
                                                    },
                                                    items: [{
                                                            xtype: 'combobox',
                                                            flex: 1,
                                                            fieldLabel: 'Label'
                                                        }, {
                                                            xtype: 'textfield',
                                                            flex: 1,
                                                            fieldLabel: 'Label'
                                                        }, {
                                                            xtype: 'textfield',
                                                            flex: 1,
                                                            fieldLabel: 'Label'
                                                        }]
                                                }, {
                                                    xtype: 'textareafield',
                                                    fieldLabel: 'Label',
                                                    grow: true,
                                                    cols: 140
                                                }]
                                        }]
                                }]
                        }]
                }]
        });

        me.callParent(arguments);
    },
    buildColumns: function () {
        return [{
                xtype: 'rownumberer'
            }, {
                header: 'id',
                dataIndex: 'id',
                flex: 1,
                hidden: true,
                hideable: false
            }, {
                header: "Код",
                flex: 1,
                dataIndex: 'code'
            }, {
                header: "Найменування",
                flex: 4,
                dataIndex: 'name'
            }

        ];

    }
});