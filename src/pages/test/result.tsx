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

const ScoreName = styled.h2`
  text-align: center;
  font-size: 4rem;
`

const ScoreContent = styled.h4`
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

const answers = [...new Array(53).keys()].map((i) => ({
  questionId: `${i}`,
  answer: 3,
}))

function TestResultPage() {
  // const { answers } = useContext(GlobalContext)

  const goToTestPage = useGoToPage(`/test`)

  const { data, error } = useSWR<Response>(fetchOnlyIfAnswersExist(answers), async (url) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers }),
    })
    return await response.json()
  })

  console.log(answers)

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

  console.log(data)

  return (
    <PageHead title="회복 탄력성 검사 - 결과" description={description}>
      <NavigationLayout>
        <Padding>
          <h2 style={{ textAlign: 'center' }}>회복 탄력성 검사 결과</h2>

          {data ? (
            <>
              <Padding2>
                <Progress
                  format={() => `${Math.round((data.score * 100) / (53 * 5))}%`}
                  percent={(data.score * 100) / (53 * 5)}
                  status="active"
                  strokeColor={gradientBlueGreen}
                />
              </Padding2>

              <ScoreName>
                {data.scoreName} {data.score}점
              </ScoreName>
              <span style={{ textAlign: 'center' }}>{compareScoreWithAverage(data.score)}</span>
              <ScoreContent>{data.scoreContent}</ScoreContent>
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
