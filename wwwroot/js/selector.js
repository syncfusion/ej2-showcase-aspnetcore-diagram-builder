/**
 * Selector Handler
 */

var NodeProperties = (function () {
    function NodeProperties() {
        this.m_offsetX = 0;
        this.m_offsetY = 0;
        this.m_width = 0;
        this.m_height = 0;
        this.m_rotateAngle = 0;
        this.m_fillColor = '#ffffff';
        this.m_strokeColor = '#000000';
        this.m_strokeStyle = 'None';
        this.m_strokeWidth = 1;
        this.m_opacity = 0;
        this.opacityText = '0%';
        this.m_aspectRatio = false;
        this.m_gradient = false;
        this.m_gradientDirection = 'BottomToTop';
        this.m_gradientColor = '#ffffff';
    }

    NodeProperties.prototype.triggerPropertyChange = function (propertyName, propertyValue) {
        if (!ej.base.isNullOrUndefined(this.propertyChange)) {
            this.propertyChange.call(this, { propertyName: propertyName, propertyValue: propertyValue });
        }
    };
    NodeProperties.prototype.getGradient = function (node) {
        var gradientValue = this.getGradientDirectionValue(document.getElementById('gradientDirectionDropdown').ej2_instances[0].value);
        node.style.gradient = {
            type: 'Linear',
            x1: gradientValue.x1, x2: gradientValue.x2, y1: gradientValue.y1, y2: gradientValue.y2,
            stops: [
                { color: node.style.fill, offset: 0 },
                { color: this.getColor(document.getElementById('nodeGradientColor').ej2_instances[0].value), offset: 1 }
            ]
        };
    };
    NodeProperties.prototype.getGradientDirectionValue = function (direction) {
        var gradientValue = {};
        var x1 = 0, x2 = 0, y1 = 0, y2 = 0;
        if (direction === 'LeftToRight') {
            x1 = 100;
        }
        else if (direction === 'BottomToTop') {
            y2 = 100;
        }
        else if (direction === 'RightToLeft') {
            x2 = 100;
        }
        else {
            y1 = 100;
        }
        gradientValue = { x1: x1, y1: y1, x2: x2, y2: y2 };
        return gradientValue;
    };
    NodeProperties.prototype.getColor = function (colorName) {
        if (window.navigator.msSaveBlob && colorName.length === 9) {
            return colorName.substring(0, 7);
        }
        return colorName;
    };

    return NodeProperties;
}());

