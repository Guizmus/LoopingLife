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
      id : 'test_infobox',
      selector : '#test_selector',
      style : 'border:1px solid black',
      html : function () {return "test de contenu"},
    },function(){
    })
  },
  prepareActions : function () {
    
  },
}
