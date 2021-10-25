import React from 'react';
import Head from 'next/head';

const Meta = ({ title, keywords, description }) => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="keywords" content={keywords} />
    <meta name="description" content={description} />
    <meta charSet="utf-8" />
    <link rel="icon" href="/favicon.ico" />
    <title>{title}</title>
  </Head>
);

Meta.defaultProps = {
  title: 'Venue Finder',
  keywords: 'Web Development, Venues, Places, Fun',
  description:
    'Get the latest info about trending venues near you. With interactive map, learn about the trending venues near you',
};

export default Meta;
