View = {
  init : function () {
    this.buildMenu();
    this.buildStages();
    this.buildResources();
    this.buildActions();
    this.buildActionList();
    UI.draw();
  },
  
  buildMenu : function () {
    UI.addComponent('infobox','menu',{
      selector : '#menu',
      xmlKey : 'menu',
      html : function () {
        var html = "";
        if (game.lang)
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
    UI.addComponent('infobox','Resources',{
      selector : '#resources',
      style : 'border:1px solid black;display:block;width:200px;position:relative;',
      title : _txt('resources>title'),
      html : function () {
        var that = this;
        var html = "<ul>";
        $(Object.keys(GameState.vars.Resources.get())).each(function(x,resID) {
          html += "<li>"+GameState.vars.Resources.get(resID).txt('libel')+" : <span id='resourceCount_"+resID+"'>"+that.innerHtml(resID)+"</span></li>";
        })
        return html
      },
      innerHtml : function(resID) {
        return GameState.vars.Resources.get(resID).getValue();
      },
      updateValue : function (resID) {
        $("#resourceCount_"+resID).html(this.innerHtml(resID))
      },
    },function(){
    })
  },
  
  buildActions : function () {
    $(Object.keys(GameState.vars.Actions.get())).each(function(x,actID) {
      UI.addComponent('progressbox','Action_'+actID,{
        parentSelector : '#actions',
        progressObject : GameState.vars.Actions.get(actID),
        eventListeners : GameState.vars.Actions.get(actID).eventListeners,
      })
    })
    // UI.addComponent('infobox','ActionList',{
    //   selector : '#actionList',
    //   html : function () {
    //     var html = "<button id='add_resource'>Add resource</button>";
    //     return html
    //   },
    //   eventListeners : [
    //     ['#add_resource','click',test],
    //   ],
    // })
  },
  
  buildActionList : function () {
      UI.addComponent('list','ActionList',{
        selector : '#actionList',
        list : GameState.vars.ActionList,
        title : _txt('actions>titles>actionList'),
      })
  },
  
}
