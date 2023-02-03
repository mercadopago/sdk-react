import { storiesOf } from '@storybook/react';
import React, { useEffect, useState } from 'react';

const ExampleComponent = ({ file }) => {
  const [example, setExample] = useState<any>(null);

  useEffect(() => {
    import(`../examples/${file}`).then(({ default: Example }) => {
      setExample(<Example />);
    });
  }, []);
  return example;
};

const addDemo = (directory, file, stories) => {
  const name = file.replace('.tsx', '').split('-').slice(1).join(' ');
  stories.add(name, () => <ExampleComponent file={`${directory}/${file}`} />);
};

const BricksExamples = storiesOf('Bricks Examples', module);
require
  .context('../examples/bricks/', false, /\/\d+-(.*).tsx$/)
  .keys()
  .forEach((key) => {
    addDemo('bricks', key.slice(2), BricksExamples);
  });
