import { Progress } from 'antd'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { PrimaryButton } from 'src/components/atoms/Button'
import { FlexContainerColumn, Padding } from 'src/components/atoms/Styles'
import NavigationLayout from 'src/components/layouts/NavigationLayout'
import PageHead from 'src/components/layouts/PageHead'
import useGoToPage from 'src/hooks/useGoToPage'
import { GlobalContext, UserAnswers } from 'src/pages/_app'
import styled from 'styled-components'
import useSWR from 'swr'
import { Response } from 'src/pages/api/result'
import { PRIMARY_TEXT_COLOR } from 'src/models/constants'

const Padding2 = styled.div`
  padding: 2rem;
`

const Score = styled.h3`
  text-align: center;
  font-size: 3rem;
`

const ScoreName = styled.h3`
  text-align: center;
  font-size: 2rem;
`

const ScoreContent = styled.p`
  text-align: center;
  padding: 0 1rem;
`

const GradeText = styled.h3`
  text-align: center;
  font-size: 2rem;
`

const Table = styled.table`
  width: 100%;

  th,
  td {
    padding: 0.5rem;
    text-align: center;
    white-space: nowrap;
    border: 2px solid ${PRIMARY_TEXT_COLOR};
  }
`

const GreyDel = styled.s`
  color: grey;
`

const Green = styled.div`
  color: green;
`

const Red = styled.div`
  color: red;
`

const FlexContainerColumnPadding = styled(FlexContainerColumn)`
  padding: 1rem;
`

export const gradientBlueGreen = {
  '0%': '#108ee9',
  '100%': '#87d068',
}

function fetchOnlyIfAnswersExist(answers: UserAnswers) {
  if (answers.length === 0) return null
  return '/api/result'
}

function compareScoreWithAverage(score: number) {
  return score > 195
    ? `한국인 평균 대비 ${score - 195}점 높습니다`
    : score < 195
    ? `한국인 평균 대비 ${195 - score}점 낮습니다`
    : '한국인 평균과 같습니다.'
}

const description = '회복 탄력성 검사 결과를 확인해보세요.'

// const answers = [...new Array(53).keys()].map((i) => ({
//   questionId: `${i}`,
//   answer: 3,
// }))

function TestResultPage() {
  const { answers } = useContext(GlobalContext)

  const goToTestPage = useGoToPage(`/test`)

  const { data, error } = useSWR<Response>(fetchOnlyIfAnswersExist(answers), async (url) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers }),
    })
    return await response.json()
  })

  if (answers.length === 0) {
    return (
      <PageHead title="회복 탄력성 검사 - 결과" description={description}>
        <NavigationLayout>
          <Padding>
            <h2 style={{ textAlign: 'center' }}>결과 없음</h2>
            <br />
            <p>모든 문항에 응답해주셔야 결과를 볼 수 있어요.</p>
          </Padding>
          <FlexContainerColumnPadding>
            <PrimaryButton onClick={goToTestPage}>회복 탄력성 검사 하기</PrimaryButton>
          </FlexContainerColumnPadding>
        </NavigationLayout>
      </PageHead>
    )
  }

  return (
    <PageHead title="회복 탄력성 검사 - 결과" description={description}>
      <NavigationLayout>
        <Padding>
          <h2 style={{ textAlign: 'center' }}>회복 탄력성 검사 결과</h2>

          {data ? (
            <>
              <Padding2>
                <Progress
                  format={() => `${Math.round((data.score * 100) / 265)}%`}
                  percent={(data.score * 100) / 265}
                  status="active"
                  strokeColor={gradientBlueGreen}
                />
              </Padding2>
              <Score>{data.score}점</Score>
              <div style={{ textAlign: 'center' }}>{compareScoreWithAverage(data.score)}</div>
              <br />
              <ScoreName>{data.scoreName}</ScoreName>
              <ScoreContent>{data.scoreContent}</ScoreContent>
              <Padding2 />
              <div>
                <div>자기 조절 능력: {data.selfControlScore} (성인 평균 63.5점)</div>
                <div>{data.selfControlContent}</div>
                감정조절력 {data.emotionalControlScore}점 압박과 스트레스 상황에서도 평온을 유지할
                수 있는 능력 <br />
                충동통제력 {data.impulseControlScore}점 자신의 동기를 스스로 부여하고 조절할 수 있는
                능력 <br />
                원인분석력 {data.causeAnalysisScore}점 문제를 긍정적으로 바라보고 해결책을 정확히
                진단해 내는 능력
              </div>
              <br />
              <div>
                <div>대인 관계 능력: {data.interpersonalAbilityScore} (성인 평균 67.8점)</div>
                <div>{data.interpersonalAbilityContent}</div>
                소통능력 {data.communicationScore}점 인간관계를 진지하게 맺고 오래도록 유지하는 능력
                <br />
                공감능력 {data.empathyScore}점 다른 사람의 심리나 감정상태를 잘 읽어낼 수 있는 능력{' '}
                <br />
                자아확장력 {data.selfExtensionScore}점 자기 자신이 다른 사람과 연결되어 있다고
                느끼는 정도
              </div>
              <br />
              <div>
                <div>긍정성: {data.affirmativeScore} (성인 평균 63.4점)</div>
                <div>{data.affirmativeContent}</div>
                자아낙관성 {data.selfOptimismScore}점 주어진 상황은 언젠간 좋아지리라는 믿음을
                지니는 정도 <br />
                생활만족도 {data.lifeSatisfactionScore}점 자신이 잘 할 수 있는 일을 통해 즐거움과
                성취, 보람을 느끼는 정도 <br />
                감사하기 {data.appreciationScore}점 매사에 감사하는 마음을 갖는 정도 (긍정심리학의
                최상위)
              </div>
            </>
          ) : error ? (
            '네트워크 요청 오류'
          ) : (
            '모의고사 채점 중..'
          )}
        </Padding>
        <FlexContainerColumnPadding>
          <PrimaryButton onClick={goToTestPage}>다시 검사하기</PrimaryButton>
        </FlexContainerColumnPadding>
      </NavigationLayout>
    </PageHead>
  )
}

export default TestResultPage
