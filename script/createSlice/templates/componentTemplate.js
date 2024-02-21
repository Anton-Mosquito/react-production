const interfaceConst = 'interface';

module.exports = (componentName) => `import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './${componentName}.module.scss';
import { memo } from 'react';

${interfaceConst} ${componentName}Props {
    className?: string;
}

const ${componentName} = memo(({ className }: ${componentName}Props) => {
    const { t } = useTranslation();
    
    return (
        <div className={classNames(cls.${componentName}, {}, [className])}>
        
        </div>
    );
});

${componentName}.displayName = ${componentName};

export {${componentName}}
`;


