module.exports = function(template, data) {
  // replacing {%NAME%} with data.name value
  let output = template.replace(/{%NAME%}/g,data.name);
  // we call output which is equal to template but {%NAME%} already change here
  // replacing %AGE% to data.age and soon and so forth
  output = output.replace(/{%AGE%}/g,data.age);
  output = output.replace(/{%ID%}/g,data.id);
  return output;
}
