const links = [
  {
    id: 1,
    url: 'https://github.com/kingisaac95/',
    description: 'Developer Evangelist'
  },
  {
    id: 2,
    url: 'https://github.com/kingisaac95/hackernews-clone-server',
    description: 'Hackernews Clone'
  },
];

module.exports = {
  Query: {
    allLinks: () => links,
  },

  Mutation: {
    createLink: (_, data) => {
      const newLink = Object.assign({id: links.length + 1}, data);
      links.push(newLink);
      return newLink;
    }
  },
};
