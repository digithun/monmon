import * as React from 'react'

interface FormPropTypes {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export default class Form extends React.Component<FormPropTypes, {}> {
  public render() {
    const {value, onChange} = this.props
    return (
      <input value={value} onChange={onChange} />
    )
  }
}
