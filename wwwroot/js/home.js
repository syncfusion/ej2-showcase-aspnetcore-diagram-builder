var customPropertyDialog;
var layerDialog;
var openTemplateDialog;
var initLayerPanel = false;
var selectedItem = new SelectorViewModel();
var dropDownDataSources = new DropDownDataSources();
var selectedItem = new SelectorViewModel();
var page = new PageCreation(selectedItem);
var customProperty = new CustomProperties(selectedItem, customPropertyDialog);
var diagramLayer = new DiagramBuilderLayer(selectedItem, layerDialog);
var diagramEvents = new DiagramClientSideEvents(selectedItem, page);
var diagramPropertyBinding = new DiagramPropertyBinding(selectedItem, page);
var mindmapPropertyBinding = new MindMapPropertyBinding(selectedItem);
var orgChartPropertyBinding = new OrgChartPropertyBinding(selectedItem);
var customTool = new CustomTool(selectedItem);
var palettes = new Palettes();
var downloadFile;
var diagramThemes = new DiagramTheme(selectedItem);

window.onload = function () {
    diagram = document.getElementById("diagram").ej2_instances[0];
    symbolpalette = document.getElementById("symbolpalette").ej2_instances[0];
    openTemplateDialog = document.getElementById("openTemplateDialog").ej2_instances[0];
    saveDialog = document.getElementById("saveDialog").ej2_instances[0];
    exportDialog = document.getElementById("exportDialog").ej2_instances[0];
    printDialog = document.getElementById("printDialog").ej2_instances[0];
    tooltipDialog = document.getElementById("tooltipDialog").ej2_instances[0];
    tooltip = document.getElementById("tooltip").ej2_instances[0];
    themeDialog = document.getElementById("themeDialog").ej2_instances[0];
    moreShapesDialog = document.getElementById("moreShapesDialogContent").ej2_instances[0];
    zoomCurrentValue = document.getElementById("btnZoomIncrement").ej2_instances[0];
    selectedItem.selectedDiagram = document.getElementById("diagram").ej2_instances[0];
    page.addNewPage();
    diagramEvents.ddlTextPosition = document.getElementById("ddlTextPosition").ej2_instances[0];
    customProperty.customPropertyDialog = document.getElementById("customPropertyDialog").ej2_instances[0];
    diagramLayer.layerDialog = document.getElementById("layerDialog").ej2_instances[0];
    hyperlinkDialog = document.getElementById("hyperlinkDialog").ej2_instances[0];
    moreShapesList = document.getElementById("moreShapesList").ej2_instances[0];
    defaultUpload = document.getElementById('defaultfileupload').ej2_instances[0];

    downloadFile = new DownloadExampleFiles(selectedItem);
    selectedItem.utilityMethods.page = page;
    selectedItem.utilityMethods.tempDialog = document.getElementById("openTemplateDialog").ej2_instances[0];
    selectedItem.utilityMethods.toolbarEditor = document.getElementById("toolbarEditor").ej2_instances[0];

    OrgChartUtilityMethods.uploadDialog = document.getElementById("fileUploadDialog").ej2_instances[0];
    OrgChartUtilityMethods.customPropertyDialog = document.getElementById("customPropertyDialog").ej2_instances[0];

    CommonKeyboardCommands.selectedItem = selectedItem;
    CommonKeyboardCommands.page = page;

    document.getElementById('btnHideToolbar').onclick = hideMenuBar.bind(this);
    document.getElementById('diagramContainerDiv').onmouseleave = diagramThemes.setNodeOldStyles.bind(diagramThemes);
    document.onmouseover = menumouseover.bind(this);

    setTimeout(function () { loadPage(); }, 2000);
    setInterval(function() { savePage(); }, 2000);

    window.onbeforeunload = closeWindow.bind(this);
};

function setPaletteNodeDefaults(node) {
    if (!(node.addInfo && (node.addInfo).type === 'CustomShapes') && (!node.children)) {
        if (node.id === 'Terminator' || node.id === 'Process') {
            node.width = 80;
            node.height = 65;
        } else {
            node.width = 50;
            node.height = 50;
        }
            node.ports = [
                { offset: { x: 0, y: 0.5 }, style: { fill: 'white' }, visibility: ej.diagrams.PortVisibility.Connect | ej.diagrams.PortVisibility.Hover, constraints: ej.diagrams.PortConstraints.Default | ej.diagrams.PortConstraints.Draw },
                { offset: { x: 0.5, y: 0 }, style: { fill: 'white' }, visibility: ej.diagrams.PortVisibility.Connect | ej.diagrams.PortVisibility.Hover, constraints: ej.diagrams.PortConstraints.Default | ej.diagrams.PortConstraints.Draw },
                { offset: { x: 1, y: 0.5 }, style: { fill: 'white' }, visibility: ej.diagrams.PortVisibility.Connect | ej.diagrams.PortVisibility.Hover, constraints: ej.diagrams.PortConstraints.Default | ej.diagrams.PortConstraints.Draw },
                { offset: { x: 0.5, y: 1 }, style: { fill: 'white' }, visibility: ej.diagrams.PortVisibility.Connect | ej.diagrams.PortVisibility.Hover, constraints: ej.diagrams.PortConstraints.Default | ej.diagrams.PortConstraints.Draw }
            ];
   
        node.style.strokeColor = '#3A3A3A';
    }
};

function getNodeDefaults(node, diagram) {
    if(!(selectedItem.diagramType === 'MindMap' || selectedItem.diagramType === 'OrgChart')){
        node.ports=[
            { offset: { x: 0, y: 0.5 }, style: { fill: 'white' }, visibility: ej.diagrams.PortVisibility.Connect | ej.diagrams.PortVisibility.Hover, constraints: ej.diagrams.PortConstraints.Default | ej.diagrams.PortConstraints.Draw },
            { offset: { x: 0.5, y: 0 }, style: { fill: 'white' }, visibility: ej.diagrams.PortVisibility.Connect | ej.diagrams.PortVisibility.Hover, constraints: ej.diagrams.PortConstraints.Default | ej.diagrams.PortConstraints.Draw },
            { offset: { x: 1, y: 0.5 }, style: { fill: 'white' }, visibility: ej.diagrams.PortVisibility.Connect | ej.diagrams.PortVisibility.Hover, constraints: ej.diagrams.PortConstraints.Default | ej.diagrams.PortConstraints.Draw },
            { offset: { x: 0.5, y: 1 }, style: { fill: 'white' }, visibility: ej.diagrams.PortVisibility.Connect | ej.diagrams.PortVisibility.Hover, constraints: ej.diagrams.PortConstraints.Default | ej.diagrams.PortConstraints.Draw }
        ];
    }
    var node = {
        style: { strokeWidth: 2 }
    };
    return node;
};
function getConnectorDefaults(connector, diagram) {
    connector.style.fill="red";
    var connector = {
        annotations: [
            { content: '', style: { fill: 'transparent' } }
        ],
        style: { strokeWidth: 2 }
    };
    return connector;
};

