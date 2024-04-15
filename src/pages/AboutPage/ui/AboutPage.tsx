import { Page } from '@/widgets/Page';
import { useTranslation } from 'react-i18next';

const AboutPage = (): JSX.Element => {
    const { t } = useTranslation('about');

    return <Page data-testid={'AboutPage'}>{t('O сайте')}</Page>;
};

export default AboutPage;
