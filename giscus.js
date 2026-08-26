(function () {
  var DARK_THEMES = ['coal', 'navy', 'ayu'];

  function currentTheme() {
    var cls = document.documentElement.classList;
    for (var i = 0; i < DARK_THEMES.length; i++) {
      if (cls.contains(DARK_THEMES[i])) return 'dark';
    }
    return 'light';
  }

  function inject() {
    var main = document.querySelector('#mdbook-content main');
    if (!main || document.getElementById('giscus-container')) return;

    var container = document.createElement('div');
    container.id = 'giscus-container';
    container.style.cssText = 'margin-top:2em;padding-top:1em;border-top:1px solid var(--theme-popup-border)';

    var script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'oscourse-cn/oscourse-cn.github.io');
    script.setAttribute('data-repo-id', 'R_kgDOPDQb1w');
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'DIC_kwDOPDQb184CsJfS');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', currentTheme());
    script.setAttribute('data-lang', 'zh-CN');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    container.appendChild(script);
    main.appendChild(container);
  }

  // 监听 mdBook 主题切换，同步更新 giscus 配色
  var themeObserver = new MutationObserver(function () {
    var frame = document.querySelector('iframe.giscus-frame');
    if (frame) {
      frame.contentWindow.postMessage(
        { giscus: { setConfig: { theme: currentTheme() } } },
        'https://giscus.app'
      );
    }
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
