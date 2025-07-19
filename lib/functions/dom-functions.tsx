export function scrollToSection(elementId: string) {
  const element = document.getElementById(elementId);

  if (element) {
    const y = element.getBoundingClientRect().top + window.pageYOffset - 75;

    window.scrollTo({ top: y, behavior: "smooth" });
  }
}
