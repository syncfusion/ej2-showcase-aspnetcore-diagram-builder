using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace SyncfusionWebApp3.Models
{
    public class DropDownDataModel
    {
        public object fileData(){
            List<object> filemenuitems = new List<object>();
            filemenuitems.Add(new
            {
                text = "New",
            });
            filemenuitems.Add(new
            {
                text = "Open",
            });
            filemenuitems.Add(new
            {
                separator= true 
            });
            filemenuitems.Add(new
            {
                text = "Save",
                iconCss= "sf-icon-Save"
            });
            filemenuitems.Add(new
            {
                text = "Save As",
            });
            filemenuitems.Add(new
            {
                text = "Export",
                iconCss= "sf-icon-Export"
            });
            filemenuitems.Add(new
            {
                separator= true 
            });
            filemenuitems.Add(new
            {
                text = "Print",
                iconCss="sf-icon-Print" 
            });
           return filemenuitems;
        }
        public object editData(){
            List<object> editmenuitems = new List<object>();
            editmenuitems.Add(new
            {
                text = "Undo",
                iconCss= "sf-icon-Undo"
            });
            editmenuitems.Add(new
            {
                text = "Redo",
                iconCss= "sf-icon-Redo"
            });
            editmenuitems.Add(new
            {
                separator= true 
            });
            editmenuitems.Add(new
            {
                text = "Cut",
                iconCss= "sf-icon-Cut"
            });
            editmenuitems.Add(new
            {
                text = "Copy",
                iconCss= "sf-icon-Copy"
            });
            editmenuitems.Add(new
            {
                text = "Paste",
                iconCss= "sf-icon-Paste"
            });
            editmenuitems.Add(new
            {
                text = "Delete",
                iconCss= "sf-icon-Delete"
            });
            editmenuitems.Add(new
            {
                separator= true 
            });
            editmenuitems.Add(new
            {
                text = "Duplicate",
            });
            editmenuitems.Add(new
            {
                separator= true 
            });
            editmenuitems.Add(new
            {
                text = "Edit Tooltip",
            });
            editmenuitems.Add(new
            {
                separator= true 
            });
            editmenuitems.Add(new
            {
                text = "Select All",
            });
            return  editmenuitems;
        }
        public object viewData(){
            List<object> viewmenuitems = new List<object>();
            viewmenuitems.Add(new
            {
                text = "Zoom In",
                iconCss= "sf-icon-ZoomIn"
            });
            viewmenuitems.Add(new
            {
                text = "Zoom Out",
                iconCss= "sf-icon-ZoomOut"
            });
            viewmenuitems.Add(new
            {
                separator= true 
            });
            viewmenuitems.Add(new
            {
                text = "Fit To Screen",
            });
            viewmenuitems.Add(new
            {
                separator= true 
            });
            viewmenuitems.Add(new
            {
                text = "Show Rulers",
            });
            viewmenuitems.Add(new
            {
                text = "Show Guides",
                iconCss= "sf-icon-Selection"
            });
            viewmenuitems.Add(new
            {
                text = "Show Grid",
                iconCss= "sf-icon-Selection"
            });
            viewmenuitems.Add(new
            {
                separator= true 
            });
            viewmenuitems.Add(new
            {
                text = "Snap To Grid",
            });
            return viewmenuitems;
        }
        public object arrangeData(){
            List<object> arrangemenuitems = new List<object>();
            arrangemenuitems.Add(new
            {
                text = "Send To Back",
                iconCss= "sf-icon-Sendback"
            });
            arrangemenuitems.Add(new
            {
                text = "Bring To Front",
                iconCss= "sf-icon-BringFront"
            });
            arrangemenuitems.Add(new
            {
                text = "Send Backward",
                iconCss= "sf-icon-SendBackward"
            });
            arrangemenuitems.Add(new
            {
                text = "Bring Forward",
                iconCss= "sf-icon-BringForward"
            });
            arrangemenuitems.Add(new
            {
                separator= true 
            });
            arrangemenuitems.Add(new
            {   
                text = "Align Objects",
                items = new List<object>()
                        {
                            new { text = "Left", iconCss= "sf-icon-AlignLeft" },
                            new { text = "Right", iconCss= "sf-icon-AlignRight" },
                            new { text = "Center", iconCss= "sf-icon-AlignHorizontally" },
                            new { text = "Top", iconCss= "sf-icon-AilgnTop" },
                            new { text = "Bottom", iconCss= "sf-icon-AlignBottom" },
                            new { text = "Middle", iconCss= "sf-icon-AlignVertically" },
                        }
            });
            arrangemenuitems.Add(new
            {   
                text = "Distribute Objects'",
                items = new List<object>()
                        {
                            new { text = "Horizontally", iconCss= "sf-icon-DistributeHorizontal" },
                            new { text = "Vertically", iconCss= "sf-icon-DistributeVertical" },
                        }
            });
            arrangemenuitems.Add(new
            {   
                text = "Match Size",
                items = new List<object>()
                        {
                            new { text = "Both Width and Height"},
                            new { text = "Width"},
                            new { text = "Height"},
                        }
            });
            arrangemenuitems.Add(new
            {
                separator= true 
            });
            arrangemenuitems.Add(new
            {
                text = "Lock"
            });
            arrangemenuitems.Add(new
            {
                text = "Unlock"
            });
            arrangemenuitems.Add(new
            {
                separator= true 
            });
            arrangemenuitems.Add(new
            {
                text = "Group"
            });
            arrangemenuitems.Add(new
            {
                text = "Ungroup"
            });
            return arrangemenuitems;
        }
        public object windowData(){
            List<object> windowmenuitems = new List<object>();
            windowmenuitems.Add(new
            {
                text = "Show Toolbar",
                iconCss= "sf-icon-Selection"
            });
            windowmenuitems.Add(new
            {
                text = "Show Stencil",
                iconCss= "sf-icon-Selection"
            });
            windowmenuitems.Add(new
            {
                text = "Show Properties",
                iconCss= "sf-icon-Selection"
            });
            windowmenuitems.Add(new
            {
                text = "Show Layers"
            });
              windowmenuitems.Add(new
            {
                text = "Show Pager",
                iconCss= "sf-icon-Selection"
            });
            windowmenuitems.Add(new
            {
                text = "Themes"
            });
           return  windowmenuitems;
        }
        public object helpData(){
            List<object>  helpmenuitems = new List<object>();
            helpmenuitems.Add(new
            {
                text = "Keyboard Shortcuts"
            });
            helpmenuitems.Add(new
            {
                text = "Documentation"
            });
       
           return  helpmenuitems;
        }
         public object zoomMenuItems(){
            List<object> zoomMenuItems= new List<object>();
            zoomMenuItems.Add(new
            {
                text = "400%"
            });
            zoomMenuItems.Add(new
            {
                text = "300%"
            });
            zoomMenuItems.Add(new
            {
                text = "200%"
            });
            zoomMenuItems.Add(new
            {
                text = "300%"
            });
            zoomMenuItems.Add(new
            {
                text = "150%"
            });
            zoomMenuItems.Add(new
            {
                text = "100%"
            });
            zoomMenuItems.Add(new
            {
                text = "75%"
            });
            zoomMenuItems.Add(new
            {
                text = "50%"
            });
            zoomMenuItems.Add(new
            {
                text = "25%"
            });
            zoomMenuItems.Add(new
            {
               separator= true 
            });
            zoomMenuItems.Add(new
            {
                text = "Fit To Screen"
            });
           return  zoomMenuItems;
        }
        public object drawShapesList(){
            List<object>drawShapesList = new List<object>();
            drawShapesList.Add(new
            {
                text = "Rectangle",
                iconCss= "sf-icon-Square"
            });
            drawShapesList.Add(new
            {
                text = "Ellipse",
                iconCss= "sf-icon-Ellipse"
            });
            drawShapesList.Add(new
            {
                text = "Polygon",
                iconCss= "sf-icon-Triangle"
            });

            return drawShapesList;
        }
        public object drawConnectorsList(){
            List<object>drawConnectorsList = new List<object>();
            drawConnectorsList.Add(new
            {
                text = "Straight Line",
                iconCss= "sf-icon-StraightLine"
            });
            drawConnectorsList.Add(new
            {
                text = "Orthogonal Line",
                iconCss= "sf-icon-ConnectorMode"
            });
            drawConnectorsList.Add(new
            {
                text = "Bezier",
                iconCss= "sf-icon-BeizerLine"
            });

            return drawConnectorsList;
        }
        public object orderCommandsList(){
            List<object>orderCommandsList = new List<object>();
            orderCommandsList.Add(new
            {
                text = "Send To Back",
                iconCss= "sf-icon-Sendback"
            });
            orderCommandsList.Add(new
            {
                text = "Bring To Front",
                iconCss= "sf-icon-BringFront"
            });
            orderCommandsList.Add(new
            {
                text = "Send Backward",
                iconCss= "sf-icon-SendBackward"
            });
            orderCommandsList.Add(new
            {
                text = "Bring Forward",
                iconCss= "sf-icon-BringForward"
            });

            return orderCommandsList;
        }
        public object paperList(){
            List<object>paperList= new List<object>();
            paperList.Add(new
            {
                text = "Letter (8.5 in x 11 in)",
                value="Letter"
            });
            paperList.Add(new
            {
                text = "Legal (8.5 in x 14 in)",
                value="Legal"
            });
            paperList.Add(new
            {
                text = "Tabloid (279 mm x 432 mm)",
                value="Tabloid"
            });

            paperList.Add(new
            {
                text = "A3 (297 mm x 420 mm)",
                value="A3"
            });
            paperList.Add(new
            {
                text = "A4 (210 mm x 297 mm)",
                value="A4"
            });
            paperList.Add(new
            {
                text = "A5 (148 mm x 210 mm)",
                value="A5"
            });
            paperList.Add(new
            {
                text = "A6 (105 mm x 148 mm)",
                value="A6"
            });
            paperList.Add(new
            {
                text = "Custom",
                value="Custom"
            });
           return  paperList;
        }
        public object gradientDirections(){
            List<object>gradientDirections= new List<object>();
            gradientDirections.Add(new
            {
                text = "BottomToTop",
                value="BottomToTop"
            });
            gradientDirections.Add(new
            {
                text = "TopToBottom",
                value="TopToBottom"
            });
            gradientDirections.Add(new
            {
                text = "RightToLeft",
                value="RightToLeft"
            });
            gradientDirections.Add(new
            {
                text = "LeftToRight",
                value="LeftToRight"
            });
       
           return  gradientDirections;
        }
        public object borderStyles(){
            List<object>borderStyles= new List<object>();
            borderStyles.Add(new
            {
                text = "None",
                value="None",
                className="ddl-svg-style ddl_linestyle_none"
            });
            borderStyles.Add(new
            {
                text = "1,2",
                value="1,2",
                className="ddl-svg-style ddl_linestyle_one_two"
            });
            borderStyles.Add(new
            {
                text = "3,3",
                value="3,3",
                className="ddl-svg-style ddl_linestyle_three_three"
            });
            borderStyles.Add(new
            {
                text = "5,3",
                value="5,3",
                className="ddl-svg-style ddl_linestyle_five_three"
            });
            borderStyles.Add(new
            {
                text = "4,4,1",
                value="4,4,1",
                className="ddl-svg-style ddl_linestyle_four_four_one"
            });
           return borderStyles;
        }
        public object fileFormats(){
            List<object>fileFormats= new List<object>();
            fileFormats.Add(new
            {
                text = "JPG",
                value="JPG"
            });
            fileFormats.Add(new
            {
                text = "PNG",
                value="PNG"
            });
            fileFormats.Add(new
            {
                text = "BMP",
                value="BMP"
            });
            fileFormats.Add(new
            {
                text = "SVG",
                value="SVG"
            });
       
           return  fileFormats;
        }
        public object diagramRegions(){
            List<object>diagramRegions= new List<object>();
            diagramRegions.Add(new
            {
                text = "Content",
                value="Content"
            });
            diagramRegions.Add(new
            {
                text = "PageSettings",
                value="PageSettings"
            });
           return  diagramRegions;
        }
        public object lineTypes(){
            List<object>lineTypes= new List<object>();
            lineTypes.Add(new
            {
                text = "Straight",
                value="Straight"
            });
            lineTypes.Add(new
            {
                text = "Orthogonal",
                value="Orthogonal"
            });
            lineTypes.Add(new
            {
                text = "Bezier",
                value="Bezier"
            });
           return  lineTypes;
        }
        public object decoratorList(){
            List<object>decoratorList= new List<object>();
            decoratorList.Add(new
            {
                text = "None",
                value="None"
            });
            decoratorList.Add(new
            {
                text = "Arrow",
                value="Arrow"
            });
            decoratorList.Add(new
            {
                text = "Diamond",
                value="Diamond"
            });
            decoratorList.Add(new
            {
                text = "OpenArrow",
                value="OpenArrow"
            });
            decoratorList.Add(new
            {
                text = "Circle",
                value="Circle"
            });
            decoratorList.Add(new
            {
                text = "Square",
                value="Square"
            });
            decoratorList.Add(new
            {
                text = "Fletch",
                value="Fletch"
            });
            decoratorList.Add(new
            {
                text = "OpenFetch",
                value="OpenFetch"
            });
            decoratorList.Add(new
            {
                text = "IndentedArrow",
                value="IndentedArrow"
            });
            decoratorList.Add(new
            {
                text = "OutdentedArrow",
                value="OutdentedArrow"
            });
            decoratorList.Add(new
            {
                text = "DoubleArrow",
                value="DoubleArrow"
            });
           return  decoratorList;
        }
        public object fontFamilyList(){
            List<object>fontFamilyList= new List<object>();
            fontFamilyList.Add(new
            {
                text = "Arial",
                value="Arial"
            });
            fontFamilyList.Add(new
            {
                text = "Aharoni",
                value="Aharoni"
            });
            fontFamilyList.Add(new
            {
                text = "Bell MT",
                value="Bell MT"
            });
            fontFamilyList.Add(new
            {
                text = "Fantasy",
                value="Fantasy"
            });
            fontFamilyList.Add(new
            {
                text = "Times New Roman",
                value="Times New Roman"
            });
            fontFamilyList.Add(new
            {
                text = "Segoe UI",
                value="Segoe UI"
            });
            fontFamilyList.Add(new
            {
                text = "Verdana",
                value="Verdana"
            });
           return  fontFamilyList;
        }
        public object textPosition(){
            List<object>textPosition= new List<object>();
            textPosition.Add(new
            {
                text = "TopLeft",
                value="TopLeft"
            });
            textPosition.Add(new
            {
                text = "TopCenter",
                value="TopCenter"
            });
            textPosition.Add(new
            {
                text = "TopRight",
                value="TopRight"
            });
            textPosition.Add(new
            {
                text = "Center",
                value="Center"
            });
            textPosition.Add(new
            {
                text = "MiddleRight",
                value="MiddleRight"
            });
            textPosition.Add(new
            {
                text = "BottomLeft",
                value="BottomLeft"
            });
            textPosition.Add(new
            {
                text = "BottomCenter",
                value="BottomCenter"
            });
            textPosition.Add(new
            {
                text = "BottomRight",
                value="BottomRight"
            });
           return  textPosition;
        }
        public object mindmapLevels(){
            List<object>mindmapLevels= new List<object>();
            mindmapLevels.Add(new
            {
                text = "Root",
                value="Level0"
            });
            mindmapLevels.Add(new
            {
                text = "Level1",
                value="Level1"
            });
            mindmapLevels.Add(new
            {
                text = "Level2",
                value="Level2"
            });
            mindmapLevels.Add(new
            {
                text = "Level3",
                value="Level3"
            });
            mindmapLevels.Add(new
            {
                text = "Level4",
                value="Level4"
            });
            mindmapLevels.Add(new
            {
                text = "Level5",
                value="Level5"
            });
           return  mindmapLevels;
        }
        public object listViewData(){
            List<object>listViewData= new List<object>();
            listViewData.Add(new
            {
                text = "Flow",
                id="flowShapes",
                Checked=true
            });
            listViewData.Add(new
            {
                text = "Basic",
                id="basicShapes",
                Checked=true
            });
            listViewData.Add(new
            {
                text = "BPMN",
                id="bpmnShapes",
                Checked=true
            });
            listViewData.Add(new
            {
                text = "Connectors",
                id="connectorsShapes",
                Checked=true
            });
            listViewData.Add(new
            {
                text = "Electrical",
                id="electricalShapes",
                Checked=false
            });
            listViewData.Add(new
            {
                text = "Network",
                id="networkShapes",
                Checked=false
            });
            listViewData.Add(new
            {
                text = "Floorplan",
                id="floorShapes",
                Checked=false
            });
           return  listViewData;
        }
    }
}
