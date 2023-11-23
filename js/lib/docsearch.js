const searchClient = algoliasearch('OB36AQU7BK', '0b4b496d02c45ba125a56e9a83b58b20');

const hitTemplate = function (hit) {
  if (!(hit && hit.hierarchy)) return;
  let title = undefined;

  for (let i = 6; i >= 0; i--) {
    title = hit.hierarchy['lvl' + i];
    if (title) break;
  }

  return `
    <a class="post-link" href="${hit.url}"><h4>${title}</h4></a>
  `;
}

const search = instantsearch({
  indexName: 'rspamd',
  searchClient,
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#docsearch',
  }),

  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: hitTemplate
    }
  })
]);

search.start();
