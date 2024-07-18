import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleTextBlockComponent.module.scss';
import { memo } from 'react';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { type ArticleTextBlock } from '../../model/types/article';
import { ToggleFeatures } from '@/shared/lib/features';

interface ArticleTextBlockComponentProps {
    className?: string;
    block: ArticleTextBlock;
}

const ArticleTextBlockComponent = memo(
    ({ className, block }: ArticleTextBlockComponentProps): JSX.Element => {
        return (
            <div
                className={classNames(cls.ArticleTextBlockComponent, {}, [
                    className,
                ])}
            >
                {block.title && (
                    <ToggleFeatures
                        feature="isAppRedesigned"
                        on={<Text className={cls.title} title={block.title} />}
                        off={
                            <TextDeprecated
                                className={cls.title}
                                title={block.title}
                            />
                        }
                    />
                )}
                {block.paragraphs.map(paragraph => (
                    <ToggleFeatures
                        key={paragraph}
                        feature="isAppRedesigned"
                        on={
                            <Text
                                key={paragraph}
                                className={cls.paragraph}
                                text={paragraph}
                            />
                        }
                        off={
                            <TextDeprecated
                                key={paragraph}
                                className={cls.paragraph}
                                text={paragraph}
                            />
                        }
                    />
                ))}
            </div>
        );
    },
);

ArticleTextBlockComponent.displayName = 'ArticleTextBlockComponent';

export { ArticleTextBlockComponent };
