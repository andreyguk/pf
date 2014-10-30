var Base64 = (function() {
	// Private property
	var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

	// Private method for UTF-8 encoding

	function utf8Encode(string) {
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";
		for ( var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
		}
		return utftext;
	}

	// Public method for encoding
	return {
		encode : (typeof btoa == 'function') ? function(input) {
			return btoa(utf8Encode(input));
		} : function(input) {
			var output = "";
			var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
			var i = 0;
			input = utf8Encode(input);
			while (i < input.length) {
				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);
				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;
				if (isNaN(chr2)) {
					enc3 = enc4 = 64;
				} else if (isNaN(chr3)) {
					enc4 = 64;
				}
				output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
			}
			return output;
		}
	};
})();

Ext.define('pf.ux.grid.ExportToExcel', {
	extend : 'Ext.AbstractPlugin',
	alias : 'plugin.exportToExcel',
	pluginId : 'exportToExcel',
	reportName : '',
	init : function(grid) {
		this.grid = grid;
		this.overrideToolbar(grid);
	},

	/**
	 * add new button on pagingtoolbar for view selected rows
	 */
	overrideToolbar : function(grid) {
		var me = this;
		var toolbar = grid.down('toolbar');
		var items = [ {
			xtype : 'tbseparator'
		}, {
			tooltip : PlExportToExcel.btnExportToExcel,
			text : PlExportToExcel.btnExportToExcel,
			iconCls : 'exportToExcel',
			handler : function(b, e) {
				me.downloadExcelXml(me, grid);
			}
		} ];
		if (toolbar == null) {
			grid.addDocked({
				xtype : 'toolbar',
				dock : 'top',
				items : items
			});
		} else
			toolbar.insert(11, items);
	},
	showSelections : function() {
		alert('showSelections')
	},

	downloadExcelXml : function(me, grid, includeHidden) {
		var vExportContent = me.getExcelXml(grid, includeHidden, me.reportName);

		var location = 'data:application/vnd.ms-excel;base64,' + Base64.encode(vExportContent);

		/*
		 * dynamically create and anchor tag to force download with suggested
		 * filename note: download attribute is Google Chrome specific
		 */
		var gridEl = grid.getEl();

		var el = Ext.DomHelper.append(gridEl, {
			tag : "a",
			download : me.reportName + "-" + Ext.Date.format(new Date(), 'Y-m-d Hi') + '.xls',
			href : location
		});

		el.click();

		Ext.fly(el).destroy();
	},

	/*
	 * 
	 * Welcome to XML Hell See:
	 * http://msdn.microsoft.com/en-us/library/office/aa140066(v=office.10).aspx
	 * for more details
	 * 
	 */
	getExcelXml : function(grid, includeHidden, title) {

		var worksheet = this.createWorksheet(grid, includeHidden, title);
		var totalWidth = grid.columns.length;

		return ''.concat('<?xml version="1.0"?>', '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40">', '<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"><Title>' + 'Sheet1' + '</Title></DocumentProperties>', '<OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office"><AllowPNG/></OfficeDocumentSettings>', '<ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">', '<WindowHeight>' + worksheet.height + '</WindowHeight>', '<WindowWidth>' + worksheet.width + '</WindowWidth>', '<ProtectStructure>False</ProtectStructure>',
				'<ProtectWindows>False</ProtectWindows>', '</ExcelWorkbook>',

				'<Styles>',

				'<Style ss:ID="Default" ss:Name="Normal">', '<Alignment ss:Vertical="Bottom"/>', '<Borders/>', '<Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="12" ss:Color="#000000"/>', '<Interior/>', '<NumberFormat/>', '<Protection/>', '</Style>',

				'<Style ss:ID="title">', '<Borders />', '<Font ss:Bold="1" ss:Size="16" />', '<Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1" />', '<NumberFormat ss:Format="@" />', '</Style>',

				'<Style ss:ID="headercell">', '<Font ss:Bold="1" ss:Size="10" />', '<Alignment ss:Horizontal="Center" ss:WrapText="1" />', '<Interior ss:Color="#A3C9F1" ss:Pattern="Solid" />', '</Style>',

				'<Style ss:ID="even">', '<Interior ss:Color="#CCFFFF" ss:Pattern="Solid" />', '</Style>',

				'<Style ss:ID="evendate" ss:Parent="even">', '<NumberFormat ss:Format="yyyy-mm-dd" />', '</Style>',

				'<Style ss:ID="evenint" ss:Parent="even">', '<Numberformat ss:Format="0" />', '</Style>',

				'<Style ss:ID="evenfloat" ss:Parent="even">', '<Numberformat ss:Format="0.00" />', '</Style>',

				'<Style ss:ID="odd">', '<Interior ss:Color="#CCCCFF" ss:Pattern="Solid" />', '</Style>',

				'<Style ss:ID="odddate" ss:Parent="odd">', '<NumberFormat ss:Format="yyyy-mm-dd" />', '</Style>',

				'<Style ss:ID="oddint" ss:Parent="odd">', '<NumberFormat Format="0" />', '</Style>',

				'<Style ss:ID="oddfloat" ss:Parent="odd">', '<NumberFormat Format="0.00" />', '</Style>',

				'</Styles>', worksheet.xml, '</Workbook>');
	},

	/*
	 * 
	 * Support function to return field info from store based on fieldname
	 * 
	 */

	getModelField : function(grid, fieldName) {

		var fields = grid.store.model.getFields();
		for ( var i = 0; i < fields.length; i++) {
			if (fields[i].name === fieldName) {
				return fields[i];
			}
		}
	},

	/*
	 * 
	 * Convert store into Excel Worksheet
	 * 
	 */

	createWorksheet : function(grid, includeHidden, theTitle) {
		// Calculate cell data types and extra class names which
		// affect formatting
		var cellType = [];
		var cellTypeClass = [];
		var cm = grid.columns;
		// console.log(cm)
		var totalWidthInPixels = 0;
		var colXml = '';
		var headerXml = '';
		var visibleColumnCountReduction = 0;
		var colCount = cm.length;
		for ( var i = 0; i < colCount; i++) {
			if ((cm[i].dataIndex != '') && (includeHidden || !cm[i].hidden)) {
				var w = cm[i].getEl().getWidth();
				totalWidthInPixels += w;

				if (cm[i].text === "") {
					cellType.push("None");
					cellTypeClass.push("");
					++visibleColumnCountReduction;
				} else {
					colXml += '<Column ss:AutoFitWidth="1" ss:Width="' + w + '" />';
					// console.log('cm[i].text = ' + cm[i].text);
					headerXml += '<Cell ss:StyleID="headercell">' + '<Data ss:Type="String">' + cm[i].text + '</Data>' + '<NamedCell ss:Name="Print_Titles"></NamedCell></Cell>';

					var fld = this.getModelField(grid, cm[i].dataIndex);
					// console.log(fld);
					// console.log(fld.type.type);

					switch (fld.type.type) {
					case "int":
						cellType.push("Number");
						cellTypeClass.push("int");
						break;
					case "float":
						cellType.push("Number");
						cellTypeClass.push("float");
						break;

					case "bool":

					case "boolean":
						cellType.push("String");
						cellTypeClass.push("");
						break;
					case "date":
						cellType.push("DateTime");
						cellTypeClass.push("date");
						break;
					default:
						cellType.push("String");
						cellTypeClass.push("");
						break;
					}
				}
			}
		}
		var visibleColumnCount = cellType.length - visibleColumnCountReduction;

		var result = {
			height : 9000,
			width : Math.floor(totalWidthInPixels * 30) + 50
		};

		// Generate worksheet header details.
		var t = ''.concat('<Worksheet ss:Name="' + 'Sheet1' + '">',

		'<Names>', '<NamedRange ss:Name="Print_Titles" ss:RefersTo="=\'' + 'Sheet1' + '\'!R1:R2">', '</NamedRange></Names>',

		'<Table ss:ExpandedColumnCount="' + (visibleColumnCount + 2), '" ss:ExpandedRowCount="' + (grid.store.getCount() + 2) + '" x:FullColumns="1" x:FullRows="1" ss:DefaultColumnWidth="65" ss:DefaultRowHeight="15">', colXml, '<Row ss:Height="38">', '<Cell ss:MergeAcross="' + (visibleColumnCount - 1) + '" ss:StyleID="title">', '<Data ss:Type="String" xmlns:html="http://www.w3.org/TR/REC-html40">', '<html:b>' + theTitle + '</html:b></Data><NamedCell ss:Name="Print_Titles">', '</NamedCell></Cell>', '</Row>', '<Row ss:AutoFitHeight="1">', headerXml + '</Row>');

		// Generate the data rows from the data in the Store
		for ( var i = 0, it = grid.store.data.items, l = it.length; i < l; i++) {
			t += '<Row>';
			var cellClass = (i & 1) ? 'odd' : 'even';
			r = it[i].data;
			var k = 0;
			for ( var j = 0; j < colCount; j++) {
				if ((cm[j].dataIndex != '') && (includeHidden || !cm[j].hidden)) {
					var v = r[cm[j].dataIndex];
					if (cellType[k] !== "None") {
						t += '<Cell ss:StyleID="' + cellClass + cellTypeClass[k] + '"><Data ss:Type="' + cellType[k] + '">';
						if (cellType[k] == 'DateTime') {
							t += v.format('Y-m-d');
						} else {
							t += v;
						}
						t += '</Data></Cell>';
					}
					k++;
				}
			}
			t += '</Row>';
		}

		result.xml = t.concat('</Table>', '<WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">', '<PageLayoutZoom>0</PageLayoutZoom>', '<Selected/>', '<Panes>', '<Pane>', '<Number>3</Number>', '<ActiveRow>2</ActiveRow>', '</Pane>', '</Panes>', '<ProtectObjects>False</ProtectObjects>', '<ProtectScenarios>False</ProtectScenarios>', '</WorksheetOptions>', '</Worksheet>');
		// console.log(result);
		return result;

	}

})