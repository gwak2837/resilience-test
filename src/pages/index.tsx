import styled from 'styled-components'
import NavigationLayout from '../components/layouts/NavigationLayout'
import PageHead from '../components/layouts/PageHead'
import { FlexContainerAlignCenter, focusInExpandFwd } from 'src/components/atoms/Styles'
import { SecondaryButton } from 'src/components/atoms/Button'
import Footer from 'src/components/Footer'
import useGoToPage from 'src/hooks/useGoToPage'

const LocationText = styled.h3`
  margin: 1rem;
  font-size: 1.1rem;
  font-weight: bold;
  text-align: center;
`

export const SquareFrame = styled.div`
  padding-top: 100%;
  position: relative;
`

const StartButton = styled(SecondaryButton)`
  animation: ${focusInExpandFwd} 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`

const FlexContainerColumnCenter = styled(FlexContainerAlignCenter)`
  flex-flow: column nowrap;
  margin: 1rem 0;
`

const StartEffectTag = styled(LocationText)`
  animation: ${focusInExpandFwd} 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  text-align: center;
`

function HomePage() {
  const goToTestsPage = useGoToPage('/test')

  return (
    <PageHead>
      <NavigationLayout>
        <FlexContainerColumnCenter>
          <FlexContainerAlignCenter>
            <StartEffectTag>나의 회복 탄력성은 얼마나 될까?</StartEffectTag>
          </FlexContainerAlignCenter>
          <StartButton onClick={goToTestsPage}>회복 탄력성 검사 시작</StartButton>
        </FlexContainerColumnCenter>
        <Footer />
      </NavigationLayout>
    </PageHead>
  )
}

export default HomePage
