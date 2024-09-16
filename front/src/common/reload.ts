export function loopAnimation(
  id: string,
  className: string,
  delay: number,
): void {
  const element = document.getElementById(id);

  if (!element) {
    console.error(`${id} 要素はありません`);
    return;
  }

  element.addEventListener("animationend", listener);

  function listener(event: AnimationEvent): void {
    const target = event.target as HTMLElement;
    target.classList.remove(className);
    setTimeout(playAnimation, delay);
  }

  function playAnimation(): void {
    element!.classList.add(className);
  }
}
