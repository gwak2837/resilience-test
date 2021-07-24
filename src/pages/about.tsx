import PageHead from 'src/components/layouts/PageHead'
import styled from 'styled-components'
import NavigationLayout from '../components/layouts/NavigationLayout'

const H2 = styled.h2`
  text-align: center;
  margin: 1rem;
`

const Table = styled.table`
  width: 100%;
`

const PaddingCenterTd = styled.td`
  text-align: center;
  padding: 0.5rem;
`

const description = 'XXX의 구성원을 확인해보세요.'

function AboutPage() {
  return (
    <PageHead title="회복 탄력성 검사 - 팀 소개" description={description}>
      <NavigationLayout>
        <H2>팀 소개</H2>

        <Table>
          <thead>
            <tr>
              <PaddingCenterTd>이름</PaddingCenterTd>
              <PaddingCenterTd>이메일</PaddingCenterTd>
              <PaddingCenterTd>GitHub</PaddingCenterTd>
            </tr>
          </thead>
          <tbody>
            <tr>
              <PaddingCenterTd>곽태욱</PaddingCenterTd>
              <PaddingCenterTd>gwak2837@kakao.com</PaddingCenterTd>
              <PaddingCenterTd>
                <a href="https://github.com/rmfpdlxmtidl" target="_blank" rel="noreferrer">
                  @rmfpdlxmtidl
                </a>
              </PaddingCenterTd>
            </tr>
          </tbody>
        </Table>
      </NavigationLayout>
    </PageHead>
  )
}

export default AboutPage
