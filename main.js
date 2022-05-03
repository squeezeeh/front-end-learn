function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

function getVal() {
  var a = document.getElementById("a").value;
  var b = document.getElementById("b").value;
  var string = document.getElementById("string").value;
  var dict_input = document.getElementById("dictionary").value;
  var dict = {}

  let counter = 0
  for (let letter_num in dict_input) {

    if (dict_input[letter_num] in dict) { continue }

    else {
      dict[dict_input[letter_num]] = counter
      counter++
    }
  }

  var dictionaryLength = Object.keys(dict).length

  return [a, b, string, dict, dictionaryLength]
}

function euclideanAlgorithms(a, b) {
  // Присвоєння змінних

  // для базового алгоритму евкліда
  let c;
  

  document.getElementById(
    "display-variables"
  ).innerHTML = `Variable <strong>a</strong> equals <strong>${a}</strong> <br> Variable <strong>b</strong> equals <strong>${b}</strong>`;

  if (a < b) [a, b] = [b, a];
  var [primal_a, primal_b] = [a, b];

  // для розширеного алгоритму евкліда
  let s = 0,
    old_s = 1; // коефіцієнт числа a (більшого числа)
  let t = 1,
    old_t = 0; // коефіцієнт числа b (меншого числа)
  let r = b,
    old_r = a; // остачі від ділення (при коефіцієнтах)


  // Базовий алгоритм Евкліда

  c = a % b;

  while (c != 0) {
    [a, b] = [b, c];

    c = a % b;
  }

  let gcd = b;

  document.getElementById(
    "display-gcd"
  ).innerHTML = `Greatest Common Division equals <strong>${gcd}</strong>`;

  if (gcd == 1) {
    // Розширений алгоритм Евкліда

    // Завдяки цим двом статтям:
    // https://math.stackexchange.com/questions/691916/what-is-the-link-between-the-quotient-and-the-b%C3%A9zout-coefficients-in-the-extende
    // https://brilliant.org/wiki/extended-euclidean-algorithm/

    while (r != 0) {
      let q = Math.floor(old_r / r); // частка від ділення (заокруглена до меншого)
      [r, old_r] = [old_r - q * r, r]; // переприсвоєння остачі
      [s, old_s] = [old_s - q * s, s]; // переприсвоєння коефіцієнту більшого числа
      [t, old_t] = [old_t - q * t, t]; // переприсвоєння коефіцієнту меншого числа
    }

    var y = old_t % primal_a;

    if (y < 0) {
      y = y + primal_a;
    }

    document.getElementById(
      "display-coefs"
    ).innerHTML = `Extended Eucdlidean algorithm coefs: <strong>${old_t}</strong>, <strong>${old_s}</strong>`;

    document.getElementById(
      "display-inverse-element"
    ).innerHTML = `Inverse element to ${primal_b} is <strong>${y}</strong>, because b * y mod a = ${
      (primal_b * y) % primal_a
    }`;
  }

  return y
}

function affineCipher(parrams) {
  var a = Number(parrams[0])
  var b = Number(parrams[1])
  var plainText = parrams[2]
  var dictionary = parrams[3]

  var dictionaryLength = Object.keys(dictionary).length
  var cryptogram = ""

  for(let letter = 0; letter < plainText.length; letter++) {

    cryptogram += getKeyByValue(dictionary, (dictionary[ plainText[letter] ] * a + b) % dictionaryLength)
  }

  document.getElementById(
    "affine_output"
  ).innerHTML = `${cryptogram}`;

}

function caesarCipher(parrams) {
  const step = Number(parrams[0])
  var plainText = parrams[2]
  var dictionary = parrams[3]

  var dictionaryLength = Object.keys(dictionary).length
  var cryptogram = ""

  for(let letter = 0; letter < plainText.length; letter++) {

    cryptogram += getKeyByValue(dictionary, (dictionary[ plainText[letter] ] + step) % dictionaryLength)
  }

  document.getElementById(
    "caesar_output"
  ).innerHTML = `${cryptogram}`;

}

function decodeCaesar(parrams) {
  var step = -1 * Number(parrams[0])
  var cryptogram = parrams[2]
  var dictionary = parrams[3]

  var dictionaryLength = Object.keys(dictionary).length

  var plainText = ""

  for(let letter = 0; letter < cryptogram.length; letter++) {
    if ((dictionary[ cryptogram[letter] ] + step) % dictionaryLength < 0) { step += dictionaryLength }

    plainText += getKeyByValue(dictionary, (dictionary[ cryptogram[letter] ] + step) % dictionaryLength)
  }

  document.getElementById(
    "caesar_output"
  ).innerHTML = `${plainText}`;
}

function decodeAffine(a, b, cryptogram, dictionary) {

  var dictionaryLength = Object.keys(dictionary).length
  var plainText = ""

  for(let letter = 0; letter < cryptogram.length; letter++) {

    if ((((dictionary[ cryptogram[letter] ] - b) * a) % dictionaryLength) < 0 ) {
      plainText += getKeyByValue(dictionary, (((dictionary[ cryptogram[letter] ] - b) * a) % dictionaryLength) + dictionaryLength)
      continue
    }

    plainText += getKeyByValue(dictionary, ((dictionary[ cryptogram[letter] ] - b) * a) % dictionaryLength)
  }

  document.getElementById(
    "affine_output"
  ).innerHTML = `${plainText}`;
}