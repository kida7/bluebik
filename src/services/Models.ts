export default [
  {
    Pattern: /247phim\.com/,
    Model: {
      Home: {
        Highlights: [
          '.carousel-item',
          {
            title: 'h5',
            titleEn: 'h4',
            cover: 'img => src',
            url: 'a => href',
          },
        ],
        Categories: [
          '.panel-vod',
          {
            title: '.title-cate h2',
            items: [
              '.item',
              {
                title: 'h3',
                titleEn: '.subtitle',
                image: 'img => src',
                viewCount: '.view',
                rate: '.rateid-range => aria-valuenow',
                url: 'a => href',
              },
            ],
          },
        ],
      },
    },
  },
];
