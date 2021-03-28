function input (data) {
  try {
    data = JSON.parse(data);
  } catch (e) {}
  return data;
}

async function output (client, result) {
  result = (typeof result === 'function') ? (await result()) : result;

  if (result === null || result === undefined) {
    return;
  }

  if (typeof result !== 'string') {
    result = JSON.stringify(result, null, 2);
  }
  client.write(result);
}

module.exports = {
  input,
  output,
};
