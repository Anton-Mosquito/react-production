import { type JsxAttribute, Project, SyntaxKind, type Node } from 'ts-morph';

const removedFeatureName = process.argv[2]; // example: 'isArticleEnabled'
const featureState = process.argv[3];      // example off/on

const toggleFunctionName = 'toggleFeatures';
const toggleComponentName = 'ToggleFeatures';

if (!removedFeatureName || !featureState) {
  throw new Error('Please provide the feature name and the state of the feature');
  // console.error('Please provide the feature name and the state of the feature');
  // process.exit(1);
}

if(!featureState.match(/on|off/)) {
  throw new Error('Please provide the feature state as on or off');
  // console.error('Please provide the feature state as on or off');
  // process.exit(1);
}

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();


function isToggleFunction(node: Node): boolean {
  let isToggleFeatures = false;
  node.forEachChild((child) => {
    if (child.isKind(SyntaxKind.Identifier) && child.getText() === toggleFunctionName) {
      isToggleFeatures = true
    }
  });

  return isToggleFeatures;
}

function isToggleComponent(node: Node): boolean {
  const identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier)

  return identifier?.getText() === toggleComponentName;
}

const replaceToggleFunction = (node: Node): void => {
  const objectOptions = node.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression);

  if (!objectOptions) return 

  const featureNameProperty = objectOptions.getProperty('name')
  const onFunctionProperty = objectOptions.getProperty('on')
  const offFunctionProperty = objectOptions.getProperty('off')

  const onFunction = onFunctionProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction)
  const offFunction = offFunctionProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction)
  const featureName = featureNameProperty
    ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
    ?.getText()
    .slice(1, -1);
    
  if (featureName !== removedFeatureName) return;

  if(featureState === 'on') {
    node.replaceWithText(onFunction?.getBody().getText() ?? '');
  }

  if(featureState === 'off') {
    node.replaceWithText(offFunction?.getBody().getText() ?? '');
  }
}

const getAttributeNodeByName = (jsxAttributes: JsxAttribute[], name: string): JsxAttribute | undefined => {
  return jsxAttributes.find((node) => node.getNameNode().getText() === name);
};

const getReplacedComponent = (attribute?: JsxAttribute): string | undefined => {
  const value = attribute
      ?.getFirstDescendantByKind(SyntaxKind.JsxExpression)
      ?.getExpression()
      ?.getText();

  if (value?.startsWith('(')) {
      return value.slice(1, -1);
  }

  return value;
};

const replaceComponent = (node: Node): void => {
  const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute);

  const onAttribute = getAttributeNodeByName(attributes, 'on');
  const offAttribute = getAttributeNodeByName(attributes, 'off');

  const featureNameAttribute = getAttributeNodeByName(attributes, 'feature');
  const featureName = featureNameAttribute
      ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
      ?.getText()
      ?.slice(1, -1);

  if (featureName !== removedFeatureName) return;

  const offValue = getReplacedComponent(offAttribute);
  const onValue = getReplacedComponent(onAttribute);

  if (featureState === 'on' && onValue) {
      node.replaceWithText(onValue);
  }

  if (featureState === 'off' && offValue) {
      node.replaceWithText(offValue);
  }
};

files.forEach((sourceFile) => {
  sourceFile.forEachDescendant((node) => {
    if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
      replaceToggleFunction(node)
    }

    if (node.isKind(SyntaxKind.JsxSelfClosingElement) && isToggleComponent(node)) {
      replaceComponent(node)
    }
  });
});

void project.save();
