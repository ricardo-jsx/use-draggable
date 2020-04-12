export function calculateSpacing(elem: any, direction: 'Top' | 'Right' | 'Bottom' | 'Left') {
  const paddingD = `padding${direction}`;
  const borderD = `border${direction}`;

  const borderSize =
    Number(window.getComputedStyle(elem)[borderD].split(/\D+/)[0]) || 0;
  const paddingSize =
    Number(window.getComputedStyle(elem)[paddingD].split(/\D+/)[0]) || 0;

  return borderSize + paddingSize;
}
