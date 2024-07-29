export enum AppRoutes {
    MAIN = 'main',
    SETTINGS = 'settings',
    ABOUT = 'about',
    PROFILE = 'profile',
    ARTICLES = 'articles',
    ARTICLE_DETAILS = 'article_details',
    ARTICLE_CREATE = 'article_create',
    ARTICLE_EDIT = 'article_edit',
    ADMIN_PANEL = 'admin_panel',
    FORBIDDEN = 'forbidden',
    // last
    NOT_FOUND = 'not_found',
}

export const getRouteMain = (): string => '/';
export const getRouteAbout = (): string => '/about';
export const getRouteProfile = (id: string): string => `/profile/${id}`;
export const getRouteArticles = (): string => '/articles';
export const getRouteArticleDetails = (id: string): string => `/articles/${id}`;
export const getRouteArticleCreate = (): string => '/articles/new';
export const getRouteArticleEdit = (id: string): string =>
    `/articles/${id}/edit`;
export const getRouteAdminPanel = (): string => '/admin';
export const getRouteForbidden = (): string => '/forbidden';
export const getRouteSettings = (): string => '/settings';

export const AppRouterByPathPattern: Record<string, AppRoutes> = {
    [getRouteMain()]: AppRoutes.MAIN,
    [getRouteAbout()]: AppRoutes.ABOUT,
    [getRouteProfile(':id')]: AppRoutes.PROFILE,
    [getRouteArticles()]: AppRoutes.ARTICLES,
    [getRouteArticleDetails(':id')]: AppRoutes.ARTICLE_DETAILS,
    [getRouteArticleCreate()]: AppRoutes.ARTICLE_CREATE,
    [getRouteArticleEdit(':id')]: AppRoutes.ARTICLE_EDIT,
    [getRouteAdminPanel()]: AppRoutes.ADMIN_PANEL,
    [getRouteForbidden()]: AppRoutes.FORBIDDEN,
    [getRouteSettings()]: AppRoutes.SETTINGS,
};
