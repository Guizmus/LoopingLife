View = {
  init : function () {
    this.prepareMenu();
    this.prepareStages();
    this.prepareResources();
    this.prepareActions();
    UI.draw();
  },
  prepareMenu : function () {
    $(this.menu.selector).html(this.menu.html());
  },
  prepareStages : function () {
    
  },
  prepareResources : function() {
    UI.addComponent('infobox',{
      selector : '#resources',
      style : 'border:1px solid black',
      html : function () {
        var html = "<ul>";
        $(Object.keys(LoopingLifeState.data.resources)).each(function(x,resID) {
          html += "<li>"+_txt('resources>'+resID+'>libel')+" : "+LoopingLifeState.data.resources[resID].value+"</li>";
        })
        return html
      },
    },function(){
    })
  },
  prepareActions : function () {
    
  },
}