var ConnectorProperties = (function () {
    function ConnectorProperties() {
        this.m_lineColor = '#ffffff';
    }
    Object.defineProperty(ConnectorProperties.prototype, "lineColor", {
        get: function () {
            return this.m_lineColor;
        },
        set: function (lineColor) {
            if (this.m_lineColor !== lineColor) {
                this.m_lineColor = lineColor;
                this.triggerPropertyChange('lineColor',lineColor);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectorProperties.prototype, "lineTypeDropdown", {
        get: function () {
            return this.m_lineType;
        },
        set: function (lineType) {
            if (this.m_lineType !== lineType) {
                this.m_lineType = lineType;
                this.triggerPropertyChange('lineTypeDropdown',lineType);
            }
        },
        enumerable: true,
        configurable: true
    });
    ConnectorProperties.prototype.triggerPropertyChange = function (propertyName, propertyValue) {
        if (!ej.base.isNullOrUndefined(this.propertyChange)) {
            this.propertyChange.call(this, { propertyName: propertyName, propertyValue: propertyValue });
        }
    };
    return ConnectorProperties;
}());

var TextProperties = (function () {
    function TextProperties() {
        this.m_textPosition = '';
        this.m_fontFamily = 'Arial';
        this.m_fontColor = '#ffffff';
        this.textPositionDataSource = this.getNodeTextPositions();
    }
    Object.defineProperty(TextProperties.prototype, "textPosition", {
        get: function () {
            return this.m_textPosition;
        },
        set: function (textPosition) {
            if (this.m_textPosition !== textPosition) {
                this.m_textPosition = textPosition;
                this.triggerPropertyChange('textPosition', textPosition);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextProperties.prototype, "fontFamily", {
        get: function () {
            return this.m_fontFamily;
        },
        set: function (fontFamily) {
            if (this.m_fontFamily !== fontFamily) {
                this.m_fontFamily = fontFamily;
                this.triggerPropertyChange('fontFamily', fontFamily);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextProperties.prototype, "fontColor", {
        get: function () {
            return this.m_fontColor;
        },
        set: function (fontColor) {
            if (this.m_fontColor !== fontColor) {
                this.m_fontColor = fontColor;
                this.triggerPropertyChange('fontColor', fontColor);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextProperties.prototype, "opacity", {
        get: function () {
            return this.m_opacity;
        },
        set: function (opacity) {
            if (this.m_opacity !== opacity) {
                this.m_opacity = opacity;
                this.triggerPropertyChange('opacity', opacity);
            }
        },
        enumerable: true,
        configurable: true
    });
    TextProperties.prototype.getNodeTextPositions = function () {
        return [
            { text: 'TopLeft', value: 'TopLeft' }, { text: 'TopCenter', value: 'TopCenter' },
            { text: 'TopRight', value: 'TopRight' }, { text: 'MiddleLeft', value: 'MiddleLeft' },
            { text: 'Center', value: 'Center' }, { text: 'MiddleRight', value: 'MiddleRight' },
            { text: 'BottomLeft', value: 'BottomLeft' }, { text: 'BottomCenter', value: 'BottomCenter' },
            { text: 'BottomRight', value: 'BottomRight' },
        ];
    };
    TextProperties.prototype.getConnectorTextPositions = function () {
        return [
            { text: 'Before', value: 'Before' }, { text: 'Center', value: 'Center' },
            { text: 'After', value: 'After' },
        ];
    };
    TextProperties.prototype.triggerPropertyChange = function (propertyName, propertyValue) {
        if (!ej.base.isNullOrUndefined(this.propertyChange)) {
            this.propertyChange.call(this, { propertyName: propertyName, propertyValue: propertyValue });
        }
    };
    return TextProperties;
}());

var ExportSettings = (function () {
    function ExportSettings() {
        this.m_fileName = 'Diagram';
        this.m_format = 'JPG';
        this.m_region = 'PageSettings';
    }
    Object.defineProperty(ExportSettings.prototype, "fileName", {
        get: function () {
            return this.m_fileName;
        },
        set: function (fileName) {
            this.m_fileName = fileName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExportSettings.prototype, "format", {
        get: function () {
            return this.m_format;
        },
        set: function (format) {
            this.m_format = format;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExportSettings.prototype, "region", {
        get: function () {
            return this.m_region;
        },
        set: function (region) {
            this.m_region = region;
        },
        enumerable: true,
        configurable: true
    });
    return ExportSettings;
}());

var PrintSettings = (function () {
    function PrintSettings() {
        this.m_region = 'PageSettings';
        this.m_pageWidth = 0;
        this.m_pageHeight = 0;
        this.m_isPortrait = true;
        this.m_isLandscape = false;
        this.m_multiplePage = false;
        this.m_paperSize = 'Letter';
    }
    Object.defineProperty(PrintSettings.prototype, "region", {
        get: function () {
            return this.m_region;
        },
        set: function (region) {
            this.m_region = region;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintSettings.prototype, "pageWidth", {
        get: function () {
            return this.m_pageWidth;
        },
        set: function (pageWidth) {
            this.m_pageWidth = pageWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintSettings.prototype, "pageHeight", {
        get: function () {
            return this.m_pageHeight;
        },
        set: function (pageHeight) {
            this.m_pageHeight = pageHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintSettings.prototype, "isPortrait", {
        get: function () {
            return this.m_isPortrait;
        },
        set: function (isPortrait) {
            this.m_isPortrait = isPortrait;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintSettings.prototype, "isLandscape", {
        get: function () {
            return this.m_isLandscape;
        },
        set: function (isLandscape) {
            this.m_isLandscape = isLandscape;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintSettings.prototype, "multiplePage", {
        get: function () {
            return this.m_multiplePage;
        },
        set: function (multiplePage) {
            this.m_multiplePage = multiplePage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintSettings.prototype, "paperSize", {
        get: function () {
            return this.m_paperSize;
        },
        set: function (paperSize) {
            this.m_paperSize = paperSize;
            document.getElementById('printCustomSize').style.display = 'none';
            document.getElementById('printOrientation').style.display = 'none';
            if (paperSize === 'Custom') {
                document.getElementById('printCustomSize').style.display = '';
            }
            else {
                document.getElementById('printOrientation').style.display = '';
            }
        },
        enumerable: true,
        configurable: true
    });
    return PrintSettings;
}());

var PageSettings = (function () {
    function PageSettings() {
        this.pageWidth = 1056;
        this.pageHeight = 816;
        this.backgroundColor = '#ffffff';
        this.isPortrait = false;
        this.isLandscape = true;
        this.paperSize = 'Letter';
        this.pageBreaks = false;
    }
    return PageSettings;
}());

var ScrollSettings = (function () {
    function ScrollSettings() {
        this.currentZoom = '100%';
    }
    return ScrollSettings;
}());

var MindMapSettings = (function () {
    function MindMapSettings() {
        this.m_levelType = 'Level0';
        this.m_fill = 'white';
        this.m_stroke = 'white';
        this.m_strokeStyle = 'None';
        this.m_strokeWidth = 1;
        this.m_fontFamily = 'Arial';
        this.m_fontColor = '#ffffff';
    }
    Object.defineProperty(MindMapSettings.prototype, "levelType", {
        get: function () {
            return this.m_levelType;
        },
        set: function (levelType) {
            if (this.m_levelType !== levelType) {
                this.m_levelType = levelType;
                this.triggerPropertyChange('levelType', levelType);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MindMapSettings.prototype, "fill", {
        get: function () {
            return this.m_fill;
        },
        set: function (fill) {
            if (this.m_fill !== fill) {
                this.m_fill = fill;
                this.triggerPropertyChange('fill', fill);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MindMapSettings.prototype, "stroke", {
        get: function () {
            return this.m_stroke;
        },
        set: function (stroke) {
            if (this.m_stroke !== stroke) {
                this.m_stroke = stroke;
                this.triggerPropertyChange('stroke', stroke);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MindMapSettings.prototype, "strokeStyle", {
        get: function () {
            return this.m_strokeStyle;
        },
        set: function (strokeStyle) {
            if (this.m_strokeStyle !== strokeStyle) {
                this.m_strokeStyle = strokeStyle;
                this.triggerPropertyChange('strokeStyle', strokeStyle);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MindMapSettings.prototype, "strokeWidth", {
        get: function () {
            return this.m_strokeWidth;
        },
        set: function (strokeWidth) {
            if (this.m_strokeWidth !== strokeWidth) {
                this.m_strokeWidth = strokeWidth;
                this.triggerPropertyChange('strokeWidth', strokeWidth);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MindMapSettings.prototype, "opacity", {
        get: function () {
            return this.m_opacity;
        },
        set: function (opacity) {
            if (this.m_opacity !== opacity) {
                this.m_opacity = opacity;
                this.triggerPropertyChange('opacity', opacity);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MindMapSettings.prototype, "fontFamily", {
        get: function () {
            return this.m_fontFamily;
        },
        set: function (fontFamily) {
            if (this.m_fontFamily !== fontFamily) {
                this.m_fontFamily = fontFamily;
                this.triggerPropertyChange('fontFamily', fontFamily);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MindMapSettings.prototype, "fontSize", {
        get: function () {
            return this.m_fontSize;
        },
        set: function (fontSize) {
            if (this.m_fontSize !== fontSize) {
                this.m_fontSize = fontSize;
                this.triggerPropertyChange('fontSize', fontSize);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MindMapSettings.prototype, "fontColor", {
        get: function () {
            return this.m_fontColor;
        },
        set: function (fontColor) {
            if (this.m_fontColor !== fontColor) {
                this.m_fontColor = fontColor;
                this.triggerPropertyChange('fontColor', fontColor);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MindMapSettings.prototype, "textOpacity", {
        get: function () {
            return this.m_textOpacity;
        },
        set: function (textOpacity) {
            if (this.m_textOpacity !== textOpacity) {
                this.m_textOpacity = textOpacity;
                this.triggerPropertyChange('textOpacity', textOpacity);
            }
        },
        enumerable: true,
        configurable: true
    });

    MindMapSettings.prototype.triggerPropertyChange = function (propertyName, propertyValue) {
        if (!ej.base.isNullOrUndefined(this.propertyChange)) {
            this.propertyChange.call(this, { propertyName: propertyName, propertyValue: propertyValue });
        }
    };

    return MindMapSettings;
}());

var OrgDataSettings = (function () {
    function OrgDataSettings() {
        this.dataSourceColumns = [];
        this.id = '';
        this.parent = '';
        this.nameField = '';
        this.bindingFields = [];
        this.imageField = '';
        this.additionalFields = [];
        this.fileformat = '';
        this.extensionType = '.csv';
        this.buttonContent = 'Download Example CSV';
    }
    return OrgDataSettings;
}());

var SelectorViewModel = (function () {
    function SelectorViewModel() {
        this.selectedDiagram = null;
        this.isCopyLayoutElement = false;
        this.currentDiagramName = '';
        this.preventPropertyChange = false;
        this.isModified = false;
        this.uniqueId = null;
        this.preventSelectionChange = false;
        this.pasteData = [];
        this.isLoading = false;
        this.isTemplateLoad = false;
        this.nodeProperties = new NodeProperties();
        this.textProperties = new TextProperties();
        this.connectorProperties = new ConnectorProperties();
        this.exportSettings = new ExportSettings();
        this.printSettings = new PrintSettings();
        this.pageSettings = new PageSettings();
        this.utilityMethods = new UtilityMethods();
        this.mindmapSettings = new MindMapSettings();
        this.orgDataSettings = new OrgDataSettings();
        this.scrollSettings = new ScrollSettings();
        this.customContextMenu = new CustomContextMenuItems();
        this.nodeProperties.propertyChange = this.nodePropertyChange.bind(this);
        this.connectorProperties.propertyChange = this.connectorPropertyChange.bind(this);
        this.textProperties.propertyChange = this.textPropertyChange.bind(this);
        this.mindmapSettings.propertyChange = this.mindMapPropertyChange.bind(this);
    }
    SelectorViewModel.prototype.randomIdGenerator = function () {
        return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
    };
    SelectorViewModel.prototype.getAbsolutePath = function () {
        return window.location.pathname;
    };
    SelectorViewModel.prototype.nodePropertyChange = function (args) {
        if (!selectedItem.preventPropertyChange) {
            var diagram = selectedItem.selectedDiagram;
            if (diagram) {
                if (diagram.selectedItems.nodes.length > 0) {
                    var selectedNodes = diagram.selectedItems.nodes;
                    for (var i = 0; i < selectedNodes.length; i++) {
                        var node = selectedNodes[i];
                        var propertyName1 = args.propertyName.toString().toLowerCase();
                        switch (propertyName1) {
                            case 'offsetx':
                                node.offsetX = document.getElementById('nodeOffsetX').ej2_instances[0].value;
                                break;
                            case 'offsety':
                                node.offsetY = document.getElementById('nodeOffsetY').ej2_instances[0].value;
                                break;
                            case 'width':
                                node.width =document.getElementById('nodeWidth').ej2_instances[0].value;
                                break;
                            case 'height':
                                node.height = document.getElementById('nodeHeight').ej2_instances[0].value;
                                break;
                            case 'rotateangle':
                                node.rotateAngle =document.getElementById('nodeRotateAngle').ej2_instances[0].value;
                                break;
                            case 'aspectratio':
                                // node.constraints = node.constraints ^ ej.diagrams.NodeConstraints.AspectRatio;
                                node.constraints = node.constraints ^ ej.diagrams.NodeConstraints.AspectRatio;
                                break;
                        }
                        if (!node.children) {
                            this.applyNodeStyle(propertyName1, node, args.propertyValue);
                        }
                        else {
                            for (var j = 0; j < node.children.length; j++) {
                                this.applyNodeStyle(propertyName1, diagram.getObject(node.children[j]), args.propertyValue);
                            }
                        }
                    }
                    this.isModified = true;
                }
                if (diagram.connectors.length > 0) {
                    var selectedNodes = diagram.selectedItems.connectors;
                    for (var i = 0; i < selectedNodes.length; i++) {
                        switch (args.propertyName.toString().toLowerCase()) {
                            case 'strokecolor':
                               document.getElementById('lineColor').ej2_instances[0].value= this.getColor(document.getElementById('nodeStrokeColor').ej2_instances[0].value);
                               SelectorViewModel.prototype.connectorPropertyChange({ propertyName: 'lineColor', propertyValue: args });
                               break;
                            case 'strokewidth':
                                document.getElementById('lineWidth').ej2_instances[0].value = document.getElementById('nodeStrokeWidth').ej2_instances[0].value;
                                break;
                            case 'strokestyle':
                                document.getElementById('lineStyle').ej2_instances[0].value = document.getElementById('nodeBorderStyle').ej2_instances[0].value;
                                break;
                            case 'opacity':
                                document.getElementById('default1').ej2_instances[0].value =  document.getElementById('nodeOpacitySlider').ej2_instances[0].value;
                                break;
                        }
                    }
                    diagram.dataBind();
                    this.isModified = true;
                }
            }
        }
    };
    SelectorViewModel.prototype.applyNodeStyle = function (propertyName, node, value) {
        var addInfo = node.addInfo || {};
        switch (propertyName) {
            case 'fillcolor':
                node.style.fill = SelectorViewModel.prototype.getColor(value);
                if (value && value.checked) {
                    NodeProperties.prototype.getGradient(node);
                }
                break;
            case 'strokecolor':
                node.style.strokeColor = SelectorViewModel.prototype.getColor(document.getElementById('nodeStrokeColor').ej2_instances[0].value);
                break;
            case 'strokewidth':
                node.style.strokeWidth =document.getElementById('nodeStrokeWidth').ej2_instances[0].value ;
                break;
            case 'strokestyle':
                node.style.strokeDashArray = document.getElementById('nodeBorderStyle').ej2_instances[0].value;
                break;
            case 'opacity':
                node.style.opacity =  document.getElementById('nodeOpacitySlider').ej2_instances[0].value / 100;
                document.getElementById("nodeOpacitySliderText").value = document.getElementById('nodeOpacitySlider').ej2_instances[0].value + '%';
                break;
            case 'gradient':
                if (value && !value.checked) {
                    node.style.gradient.type = 'None';
                }
                else {
                    NodeProperties.prototype.getGradient(node);
                }
                break;
            case 'gradientdirection':
            case 'gradientcolor':
                NodeProperties.prototype.getGradient(node);
                break;
        }
    };
    SelectorViewModel.prototype.connectorPropertyChange = function (args) {
        if (!selectedItem.preventPropertyChange) {
            var diagram = selectedItem.selectedDiagram;
            if (diagram && diagram.selectedItems.connectors.length > 0) {
                var selectedNodes = diagram.selectedItems.connectors;
                for (var i = 0; i < selectedNodes.length; i++) {
                    var connector = selectedNodes[i];
                    switch (args.propertyName.toString().toLowerCase()) {
                        case 'linecolor':
                            connector.style.strokeColor =this.getColor(document.getElementById('lineColor').ej2_instances[0].value);
                            connector.sourceDecorator.style = { fill: connector.style.strokeColor, strokeColor: connector.style.strokeColor };
                            connector.targetDecorator.style = { fill: connector.style.strokeColor, strokeColor: connector.style.strokeColor };
                            break;
                        case 'linewidth':
                            connector.style.strokeWidth =document.getElementById('lineWidth').ej2_instances[0].value;
                            if (connector.sourceDecorator.style) {
                                connector.sourceDecorator.style.strokeWidth = connector.style.strokeWidth;
                            }
                            else {
                                connector.sourceDecorator.style = { strokeWidth: connector.style.strokeWidth };
                            }
                            if (connector.targetDecorator.style) {
                                connector.targetDecorator.style.strokeWidth = connector.style.strokeWidth;
                            }
                            else {
                                connector.targetDecorator.style = { strokeWidth: connector.style.strokeWidth };
                            }
                            break;
                        case 'linestyle':
                            connector.style.strokeDashArray =document.getElementById('lineStyle').ej2_instances[0].value;
                            break;
                        case 'linetype':
                            connector.type = document.getElementById('lineTypeDropdown').ej2_instances[0].value;
                            break;
                        case 'sourcetype':
                            connector.sourceDecorator.shape = document.getElementById('sourceType').ej2_instances[0].value;
                            break;
                        case 'targettype':
                            connector.targetDecorator.shape =document.getElementById('targetType').ej2_instances[0].value;
                            break;
                        case 'sourcesize':
                            connector.sourceDecorator.width = connector.sourceDecorator.height = document.getElementById('sourceSize').ej2_instances[0].value;
                            break;
                        case 'targetsize':
                            connector.targetDecorator.width = connector.targetDecorator.height =document.getElementById('targetSize').ej2_instances[0].value;
                            break;
                        case 'opacity':
                            connector.style.opacity = document.getElementById('default1').ej2_instances[0].value / 100;
                            connector.targetDecorator.style.opacity = connector.style.opacity;
                            connector.sourceDecorator.style.opacity = connector.style.opacity;
                            document.getElementById("connectorOpacitySliderText").value = document.getElementById('default1').ej2_instances[0].value + '%';
                            break;
                        case 'linejump':
                            if (args.propertyValue.checked) {
                                connector.constraints = connector.constraints | ej.diagrams.ConnectorConstraints.Bridging;
                            }
                            else {
                                connector.constraints = connector.constraints & ~ej.diagrams.ConnectorConstraints.Bridging;
                            }
                            break;
                        case 'linejumpsize':
                            connector.bridgeSpace = document.getElementById('lineJumpSize').ej2_instances[0].value;
                            break;
                    }
                }
                diagram.dataBind();
                this.isModified = true;
            }
        }
    };
    SelectorViewModel.prototype.textPropertyChange = function (args) {
        if (!selectedItem.preventPropertyChange) {
            var diagram = selectedItem.selectedDiagram;
            if (diagram) {
                var selectedObjects = diagram.selectedItems.nodes;
                selectedObjects = selectedObjects.concat(diagram.selectedItems.connectors);
                var propertyName = args.propertyName.toString().toLowerCase();
                if (selectedObjects.length > 0) {
                    for (var i = 0; i < selectedObjects.length; i++) {
                        var node = selectedObjects[i];
                        if (node instanceof ej.diagrams.Node || node instanceof ej.diagrams.Connector) {
                            if (node.annotations.length > 0) {
                                for (var j = 0; j < node.annotations.length; j++) {
                                    var annotation = node.annotations[j].style;
                                    this.updateTextProperties(propertyName, annotation);
                                }
                            }
                            else if (node.shape && node.shape.type === 'Text') {
                                this.updateTextProperties(propertyName, node.style);
                            }
                        }
                    }
                    diagram.dataBind();
                    this.isModified = true;
                }
            }
        }
    };
    SelectorViewModel.prototype.updateTextProperties = function (propertyName, annotation) {
        switch (propertyName) {
            case 'fontfamily':
                annotation.fontFamily =document.getElementById('fontFamily').ej2_instances[0].value;
                break;
            case 'fontsize':
                annotation.fontSize = document.getElementById('fontSizeTextProperties').ej2_instances[0].value;
                break;
            case 'fontcolor':
                annotation.color = SelectorViewModel.prototype.getColor(document.getElementById('textColor').ej2_instances[0].value );
                break;
            case 'opacity':
                annotation.opacity = document.getElementById('opacityTextSlider').ej2_instances[0].value / 100;
                document.getElementById("textOpacityText").value = document.getElementById('opacityTextSlider').ej2_instances[0].value + '%';
                break;
        }
    };
    SelectorViewModel.prototype.mindMapPropertyChange = function (args) {
        if (!selectedItem.preventPropertyChange) {
            var diagram = selectedItem.selectedDiagram;
            if (diagram && diagram.nodes.length > 0) {
                for (var i = 0; i < diagram.nodes.length; i++) {
                    var node = diagram.nodes[i];
                    if (node.addInfo) {
                        var addInfo = node.addInfo;
                        var levelType = document.getElementById('mindMapLevels').ej2_instances[0].value;
                        if ('Level' + addInfo.level === levelType || addInfo.level === levelType) {
                            switch (args.propertyName.toString().toLowerCase()) {
                                case 'fill':
                                    node.style.fill = this.getColor( document.getElementById('mindmapFill').ej2_instances[0].value);
                                    break;
                                case 'stroke':
                                    node.style.strokeColor = this.getColor(document.getElementById('mindmapStroke').ej2_instances[0].value);
                                    if (node.inEdges.length > 0) {
                                        var connector = MindMapUtilityMethods.getConnector(diagram.connectors, node.inEdges[0]);
                                        connector.style.strokeColor = node.style.strokeColor;
                                    }
                                    break;
                                case 'strokewidth':
                                    node.style.strokeWidth = document.getElementById('mindmapStrokeWidth').ej2_instances[0].value;
                                    if (node.inEdges.length > 0) {
                                        var connector1 = MindMapUtilityMethods.getConnector(diagram.connectors, node.inEdges[0]);
                                        connector1.style.strokeWidth =document.getElementById('mindmapStrokeWidth').ej2_instances[0].value;
                                    }
                                    break;
                                case 'strokestyle':
                                    node.style.strokeDashArray = document.getElementById('strokeStyle').ej2_instances[0].value;
                                    if (node.inEdges.length > 0) {
                                        var connector2 = MindMapUtilityMethods.getConnector(diagram.connectors, node.inEdges[0]);
                                        connector2.style.strokeDashArray = document.getElementById('strokeStyle').ej2_instances[0].value;
                                    }
                                    break;
                                case 'opacity':
                                    node.style.opacity =document.getElementById('mindmapOpacitySlider').ej2_instances[0].value / 100;
                                    document.getElementById("mindmapOpacityText").value = document.getElementById('mindmapOpacitySlider').ej2_instances[0].value + '%';
                                    break;
                                default:
                                    SelectorViewModel.prototype.updateMindMapTextStyle(node, args.propertyName.toString().toLowerCase());
                                    break;
                            }
                        }
                    }
                    diagram.dataBind();
                    this.isModified = true;
                }
            }
        }
    };
    SelectorViewModel.prototype.updateMindMapTextStyle = function (node, propertyName) {
        var diagram = selectedItem.selectedDiagram;
        if (node.addInfo && node.annotations.length > 0) {
            var annotation = node.annotations[0].style;
            switch (propertyName) {
                case 'fontfamily':
                    annotation.fontFamily = document.getElementById('mindmapFontFamilyList').ej2_instances[0].value;
                    break;
                case 'fontsize':
                    annotation.fontSize = document.getElementById('mindmapFontSize').ej2_instances[0].value;
                    break;
                case 'fontcolor':
                    annotation.color = this.getColor( document.getElementById('mindmapTextColor').ej2_instances[0].value);
                    break;
                case 'textopacity':
                    annotation.opacity =document.getElementById('mindmapTextOpacitySlider').ej2_instances[0].value / 100;
                    document.getElementById("textOpacity").value = document.getElementById('mindmapTextOpacitySlider').ej2_instances[0].value + '%';
                    break;
            }
        }
        diagram.dataBind();
        this.isModified = true;
    };
    SelectorViewModel.prototype.getColor = function (colorName) {
        if (window.navigator.msSaveBlob && colorName.length === 9) {
            return colorName.substring(0, 7);
        }
        return colorName;
    };
    return SelectorViewModel;
}());