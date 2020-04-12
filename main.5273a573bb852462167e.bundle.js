(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{269:function(module,exports,__webpack_require__){module.exports=__webpack_require__.p+"static/media/tweet-author.9bb2fc8f.jpg"},273:function(module,exports,__webpack_require__){__webpack_require__(274),__webpack_require__(420),module.exports=__webpack_require__(421)},338:function(module,exports){},421:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){var _storybook_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(268);module._StorybookPreserveDecorators=!0,Object(_storybook_react__WEBPACK_IMPORTED_MODULE_0__.configure)([__webpack_require__(613)],module)}.call(this,__webpack_require__(422)(module))},613:function(module,exports,__webpack_require__){var map={"./index.stories.js":617};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id=613},617:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"Default",(function(){return Default})),__webpack_require__.d(__webpack_exports__,"WithInitialPosition",(function(){return WithInitialPosition})),__webpack_require__.d(__webpack_exports__,"WithDragHandle",(function(){return WithDragHandle})),__webpack_require__.d(__webpack_exports__,"WithTrackPosition",(function(){return WithTrackPosition})),__webpack_require__.d(__webpack_exports__,"WithAxis",(function(){return WithAxis})),__webpack_require__.d(__webpack_exports__,"WithBounds",(function(){return WithBounds})),__webpack_require__.d(__webpack_exports__,"WithMouseEvents",(function(){return WithMouseEvents})),__webpack_require__.d(__webpack_exports__,"WithDirectionLimits",(function(){return WithDirectionLimits}));var taggedTemplateLiteral=__webpack_require__(83),react=__webpack_require__(0),react_default=__webpack_require__.n(react);const INITIAL_STATE={position:null,isPressed:!1,isDragging:!1,isDragStopped:!1};function reducer(state,action){switch(action.type){case"MOUSE_DOWN":return{...state,isPressed:!0,isDragStopped:!1,position:action.payload};case"MOUSE_UP":return{...state,isPressed:!1,isDragging:!1,isDragStopped:state.isDragging};case"MOUSE_MOVE":return state.isPressed?{...state,isDragging:!0,position:action.payload}:state;default:throw new Error("Unexpected action was dispatched")}}const INITIAL_STATE$1={currentPosition:{x:0,y:0},lastMousePosition:null};function reducer$1(state,action){switch(action.type){case"SET_INITIAL_POSITION":{const{x:x,y:y}=action.payload;return{...state,currentPosition:{x:x,y:y}}}case"UPDATE_POSITION":{const{axis:axis,mouseProps:mouseProps}=action.payload;if(!mouseProps.isPressed)return{...state,lastMousePosition:null};if(!state.lastMousePosition)return{...state,lastMousePosition:mouseProps.position};const xDelta=["x","both"].includes(axis)?mouseProps.position.x-state.lastMousePosition.x:0,yDelta=["y","both"].includes(axis)?mouseProps.position.y-state.lastMousePosition.y:0,currentPosition={x:state.currentPosition.x+xDelta,y:state.currentPosition.y+yDelta};return{...state,currentPosition:currentPosition,lastMousePosition:mouseProps.position}}default:throw new Error("Unexpected action was dispatched")}}function calculateSpacing(elem,direction){const paddingD="padding"+direction,borderD="border"+direction;return(Number(window.getComputedStyle(elem)[borderD].split(/\D+/)[0])||0)+(Number(window.getComputedStyle(elem)[paddingD].split(/\D+/)[0])||0)}const DEFAULT_PROPS={initialPosition:null,axis:"both",limit:null,onDragStart(){},onDrag(){},onDragStop(){}};var useDraggable_modern=function useDraggable(props){const{initialPosition:initialPosition,axis:axis,limit:limit}={...DEFAULT_PROPS,...props},ref=Object(react.useRef)(null),refHandle=Object(react.useRef)(null),refBound=Object(react.useRef)(null),mouseProps=function useMouseListener(ref){const[state,dispatch]=Object(react.useReducer)(reducer,INITIAL_STATE);return Object(react.useEffect)(()=>{function handleMouseDown(e){ref.current.contains(e.target)&&dispatch({type:"MOUSE_DOWN",payload:{x:e.clientX,y:e.clientY}})}function handleMouseUp(){dispatch({type:"MOUSE_UP"})}function hadleMouseMove(e){dispatch({type:"MOUSE_MOVE",payload:{x:e.clientX,y:e.clientY}})}return document.addEventListener("mousedown",handleMouseDown),document.addEventListener("mouseup",handleMouseUp),document.addEventListener("mousemove",hadleMouseMove),()=>{document.removeEventListener("mousedown",handleMouseDown),document.removeEventListener("mouseup",handleMouseUp),document.removeEventListener("mousemove",hadleMouseMove)}},[ref,dispatch]),state}(refHandle.current?refHandle:ref),position=function usePosition(ref,mouseProps,initialPosition,axis){const[state,dispatch]=Object(react.useReducer)(reducer$1,INITIAL_STATE$1);return Object(react.useEffect)(()=>{const payload=initialPosition||ref.current.getBoundingClientRect();dispatch({type:"SET_INITIAL_POSITION",payload:payload})},[ref,initialPosition]),Object(react.useEffect)(()=>dispatch({type:"UPDATE_POSITION",payload:{mouseProps:mouseProps,axis:axis}}),[mouseProps,axis]),state.currentPosition}(ref,mouseProps,initialPosition,axis),limitPosition=function useLimit(limit,initialPosition,position){return Object(react.useMemo)(()=>{if(!limit)return position;const minLeft=(initialPosition=initialPosition||{x:0,y:0}).x-limit.left,maxRight=initialPosition.x+limit.right,minTop=initialPosition.y-limit.top,maxBottom=initialPosition.y+limit.bottom;return{x:position.x<minLeft?minLeft:position.x>maxRight?maxRight:position.x,y:position.y<minTop?minTop:position.y>maxBottom?maxBottom:position.y}},[limit,initialPosition,position])}(limit,initialPosition,function useBounds(ref,refBound,position){const[bounds,setBounds]=Object(react.useState)({top:null,right:null,bottom:null,left:null});return Object(react.useEffect)(()=>{const domRefRect=ref.current.getBoundingClientRect(),width=domRefRect.right-domRefRect.left,height=domRefRect.bottom-domRefRect.top;if(refBound.current){const domBoundRect=refBound.current.getBoundingClientRect(),boundWidth=domBoundRect.right-domBoundRect.left,boundHeight=domBoundRect.bottom-domBoundRect.top,top=domBoundRect.top-domRefRect.top+calculateSpacing(refBound.current,"Top"),left=domBoundRect.left-domRefRect.left+calculateSpacing(refBound.current,"Left"),right=boundWidth-width-2*calculateSpacing(refBound.current,"Right"),bottom=boundHeight-height-2*calculateSpacing(refBound.current,"Bottom");setBounds({top:top,right:right,bottom:bottom,left:left})}},[ref,refBound]),Object(react.useMemo)(()=>{let{x:x,y:y}=position;return Object.values(bounds).every(val=>null===val)?position:(y<bounds.top&&(y=bounds.top),y>bounds.bottom&&(y=bounds.bottom),x<bounds.left&&(x=bounds.left),x>bounds.right&&(x=bounds.right),{x:x,y:y})},[position,bounds])}(ref,refBound,position));return Object(react.useEffect)(()=>{ref.current.style.transform=`translate(${limitPosition.x}px, ${limitPosition.y}px)`},[limitPosition]),{ref:ref,refHandle:refHandle,refBound:refBound,position:limitPosition,mouseProps:mouseProps}},styled_components_browser_esm=__webpack_require__(84),prop_types=__webpack_require__(26),prop_types_default=__webpack_require__.n(prop_types),tweet_author=__webpack_require__(269),tweet_author_default=__webpack_require__.n(tweet_author);function _templateObject(){const data=Object(taggedTemplateLiteral.a)(["\n  width: 500px;\n  background: #15202b;\n  cursor: ",";\n  display: flex;\n  align-items: flex-start;\n  padding: 1rem;\n  font-family: Arial, sans-serif;\n\n  > img {\n    pointer-events: none;\n    user-select: none;\n    width: 50px;\n    border-radius: 50px;\n  }\n\n  > div {\n    display: flex;\n    flex-direction: column;\n    justify-content: flex-start;\n    margin-left: 8px;\n    user-select: none;\n  }\n\n  .username {\n    display: flex;\n    color: white;\n\n    > * {\n      margin: 0 4px;\n      font-size: 15px;\n      color: rgb(136, 153, 166);\n    }\n\n    .name {\n      font-weight: bold;\n      margin-left: 0;\n    }\n\n    .middot {\n      text-align: center;\n      line-height: 10px;\n      font-weight: bold;\n      font-size: 18px;\n    }\n  }\n\n  .message {\n    color: white;\n    margin-top: 4px;\n  }\n"]);return _templateObject=function _templateObject(){return data},data}const StyledTweet=styled_components_browser_esm.a.article(_templateObject(),(function getCursorOfTweet(props){return props.isDraggable?"x"===props.axis?"e-resize":"y"===props.axis?"n-resize":"move":"default"})),Tweet=react_default.a.forwardRef((props,ref)=>react_default.a.createElement(StyledTweet,{ref:ref,isDraggable:props.isDraggable,axis:props.axis},react_default.a.createElement("img",{src:tweet_author_default.a,alt:"Tweet Author"}),react_default.a.createElement("div",null,react_default.a.createElement("div",{className:"username"},react_default.a.createElement("span",{className:"name"},"Ricardo JSX"),react_default.a.createElement("span",null,"@ricardo-jsx"),react_default.a.createElement("span",{className:"middot"},"."),react_default.a.createElement("span",null,"7h")),react_default.a.createElement("div",{className:"message"},props.message))));Tweet.propTypes={forwardedRef:prop_types_default.a.oneOfType([prop_types_default.a.func,prop_types_default.a.shape({current:prop_types_default.a.elementType})]),message:prop_types_default.a.oneOfType([prop_types_default.a.string,prop_types_default.a.node]).isRequired,isDraggable:prop_types_default.a.bool,axis:prop_types_default.a.oneOf(["both","x","y"])},Tweet.defaultProps={isDraggable:!0,axis:"both"},Tweet.__docgenInfo={description:"",methods:[],displayName:"Tweet",props:{isDraggable:{defaultValue:{value:"true",computed:!1},type:{name:"bool"},required:!1,description:""},axis:{defaultValue:{value:'"both"',computed:!1},type:{name:"enum",value:[{value:'"both"',computed:!1},{value:'"x"',computed:!1},{value:'"y"',computed:!1}]},required:!1,description:""},forwardedRef:{type:{name:"union",value:[{name:"func"},{name:"shape",value:{current:{name:"elementType",required:!1}}}]},required:!1,description:""},message:{type:{name:"union",value:[{name:"string"},{name:"node"}]},required:!0,description:""}}};var src_Tweet=Tweet;function _templateObject2(){const data=Object(taggedTemplateLiteral.a)(["\n  width: 700px;\n  height: 300px;\n  padding: 1rem;\n  border: 1px solid black;\n  margin-bottom: 1rem;\n"]);return _templateObject2=function _templateObject2(){return data},data}function index_stories_templateObject(){const data=Object(taggedTemplateLiteral.a)(["\n  cursor: pointer;\n\n  &:hover {\n    text-decoration: underline;\n  }\n"]);return index_stories_templateObject=function _templateObject(){return data},data}"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\Tweet.js"]={name:"Tweet",docgenInfo:Tweet.__docgenInfo,path:"src\\Tweet.js"});__webpack_exports__.default={title:"useDraggable"};const StyledHandle=styled_components_browser_esm.a.span(index_stories_templateObject()),StyledBounds=styled_components_browser_esm.a.div(_templateObject2());function Default(){const ref=useDraggable_modern().ref;return react_default.a.createElement(src_Tweet,{ref:ref,message:"You can drag me anywhere."})}function WithInitialPosition(){const initialPosition=Object(react.useMemo)(()=>({x:200,y:50}),[]),ref=useDraggable_modern({initialPosition:initialPosition}).ref;return react_default.a.createElement(src_Tweet,{ref:ref,message:"I have a start position of { x: 200, y: 50 } pixels."})}function WithDragHandle(){const _useDraggable3=useDraggable_modern(),ref=_useDraggable3.ref,refHandle=_useDraggable3.refHandle;return react_default.a.createElement(src_Tweet,{ref:ref,isDraggable:!1,message:react_default.a.createElement(react_default.a.Fragment,null,react_default.a.createElement("span",null,"You can only drag me clicking "),react_default.a.createElement(StyledHandle,{ref:refHandle},"here"),react_default.a.createElement("span",null,"."))})}function WithTrackPosition(){const _useDraggable4=useDraggable_modern(),ref=_useDraggable4.ref,position=_useDraggable4.position;return react_default.a.createElement(src_Tweet,{ref:ref,message:"I keep track of my position { x: ".concat(position.x,"px, y:").concat(position.y,"px}")})}function WithAxis(){const ref=useDraggable_modern({axis:"both"}).ref,refX=useDraggable_modern({axis:"x"}).ref,refY=useDraggable_modern({axis:"y"}).ref;return react_default.a.createElement("div",null,react_default.a.createElement(src_Tweet,{ref:ref,axis:"both",message:"I can be dragged me on both axis."}),react_default.a.createElement(src_Tweet,{ref:refX,axis:"x",message:"I can only be dragged horizontally."}),react_default.a.createElement(src_Tweet,{ref:refY,axis:"y",message:"I can only be dragged vertically."}))}function WithBounds(){const initialPosition=Object(react.useMemo)(()=>({x:0,y:0}),[]),_useDraggable8=useDraggable_modern({initialPosition:initialPosition}),ref=_useDraggable8.ref,refBound=_useDraggable8.refBound,position=_useDraggable8.position,_useDraggable9=useDraggable_modern({initialPosition:initialPosition}),refB=_useDraggable9.ref,refBoundB=_useDraggable9.refBound,positionB=_useDraggable9.position;return react_default.a.createElement(react_default.a.Fragment,null,react_default.a.createElement(StyledBounds,{ref:refBound},react_default.a.createElement(src_Tweet,{ref:ref,message:"I can only be dragged inside this box { x: ".concat(position.x,"px, y:").concat(position.y,"px}")})),react_default.a.createElement(StyledBounds,{ref:refBoundB},react_default.a.createElement(src_Tweet,{ref:refB,message:"I can only be dragged inside this box { x: ".concat(positionB.x,"px, y:").concat(positionB.y,"px}")})))}function WithMouseEvents(){const _useDraggable10=useDraggable_modern(),ref=_useDraggable10.ref,mouseProps=_useDraggable10.mouseProps;return react_default.a.createElement(src_Tweet,{ref:ref,message:react_default.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},react_default.a.createElement("span",null,"I listen to mouse actions."),react_default.a.createElement("span",null,"Pressed: ",mouseProps.isPressed?"Yes":"No"),react_default.a.createElement("span",null,"Dragging: ",mouseProps.isDragging?"Yes":"No"),react_default.a.createElement("span",null,"Drag Stoped: ",mouseProps.isDragStopped?"Yes":"No"))})}function WithDirectionLimits(){const initialPosition=Object(react.useMemo)(()=>({x:300,y:300}),[]),limit=Object(react.useMemo)(()=>({top:300,right:300,bottom:300,left:300}),[]),_useDraggable11=useDraggable_modern({initialPosition:initialPosition,limit:limit}),ref=_useDraggable11.ref,position=_useDraggable11.position;return react_default.a.createElement(src_Tweet,{ref:ref,message:react_default.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},react_default.a.createElement("span",null,"I can only be dragged 300px in any direction."),react_default.a.createElement("span",null,"{ x: ".concat(position.x,"px, y:").concat(position.y,"px}")))})}Default.__docgenInfo={description:"",methods:[],displayName:"Default"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\index.stories.js"]={name:"Default",docgenInfo:Default.__docgenInfo,path:"src\\index.stories.js"}),WithInitialPosition.__docgenInfo={description:"",methods:[],displayName:"WithInitialPosition"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\index.stories.js"]={name:"WithInitialPosition",docgenInfo:WithInitialPosition.__docgenInfo,path:"src\\index.stories.js"}),WithDragHandle.__docgenInfo={description:"",methods:[],displayName:"WithDragHandle"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\index.stories.js"]={name:"WithDragHandle",docgenInfo:WithDragHandle.__docgenInfo,path:"src\\index.stories.js"}),WithTrackPosition.__docgenInfo={description:"",methods:[],displayName:"WithTrackPosition"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\index.stories.js"]={name:"WithTrackPosition",docgenInfo:WithTrackPosition.__docgenInfo,path:"src\\index.stories.js"}),WithAxis.__docgenInfo={description:"",methods:[],displayName:"WithAxis"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\index.stories.js"]={name:"WithAxis",docgenInfo:WithAxis.__docgenInfo,path:"src\\index.stories.js"}),WithBounds.__docgenInfo={description:"",methods:[],displayName:"WithBounds"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\index.stories.js"]={name:"WithBounds",docgenInfo:WithBounds.__docgenInfo,path:"src\\index.stories.js"}),WithMouseEvents.__docgenInfo={description:"",methods:[],displayName:"WithMouseEvents"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\index.stories.js"]={name:"WithMouseEvents",docgenInfo:WithMouseEvents.__docgenInfo,path:"src\\index.stories.js"}),WithDirectionLimits.__docgenInfo={description:"",methods:[],displayName:"WithDirectionLimits"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\index.stories.js"]={name:"WithDirectionLimits",docgenInfo:WithDirectionLimits.__docgenInfo,path:"src\\index.stories.js"})}},[[273,1,2]]]);
//# sourceMappingURL=main.5273a573bb852462167e.bundle.js.map