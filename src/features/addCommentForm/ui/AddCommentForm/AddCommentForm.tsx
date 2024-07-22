import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AddCommentForm.module.scss';
import { useTranslation } from 'react-i18next';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Input } from '@/shared/ui/redesigned/Input';
import {
    Button as ButtonDeprecated,
    ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';
import { useSelector } from 'react-redux';
import { getAddCommentFormText } from '../../model/selectors/addCommentFormSelectors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    addCommentFormActions,
    addCommentFormReducer,
} from '../../model/slice/addCommentForm';
import {
    DynamicModuleLoader,
    type ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';

export interface AddCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
    addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo(
    ({ className, onSendComment }: AddCommentFormProps): JSX.Element => {
        const { t } = useTranslation();
        const text = useSelector(getAddCommentFormText);
        const dispatch = useAppDispatch();

        const onCommentTextChange = useCallback(
            (value: string) => {
                dispatch(addCommentFormActions.setText(value));
            },
            [dispatch],
        );

        const onSendHandler = useCallback(() => {
            onSendComment(text ?? '');
            onCommentTextChange('');
        }, [onSendComment, onCommentTextChange, text]);

        return (
            <DynamicModuleLoader reducers={reducers}>
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={
                        <Card padding="24" border="partial" max>
                            <HStack
                                data-testid="AddCommentForm"
                                className={classNames(
                                    cls.AddCommentFormRedesigned,
                                    {},
                                    [className],
                                )}
                                justify="between"
                                max
                                gap="16"
                            >
                                <Input
                                    data-testid="AddCommentForm.Input"
                                    className={cls.input}
                                    placeholder={t('Введите текст коментария')}
                                    value={text}
                                    onChange={onCommentTextChange}
                                />
                                <Button
                                    data-testid="AddCommentForm.Button"
                                    variant="outline"
                                    onClick={onSendHandler}
                                >
                                    {t('Отправить')}
                                </Button>
                            </HStack>
                        </Card>
                    }
                    off={
                        <HStack
                            data-testid="AddCommentForm"
                            className={classNames(cls.AddCommentForm, {}, [
                                className,
                            ])}
                            justify="between"
                            max
                        >
                            <InputDeprecated
                                data-testid="AddCommentForm.Input"
                                className={cls.input}
                                placeholder={t('Введите текст коментария')}
                                value={text}
                                onChange={onCommentTextChange}
                            />
                            <ButtonDeprecated
                                data-testid="AddCommentForm.Button"
                                theme={ThemeButton.OUTLINE}
                                onClick={onSendHandler}
                            >
                                {t('Отправить')}
                            </ButtonDeprecated>
                        </HStack>
                    }
                />
            </DynamicModuleLoader>
        );
    },
);

AddCommentForm.displayName = 'AddCommentForm';

export default AddCommentForm;
