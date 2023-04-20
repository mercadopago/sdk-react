import React, { useEffect, useState } from 'react';
import { storiesOf } from '@storybook/react';

const ExampleComponent = ({ file }) => {
  const [component, setComponent] = useState<any>(null);

  useEffect(() => {
    import(`../examples/${file}`).then(({ default: App }) => {
      setComponent(
        <React.StrictMode>
          <App />
        </React.StrictMode>,
      );
    });
  }, []);
  return component;
};

const addExamplePage = (directory, file, stories) => {
  const name = file.replace('.tsx', '').split('-').slice(1).join(' ');
  stories.add(name, () => <ExampleComponent file={`${directory}/${file}`} />);
};

require
  .context('../examples/bricks', true)
  .keys()
  .forEach((key) => {
    const splitKeys = key.split('/');
    addExamplePage(`bricks/${splitKeys[1]}`, splitKeys[2], storiesOf(splitKeys[1], module));
  });
