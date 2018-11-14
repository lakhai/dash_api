export function fibonacci(num) {
  let a = 1, b = 0, temp, xp = 100;
  while (num >= 0) {
    temp = a;
    a = a + b;
    b = temp;
    xp = (a * 50) + (b * 50);
    num--;
  }
  return xp;
}