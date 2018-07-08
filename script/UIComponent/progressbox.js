UI.componentClasses.progressbox = new UI.componentType(['parentSelector','progressObject']);

UI.componentClasses.progressbox.prototype.html = function () {
  
  var html = "<div class='progressbox"+
    (typeof(this.params.class) != "undefined" ? " "+this.params.class : "")+"'"+
    "id='"+(typeof(this.params.id) != "undefined" ? this.params.id+" " : "")+"progressbox_"+this.componentID+"'"+
    (typeof(this.params.style) != "undefined" ? "style='"+this.params.style+"' " : "")+
    ">";
  
    html += "<span class='libel'>"+this.params.progressObject.txt("libel")+"</span>";
    
    html += "<span class='value'>"+this.params.progressObject.progressValue()+"</span>"+
      " / "+
      "<span class='maxValue'>"+this.params.progressObject.progressMaxValue()+"</span>";
  
  html += "</div>";
  return html;
}
UI.componentClasses.progressbox.prototype.update = function () {
  
  $('progressbox_'+this.componentID+' .value').html(this.params.progressObject.progressValue());
  $('progressbox_'+this.componentID+' .maxValue').html(this.params.progressObject.progressMaxValue());
  
}