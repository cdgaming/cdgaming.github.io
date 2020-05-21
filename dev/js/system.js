window.document.onkeydown = function(evt){
 if ((evt.which == 120)
 || (evt.which == 73 && evt.ctrlKey == true && evt.shiftKey == true)
 || (evt.which == 123)
 ){ evt.which = null;
 return false;}
}