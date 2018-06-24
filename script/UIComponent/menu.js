UI.componentClasses.menu = jQuery.fn.extend(UI.proto,{
   selector : '#menu',
   html : function (index) { // index is the index of the element in the selected list. Used if the selector is multiple
     var html = "";
     if (Main.lang)
        html += UI.componentClasses.menu.htmlLocalizationMenu();
      html += UI.componentClasses.menu.htmlSaveButtons();
     return html;
   },
   eventListeners : [
     ['#localization_menu','change',Localization.change],
     ['#save_button','click',GameState.save],
     ['#load_button','click',GameState.load],
   ],
   htmlLocalizationMenu : function() {
     var lg = Localization.supportedLang;
     var html = "<select id='localization_menu'>";
     $.each(lg,function(val,str) {
       html += "<option value='"+val+"' "+(Localization.currentLang == val ? "selected" : "")+">"+str+"</option>"
     })
     html += "</select>";
     return html;
   },
   htmlSaveButtons : function() {
     var html = "<button id='save_button'>"+Localization.txt("buttons>save","standard")+"</button>";
     html += "<button id='load_button'>"+Localization.txt("buttons>load","standard")+"</button>";
     return html;
   }
});
