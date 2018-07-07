View = {
  init : function () {
    this.buildMenu();
    this.buildStages();
    this.buildResources();
    this.buildActions();
    UI.draw();
  },
  
  buildMenu : function () {
    UI.addComponent('infobox',{
      selector : '#menu',
      xmlKey : 'menu',
      html : function () {
        var html = "";
        if (Main.lang)
           html += this.htmlLocalizationMenu();
         html += this.htmlSaveButtons();
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
        var html = "<button id='save_button'>"+_txt(this.xmlKey+">buttons>save","standard")+"</button>";
        html += "<button id='load_button'>"+_txt(this.xmlKey+">buttons>load","standard")+"</button>";
        return html;
      }
    })
  },
  
  buildStages : function () {
    
  },
  
  buildResources : function() {
    UI.addComponent('infobox',{
      selector : '#resources',
      style : 'border:1px solid black',
      html : function () {
        var html = "<ul>";
        $(Object.keys(LoopingLifeState.data.resources)).each(function(x,resID) {
          html += "<li>"+_txt('resources>'+resID+'>libel')+" : <span id='resourceCount_"+resID+"'>"+LoopingLifeState.data.resources[resID].value+"</span></li>";
        })
        return html
      },
    },function(){
    })
  },
  
  buildActions : function () {
    
  },
  
}
