type Mods = Record<string, boolean | string>

export const classNames = (
  cls: string,
  mods: Mods = {},
  additional: Array<string | undefined> = []
): string => {
  const filteredMods = Object.entries(mods)
    .flatMap(([className, value]) => (value ? [className] : []))

  return [cls, ...additional.filter(Boolean), ...filteredMods].join(' ')
}
