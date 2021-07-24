import { Padding } from 'src/components/atoms/Styles'
import NavigationLayout from 'src/components/layouts/NavigationLayout'
import PageHead from 'src/components/layouts/PageHead'

const description = '아마존 마라탕 파티의 이용약관을 확인해보세요.'

function TermsOfServicePage() {
  return (
    <PageHead title="회복 탄력성 검사 - 이용약관" description={description}>
      <NavigationLayout>
        <Padding>
          <h2 style={{ textAlign: 'center' }}>이용약관</h2>
          <p>
            본 사이트에 있는 모든 문제지에 관한 저작권은{' '}
            <a
              href="https://www.kice.re.kr/boardCnts/list.do?boardID=1500234&m=0403&s=suneung"
              target="_blank"
              rel="noreferrer"
            >
              한국교육과정평가원
            </a>
            에 있습니다.
          </p>
          <p>
            한국교육과정평가원의 허락 없이 문제의 일부 또는 전부를 무단 복제, 배포, 출판, 전자출판
            하는 등 저작권을 침해하는 일체의 행위를 금합니다. 저작권을 침해하는 일체의 행위를
            금합니다.
          </p>
        </Padding>
      </NavigationLayout>
    </PageHead>
  )
}

export default TermsOfServicePage