var toolbarEditor = new ej.navigations.Toolbar({
    overflowMode: 'Scrollable',
    clicked: toolbarEditorClick,
    items: [
        {
            prefixIcon: 'sf-icon-Undo tb-icons', tooltipText: 'Undo', cssClass: 'tb-item-start tb-item-undo'
        },
        {
            prefixIcon: 'sf-icon-Redo tb-icons', tooltipText: 'Redo', cssClass: 'tb-item-end tb-item-redo'
        },
        {
            type: 'Separator'
        },
        {
            prefixIcon: 'sf-icon-ZoomOut tb-icons', tooltipText: 'Zoom Out(Ctrl + -)', cssClass: 'tb-item-start'
        },
        {
            cssClass: 'tb-item-end tb-zoom-dropdown-btn', template: '<button id="btnZoomIncrement"></button>'
        },
        {
            prefixIcon: 'sf-icon-ZoomIn tb-icons', tooltipText: 'Zoom In(Ctrl + +)', cssClass: 'tb-item-end'
        },
        {
            type: 'Separator'
        },
        {
            prefixIcon: 'sf-icon-Pan tb-icons', tooltipText: 'Pan Tool', cssClass: 'tb-item-start'
        },
        {
            prefixIcon: 'sf-icon-Selector tb-icons', tooltipText: 'Pointer', cssClass: 'tb-item-middle tb-item-selected'
        },
        {
            tooltipText: 'Draw Shapes', cssClass: 'tb-item-middle tb-drawtools-dropdown-btn tb-custom-diagram-disable', template: '<button id="btnDrawShape"></button>'
        },
        {
            tooltipText: 'Draw Connectors', cssClass: 'tb-item-middle tb-drawtools-dropdown-btn tb-custom-diagram-disable', template: '<button id="btnDrawConnector"></button>'
        },
        {
            prefixIcon: 'sf-icon-TextInput tb-icons', tooltipText: 'Text Tool', cssClass: 'tb-item-end tb-custom-diagram-disable'
        },
        {
            type: 'Separator'
        },
        {
            prefixIcon: 'sf-icon-ColorPickers tb-icons', mode: 'Palette', tooltipText: 'Fill Color', cssClass: 'tb-item-start tb-item-fill'
        },
        {
            prefixIcon: 'sf-icon-Pickers tb-icons', mode: 'Palette', tooltipText: 'Border Color', cssClass: 'tb-item-end tb-item-stroke'
        },
        {
            type: 'Separator'
        },
        {
            prefixIcon: 'sf-icon-Group tb-icons', tooltipText: 'Group', cssClass: 'tb-item-start tb-item-align-category'
        },
        {
            prefixIcon: 'sf-icon-Ungroup tb-icons', tooltipText: 'Ungroup', cssClass: 'tb-item-end tb-item-ungroup'
        },
        {
            type: 'Separator'
        },
        {
            prefixIcon: 'sf-icon-Lock tb-icons', tooltipText: 'Lock', cssClass: 'tb-item-start tb-item-lock-category'
        },
        {
            prefixIcon: 'sf-icon-Delete tb-icons', tooltipText: 'Delete', cssClass: 'tb-item-end tb-item-lock-category'
        },
        {
            type: 'Separator'
        },
        {
            prefixIcon: 'sf-icon-Layers tb-icons', tooltipText: 'Show Layers', cssClass: 'tb-item-start tb-custom-diagram-disable'
        },
        {
            prefixIcon: 'db-theme-svg tb-icons', tooltipText: 'Themes', cssClass: 'tb-item-end tb-custom-diagram-disable'
        },
        {
            type: 'Separator'
        },
        {
            tooltipText: 'Order', cssClass: 'tb-item-end tb-item-order tb-dropdown-btn-icon', template: '<button id="orderCommandList"></button>'
        },
        {
            type: 'Separator'
        },
        {
            prefixIcon: 'sf-icon-AlignLeft tb-icons', tooltipText: 'Align Left', cssClass: 'tb-item-start tb-item-align-category'
        },
        {
            prefixIcon: 'sf-icon-AlignHorizontally tb-icons', tooltipText: 'Align Center', cssClass: 'tb-item-middle  tb-item-align-category'
        },
        {
            prefixIcon: 'sf-icon-AlignRight tb-icons', tooltipText: 'Align Right', cssClass: 'tb-item-middle tb-item-align-category'
        },
        {
            prefixIcon: 'sf-icon-AilgnTop tb-icons', tooltipText: 'Align Top', cssClass: 'tb-item-middle tb-item-align-category'
        },
        {
            prefixIcon: 'sf-icon-AlignVertically tb-icons', tooltipText: 'Align Middle', cssClass: 'tb-item-middle tb-item-align-category'
        },
        {
            prefixIcon: 'sf-icon-AlignBottom tb-icons', tooltipText: 'Align Bottom', cssClass: 'tb-item-middle tb-item-align-category'
        },
        {
            prefixIcon: 'sf-icon-DistributeHorizontal tb-icons', tooltipText: 'Distribute Objects Vertically', cssClass: 'tb-item-middle tb-item-space-category'
        },
        {
            prefixIcon: 'sf-icon-DistributeVertical tb-icons', tooltipText: 'Distribute Objects Horizontally', cssClass: 'tb-item-end tb-item-space-category'
        },
    ]
});
toolbarEditor.appendTo('#toolbarEditor');

var btnZoomIncrement = new ej.splitbuttons.DropDownButton({ items: DropDownDataSources.prototype.zoomMenuItems(), content: selectedItem.scrollSettings.currentZoom, select: zoomChange });
btnZoomIncrement.appendTo('#btnZoomIncrement');

var btnDrawShape = new ej.splitbuttons.DropDownButton({ items: DropDownDataSources.prototype.drawShapesList(), iconCss: 'sf-icon-DrawingMode', select: drawShapeChange });
btnDrawShape.appendTo('#btnDrawShape');

var btnDrawConnector = new ej.splitbuttons.DropDownButton({ items: DropDownDataSources.prototype.drawConnectorsList(), iconCss: 'sf-icon-ConnectorMode', select: drawConnectorChange });
btnDrawConnector.appendTo('#btnDrawConnector');

var orderCommandList = new ej.splitbuttons.DropDownButton({ items: DropDownDataSources.prototype.orderCommandsList(), iconCss: 'sf-icon-Order', select: orderCommandsChange });
orderCommandList.appendTo('#orderCommandList');

function nodeoffsetXchange(args) {
    if(args.isInteracted) {
        document.getElementById('nodeOffsetX').ej2_instances[0].value = args.value;
       SelectorViewModel.prototype.nodePropertyChange({ propertyName: 'offsetX', propertyValue: args });
    }
}
function nodeoffsetYchange(args) {
    if(args.isInteracted) {
    document.getElementById('nodeOffsetY').ej2_instances[0].value = args.value;
      SelectorViewModel.prototype.nodePropertyChange({ propertyName: 'offsetY', propertyValue: args });
    }
}
function nodewidthchange(args) {
    if(args.isInteracted) {
      document.getElementById('nodeWidth').ej2_instances[0].value = args.value;
      SelectorViewModel.prototype.nodePropertyChange({ propertyName: 'width', propertyValue: args });
    }
}
function nodeheightchange(args) {
    if(args.isInteracted) {
      document.getElementById('nodeHeight').ej2_instances[0].value = args.value;
      SelectorViewModel.prototype.nodePropertyChange({ propertyName: 'height', propertyValue: args });
    }
}
function nodeaspectratiochange(args) {
    SelectorViewModel.prototype.nodePropertyChange({propertyName: 'aspectRatio', propertyValue: args.checked});
   }
