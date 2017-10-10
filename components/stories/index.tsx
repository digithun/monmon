import * as React from 'react'
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Layout from '../Layout'
import { InputTextMultiline } from '../common/Input'

storiesOf('Thread', module)
  .addDecorator((story) => (
    <Layout>{story()}</Layout>
  ))
  .add('Input', () => {
    return (
      <InputTextMultiline />
    )
  })
