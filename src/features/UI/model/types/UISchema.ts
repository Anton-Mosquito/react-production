// Represents the scroll position of different page addresses.
export type ScrollSchema = Record<string, number>

export interface UISchema {
  scroll: ScrollSchema
}
