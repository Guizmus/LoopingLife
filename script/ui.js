UI = {
  init : function () {
    UI.hook = $('#'+Utils.gameName);
    if (UI.hook.length == 0)
      console.warn("UI init : couldn't find the game div");
    // UI.components = [];
    // UI.addStandardComponents();
  },
  hook : null,
  componentClasses : {},
  components : [],
  addComponent : function(component,params,callback) {
    console.log(typeof(this.componentClasses[component]));
    if (typeof(this.componentClasses[component]) == "undefined") {
      Utils.loading.loadScripts("script/UIComponent/"+component+".js",function(){
        UI.instanceComponent(component,params);
        if (typeof(callback) == "function")
          callback.call(this);
      });
    } else {
        this.instanceComponent(params);
        if (typeof(callback) == "function")
          callback.call(this);
    }
  },
  instanceComponent : function (component,params) {
      this.components.push(new this.componentClasses[component](params));
      UI.draw()
  },
  draw : function (components) {
    if (typeof(components) == "undefined")
      components = UI.components;
    $.each(components,function(x,component) {
      if (component.toDraw) {
        UI.stopListener(component);
        UI.redrawComponant(component);
        UI.startListener(component);
        component.toDraw = false;
      }
    });
  },
  redrawComponant : function (component) {
    $(component.params.selector).html(function(index){
      var newHtml = component.html(index);
      if (!(newHtml === false))
        return newHtml;
    });
  },
  stopListener : function (component) {
    $(component.params.eventListeners).each(function(x,listener) {
      $(listener[0]).off(listener[1],listener[2]);
    });
  },
  startListener : function(component) {
    $(component.params.eventListeners).each(function(x,listener) {
      $(listener[0]).on(listener[1],listener[2]);
    });
  },
}

UI.componentType = function (minimalParams) {
  return (function(_minimalParams) {
    return function (params) {
      if (!Utils.validateMinitalParams(params,_minimalParams))
        return false;
      this.params = params;
      this.toDraw = true;
      return this;
    }
  })(minimalParams);
}
UI.componentType.prototype.html = function () {
  return false;
}