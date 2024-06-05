import { type Theme } from "@/shared/const/theme";

export interface JsonSettings {
  theme?: Theme;
  isFirstVisit?: boolean;
  isArticlePageWasOpened?: boolean;
}