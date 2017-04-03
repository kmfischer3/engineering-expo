var track = {};
track.piwik_page = function(url, title) {
    console.log('Piwik: ', url, title);
    _paq.push(['setCustomUrl', url]);
    _paq.push(['setDocumentTitle', title]);
    _paq.push(['trackPageView']);
};
