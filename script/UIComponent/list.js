UI.componentClasses.list = new UI.componentType(['selector','list']);

UI.componentClasses.list.prototype.html = function () {
  var html = "";
  html += this.getTitle();
  html += "<ul class='list"+
    (typeof(this.params.class) != "undefined" ? " "+this.params.class : "")+"'"+
    (typeof(this.params.id) != "undefined" ? "id='"+this.params.id+"' " : "")+
    (typeof(this.params.style) != "undefined" ? "style='"+this.params.style+"' " : "")+
    ">";
    
  
  for(var i = 0; i < this.params.list.items().length;i++) {
    html += "<li"+(this.params.list.index() == i ? " class='selected' " : "")+">"+this.params.list.itemHtml(i)+"</li>";
  }
  
  html += "</ul>";
  return html;
}
UI.componentClasses.list.prototype.updateActive = function () {
  $(this.selector+" .selected").removeClass("selected");
  $($(this.selector+" li")[this.params.list.index()]).addClass("selected");
}
UI.componentClasses.list.prototype.selector = function () {
    return this.params.selector;
}