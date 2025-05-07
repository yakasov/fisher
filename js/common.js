function f(n, decimals = 2) {
  if (typeof n === "string" || !n) return n;
  if (typeof n === "bigint" || typeof n === "number")
    return f(new Decimal(n), decimals);

  if (n.lt(1e9)) return n.toFixed(decimals);
  return n.toString();
}