const Cache = () => {
  const cache = {};
  return {
    get(key) {
      return cache[key];
    },
    set(key, val) {
      cache[key] = val;
    },
  };
};

export default Cache();
