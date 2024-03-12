const CountProductB2c = (items) => {
  if (items?.length) {
    let count = 0;
    for (let i = 0; i < items?.length; i++) {
      count += items[i]?.quantity;
    }
    return count;
  }
  return 0;
};

export default CountProductB2c;
