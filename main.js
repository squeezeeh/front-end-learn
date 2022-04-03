function euclideanAlgorithms() {
  // Присвоєння змінних

  // для базового алгоритму евкліда
  var a = Number(prompt("Введіть значення змінної a"));
  var b = Number(prompt("Введіть значення змінної b"));
  let c;

  document.getElementById(
    "display-variables"
  ).innerHTML = `Variable <strong>a</strong> equals <strong>${a}</strong> <br> Variable <strong>b</strong> equals <strong>${b}</strong>`;

  if (a > b) [a, b] = [b, a];
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

  document.getElementById(
    "display-coefs"
  ).innerHTML = `Extended Eucdlidean algorithm coefs: <strong>${old_s}</strong>, <strong>${old_t}</strong>`;
}
