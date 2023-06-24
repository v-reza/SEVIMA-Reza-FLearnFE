import DataForm from '@/src/components/activeform/DataForm'
import React, { PropsWithChildren } from 'react'

const RootLayout = (props: PropsWithChildren) => {
  return (
    <DataForm>
      {props.children}
    </DataForm>
  )
}

export default RootLayout