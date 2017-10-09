module.exports = function(score) {
  if (!score)
    return 'empty';
  else if (score > 85)
    return 'A';
  else if (score > 70 && score <= 85)
    return 'B';
  else if (score > 55 && score <= 70)
    return 'C';
  else if (score <= 55)
    return 'E';
};
