import type { NextApiRequest, NextApiResponse } from 'next'

type Answer = {
  questionId: string
  answer: number
}

function getScore(answers: Answer[]) {
  return answers.reduce((acc, cur) => acc + cur.answer, 0)
}

function getScoreName(score: number) {
  return score >= 201 ? '인재파' : score >= 181 ? '노력파' : '나약파'
}

function getScoreContent(score: number) {
  return score >= 221
    ? '웬만한 불행한 사건은 당신을 흔들지 못합니다!'
    : score >= 212
    ? '상위 20% 인재에 속합니다!'
    : score >= 201
    ? '안심할 수는 있지만, 상위 20%에 듭시다!'
    : score >= 191
    ? '우리는 보통 사람들! 인재가 됩시다!'
    : score >= 181
    ? '회복 탄력성을 높이기 위해 노력해야 합니다.'
    : score >= 171
    ? '사소한 부정적 사건에도 쉽게 영향받는 나는 나약한 존재!'
    : '깨지기 쉬운 유리알, 너무 쉽게 상처받고 치유하기 힘들어 어려운 나날이 될 수 있습니다.'
}

function getScoreSumationFromTo(answers: Answer[], from: number, to: number) {
  return answers.reduce(
    (acc, answer) =>
      +answer.questionId >= from && +answer.questionId <= to ? acc + answer.answer : acc,
    0
  )
}

function getSelfControlContent(selfControlScore: number) {
  return selfControlScore >= 75
    ? 'Great! 상위 7%이내'
    : selfControlScore >= 70
    ? '자기조절능력 양호'
    : selfControlScore <= 63
    ? '노력 필요'
    : selfControlScore <= 55
    ? '반드시 노력(하위 20%)'
    : ''
}

function getInterpersonalAbilityContent(interpersonalAbilityScore: number) {
  return interpersonalAbilityScore >= 80
    ? 'Great! 상위 6%이내'
    : interpersonalAbilityScore >= 74
    ? '대인 관계 양호'
    : interpersonalAbilityScore <= 67
    ? '노력 필요'
    : interpersonalAbilityScore <= 62
    ? '반드시 노력(하위 20%)'
    : ''
}

function getAffirmativeContent(affirmativeScore: number) {
  return affirmativeScore >= 75
    ? 'Great! 상위 7%이내'
    : affirmativeScore >= 70
    ? '긍정성에 별 문제 없음'
    : affirmativeScore <= 63
    ? '노력 필요'
    : affirmativeScore <= 56
    ? '반드시 노력(하위 20%)'
    : ''
}

export type Response = {
  score: number
  scoreName: string
  scoreContent: string
  emotionalControlScore: number
  impulseControlScore: number
  causeAnalysisScore: number
  selfControlScore: number
  selfControlContent: string
  communicationScore: number
  empathyScore: number
  selfExtensionScore: number
  interpersonalAbilityScore: number
  interpersonalAbilityContent: string
  selfOptimismScore: number
  lifeSatisfactionScore: number
  appreciationScore: number
  affirmativeScore: number
  affirmativeContent: string
}

function Result(req: NextApiRequest, res: NextApiResponse<Response>) {
  const answers = req.body.answers

  // type check
  // if(answers.forEach(answer => answer.answer instanceof number))

  const score = getScore(answers)
  const scoreName = getScoreName(score)
  const scoreContent = getScoreContent(score)

  const emotionalControlScore = getScoreSumationFromTo(answers, 1, 6)
  const impulseControlScore = getScoreSumationFromTo(answers, 7, 12)
  const causeAnalysisScore = getScoreSumationFromTo(answers, 13, 18)
  const selfControlScore = emotionalControlScore + impulseControlScore + causeAnalysisScore
  const selfControlContent = getSelfControlContent(selfControlScore)

  const communicationScore = getScoreSumationFromTo(answers, 19, 24)
  const empathyScore = getScoreSumationFromTo(answers, 25, 30)
  const selfExtensionScore = getScoreSumationFromTo(answers, 31, 36)
  const interpersonalAbilityScore = communicationScore + empathyScore + selfExtensionScore
  const interpersonalAbilityContent = getInterpersonalAbilityContent(interpersonalAbilityScore)

  const selfOptimismScore = getScoreSumationFromTo(answers, 37, 42)
  const lifeSatisfactionScore = getScoreSumationFromTo(answers, 43, 47)
  const appreciationScore = getScoreSumationFromTo(answers, 48, 53)
  const affirmativeScore = selfOptimismScore + lifeSatisfactionScore + appreciationScore
  const affirmativeContent = getAffirmativeContent(affirmativeScore)

  const response = {
    score,
    scoreName,
    scoreContent,
    emotionalControlScore,
    impulseControlScore,
    causeAnalysisScore,
    selfControlScore,
    selfControlContent,
    communicationScore,
    empathyScore,
    selfExtensionScore,
    interpersonalAbilityScore,
    interpersonalAbilityContent,
    selfOptimismScore,
    lifeSatisfactionScore,
    appreciationScore,
    affirmativeScore,
    affirmativeContent,
  }

  res.status(200).json(response)
}

export default Result