function noderotationchange(args) {
    document.getElementById('nodeRotateAngle').ej2_instances[0].value = args.value;
    SelectorViewModel.prototype.nodePropertyChange({ propertyName: 'rotateAngle', propertyValue: args });
}
function nodecolorchange(args) {
    SelectorViewModel.prototype.nodePropertyChange({propertyName: 'fillColor', propertyValue: args.currentValue.hex});
}
function nodegradientchange(args) {
    var gradientElement = document.getElementById('gradientStyle');
    if (args.checked) {
        gradientElement.className = 'row db-prop-row db-gradient-style-show';
    }
    else {
        gradientElement.className = 'row db-prop-row db-gradient-style-hide';
    }
    SelectorViewModel.prototype.nodePropertyChange({ propertyName: 'gradient', propertyValue: args });
}
function nodegradientdirectionchange(args) {
    document.getElementById('gradientDirectionDropdown').ej2_instances[0].value = args.itemData.text;
    SelectorViewModel.prototype.nodePropertyChange({ propertyName: 'gradientDirection', propertyValue: args });
}
function nodegradientcolorchange(args) {
    document.getElementById('nodeGradientColor').ej2_instances[0].value = args.currentValue.hex;
    SelectorViewModel.prototype.nodePropertyChange({ propertyName: 'gradientColor', propertyValue: args });
}
function nodestrokecolorchange(args) {
    document.getElementById('nodeStrokeColor').ej2_instances[0].value = args.currentValue.hex;
    SelectorViewModel.prototype.nodePropertyChange({ propertyName: 'strokeColor', propertyValue: args });
}
function nodeborderchange(args) {
    document.getElementById('nodeBorderStyle').ej2_instances[0].value= args.itemData.text;
    SelectorViewModel.prototype.nodePropertyChange({ propertyName: 'strokeStyle', propertyValue: args });
}
function nodestrokewidthchange(args) {
    document.getElementById('nodeStrokeWidth').ej2_instances[0].value= args.value;
    SelectorViewModel.prototype.nodePropertyChange({ propertyName: 'strokeWidth', propertyValue: args });
}
function nodeOpacitySliderchange(args) {
    document.getElementById('nodeOpacitySlider').ej2_instances[0].value= args.value;
    SelectorViewModel.prototype.nodePropertyChange({ propertyName: 'opacity', propertyValue: args });
}
function connectoropacitychange(args) {
    document.getElementById('default1').ej2_instances[0].value= args.value;
    SelectorViewModel.prototype.connectorPropertyChange({ propertyName: 'opacity', propertyValue: args });
}
function lineTypeDropdownchange(args) {
    document.getElementById('lineTypeDropdown').ej2_instances[0].value = args.value;
    SelectorViewModel.prototype.connectorPropertyChange({ propertyName: 'lineType', propertyValue: args });
}
function lineColorchange(args) {
    document.getElementById('lineColor').ej2_instances[0].value = args.currentValue.hex;
    SelectorViewModel.prototype.connectorPropertyChange({ propertyName: 'lineColor', propertyValue: args });
}
function lineStylechange(args) {
    document.getElementById('lineStyle').ej2_instances[0].value  = args.value;
    SelectorViewModel.prototype.connectorPropertyChange({ propertyName: 'lineStyle', propertyValue: args });
}
function lineWidthchange(args) {
    document.getElementById('lineWidth').ej2_instances[0].value = args.value;
    SelectorViewModel.prototype.connectorPropertyChange({ propertyName: 'lineWidth', propertyValue: args });
}
function sourceTypechange(args) {
    document.getElementById('sourceType').ej2_instances[0].value= args.value;
    SelectorViewModel.prototype.connectorPropertyChange({ propertyName: 'sourceType', propertyValue: args });
}
function sourceSizechange(args) {
    document.getElementById('sourceSize').ej2_instances[0].value = args.value;
    SelectorViewModel.prototype.connectorPropertyChange({ propertyName: 'sourceSize', propertyValue: args });
}

function targetTypechange(args) {
    document.getElementById('targetType').ej2_instances[0].value  = args.value;
    SelectorViewModel.prototype.connectorPropertyChange({ propertyName: 'targetType', propertyValue: args });
}
function targetSizechange(args) {
    document.getElementById('targetSize').ej2_instances[0].value = args.value;
    SelectorViewModel.prototype.connectorPropertyChange({ propertyName: 'targetSize', propertyValue: args });
}
function lineJumpchange(args) {
    if (args.checked) {
        document.getElementById('lineJumpSizeDiv').style.display = '';
    }
    else {
        document.getElementById('lineJumpSizeDiv').style.display = 'none';
    }
    SelectorViewModel.prototype.connectorPropertyChange({propertyName: 'lineJump', propertyValue: args});
}
function lineJumpSizechange(args) {
    document.getElementById('lineJumpSize').ej2_instances[0].value = args.value;
    SelectorViewModel.prototype.connectorPropertyChange({propertyName: 'lineJumpSize', propertyValue: args});
}
function fontFamilychange(args) {
    document.getElementById('fontFamily').ej2_instances[0].value = args.value;
    SelectorViewModel.prototype.textPropertyChange({propertyName: 'fontFamily', propertyValue: args});
}
function fontSizechange(args) {
    document.getElementById('fontSizeTextProperties').ej2_instances[0].value = args.value;
    SelectorViewModel.prototype.textPropertyChange({propertyName: 'fontSize', propertyValue: args});
}
function fontColorchange(args) {
    document.getElementById('textColor').ej2_instances[0].value = args.currentValue.hex;
    SelectorViewModel.prototype.textPropertyChange({propertyName: 'fontColor', propertyValue: args});
}
function textopacitychange(args) {
    document.getElementById('opacityTextSlider').ej2_instances[0].value= args.value;
    SelectorViewModel.prototype.textPropertyChange({ propertyName: 'opacity', propertyValue: args });
}

function mindMapLevelschange(args) {
    document.getElementById('mindMapLevels').ej2_instances[0].value = args.value;
    SelectorViewModel.prototype.mindMapPropertyChange({propertyName: 'levelType', propertyValue: args});
}
function mindmapFillchange(args) {
    document.getElementById('mindmapFill').ej2_instances[0].value = args.currentValue.hex;
    SelectorViewModel.prototype.mindMapPropertyChange({propertyName: 'fill', propertyValue: args});
}
function mindmapStrokechange(args) {
    document.getElementById('mindmapStroke').ej2_instances[0].value = args.currentValue.hex;
    SelectorViewModel.prototype.mindMapPropertyChange({propertyName: 'stroke', propertyValue: args});
}
function strokeStylechange(args) {
    document.getElementById('strokeStyle').ej2_instances[0].value= args.value;
    SelectorViewModel.prototype.mindMapPropertyChange({propertyName: 'strokeStyle', propertyValue: args});
}
function mindmapStrokeWidthchange(args) {
    document.getElementById('mindmapStrokeWidth').ej2_instances[0].value= args.value;
    SelectorViewModel.prototype.mindMapPropertyChange({propertyName: 'strokeWidth', propertyValue: args});
}
function mindmapOpacitySliderchange(args) {
    document.getElementById('mindmapOpacitySlider').ej2_instances[0].value= args.value;
    SelectorViewModel.prototype.mindMapPropertyChange({propertyName: 'opacity', propertyValue: args});
}
function mindmapFontFamilyListchange(args) {
    document.getElementById('mindmapFontFamilyList').ej2_instances[0].value = args.value;
    SelectorViewModel.prototype.mindMapPropertyChange({propertyName: 'fontFamily', propertyValue: args});
}
function mindmapFontSizechange(args) {
    document.getElementById('mindmapFontSize').ej2_instances[0].value = args.value;
    SelectorViewModel.prototype.mindMapPropertyChange({propertyName: 'fontSize', propertyValue: args});
}
function mindmapTextColorchange(args) {
    document.getElementById('mindmapTextColor').ej2_instances[0].value = args.currentValue.hex;
    SelectorViewModel.prototype.mindMapPropertyChange({propertyName: 'fontColor', propertyValue: args});
}
function mindmapTextOpacitySliderchange(args) {
    document.getElementById('mindmapTextOpacitySlider').ej2_instances[0].value = args.value;
    SelectorViewModel.prototype.mindMapPropertyChange({propertyName: 'textOpacity', propertyValue: args});
}
function Printchange(args) { DiagramPropertyBinding.prototype.multiplePage(args); }

function moreShapesClick(args) {
    moreShapesDialog.show();
}

document.getElementById("btnImportData").onclick = function (args) {
    if (!this.registerBrowseEvent) {
        defaultUpload.dropArea = document.getElementById('dropRegion');
        document.getElementById('browseFile').onclick = function () {
            document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
            return false;
        };
        this.registerBrowseEvent = true;
    }
    selectedItem.orgDataSettings.extensionType = '.csv';
    CommonKeyboardCommands.isOpen = false;
    defaultUpload.clearAll();
    var uploadDialogContent = document.getElementById('uploadDialogContent');
    uploadDialogContent.className = 'db-upload-content firstPage';
    OrgChartUtilityMethods.showUploadDialog();
};

document.getElementById("btnDownloadFile").onclick = function (args) {
    DownloadExampleFiles.prototype.downloadExampleFiles(args);
};

