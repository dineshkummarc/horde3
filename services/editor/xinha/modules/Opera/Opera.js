Opera._pluginInfo={name:"Opera",origin:"Xinha Core",version:"$LastChangedRevision:970 $".replace(/^[^:]*:\s*(.*)\s*\$$/,"$1"),developer:"The Xinha Core Developer Team",developer_url:"$HeadURL:http://svn.xinha.webfactional.com/trunk/modules/Opera/Opera.js $".replace(/^[^:]*:\s*(.*)\s*\$$/,"$1"),sponsor:"Gogo Internet Services Limited",sponsor_url:"http://www.gogo.co.nz/",license:"htmlArea"};function Opera(A){this.editor=A;A.Opera=this}Opera.prototype.onKeyPress=function(S){var O=this.editor;var Q=O.getSelection();if(O.isShortCut(S)){switch(O.getKey(S).toLowerCase()){case"z":if(O._unLink&&O._unlinkOnUndo){Xinha._stopEvent(S);O._unLink();O.updateToolbar();return true}break;case"a":sel=O.getSelection();sel.removeAllRanges();range=O.createRange();range.selectNodeContents(O._doc.body);sel.addRange(range);Xinha._stopEvent(S);return true;break;case"v":if(!O.config.htmlareaPaste){return true}break}}switch(O.getKey(S)){case" ":var K=function(X,W){var V=X.nextSibling;if(typeof W=="string"){W=O._doc.createElement(W)}var U=X.parentNode.insertBefore(W,V);Xinha.removeFromParent(X);U.appendChild(X);V.data=" "+V.data;Q.collapse(V,1);O._unLink=function(){var Y=U.firstChild;U.removeChild(Y);U.parentNode.insertBefore(Y,U);Xinha.removeFromParent(U);O._unLink=null;O._unlinkOnUndo=false};O._unlinkOnUndo=true;return U};if(O.config.convertUrlsToLinks&&Q&&Q.isCollapsed&&Q.anchorNode.nodeType==3&&Q.anchorNode.data.length>3&&Q.anchorNode.data.indexOf(".")>=0){var P=Q.anchorNode.data.substring(0,Q.anchorOffset).search(/\S{4,}$/);if(P==-1){break}if(O._getFirstAncestor(Q,"a")){break}var N=Q.anchorNode.data.substring(0,Q.anchorOffset).replace(/^.*?(\S*)$/,"$1");var L=N.match(Xinha.RE_email);if(L){var I=Q.anchorNode;var G=I.splitText(Q.anchorOffset);var M=I.splitText(P);K(M,"a").href="mailto:"+L[0];break}RE_date=/([0-9]+\.)+/;RE_ip=/(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/;var J=N.match(Xinha.RE_url);if(J){if(RE_date.test(N)){break}var H=Q.anchorNode;var E=H.splitText(Q.anchorOffset);var D=H.splitText(P);K(D,"a").href=(J[1]?J[1]:"http://")+J[2];break}}break}switch(S.keyCode){case 27:if(O._unLink){O._unLink();Xinha._stopEvent(S)}break;break;case 8:case 46:if(!S.shiftKey&&this.handleBackspace()){Xinha._stopEvent(S)}default:O._unlinkOnUndo=false;if(Q.anchorNode&&Q.anchorNode.nodeType==3){var T=O._getFirstAncestor(Q,"a");if(!T){break}if(!T._updateAnchTimeout){if(Q.anchorNode.data.match(Xinha.RE_email)&&T.href.match("mailto:"+Q.anchorNode.data.trim())){var C=Q.anchorNode;var B=function(){T.href="mailto:"+C.data.trim();T._updateAnchTimeout=setTimeout(B,250)};T._updateAnchTimeout=setTimeout(B,1000);break}var R=Q.anchorNode.data.match(Xinha.RE_url);if(R&&T.href.match(new RegExp("http(s)?://"+Xinha.escapeStringForRegExp(Q.anchorNode.data.trim())))){var A=Q.anchorNode;var F=function(){R=A.data.match(Xinha.RE_url);if(R){T.href=(R[1]?R[1]:"http://")+R[2]}T._updateAnchTimeout=setTimeout(F,250)};T._updateAnchTimeout=setTimeout(F,1000)}}}break}return false};Opera.prototype.handleBackspace=function(){var A=this.editor;setTimeout(function(){var F=A.getSelection();var H=A.createRange(F);var G=H.startContainer;var J=H.startOffset;var D=H.endContainer;var I=H.endOffset;var C=G.nextSibling;if(G.nodeType==3){G=G.parentNode}if(!(/\S/.test(G.tagName))){var E=document.createElement("p");while(G.firstChild){E.appendChild(G.firstChild)}G.parentNode.insertBefore(E,G);Xinha.removeFromParent(G);var B=H.cloneRange();B.setStartBefore(C);B.setEndAfter(C);B.extractContents();F.removeAllRanges();F.addRange(B)}},10)};Opera.prototype.inwardHtml=function(A){A=A.replace(/<(\/?)del(\s|>|\/)/ig,"<$1strike$2");return A};Opera.prototype.outwardHtml=function(A){return A};Opera.prototype.onExecCommand=function(I,D,G){switch(I){case"removeformat":var A=this.editor;var C=A.getSelection();var K=A.saveSelection(C);var J=A.createRange(C);var E=A._doc.body.getElementsByTagName("*");var H=(J.startContainer.nodeType==1)?J.startContainer:J.startContainer.parentNode;var F,B;if(C.isCollapsed){J.selectNodeContents(A._doc.body)}for(F=0;F<E.length;F++){B=E[F];if(J.isPointInRange(B,0)||(E[F]==H&&J.startOffset==0)){B.removeAttribute("style")}}this.editor._doc.execCommand(I,D,G);A.restoreSelection(K);return true;break}return false};Opera.prototype.onMouseDown=function(A){};Xinha.prototype.insertNodeAtSelection=function(A){if(A.ownerDocument!=this._doc){try{A=this._doc.adoptNode(A)}catch(D){}}this.focusEditor();var C=this.getSelection();var G=this.createRange(C);G.deleteContents();var E=G.startContainer;var F=G.startOffset;var B=A;C.removeAllRanges();switch(E.nodeType){case 3:if(A.nodeType==3){E.insertData(F,A.data);G=this.createRange();G.setEnd(E,F+A.length);G.setStart(E,F+A.length);C.addRange(G)}else{E=E.splitText(F);if(A.nodeType==11){B=B.firstChild}E.parentNode.insertBefore(A,E);this.selectNodeContents(B);this.updateToolbar()}break;case 1:if(A.nodeType==11){B=B.firstChild}E.insertBefore(A,E.childNodes[F]);this.selectNodeContents(B);this.updateToolbar();break}};Xinha.prototype.getParentElement=function(C){if(typeof C=="undefined"){C=this.getSelection()}var B=this.createRange(C);try{var D=B.commonAncestorContainer;if(!B.collapsed&&B.startContainer==B.endContainer&&B.startOffset-B.endOffset<=1&&B.startContainer.hasChildNodes()){D=B.startContainer.childNodes[B.startOffset]}while(D.nodeType==3){D=D.parentNode}return D}catch(A){return null}};Xinha.prototype.activeElement=function(A){if((A===null)||this.selectionEmpty(A)){return null}if(!A.isCollapsed){if(A.anchorNode.childNodes.length>A.anchorOffset&&A.anchorNode.childNodes[A.anchorOffset].nodeType==1){return A.anchorNode.childNodes[A.anchorOffset]}else{if(A.anchorNode.nodeType==1){return A.anchorNode}else{return null}}}return null};Xinha.prototype.selectionEmpty=function(A){if(!A){return true}if(typeof A.isCollapsed!="undefined"){return A.isCollapsed}return true};Xinha.prototype.saveSelection=function(){return this.createRange(this.getSelection()).cloneRange()};Xinha.prototype.restoreSelection=function(A){var B=this.getSelection();B.removeAllRanges();B.addRange(A)};Xinha.prototype.selectNodeContents=function(C,E){this.focusEditor();this.forceRedraw();var B;var A=typeof E=="undefined"?true:false;var D=this.getSelection();B=this._doc.createRange();if(A&&C.tagName&&C.tagName.toLowerCase().match(/table|img|input|textarea|select/)){B.selectNode(C)}else{B.selectNodeContents(C)}D.removeAllRanges();D.addRange(B)};Xinha.prototype.insertHTML=function(A){var C=this.getSelection();var F=this.createRange(C);this.focusEditor();var D=this._doc.createDocumentFragment();var E=this._doc.createElement("div");E.innerHTML=A;while(E.firstChild){D.appendChild(E.firstChild)}var B=this.insertNodeAtSelection(D)};Xinha.prototype.getSelectedHTML=function(){var A=this.getSelection();if(A.isCollapsed){return""}var B=this.createRange(A);return Xinha.getHTML(B.cloneContents(),false,this)};Xinha.prototype.getSelection=function(){var C=this._iframe.contentWindow.getSelection();if(C&&C.focusNode&&C.focusNode.tagName&&C.focusNode.tagName=="HTML"){var B=this._doc.getElementsByTagName("body")[0];var A=this.createRange();A.selectNodeContents(B);C.removeAllRanges();C.addRange(A);C.collapseToEnd()}return C};Xinha.prototype.createRange=function(B){this.activateEditor();if(typeof B!="undefined"){try{return B.getRangeAt(0)}catch(A){return this._doc.createRange()}}else{return this._doc.createRange()}};Xinha.prototype.isKeyEvent=function(A){return A.type=="keypress"};Xinha.prototype.getKey=function(A){return String.fromCharCode(A.charCode)};Xinha.getOuterHTML=function(A){return(new XMLSerializer()).serializeToString(A)};Xinha.prototype.setCC=function(J){var B=String.fromCharCode(8286);try{if(J=="textarea"){var C=this._textArea;var H=C.selectionStart;var G=C.value.substring(0,H);var F=C.value.substring(H,C.value.length);if(F.match(/^[^<]*>/)){var E=F.indexOf(">")+1;C.value=G+F.substring(0,E)+B+F.substring(E,F.length)}else{C.value=G+B+F}C.value=C.value.replace(new RegExp("(&[^"+B+"]*?)("+B+")([^"+B+"]*?;)"),"$1$3$2");C.value=C.value.replace(new RegExp("(<script[^>]*>[^"+B+"]*?)("+B+")([^"+B+"]*?<\/script>)"),"$1$3$2");C.value=C.value.replace(new RegExp("^([^"+B+"]*)("+B+")([^"+B+"]*<body[^>]*>)(.*?)"),"$1$3$2$4");C.value=C.value.replace(B,'<span id="XinhaOperaCaretMarker">MARK</span>')}else{var A=this.getSelection();var I=this._doc.createElement("span");I.id="XinhaOperaCaretMarker";A.getRangeAt(0).insertNode(I)}}catch(D){}};Xinha.prototype.findCC=function(K){if(K=="textarea"){var E=this._textArea;var I=E.value.search(/(<span\s+id="XinhaOperaCaretMarker"\s*\/?>((\s|(MARK))*<\/span>)?)/);if(I==-1){return}var C=RegExp.$1;var D=I+C.length;var J=E.value.substring(0,I);var H=E.value.substring(D,E.value.length);E.value=J;E.scrollTop=E.scrollHeight;var G=E.scrollTop;E.value+=H;E.setSelectionRange(I,I);E.focus();E.scrollTop=G}else{var F=this._doc.getElementById("XinhaOperaCaretMarker");if(F){this.focusEditor();var A=this.createRange();A.selectNode(F);var B=this.getSelection();B.addRange(A);B.collapseToStart();this.scrollToElement(F);F.parentNode.removeChild(F);return}}};Xinha.getDoctype=function(A){var B="";if(A.doctype){B+="<!DOCTYPE "+A.doctype.name+" PUBLIC ";B+=A.doctype.publicId?'"'+A.doctype.publicId+'"':"";B+=A.doctype.systemId?' "'+A.doctype.systemId+'"':"";B+=">"}return B};Xinha.prototype._standardInitIframe=Xinha.prototype.initIframe;Xinha.prototype.initIframe=function(){if(!this._iframeLoadDone){if(this._iframe.contentWindow&&this._iframe.contentWindow.xinhaReadyToRoll){this._iframeLoadDone=true;this._standardInitIframe()}else{var A=this;setTimeout(function(){A.initIframe()},5)}}};Xinha._addEventOperaOrig=Xinha._addEvent;Xinha._addEvent=function(C,B,A){if(C.tagName&&C.tagName.toLowerCase()=="select"&&B=="change"){return Xinha.addDom0Event(C,B,A)}return Xinha._addEventOperaOrig(C,B,A)};