export function calculateSpacing(elem, direction) {
  const paddingD = `padding${direction}`;
  const borderD = `border${direction}`;

  const borderSize =
    Number(window.getComputedStyle(elem)[borderD].split(/\D+/)[0]) || 0;
  const paddingSize =
    Number(window.getComputedStyle(elem)[paddingD].split(/\D+/)[0]) || 0;

  return borderSize + paddingSize;
}