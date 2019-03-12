const data = require('./notifications-feed');

const ALLOWED_TYPES = ['Like', 'Comment'];


const aggregate = (feed) => {
  const agg = {};
  feed.forEach((el) => {
    const {
      type,
      post,
      user,
      comment,
    } = el;

    if (!ALLOWED_TYPES.includes(type)) {
      return;
    }

    const groupId = `${post.id}-${type}`;

    if (!agg[groupId]) {
      agg[groupId] = {
        post,
        type,
        count: 0,
        last3: [],
      };
    }
    agg[groupId].count += 1;

    // assuming the feed is order from the most recent activity to the oldest
    if (agg[groupId].last3.length < 3) {
      if (type === 'Like') {
        agg[groupId].last3.push({ user });
      } else if (type === 'Comment') {
        agg[groupId].last3.push({
          user,
          comment,
        });
      }
    }
  });

  return Object.values(agg);
};


exports.index = (req, res) => {
  res.send(aggregate(data));
};
