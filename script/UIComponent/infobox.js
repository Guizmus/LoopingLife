UI.componentClasses.infobox = new UI.componentType(['selector']);

UI.componentClasses.infobox.prototype.html = function () {
  var html = "<div "+
    (typeof(this.params.id) != "undefined" ? "id='"+this.params.id+"' " : "")+
    (typeof(this.params.class) != "undefined" ? "class='"+this.params.class+"' " : "")+
    (typeof(this.params.style) != "undefined" ? "style='"+this.params.style+"' " : "")+
    ">";
  
  if (typeof(this.params.html) == "function")
    html += this.params.html();
  
  html += "</div>";
  return html;
}