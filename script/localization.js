window.Localization = {
  init : function() {
    Localization.currentLang = Utils.getUrlVars()['lg'];
    if (typeof(Localization.currentLang) == 'undefined')
      Localization.currentLang = Localization.defaultLang;
    Localization.loadLib('standard');
  },
  change : function (ev) {
    var vars = Utils.getUrlVars();
    vars['lg'] = $(ev.target).val();
    window.location.href=window.location.origin+window.location.pathname+'?'+$.param(vars);
  },
  currentLang : null,
  defaultLang : 'en-EN',
  supportedLang : {
    'en-EN' : 'English',
    'fr-FR' : 'Français',
  },
  localizeGame : function () {
    Localization.loadLib(Utils.gameName);
  },
  loadLib : function (libName) {
    Utils.loading.loadXML('lang/'+Localization.currentLang+'/'+libName+'.xml',function(xmlData){
      Localization.saveLib(libName,xmlData);
    })
  },
  libs : {},
  saveLib : function(libName,xmlData) {
    Localization.libs[libName] = xmlData;
  },
  txt : function(path,lib) {
    if (lib == "game")
      lib = Utils.gameName;
    var txt = $(Localization.libs[lib]).find(path).html();
    if (typeof(txt)=="undefined") {
      console.warn("Missing translation in lang '"+ Localization.currentLang + "' for key "+path);
      txt = "["+path+"]";
    }
    return txt;
  }
}