function loadPage() {
    document.getElementsByClassName('diagrambuilder-container')[0].style.display = '';
    selectedItem.selectedDiagram.updateViewPort();
    var overview = new ej.diagrams.Overview({ width: '255px', height: '200px', sourceID: 'diagram' });
    overview.appendTo('#overview');
    document.getElementById('overviewspan').onclick = overviewSpanClick.bind(this);
    document.getElementsByClassName('sidebar')[0].className = 'sidebar';
    if (window.location.search.length === 0) {
        selectedItem.uniqueId = selectedItem.randomIdGenerator();
        document.getElementsByClassName('sb-content-overlay')[0].style.display = 'none';
        openTemplateDialog.show();
        openTemplateDialog.content = selectedItem.utilityMethods.getDefaultDiagramTemplates1(selectedItem);
        diagram.layers[0].addInfo = { 'name': 'Layer0' };
    }
    document.getElementById("exportfileName").value = document.getElementById('diagramName').innerHTML;
}

function savePage() {
    // this.page.loadJson();
}


function renameDiagram(args) {
    document.getElementsByClassName('db-diagram-name-container')[0].classList.add('db-edit-name');
    var element = document.getElementById('diagramEditable');
    element.value = document.getElementById('diagramName').innerHTML;
    element.focus();
    element.select();
}
function diagramNameChange(args) {
    document.getElementById('diagramName').innerHTML = document.getElementById('diagramEditable').value;
    document.getElementsByClassName('db-diagram-name-container')[0].classList.remove('db-edit-name');
    document.getElementById("exportfileName").value = document.getElementById('diagramName').innerHTML;
}

function diagramNameKeyDown(args) {
    if (args.which === 13) {
        document.getElementById('diagramName').innerHTML = document.getElementById('diagramEditable').value;
        document.getElementsByClassName('db-diagram-name-container')[0].classList.remove('db-edit-name');
    }
}
function menumouseover(args) {
    var target = args.target;
    if (target && (target.className === 'e-control e-dropdown-btn e-lib e-btn db-dropdown-menu' ||
        target.className === 'e-control e-dropdown-btn e-lib e-btn db-dropdown-menu e-ddb-active')) {
        if (this.buttonInstance && this.buttonInstance.id !== target.id) {
            if (this.buttonInstance.getPopUpElement().classList.contains('e-popup-open')) {
                this.buttonInstance.toggle();
                var buttonElement = document.getElementById(this.buttonInstance.element.id);
                buttonElement.classList.remove('e-btn-hover');
            }
        }
        var button1 = target.ej2_instances[0];
        this.buttonInstance = button1;
        if (button1.getPopUpElement().classList.contains('e-popup-close')) {
            button1.toggle();
            if (button1.element.id === 'btnArrangeMenu') {
                selectedItem.utilityMethods.enableArrangeMenuItems(selectedItem);
            }
            var buttonElement1 = document.getElementById(this.buttonInstance.element.id);
            buttonElement1.classList.add('e-btn-hover');
        }
    } else {
        if (ej.base.closest(target, '.e-dropdown-popup') === null && ej.base.closest(target, '.e-dropdown-btn') === null) {
            if (this.buttonInstance && this.buttonInstance.getPopUpElement().classList.contains('e-popup-open')) {
                this.buttonInstance.toggle();
                var buttonElement2 = document.getElementById(this.buttonInstance.element.id);
                buttonElement2.classList.remove('e-btn-hover');
            }
        }
    }
}
function beforeItemRender(args) {
    var shortCutText = getShortCutKey(args.item.text);
    if (shortCutText) {
        var shortCutSpan = document.createElement('span');
        var text = args.item.text;
        shortCutSpan.textContent = shortCutText;
        shortCutSpan.style.pointerEvents = 'none';
        args.element.appendChild(shortCutSpan);
        shortCutSpan.setAttribute('class', 'db-shortcut');
    }
    var status = selectedItem.utilityMethods.enableMenuItems(args.item.text, selectedItem);
    if (status) {
        args.element.classList.add('e-disabled');
    } else {
        if (args.element.classList.contains('e-disabled')) {
            args.element.classList.remove('e-disabled');
        }
    }
}
function arrangeMenuBeforeOpen(args) {
    for (var i = 0; i < args.element.children.length; i++) {
        args.element.children[i].style.display = 'block';
    }
    //(args.element.children[0]).style.display = 'block';
    if (args.event && ej.base.closest(args.event.target, '.e-dropdown-btn') !== null) {
        args.cancel = true;
    }
}

function arrangeMenuBeforeClose (args) {
    if (args.event && ej.base.closest(args.event.target, '.e-dropdown-btn') !== null) {
        args.cancel = true;
    }
    if (!args.element) {
        args.cancel = true;
    }
}

