window.UI = {
  init : function () {
    UI.hook = $('#'+Utils.gameName);
    if (UI.hook.length == 0)
      console.warn("UI init : couldn't find the game div");
    UI.components = [];
    UI.addStandardComponents();
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
    $.each(components,function(x,component) {
      if (UI.componentClasses[component].toDraw) {
        UI.stopListener(component);
        UI.redrawComponant(component);
        UI.startListener(component);
        UI.componentClasses[component].toDraw = false;
      }
    });
  },
  redrawComponant : function (component) {
    $(UI.componentClasses[component].selector).html(function(index){return UI.componentClasses[component].html(index)});
  },
  stopListener : function (component) {
    $(UI.componentClasses[component].eventListeners).each(function(x,listener) {
      $(listener[0]).off(listener[1],listener[2]);
    });
  },
  startListener : function(component) {
    $(UI.componentClasses[component].eventListeners).each(function(x,listener) {
      $(listener[0]).on(listener[1],listener[2]);
    });
  },
  addStandardComponents : function () {
    UI.addComponent('menu');
  },
}
