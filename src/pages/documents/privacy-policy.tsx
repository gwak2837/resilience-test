import { Padding } from 'src/components/atoms/Styles'
import NavigationLayout from 'src/components/layouts/NavigationLayout'
import PageHead from 'src/components/layouts/PageHead'
import styled from 'styled-components'

const GridContainer = styled.div`
  display: grid;
  gap: 1rem;
`

const description = 'XXX의 개인정보보호정책을 확인해보세요.'

function PrivacyPolicyPage() {
  return (
    <PageHead title="회복 탄력성 검사 - 개인정보보호정책" description={description}>
      <NavigationLayout>
        <Padding>
          <h2 style={{ textAlign: 'center' }}>개인정보보호정책</h2>
          <GridContainer>
            <h3>우리는 개인 정보를 보호하기 위해 최선을 다합니다.</h3>
            <div>
              사생활을 보장받을 권리는 모두가 누려야 할 기본적 인권입니다. 동시에 XXX의 핵심적인
              가치 중 하나죠. 당신이 사용하는 기기는 당신의 일상 다방면에 걸쳐 중요한 부분을
              차지합니다. 따라서 일상 경험 중에 무엇을, 누구와 공유할지에 대한 결정은 오직 당신만이
              내릴 수 있어야 합니다. XXX은 당신의 개인 정보를 보호하고, 사용자가 자신의 정보를 직접
              관리할 수 있도록 설계됩니다. 결코 쉽지만은 않은 작업이죠. 하지만 우리가 믿는 혁신을
              위해서는 마땅히 걸어야 할 길이라 생각합니다.
            </div>
            <h3>당신의 지난 테스트 기록은 그저 지나간 이야기일 뿐.</h3>
            <div>
              XXX 앱은 당신의 데이터를 당신의 XXX ID와 연관 짓지 않으며, 당신의 지난 테스트 기록은
              개인을 식별할 수 없게 익명화되어 통계 산정에만 쓰입니다.
            </div>
          </GridContainer>
        </Padding>
      </NavigationLayout>
    </PageHead>
  )
}

export default PrivacyPolicyPage
