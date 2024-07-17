import { memo } from 'react';
import { ArticleDetails } from '@/entities/Article';
import { useParams } from 'react-router-dom';
import { Card } from '@/shared/ui/redesigned/Card';

interface DeteilsContainerProps {
    className?: string;
}

const DetailsContainer = memo(
    ({ className = '' }: DeteilsContainerProps): JSX.Element => {
        const { id } = useParams<{ id: string }>();
        return (
            <Card className={className} padding="24" border="round" max>
                <ArticleDetails id={id} />
            </Card>
        );
    },
);

DetailsContainer.displayName = 'DetailsContainer';

export { DetailsContainer };
