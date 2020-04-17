export function calculateSpacing(elem: HTMLElement, direction: 'top' | 'right' | 'bottom' | 'left') {
  const paddingD = `padding-${direction}`;
  const borderD = `border-${direction}`;

  const borderSize =
    Number(window.getComputedStyle(elem).getPropertyValue(borderD).split(/\D+/)[0]) || 0;
  const paddingSize =
    Number(window.getComputedStyle(elem).getPropertyValue(paddingD).split(/\D+/)[0]) || 0;

  return borderSize + paddingSize;
}
