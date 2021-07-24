import { Radio, Space, RadioChangeEvent } from 'antd'
import { Question as TQuestion } from 'src/pages/api/questions/[id]'
import styled from 'styled-components'
import { Padding } from './atoms/Styles'

const MarginOl = styled.ol`
  padding: 1rem 0;
`

const choices = [
  { id: '1', content: '전혀 안그럼' },
  { id: '2', content: '그렇지 않음' },
  { id: '3', content: '보통임' },
  { id: '4', content: '약간 그러함' },
  { id: '5', content: '매우 그러함' },
]

type Props = {
  answer: number | null
  setAnswer: (answer: number | null) => void
  question: TQuestion
}

function Question({ answer, setAnswer, question }: Props) {
  function handleChange(e: RadioChangeEvent) {
    setAnswer(+e.target.value)
  }

  return (
    <Padding>
      <h4 style={{ height: '4rem' }}>{question.name}</h4>

      <MarginOl>
        <Radio.Group onChange={handleChange} value={answer}>
          <Space direction="vertical">
            {choices.map((choice) => (
              <Radio key={choice.id} value={+choice.id}>
                {choice.id}. {choice.content}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </MarginOl>
    </Padding>
  )
}

export default Question
