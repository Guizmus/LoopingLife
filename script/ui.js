window.UI = {
  init : function () {
    UI.hook = $('#'+Utils.gameName);
    if (UI.hook.length == 0)
      console.warn("UI init : couldn't find the game div");
    UI.components = [];
    UI.registerStandardComponents();
  },
  hook : null,
  componentClasses : {},
  components : [],
  addComponent : function(component,callback) {
    Utils.loading.loadScripts("script/UIComponent/"+component+".js",function(){
      UI.components.push(component);
      UI.componentClasses[component].toDraw = true;
      if (typeof(callback) == "function")
        callback.call(this);
    });
  },
  draw : function (components) {
    if (typeof(components) == "undefined")
      components = UI.components;
    $.each(UI.components,function(x,component) {
      var componentClass = UI.componentClasses[component]
      if (componentClass.toDraw) {
        $(componentClass.selector).html(function(index){return componentClass.html(index)});
        $(componentClass.eventListeners).each(function(x,listener) {
          $(listener[0]).on(listener[1],listener[2]);
        });
        UI.componentClasses[component].toDraw = false;
      }
    });
  },
  registerStandardComponents : function () {
    UI.addComponent('menu');
  },
  proto : {
       selector : null,
       html : function (index) {
         console.warn('Element has no html to draw')
         return '';
       },
       eventListeners : [],
  }
}
