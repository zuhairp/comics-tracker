module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "Zuhair's Earth-616 Progress",
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/data`,
        name: `data`
      }
    },

    {
      resolve: `gatsby-transformer-yaml`,
    }
  ],
};