function menuClick(args) {
    var buttonElement = document.getElementsByClassName('e-btn-hover')[0];
    if (buttonElement) {
        buttonElement.classList.remove('e-btn-hover');
    }
    var diagram = selectedItem.selectedDiagram;
    var commandType = args.item.text.replace(/[' ']/g, '');
    switch (commandType.toLowerCase()) {
        case 'new':
            CommonKeyboardCommands.newDiagram();
            break;
        case 'open':
            CommonKeyboardCommands.openUploadBox(true, '.json');
            break;
        case 'save':
            CommonKeyboardCommands.download(page.savePage(), document.getElementById('diagramName').innerHTML);
            break;
        case 'saveas':
            (document.getElementById('saveFileName')).value = document.getElementById('diagramName').innerHTML;
            saveDialog.show();
            break;
        case 'print':
            document.getElementById("printPageHeight").ej2_instances[0] = document.getElementById("pageHeight").ej2_instances[0];
            document.getElementById("printPageWidth").ej2_instances[0] =  document.getElementById("pageWidth").ej2_instances[0];
            document.getElementById("printPaperSizeDropdown").ej2_instances[0] = document.getElementById("pageSettingsList").ej2_instances[0];
            document.getElementById("printPortrait").ej2_instances[0] = document.getElementById("pagePortrait").ej2_instances[0];
            document.getElementById("printLandscape").ej2_instances[0] = !document.getElementById("pagePortrait").ej2_instances[0];
            printDialog.show();
            break;
        case 'export':
            exportDialog.show();
            break;
        case 'showguides':
            diagram.snapSettings.constraints = diagram.snapSettings.constraints ^ ej.diagrams.SnapConstraints.SnapToObject;
            args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
            break;
        case 'showgrid':
            diagram.snapSettings.constraints = diagram.snapSettings.constraints ^ ej.diagrams.SnapConstraints.ShowLines;
            args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
            var container = document.getElementsByClassName('db-current-diagram-container')[0];
            if (!args.item.iconCss) {
                container.classList.add('db-hide-grid');
            } else {
                container.classList.remove('db-hide-grid');
            }
            break;
        case 'snaptogrid':
            diagram.snapSettings.constraints = diagram.snapSettings.constraints ^ ej.diagrams.SnapConstraints.SnapToLines;
            args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
            break;
        case 'fittoscreen':
            diagram.fitToPage({ mode: 'Page', region: 'Content', margin: { left: 0, top: 0, right: 0, bottom: 0 } });
            break;
        case 'showrulers':
            selectedItem.selectedDiagram.rulerSettings.showRulers = !selectedItem.selectedDiagram.rulerSettings.showRulers;
            if (selectedItem.selectedDiagram.rulerSettings.showRulers) {
                selectedItem.selectedDiagram.rulerSettings.dynamicGrid = false;
            }
            args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
            container = document.getElementsByClassName('db-current-diagram-container')[0];
            if (!args.item.iconCss) {
                container.classList.remove('db-show-ruler');
            } else {
                container.classList.add('db-show-ruler');
            }
            break;
        case 'zoomin':
            diagram.zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });
            zoomCurrentValue.content = selectedItem.scrollSettings.currentZoom = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
            break;
        case 'zoomout':
            diagram.zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });
            zoomCurrentValue.content = selectedItem.scrollSettings.currentZoom = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
            break;
        case 'showtoolbar':
            selectedItem.utilityMethods.hideElements('hide-toolbar', selectedItem.selectedDiagram);
            args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
            break;
        case 'showstencil':
            selectedItem.utilityMethods.hideElements('hide-palette', selectedItem.selectedDiagram);
            args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
            break;
        case 'showproperties':
            selectedItem.utilityMethods.hideElements('hide-properties', selectedItem.selectedDiagram);
            args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
            break;
        case 'showlayers':
            showHideLayers();
            break;
        case 'themes':
            showHideThemes();
            break;
        case 'showpager':
            selectedItem.utilityMethods.hideElements('hide-pager', selectedItem.selectedDiagram);
            args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
            break;
        default:
            executeEditMenu(diagram, commandType);
            break;
    }
    diagram.dataBind();
}
function arrangeContextMenuBeforeOpen(args) {
    selectedItem.utilityMethods.enableArrangeMenuItems(selectedItem);
}
function arrangeContextMenuOpen (args) {
    if (args.element.classList.contains('e-menu-parent')) {
        var popup = document.querySelector('#btnArrangeMenu-popup');
        args.element.style.left = ej.base.formatUnit(parseInt(args.element.style.left, 10) - parseInt(popup.style.left, 10));
        args.element.style.top = ej.base.formatUnit(parseInt(args.element.style.top, 10) - parseInt(popup.style.top, 10));
    }
}
function hideMenuBar() {
    var expandcollapseicon = document.getElementById('btnHideToolbar');
    var button1 = expandcollapseicon.ej2_instances[0];
    if (button1.iconCss.indexOf('sf-icon-Collapse tb-icons') > -1) {
        button1.iconCss = 'sf-icon-DownArrow2 tb-icons';
    } else {
        button1.iconCss = 'sf-icon-Collapse tb-icons';
    }
    selectedItem.utilityMethods.hideElements('hide-menubar', selectedItem.selectedDiagram);
    selectedItem.selectedDiagram.refresh();
}
function zoomChange(args) {
    var diagram = selectedItem.selectedDiagram;
    if (args.item.text === 'Custom') {
        var ss = '';
    } else if (args.item.text === 'Fit To Screen') {
        zoomCurrentValue.content = selectedItem.scrollSettings.currentZoom = 'Fit ...';
        diagram.fitToPage({ mode: 'Page', region: 'Content', margin: { left: 0, top: 0, right: 0, bottom: 0 } });
    } else {
        var currentZoom = diagram.scrollSettings.currentZoom;
        var zoom = {};
        switch (args.item.text) {
            case '400%':
                zoom.zoomFactor = (4 / currentZoom) - 1;
                break;
            case '300%':
                zoom.zoomFactor = (3 / currentZoom) - 1;
                break;
            case '200%':
                zoom.zoomFactor = (2 / currentZoom) - 1;
                break;
            case '150%':
                zoom.zoomFactor = (1.5 / currentZoom) - 1;
                break;
            case '100%':
                zoom.zoomFactor = (1 / currentZoom) - 1;
                break;
            case '75%':
                zoom.zoomFactor = (0.75 / currentZoom) - 1;
                break;
            case '50%':
                zoom.zoomFactor = (0.5 / currentZoom) - 1;
                break;
            case '25%':
                zoom.zoomFactor = (0.25 / currentZoom) - 1;
                break;
        }
        zoomCurrentValue.content = selectedItem.scrollSettings.currentZoom = args.item.text;
        diagram.zoomTo(zoom);
    }
}
function drawShapeChange (args) {
    var diagram = selectedItem.selectedDiagram;
    if (args.item.text === 'Rectangle') {
        diagram.drawingObject = { shape: { type: 'Basic', shape: 'Rectangle' }, style: { strokeWidth: 1 } };
    } else if (args.item.text === 'Ellipse') {
        diagram.drawingObject = { shape: { type: 'Basic', shape: 'Ellipse' }, style: { strokeWidth: 1 } };
    } else if (args.item.text === 'Polygon') {
        diagram.drawingObject = { shape: { type: 'Basic', shape: 'Polygon' }, style: { strokeWidth: 1 } };
    }
    diagram.tool = ej.diagrams.DiagramTools.ContinuousDraw;
    removeSelectedToolbarItem();
    document.getElementById('btnDrawShape').classList.add('tb-item-selected');
}
function drawConnectorChange (args) {
    var diagram = selectedItem.selectedDiagram;
    if (args.item.text === 'Straight Line') {
        diagram.drawingObject = { type: 'Straight', style: { strokeWidth: 2 } };
    } else if (args.item.text === 'Orthogonal Line') {
        diagram.drawingObject = { type: 'Orthogonal', style: { strokeWidth: 2 } };
    } else if (args.item.text === 'Bezier') {
        diagram.drawingObject = { type: 'Bezier', style: { strokeWidth: 2 } };
    }
    else if(args.item.text === 'Free Hand'){
        diagram.drawingObject = { type: 'Freehand', style: { strokeWidth: 2 } };
    }
    diagram.tool = ej.diagrams.DiagramTools.ContinuousDraw;
    diagram.clearSelection();
    removeSelectedToolbarItem();
    document.getElementById('btnDrawConnector').classList.add('tb-item-selected');
}

function collectionChange (args) {
    if (selectedItem.diagramType === 'GeneralDiagram') {
        if (args.state === 'Changed' && args.type === 'Addition' &&
            args.cause === (ej.diagrams.DiagramAction.Render | ej.diagrams.DiagramAction.ToolAction)) {
            if (selectedItem.themeStyle !== undefined && selectedItem.themeStyle !== null) {
                diagramThemes.applyThemeStyleforElement(args.element, null);
            }
            selectedItem.isModified = true;
        }
    } else {
        if (args.state === 'Changed' && selectedItem.isCopyLayoutElement) {
            if (args.element instanceof ej.diagrams.Node) {
                if (args.element.addInfo) {
                    if ((args.element.addInfo).isFirstNode) {
                        selectedItem.pastedFirstItem = args.element;
                    }
                }
            }
            selectedItem.isModified = true;
        }
    }
}

function drop (args) {
    if (selectedItem.diagramType === 'OrgChart') {
        var diagram = selectedItem.selectedDiagram;
        var source = args.source;
        var sourceNode;
        if (source instanceof ej.diagrams.Diagram) {
            if (diagram.selectedItems.nodes.length === 1) {
                sourceNode = diagram.selectedItems.nodes[0];
            }
        } else if (source instanceof ej.diagrams.Node) {
            sourceNode = source;
        }
        if (sourceNode !== null && sourceNode.id !== 'rootNode' && args.target instanceof ej.diagrams.Node) {
            var targetNode = args.target;
            var connector = diagram.getObject(sourceNode.inEdges[0]);
            connector.sourceID = targetNode.id;
            diagram.dataBind();
        }
        diagram.doLayout();
    }
}

function themeDialogCreated(args) {
    var themeDialogContent = document.getElementById('themeDialogContent');
    themeDialogContent.onmouseover = diagramThemes.themeMouseOver.bind(diagramThemes);
    themeDialogContent.onclick = diagramThemes.themeClick.bind(diagramThemes);
    themeDialogContent.onmouseleave = diagramThemes.applyOldStyle.bind(diagramThemes);
}


function tooltipCreated(args) {
    tooltip.target = '.db-info-style';
}

function overviewSpanClick(args) {
    var target = args.target;
    var element = document.getElementsByClassName('sidebar')[0];
    if (element.classList.contains('show-overview')) {
        element.classList.remove('show-overview');
        target.className = 'db-overview';
    } else {
        element.classList.add('show-overview');
        target.className = 'db-overview active';
        var  overview = document.getElementById("overview").ej2_instances[0];
        overview.refresh();
    }
}

function btnMoreShapes(args) {
    var listSelectedItem = moreShapesList.getSelectedItems();
    if (listSelectedItem.text.length > 0) {
        symbolpalette.palettes = Palettes.prototype.getPalettes(listSelectedItem.text);
        moreShapesDialog.hide();
    }
}

function listViewSelectionChange(args) {
    document.getElementById('shapePreviewImage').src = 'css/assets/dbstyle/shapes_images/' + args.text.toLowerCase() + '.png';
}
function SegmentEditing(args){
    if(diagram.selectedItems.connectors){
        if(args.checked == true){
            for(i=0;i<diagram.selectedItems.connectors.length;i++){
                diagram.selectedItems.connectors[i].constraints = ej.diagrams.ConnectorConstraints.Default | ej.diagrams.ConnectorConstraints.DragSegmentThumb;
            }
        }
        else{
            for(i=0;i<diagram.selectedItems.connectors.length;i++){
            diagram.selectedItems.connectors[i].constraints = ej.diagrams.ConnectorConstraints.Default & ~(ej.diagrams.ConnectorConstraints.DragSegmentThumb);
            }
        }
        diagram.dataBind();
    }
}

