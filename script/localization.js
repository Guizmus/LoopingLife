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

    return $(Localization.libs[lib]).find(path).html();
  }
}
