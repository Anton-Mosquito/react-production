import { Page } from '@/widgets/Page';
import { useTranslation } from 'react-i18next';

const ForbiddenPage = (): JSX.Element => {
    const { t } = useTranslation('about');

    return <Page data-testid="ForbiddenPage">{t('O сайте')}</Page>;
};

export default ForbiddenPage;
