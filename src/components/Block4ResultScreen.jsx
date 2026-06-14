import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { Trophy, RefreshCw, ArrowRight, CheckCircle2, XCircle } from 'lucide-react'

function Block4ResultScreen() {
  const navigate = useNavigate()
  const { gameAnswers, calculateBlock4Score } = useGame()
  
  const score = calculateBlock4Score()
  const correctAnswers = {
    calculo1: 98,
    calculo2: 95,
    calculo3: 93,
    calculo4: 91,
    calculo5: 84
  }

  const results = [
    {
      question: '100 - 2',
      userAnswer: gameAnswers.calculo1 !== null ? gameAnswers.calculo1 : 'Não respondido',
      correctAnswer: correctAnswers.calculo1,
      isCorrect: gameAnswers.calculo1 === correctAnswers.calculo1
    },
    {
      question: '100 - 5',
      userAnswer: gameAnswers.calculo2 !== null ? gameAnswers.calculo2 : 'Não respondido',
      correctAnswer: correctAnswers.calculo2,
      isCorrect: gameAnswers.calculo2 === correctAnswers.calculo2
    },
    {
      question: '100 - 7',
      userAnswer: gameAnswers.calculo3 !== null ? gameAnswers.calculo3 : 'Não respondido',
      correctAnswer: correctAnswers.calculo3,
      isCorrect: gameAnswers.calculo3 === correctAnswers.calculo3
    },
    {
      question: '93 - 2',
      userAnswer: gameAnswers.calculo4 !== null ? gameAnswers.calculo4 : 'Não respondido',
      correctAnswer: correctAnswers.calculo4,
      isCorrect: gameAnswers.calculo4 === correctAnswers.calculo4
    },
    {
      question: '91 - 7',
      userAnswer: gameAnswers.calculo5 !== null ? gameAnswers.calculo5 : 'Não respondido',
      correctAnswer: correctAnswers.calculo5,
      isCorrect: gameAnswers.calculo5 === correctAnswers.calculo5
    }
  ]

  const getScoreColor = () => {
    const percentage = (score / 5) * 100
    if (percentage >= 75) return 'text-green-600'
    if (percentage >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreMessage = () => {
    const percentage = (score / 5) * 100
    if (percentage === 100) return 'Excelente! Todas as respostas corretas!'
    if (percentage >= 75) return 'Muito bom! Você acertou a maioria!'
    if (percentage >= 50) return 'Bom! Continue praticando!'
    return 'Não desista! Tente novamente!'
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-full">
              <Trophy className="w-16 h-16 text-yellow-600" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
            Resultado do Bloco 4
          </h2>
          
          <div className="text-center mb-8">
            <div className={`text-6xl font-bold ${getScoreColor()} mb-2`}>
              {score}/5
            </div>
            <p className="text-gray-600 font-medium">
              {getScoreMessage()}
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 mb-8">
            <h3 className="font-semibold text-gray-700 mb-4 text-center">Detalhes das Respostas</h3>
            
            <div className="space-y-3">
              {results.map((result, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-xl ${
                    result.isCorrect ? 'bg-green-50' : 'bg-red-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {result.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <div>
                      <p className="font-medium text-gray-700">{result.question}</p>
                      <p className="text-sm text-gray-500">
                        Sua resposta: {result.userAnswer}
                        {!result.isCorrect && ` (Correto: ${result.correctAnswer})`}
                      </p>
                    </div>
                  </div>
                  {result.isCorrect && (
                    <div className="text-right">
                      <p className="text-sm text-green-600 font-medium">
                        +1
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={() => navigate('/palavras4')}
            className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
          >
            Continuar para Bloco 5
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <div className="mt-4">
            <button
              onClick={() => navigate('/calculo1')}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl border-2 border-gray-300 hover:border-primary-400 hover:bg-gray-50 transition-all duration-300 font-semibold text-gray-700"
            >
              <RefreshCw className="w-5 h-5" />
              Tentar Bloco 4 Novamente
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Block4ResultScreen
