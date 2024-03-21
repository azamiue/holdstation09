export function formatAddress(address) {
  if (!address) {
    return "";
  }

  return `${address.slice(0, 6)}***${address.slice(
    address.length - 4,
    address.length
  )}`;
}