function btnDeleteConfirmation(args) {
    CustomProperties.prototype.removeProperty(args);
}

function btnUploadNext(args) {
    var target = args.target;
    var buttonInstance = target.ej2_instances[0];
    var uploadDialogContent = document.getElementById('uploadDialogContent');
    if (OrgChartUtilityMethods.isUploadSuccess) {
        if (uploadDialogContent.className === 'db-upload-content firstPage') {
            if (OrgChartUtilityMethods.fileType === 'xml') {
                OrgChartUtilityMethods.uploadDialog.header = ' Define Employee Information';
                uploadDialogContent.className = 'db-upload-content thirdPage';
                buttonInstance.content = 'Finish';
            } else {
                OrgChartUtilityMethods.uploadDialog.header = ' Define Employee - Supervisor Relationship';
                uploadDialogContent.className = 'db-upload-content secondPage';
            }
        } else if (uploadDialogContent.className === 'db-upload-content secondPage') {
            var id = selectedItem.orgDataSettings.id;
            var parent = selectedItem.orgDataSettings.parent;
            if (id && parent) {
                if (!OrgChartUtilityMethods.validateParentChildRelation()) {
                    alert('We haven"t found the parent child relationship between the chosen fields');
                } else {
                    OrgChartUtilityMethods.uploadDialog.header = ' Define Employee Information';
                    uploadDialogContent.className = 'db-upload-content thirdPage';
                    buttonInstance.content = 'Finish';
                }
            } else {
                alert('EmployeeId and SupervisorId can"t be empty');
            }

        } else {
            var nameField = selectedItem.orgDataSettings.nameField;
            if (nameField) {
                uploadDialogContent.className = 'db-upload-content firstPage';
                buttonInstance.content = 'Next';
                OrgChartUtilityMethods.applyDataSource();
                defaultUpload.clearAll();
            } else {
                alert('Name field can"t be empty');
            }
        }
    }
}

function btnCancelClick(args) {
    var ss = args.target;
    var key = ss.offsetParent.id;
    switch (key) {
        case 'exportDialog':
            exportDialog.hide();
            break;
        case 'printDialog':
            printDialog.hide();
            break;
        case 'saveDialog':
            saveDialog.hide();
            break;
        case 'customPropertyDialog':
            this.customPropertyDialog.hide();
            break;
        case 'tooltipDialog':
            tooltipDialog.hide();
            break;
        case 'hyperlinkDialog':
            this.hyperlinkDialog.hide();
            break;
        case 'deleteConfirmationDialog':
            this.deleteConfirmationDialog.hide();
            break;
        case 'fileUploadDialog':
            OrgChartUtilityMethods.uploadDialog.hide();
            OrgChartUtilityMethods.isUploadSuccess = false;
            break;
        case 'moreShapesDialogContent':
            moreShapesDialog.hide();
            break;
    }
}

function btnHyperLink() {
    var node = selectedItem.selectedDiagram.selectedItems.nodes[0];
    if (node.annotations.length > 0) {
        node.annotations[0].hyperlink.link = document.getElementById('hyperlink').value;
        node.annotations[0].hyperlink.content = document.getElementById('hyperlinkText').value;
        applyToolTipforHyperlink(node);
        selectedItem.selectedDiagram.dataBind();
    } else {
        var annotation = {
            hyperlink: {
                content: document.getElementById('hyperlinkText').value,
                link: document.getElementById('hyperlink').value
            }
        };
        selectedItem.selectedDiagram.addLabels(node, [annotation]);
        applyToolTipforHyperlink(node);
        selectedItem.selectedDiagram.dataBind();
    }
    hyperlinkDialog.hide();
}

function applyToolTipforHyperlink(node) {
    node.constraints = ej.diagrams.NodeConstraints.Default & ~ej.diagrams.NodeConstraints.InheritTooltip | ej.diagrams.NodeConstraints.Tooltip;
    node.tooltip = {
        content: node.annotations[0].hyperlink.link, relativeMode: 'Object',
        position: 'TopCenter', showTipPointer: true,
    };
}

function btnTooltip() {
    var diagram = selectedItem.selectedDiagram;
    if (selectedItem.selectedDiagram.selectedItems.nodes.length > 0) {
        var node = selectedItem.selectedDiagram.selectedItems.nodes[0];
        CustomProperties.prototype.setTooltip(node, (document.getElementById('objectTooltip')).value);
        selectedItem.nodeProperties.tooltip = node.tooltip.content;
        diagram.dataBind();
    }
    tooltipDialog.hide();
}

function btnSave() {
    CommonKeyboardCommands.download(page.savePage(), (document.getElementById('saveFileName')).value);
    saveDialog.hide();
}

function orderCommandsChange(args) {
    var diagram = selectedItem.selectedDiagram;
    if (args.item.text === 'Send To Back') {
        sendToBack();
    } else if (args.item.text === 'Bring To Front') {
        bringToFront();
    } else if (args.item.text === 'Bring Forward') {
        selectedItem.isModified = true;
        diagram.moveForward();
    } else if (args.item.text === 'Send Backward') {
        selectedItem.isModified = true;
        diagram.sendBackward();
    }
}


function getShortCutKey(menuItem) {
    var shortCutKey = navigator.platform.indexOf('Mac') > -1 ? 'Cmd' : 'Ctrl';
    switch (menuItem) {
        case 'New':
            shortCutKey = 'Shift' + '+N';
            break;
        case 'Open':
            shortCutKey = shortCutKey + '+O';
            break;
        case 'Save':
            shortCutKey = shortCutKey + '+S';
            break;
        case 'Undo':
            shortCutKey = shortCutKey + '+Z';
            break;
        case 'Redo':
            shortCutKey = shortCutKey + '+Y';
            break;
        case 'Cut':
            shortCutKey = shortCutKey + '+X';
            break;
        case 'Copy':
            shortCutKey = shortCutKey + '+C';
            break;
        case 'Paste':
            shortCutKey = shortCutKey + '+V';
            break;
        case 'Delete':
            shortCutKey = 'Delete';
            break;
        case 'Duplicate':
            shortCutKey = shortCutKey + '+D';
            break;
        case 'Select All':
            shortCutKey = shortCutKey + '+A';
            break;
        case 'Zoom In':
            shortCutKey = shortCutKey + '++';
            break;
        case 'Zoom Out':
            shortCutKey = shortCutKey + '+-';
            break;
        case 'Group':
            shortCutKey = shortCutKey + '+G';
            break;
        case 'Ungroup':
            shortCutKey = shortCutKey + '+U';
            break;
        case 'Send To Back':
            shortCutKey = shortCutKey + '+Shift+B';
            break;
        case 'Bring To Front':
            shortCutKey = shortCutKey + '+Shift+F';
            break;
        default:
            shortCutKey = '';
            break;
    }
    return shortCutKey;
}

function contextMenuClick (args) {
    var buttonElement = document.getElementsByClassName('e-btn-hover')[0];
    if (buttonElement) {
        buttonElement.classList.remove('e-btn-hover');
    }
    var diagram = selectedItem.selectedDiagram;
    var commandType = '';
    if (args.element.innerText.indexOf('Ctrl') !== -1) {
        commandType = args.element.innerText.substring(0, args.element.innerText.indexOf('Ctrl')).trim();
    } else {
        commandType = args.element.innerText.trim();
    }
    commandType = commandType.replace(/[' ']/g, '');
    switch (commandType.toLowerCase()) {
        case 'left':
        case 'right':
        case 'top':
        case 'bottom':
        case 'middle':
        case 'center':
            selectedItem.isModified = true;
            diagram.align(args.item.text);
            break;
        case 'horizontally':
            distribute('RightToLeft');
            break;
        case 'vertically':
            distribute('BottomToTop');
            break;
        case 'width':
            selectedItem.isModified = true;
            diagram.sameSize('Width');
            break;
        case 'height':
            selectedItem.isModified = true;
            diagram.sameSize('Height');
            break;
        case 'bothwidthandheight':
            selectedItem.isModified = true;
            diagram.sameSize('Size');
            break;
        case 'sendtoback':
            sendToBack();
            break;
        case 'bringtofront':
            bringToFront();
            break;
        case 'bringforward':
            selectedItem.isModified = true;
            diagram.moveForward();
            break;
        case 'sendbackward':
            selectedItem.isModified = true;
            diagram.sendBackward();
            break;
        case 'lock':
        case 'unlock':
            lockObject();
            break;
        case 'group':
            if (args.name === 'select') {
                group();
            }
            break;
        case 'ungroup':
            if (args.name === 'select') {
                ungroup();
            }
            break;
        case 'duplicate':
            CommonKeyboardCommands.duplicateSelectedItems();
            break;
    }
}


