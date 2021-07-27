import { useRouter } from 'next/router'
import { useContext, useRef, useState } from 'react'
import PageHead from 'src/components/layouts/PageHead'
import { fetcher } from 'src/utils/commons'
import Question from 'src/components/Question'
import useSWR, { useSWRInfinite } from 'swr'
import { GlobalContext } from 'src/pages/_app'
import { toast } from 'react-toastify'
import { gradientBlueGreen } from './result'
import { Progress } from 'antd'
import { NoMarginH2, Padding } from 'src/components/atoms/Styles'
import { PrimaryButton } from 'src/components/atoms/Button'
import styled from 'styled-components'

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 6fr 1fr;
  gap: 1rem;
  align-items: center;

  padding: 0 1rem;

  h2 {
    text-align: center;
  }
`

const description = '회복 탄력성 검사를 풀어볼 수 있어요'

function TestPage() {
  const { answers, setAnswers } = useContext(GlobalContext)

  const router = useRouter()

  const wasTestFetched = useRef(false)

  const testResponse = useSWR(`/api/test`, fetcher, {
    isPaused: () => wasTestFetched.current,
    onSuccess: (data) => {
      wasTestFetched.current = true
      setAnswers(
        [...new Array(data.length).keys()].map((i) => ({ questionId: `${i}`, answer: null }))
      )
    },
  })

  const totalQuestionCount = testResponse.data?.length

  const [questionNumber, setQuestionNumber] = useState(1)
  const questionIndex = questionNumber - 1

  function getKey(pageIndex: number) {
    if (!testResponse.data || testResponse.error) return null

    return `/api/questions/${pageIndex + 1}`
  }

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher, { initialSize: 2 })

  function goPreviousQuestion() {
    setQuestionNumber((prev) => prev - 1)
  }

  function goNextQuestion() {
    if (questionNumber < totalQuestionCount) {
      if (answers[questionNumber - 1].answer !== null) {
        setQuestionNumber((prev) => prev + 1)
        if (questionNumber === size - 1) {
          setSize(size + 1)
        }
      } else {
        toast.warn('문항에 응답해주세요')
      }
    } else if (questionNumber === totalQuestionCount) {
      router.push(`/test/result`)
    }
  }

  function setAnswer(answer: number | null) {
    const newAnswers = [...answers]
    newAnswers[questionIndex].answer = answer
    setAnswers(newAnswers)
  }

  return (
    <PageHead title="회복 탄력성 검사 - 검사하기" description={description}>
      {data ? (
        <>
          <GridContainer>
            <PrimaryButton
              disabled={questionNumber === 1}
              loading={!data[questionIndex]}
              onClick={goPreviousQuestion}
            >
              이전
            </PrimaryButton>
            <NoMarginH2>회복 탄력성 검사</NoMarginH2>
            <PrimaryButton loading={!data[questionIndex]} onClick={goNextQuestion}>
              {questionNumber === totalQuestionCount ? '제출' : '다음'}
            </PrimaryButton>
          </GridContainer>

          {data[questionIndex] ? (
            <>
              <Padding>
                <Progress
                  format={() => `${questionNumber}/${totalQuestionCount}`}
                  percent={(questionNumber * 100) / totalQuestionCount}
                  status="normal"
                  strokeColor={gradientBlueGreen}
                />
              </Padding>

              <Question
                answer={answers[questionIndex].answer}
                setAnswer={setAnswer}
                question={data[questionIndex]}
              />
            </>
          ) : (
            '다음 문항 불러오는 중...'
          )}
        </>
      ) : error ? (
        '네트워크 요청 오류'
      ) : (
        '문항 불러오는 중...'
      )}
    </PageHead>
  )
}

export default TestPage
