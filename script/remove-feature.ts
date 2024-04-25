import { Project, SyntaxKind, type Node } from 'ts-morph';

const removedFeatureName = process.argv[2]; // example: 'isArticleEnabled'
const featureState = process.argv[3];      // example off/on

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
    if(child.isKind(SyntaxKind.Identifier) && child.getText() === 'toggleFeature') {
      isToggleFeatures = true
    }
  });

  return isToggleFeatures;
}

files.forEach((sourceFile) => {
  sourceFile.forEachDescendant((node) => {
    if(node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
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
  });
});

void project.save();