function executeEditMenu(diagram, commandType) {
    var key = '';
    switch (commandType.toLowerCase()) {
        case 'undo':
            undo();
            if (selectedItem.diagramType === 'MindMap' || selectedItem.diagramType === 'OrgChart') {
                diagram.doLayout();
            }
            break;
        case 'redo':
            redo();
            break;
        case 'cut':
            cutObjects();
            break;
        case 'copy':
            copyObjects();
            break;
        case 'paste':
            pasteObjects();
            break;
        case 'delete':
            deleteData();
            break;
        case 'duplicate':
            CommonKeyboardCommands.duplicateSelectedItems();
            break;
        case 'selectall':
            selectAll();
            break;
        case 'edittooltip':
            selectedItem.isModified = true;
            if (diagram.selectedItems.nodes.length > 0) {
                tooltipDialog.show();
            }
            break;
    }
}

function toolbarEditorClick(args) {
    var diagram = selectedItem.selectedDiagram;
    var commandType = args.item.tooltipText.replace(/[' ']/g, '').toLowerCase();
    switch (commandType) {
        case 'undo':
            undo();
            break;
        case 'redo':
            redo();
            break;
        case 'zoomin(ctrl++)':
            diagram.zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });
            zoomCurrentValue.content = selectedItem.scrollSettings.currentZoom = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
            break;
        case 'zoomout(ctrl+-)':
            diagram.zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });
            zoomCurrentValue.content = selectedItem.scrollSettings.currentZoom = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
            break;
        case 'pantool':
            diagram.tool = ej.diagrams.DiagramTools.ZoomPan;
            diagram.clearSelection();
            selectedItem.utilityMethods.objectTypeChange('diagram');
            break;
        case 'pointer':
            diagram.drawingObject = {};
            diagram.tool =  ej.diagrams.DiagramTools.SingleSelect |  ej.diagrams.DiagramTools.MultipleSelect;
            break;
        case 'texttool':
            diagram.drawingObject = { shape: { type: 'Text' }, style: { strokeColor: 'none', fill: 'none' } };
            diagram.tool = ej.diagrams.DiagramTools.ContinuousDraw;
            break;
        case 'delete':
            deleteData();
            break;
        case 'lock':
            lockObject();
            break;
        case 'fillcolor':
            showColorPicker('nodeFillColor', 'tb-item-fill');
            break;
        case 'bordercolor':
            if (selectedItem.selectedDiagram.selectedItems.nodes.length > 0) {
                showColorPicker('nodeStrokeColor', 'tb-item-stroke');
            } else {
                showColorPicker('lineColor', 'tb-item-stroke');
            }
            break;
        case 'group':
            group();
            break;
        case 'ungroup':
            ungroup();
            break;
        case 'alignleft':
        case 'alignright':
        case 'aligntop':
        case 'alignbottom':
        case 'alignmiddle':
        case 'aligncenter':
            selectedItem.isModified = true;
            var alignType = commandType.replace('align', '');
            var alignType1 = alignType.charAt(0).toUpperCase() + alignType.slice(1);
            diagram.align(alignType1);
            break;
        case 'distributeobjectshorizontally':
            distribute('RightToLeft');
            break;
        case 'distributeobjectsvertically':
            distribute('BottomToTop');
            break;
        case 'showlayers':
            showHideLayers();
            break;
        case 'themes':
            showHideThemes();
            break;
    }
    if (commandType === 'pantool' || commandType === 'pointer' || commandType === 'texttool') {
        if (args.item.cssClass.indexOf('tb-item-selected') === -1) {
            removeSelectedToolbarItem();
            args.item.cssClass += ' tb-item-selected';
        }
    }
}

function showColorPicker (propertyName, toolbarName) {
    var fillElement =
        document.getElementById(propertyName).parentElement.getElementsByClassName('e-dropdown-btn')[0];
    fillElement.click();
    var popupElement = document.getElementById(fillElement.id + '-popup');
    var bounds = document.getElementsByClassName(toolbarName)[0].getBoundingClientRect();
    popupElement.style.left = bounds.left + 'px';
    popupElement.style.top = (bounds.top + 40) + 'px';
}

function showHideLayers () {
    var btnWindow = document.getElementById('btnWindowMenu');
    var iconCss = btnWindow.ej2_instances[0].items[3].iconCss;
    if (!this.initLayerPanel) {
        diagramLayer.initLayerBottomPanel();
        this.initLayerPanel = true;
    }
    if (iconCss) {
        diagramLayer.layerDialog.hide();
    } else {
        diagramLayer.getLayerDialogContent();
        diagramLayer.layerDialog.show();
    }
    btnWindow.ej2_instances[0].items[3].iconCss = iconCss ? '' : 'sf-icon-Selection';
}

function showHideThemes () {
    var btnWindow = document.getElementById('btnWindowMenu');
    var iconCss = btnWindow.ej2_instances[0].items[5].iconCss;
    if (iconCss) {
        themeDialog.hide();
    } else {
        themeDialog.show();
    }
    btnWindow.ej2_instances[0].items[5].iconCss = iconCss ? '' : 'sf-icon-Selection';
}

function removeSelectedToolbarItem (args) {
    var toolbarEditor = selectedItem.utilityMethods.toolbarEditor;
    for (var i = 0; i < toolbarEditor.items.length; i++) {
        var item = toolbarEditor.items[i];
        if (item.cssClass.indexOf('tb-item-selected') !== -1) {
            item.cssClass = item.cssClass.replace(' tb-item-selected', '');
        }
    }
    toolbarEditor.dataBind();
    document.getElementById('btnDrawShape').classList.remove('tb-item-selected');
    document.getElementById('btnDrawConnector').classList.remove('tb-item-selected');
}

function lockObject (args) {
    selectedItem.isModified = true;
    var diagram = selectedItem.selectedDiagram;
    for (var i = 0; i < diagram.selectedItems.nodes.length; i++) {
        var node = diagram.selectedItems.nodes[i];
        if (node.constraints & ej.diagrams.NodeConstraints.Drag) {
            node.constraints = ej.diagrams.NodeConstraints.PointerEvents | ej.diagrams.NodeConstraints.Select;
        } else {
            node.constraints = ej.diagrams.NodeConstraints.Default;
        }
    }
    for (var j = 0; j < diagram.selectedItems.connectors.length; j++) {
        var connector = diagram.selectedItems.connectors[j];
        if (connector.constraints & ej.diagrams.ConnectorConstraints.Drag) {
            connector.constraints = ej.diagrams.ConnectorConstraints.PointerEvents | ej.diagrams.ConnectorConstraints.Select;
        } else {
            connector.constraints = ej.diagrams.ConnectorConstraints.Default;
        }
    }
    diagram.dataBind();
}

