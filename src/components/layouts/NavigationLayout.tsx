import { ReactNode } from 'react'
import ClientSideLink from 'src/components/atoms/ClientSideLink'
import { FlexContainerBetweenCenter } from 'src/components/atoms/Styles'
import styled from 'styled-components'

export const FlexContainerPadding = styled(FlexContainerBetweenCenter)`
  div > a {
    margin: 1rem;
  }

  margin: 1rem;
`

type Props = {
  children: ReactNode
  login?: boolean
  register?: boolean
  home?: boolean
}

function NavigationLayout({ children }: Props) {
  return (
    <>
      <FlexContainerPadding>
        <ClientSideLink href="/">홈</ClientSideLink>
        <div />
      </FlexContainerPadding>
      {children}
    </>
  )
}

export default NavigationLayout
