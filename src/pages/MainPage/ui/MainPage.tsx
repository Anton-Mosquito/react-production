import { Page } from '@/widgets/Page';
import { useTranslation } from 'react-i18next';

const MainPage = (): JSX.Element => {
    const { t } = useTranslation('main');

    return <Page data-testid="MainPage">{t('Главная страница')}</Page>;
};

export default MainPage;
