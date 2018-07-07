Localization = {
  // config
  debug : false, // set to true for more console.log
  defaultLang : 'en-EN', //
  supportedLang : {
    'en-EN' : 'English',
    'fr-FR' : 'Français',
  },
  getKey : 'lg', // key used in the get parameter of the URL to set a specific language
  pageLocalization : {
    key : 'lk',
    className : 'localized',
  },
  dataKey : 'lk',
  handle : '#localization_menu', // html selector of the div to put the localization menu in

  // vars
  currentLang : null,
  lib : null,

  // ====== PUBLIC ======
  init : function() { // starts up the module
    Localization.currentLang = Localization.getUrlVars()[Localization.getKey];
    if (typeof(Localization.currentLang) == 'undefined')
      Localization.currentLang = Localization.defaultLang;
  },
  loadLib : function (libName,callback) { // to load a specific lib and have an optional callback
    Localization.loadXML(libName,function(xmlData){
      Localization.saveLib(xmlData);
      if (typeof(callback) != "undefined")
        callback.call(this);
    })
  },
  txt : function(path,debug) { // lib can be ignored to use the last used lib. returns the text for the given key
    debug = typeof(debug) == "undefined" ? Localization.debug : debug;
    var txt = $(Localization.lib).find(path).text();
      
    if ((txt=="") && debug) {
      console.warn("Missing text in lang '"+ Localization.currentLang + "' for key "+path);
      txt = "["+path+"]";
    }
    return txt;
  },
  txtsObj : function(path) { // lib can be ignored to use the last used lib. returns the texts for the given key as objects
    return $(Localization.lib).find(path);
  },
  localizePage : function (lib) { // will update every dom element using the .localized class, with a valid js-data "lockey"
    $("."+Localization.pageLocalization.className).each(function(x,localizedElement) {
      $(localizedElement).html(Localization.txt($(localizedElement).data(Localization.pageLocalization.key),lib));
    }) 
  },

  // ====== PRIVATE ======
  saveLib : function(xmlData) {
    if (Localization.debug)
      console.log("Loaded lang ",Localization.currentLang,xmlData);
    Localization.lib = xmlData;
  },
  change : function () { // function triggered by the localization menu
    var vars = Localization.getUrlVars();
    vars['lg'] = $(Localization.handle).val();
    window.location.href=window.location.origin+window.location.pathname+'?'+$.param(vars);
  },
  loadXML : function(libName,callback) {
    var fileName = 'lang/'+Localization.currentLang+'/'+libName+'.xml';
    $.ajax( {
      type: "GET",
      url: fileName,
      dataType: "xml",
      success:callback,
      error : function(ev,errType) {
        console.error("Error while loading the XML",fileName," : ",errType);
      }
    });            
      // $.get('lang/'+Localization.currentLang+'/'+libName+'.xml',null,callback,'xml');
  },
  getUrlVars : function() {
      var vars = {};
      var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
          vars[key] = value;
      });
      return vars;
  },
}
window._txt = Localization.txt;
window._txts = Localization.txtsObj;
