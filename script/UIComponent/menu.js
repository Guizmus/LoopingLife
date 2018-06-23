UI.componentClasses.menu = {
   selector : '#menu',
   html : function (index) { // index is the index of the element in the selected list. Used if the selector is multiple
     return "<select id='localization_menu'><option value='en'>English</option></select>";
   },
   eventListeners : [
     ['#localization_menu','change',Localization.change]
   ],
 }
