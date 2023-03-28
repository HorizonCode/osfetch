import ansiStyles from "./vendor/ansi-styles";

export function getLogo(distro: string): string[] {
  switch (distro) {
    case "arch":
      return [
        `${ansiStyles.bold.open}${ansiStyles.cyan.open}      /\\         ${ansiStyles.cyan.close}${ansiStyles.bold.close}`,
        `${ansiStyles.bold.open}${ansiStyles.cyan.open}     /  \\        ${ansiStyles.cyan.close}${ansiStyles.bold.close}`,
        `${ansiStyles.bold.open}${ansiStyles.cyan.open}    /\\   \\       ${ansiStyles.cyan.close}${ansiStyles.bold.close}`,
        `${ansiStyles.bold.open}${ansiStyles.white.open}   /      \\      ${ansiStyles.white.close}${ansiStyles.bold.close}`,
        `${ansiStyles.bold.open}${ansiStyles.white.open}  /   ,,   \\     ${ansiStyles.white.close}${ansiStyles.bold.close}`,
        `${ansiStyles.bold.open}${ansiStyles.white.open} /   |  |  -\\    ${ansiStyles.white.close}${ansiStyles.bold.close}`,
        `${ansiStyles.bold.open}${ansiStyles.white.open}/_-''    ''-_\\   ${ansiStyles.white.close}${ansiStyles.bold.close}`
      ];
    case "windows":
      return [
        ``,
        `${ansiStyles.bold.open}${ansiStyles.blue.open} ######  ######  ${ansiStyles.blue.close}${ansiStyles.bold.close}`,
        `${ansiStyles.bold.open}${ansiStyles.blue.open} ######  ######  ${ansiStyles.blue.close}${ansiStyles.bold.close}`,
        `${ansiStyles.bold.open}${ansiStyles.blue.open} ######  ######  ${ansiStyles.blue.close}${ansiStyles.bold.close}`,
        `${ansiStyles.bold.open}${ansiStyles.blue.open}                 ${ansiStyles.blue.close}${ansiStyles.bold.close}`,
        `${ansiStyles.bold.open}${ansiStyles.blue.open} ######  ######  ${ansiStyles.blue.close}${ansiStyles.bold.close}`,
        `${ansiStyles.bold.open}${ansiStyles.blue.open} ######  ######  ${ansiStyles.blue.close}${ansiStyles.bold.close}`,
        `${ansiStyles.bold.open}${ansiStyles.blue.open} ######  ######  ${ansiStyles.blue.close}${ansiStyles.bold.close}`
      ];
  }
  return [];
}