function getCommandSettings() {
    var commandManager = {
        commands: [
            {
                gesture: { key: Keys.D, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                execute: CommonKeyboardCommands.duplicateSelectedItems.bind(CommonKeyboardCommands), name: 'Duplicate'
            },
            {
                gesture: { key: Keys.B, keyModifiers: KeyModifiers.Control | KeyModifiers.Shift }, canExecute: this.canExecute,
                execute: this.sendToBack.bind(this), name: 'SendToBack'
            },
            {
                gesture: { key: Keys.F, keyModifiers: KeyModifiers.Control | KeyModifiers.Shift }, canExecute: this.canExecute,
                execute: this.bringToFront.bind(this), name: 'BringToFront'
            },
            {
                gesture: { key: Keys.G, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                execute: this.group.bind(this), name: 'Group'
            },
            {
                gesture: { key: Keys.U, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                execute: this.ungroup.bind(this), name: 'Ungroup'
            },
            {
                gesture: { key: Keys.X, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                execute: this.cutObjects.bind(this), name: 'cutObjects'
            },
            {
                gesture: { key: Keys.C, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                execute: this.copyObjects.bind(this), name: 'copyObjects'
            },
            {
                gesture: { key: Keys.V, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                execute: this.pasteObjects.bind(this), name: 'pasteObjects'
            },
            {
                gesture: { key: Keys.Z, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                execute: this.undo.bind(this), name: 'undo'
            },
            {
                gesture: { key: Keys.Y, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                execute: this.redo.bind(this), name: 'redo'
            },
            {
                gesture: { key: Keys.Delete, keyModifiers: KeyModifiers.None }, canExecute: this.canExecute,
                execute: this.delete.bind(this), name: 'delete'
            },
            {
                gesture: { key: Keys.A, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                execute: this.selectAll.bind(this), name: 'selectAll'
            }
        ]
    };
    commandManager.commands = CommonKeyboardCommands.addCommonCommands(commandManager.commands);
    return commandManager;
}

function btnExportClick() {
    var diagram = selectedItem.selectedDiagram;
    diagram.exportDiagram({
        fileName: document.getElementById("exportfileName").value,
        format:  document.getElementById("exportFormat").value,
        region:  document.getElementById("exportRegion").value
    });
    exportDialog.hide();
}

function btnPrintClick() {
    var pageWidth = selectedItem.printSettings.pageWidth;
    var pageHeight = selectedItem.printSettings.pageHeight;
    var paperSize = selectedItem.utilityMethods.getPaperSize(selectedItem.printSettings.paperSize);
    if (paperSize.pageHeight && paperSize.pageWidth) {
        pageWidth = paperSize.pageWidth;
        pageHeight = paperSize.pageHeight;
    }
    if (selectedItem.pageSettings.isPortrait) {
        if (pageWidth > pageHeight) {
            var temp = pageWidth;
            pageWidth = pageHeight;
            pageHeight = temp;
        }
    } else {
        if (pageHeight > pageWidth) {
            var temp1 = pageHeight;
            pageHeight = pageWidth;
            pageWidth = temp1;
        }
    }
    var diagram = selectedItem.selectedDiagram;
    diagram.print({
        region: selectedItem.printSettings.region, pageHeight: pageHeight, pageWidth: pageWidth,
        multiplePage: !selectedItem.printSettings.multiplePage,
        pageOrientation: selectedItem.printSettings.isPortrait ? 'Portrait' : 'Landscape'
    });
    printDialog.hide();
}

function getUploadButtons() {
    var buttons = [];
    buttons.push({
        click: btnCancelClick.bind(this),
        buttonModel: { content: 'Cancel', cssClass: 'e-flat', isPrimary: true }
    });
    buttons.push({
        click: btnUploadNext.bind(this),
        buttonModel: { content: 'Next', cssClass: 'e-flat e-db-primary', isPrimary: true },
    });
    return buttons;
}

function setImage(event) {
    //(document.getElementsByClassName('sb-content-overlay')[0] as HTMLDivElement).style.display = 'none';
    var node = selectedItem.selectedDiagram.selectedItems.nodes[0];
    node.shape = { type: 'Image', source: event.target.result, align: 'None' };
}

function closeThemeDialog(args) {
    var btnWindow = document.getElementById('btnWindowMenu');
    btnWindow.ej2_instances[0].items[5].iconCss = '';
}

function loadDiagram(event) {
    page.loadPage(event.target.result.toString());
    page.loadDiagramSettings();
    OrgChartUtilityMethods.uploadDialog.hide();
}

function onTooltipBeforeRender(args) {
    if (args.target) {
        // OrgChartPropertyBinding.prototype.getTooltipContent 
        tooltip.content = orgChartPropertyBinding.getTooltipContent(args);
    }
}

function onUploadSuccess(args) {
    document.getElementsByClassName('sb-content-overlay')[0].style.display = 'none';
    if (args.operation !== 'remove') {
        var file1 = args.file;
        var file = file1.rawFile;
        OrgChartUtilityMethods.fileType = file1.type.toString();
        var reader = new FileReader();
        if (OrgChartUtilityMethods.fileType.toLowerCase() === 'jpg' || OrgChartUtilityMethods.fileType.toLowerCase() === 'png') {
            reader.readAsDataURL(file);
            reader.onloadend = setImage.bind(this);
        } else {
            reader.readAsText(file);
            if (OrgChartUtilityMethods.fileType === 'json' && CommonKeyboardCommands.isOpen) {
                reader.onloadend = loadDiagram.bind(this);
            } else {
                OrgChartUtilityMethods.isUploadSuccess = true;
                reader.onloadend = OrgChartUtilityMethods.readFile.bind(OrgChartUtilityMethods);
            }
        }
        CommonKeyboardCommands.isOpen = false;
    }
}

function onUploadFailure(args) {
    document.getElementsByClassName('sb-content-overlay')[0].style.display = 'none';
}
function onUploadFileSelected(args) {
    document.getElementsByClassName('sb-content-overlay')[0].style.display = '';
}

function cutObjects() {
    selectedItem.pasteData = CommonKeyboardCommands.cloneSelectedItems();
    selectedItem.selectedDiagram.cut();
}

function copyObjects() {
    selectedItem.pasteData = CommonKeyboardCommands.cloneSelectedItems();
}

function pasteObjects() {
    var diagram = selectedItem.selectedDiagram;
    if (selectedItem.pasteData.length > 0) {
        diagram.paste(selectedItem.pasteData);
    }
}

function duplicate(){
    CommonKeyboardCommands.duplicateSelectedItems();
}

function sendToBack() {
    selectedItem.isModified = true;
    selectedItem.selectedDiagram.sendToBack();
}

function bringToFront() {
    selectedItem.isModified = true;
    selectedItem.selectedDiagram.bringToFront();
}

function group() {
    selectedItem.isModified = true;
    selectedItem.selectedDiagram.group();
}

function ungroup() {
    selectedItem.isModified = true;
    selectedItem.selectedDiagram.unGroup();
}
function undo() {
    selectedItem.isModified = true;
    selectedItem.selectedDiagram.undo();
}
function redo() {
    selectedItem.isModified = true;
    selectedItem.selectedDiagram.redo();
}
function deleteData() {
    selectedItem.isModified = true;
    selectedItem.selectedDiagram.remove();
}
function selectAll() {
    selectedItem.isModified = true;
    selectedItem.selectedDiagram.selectAll();
}
function distribute(value) {
    selectedItem.isModified = true;
    selectedItem.selectedDiagram.distribute(value);
}
function canExecute() {
    return true;
}
function toolbarInsertClick(args) {
    var diagram = selectedItem.selectedDiagram;
    var commandType = args.item.tooltipText.replace(/[' ']/g, '');
    if (diagram.selectedItems.nodes.length > 0) {
        switch (commandType.toLowerCase()) {
            case 'insertlink':
                 document.getElementById('hyperlink').value = '';
                 document.getElementById('hyperlinkText').value = '';
                if (diagram.selectedItems.nodes[0].annotations.length > 0) {
                    var annotation = diagram.selectedItems.nodes[0].annotations[0];
                    if (annotation.hyperlink.link || annotation.content) {
                        document.getElementById('hyperlink').value = annotation.hyperlink.link;
                        document.getElementById('hyperlinkText').value = annotation.hyperlink.content || annotation.content;
                    }
                }
                hyperlinkDialog.show();
                break;
            case 'insertimage':
                CommonKeyboardCommands.openUploadBox(false, '.jpg,.png,.bmp');
                break;
        }
    }
}
function closeWindow(evt) {
    var message = 'Are you sure you want to close?';
    if (evt && selectedItem.isModified) {
        evt.returnValue = message;
        return evt;
    }
    return null;
}

