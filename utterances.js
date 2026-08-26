(function () {
  var REPO = 'oscourse-cn/oscourse-cn.github.io';
  var DARK_THEMES = ['coal', 'navy', 'ayu'];

  function currentMdBookTheme() {
    var cls = document.documentElement.classList;
    for (var i = 0; i < DARK_THEMES.length; i++) {
      if (cls.contains(DARK_THEMES[i])) return 'github-dark';
    }
    return 'github-light';
  }

  function inject() {
    var main = document.querySelector('#mdbook-content main');
    if (!main || document.getElementById('utterances-container')) return;

    var container = document.createElement('div');
    container.id = 'utterances-container';
    container.style.cssText = 'margin-top:2em;padding-top:1em;border-top:1px solid var(--theme-popup-border)';

    var script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.setAttribute('repo', REPO);
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('theme', currentMdBookTheme());
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    container.appendChild(script);
    main.appendChild(container);
  }

  // 监听 mdBook 主题切换（修改 <html> class 而不重载页面）
  var themeObserver = new MutationObserver(function () {
    var theme = currentMdBookTheme();
    var frame = document.querySelector('.utterances-frame');
    if (frame) {
      frame.contentWindow.postMessage({ type: 'set-theme', theme: theme }, 'https://utteranc.es');
    }
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
