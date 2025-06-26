const fs = require('fs');
const path = require('path');

const examplesDir = path.join(__dirname, '../examples');
const storiesDir = path.join(__dirname, './stories');

if (!fs.existsSync(storiesDir)) {
  fs.mkdirSync(storiesDir, { recursive: true });
}

const storyTemplate = (componentPath, storyTitle, exportName) => `
  import React, { useEffect, useState } from 'react';
  import { Meta, StoryFn } from '@storybook/react';

  const ExampleComponent = ({ file }) => {
    const [component, setComponent] = useState<React.ReactElement | null>(null);
    console.log('Loading component', \`../../examples/\${file}\`);

    useEffect(() => {
      
      import(\`../../examples/\${file}\`).then(({ default: App }) => {
        setComponent(
          <React.StrictMode>
            <App />
          </React.StrictMode>
        );
      });
    }, [file]);

    return component;
  };

  export default {
    title: '${storyTitle}',
    component: ExampleComponent,
  } as Meta;

  export const ${exportName}: StoryFn = () => <ExampleComponent file="${componentPath}" />;
`;

const processDirectory = (currentDir) => {
  fs.readdirSync(currentDir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(currentDir, entry.name);
    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.tsx')) {
      const relativePath = path.relative(examplesDir, fullPath).replace(/\\/g, '/');
      const storyName = path.basename(entry.name, '.tsx').replace(/^\d+-|-/g, '');
      const storyFileName = `${relativePath.split('/')[1]}-${storyName}.stories.tsx`;
      const storyPath = path.join(storiesDir, storyFileName);
      const storyTitle = relativePath.substring(0, relativePath.lastIndexOf('/'));

      const storyContent = storyTemplate(relativePath, storyTitle, storyName);
      fs.writeFileSync(storyPath, storyContent.trim());
    }
  });
};

processDirectory(examplesDir);