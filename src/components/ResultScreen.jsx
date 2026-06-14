import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { Trophy, RefreshCw, ArrowRight, CheckCircle2, XCircle } from 'lucide-react'

function ResultScreen() {
  const navigate = useNavigate()
  const { gameAnswers, calculateBlock1Score } = useGame()
  
  const score = calculateBlock1Score()
  const totalQuestions = 5
  
  const today = new Date()
  const month = today.getMonth()
  const day = today.getDate()
  
  const getSeasonFromDate = (m, d) => {
    if ((m === 2 && d >= 20) || (m === 3) || (m === 4) || (m === 5 && d <= 20)) {
      return 2 // Outono: 20/03 a 20/06
    } else if ((m === 5 && d >= 21) || (m === 6) || (m === 7) || (m === 8 && d <= 21)) {
      return 3 // Inverno: 21/06 a 21/09
    } else if ((m === 8 && d >= 22) || (m === 9) || (m === 10) || (m === 11 && d <= 20)) {
      return 0 // Primavera: 22/09 a 20/12
    } else {
      return 1 // Verão: 21/12 a 19/03
    }
  }
  
  const correctAnswers = {
    diaSemana: today.getDay(),
    ano: today.getFullYear(),
    diaMes: today.getDate(),
    mes: today.getMonth(),
    estacao: getSeasonFromDate(month, day)
  }

  const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
  const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
  const estacoes = ['Primavera', 'Verão', 'Outono', 'Inverno']

  const results = [
    {
      question: 'Dia da semana',
      userAnswer: gameAnswers.diaSemana !== null ? diasSemana[gameAnswers.diaSemana] : 'Não respondido',
      correctAnswer: diasSemana[correctAnswers.diaSemana],
      isCorrect: gameAnswers.diaSemana === correctAnswers.diaSemana
    },
    {
      question: 'Ano',
      userAnswer: gameAnswers.ano !== null ? gameAnswers.ano : 'Não respondido',
      correctAnswer: correctAnswers.ano,
      isCorrect: gameAnswers.ano === correctAnswers.ano
    },
    {
      question: 'Dia do mês',
      userAnswer: gameAnswers.diaMes !== null ? gameAnswers.diaMes : 'Não respondido',
      correctAnswer: correctAnswers.diaMes,
      isCorrect: gameAnswers.diaMes === correctAnswers.diaMes
    },
    {
      question: 'Mês',
      userAnswer: gameAnswers.mes !== null ? meses[gameAnswers.mes] : 'Não respondido',
      correctAnswer: meses[correctAnswers.mes],
      isCorrect: gameAnswers.mes === correctAnswers.mes
    },
    {
      question: 'Estação',
      userAnswer: gameAnswers.estacao !== null ? estacoes[gameAnswers.estacao] : 'Não respondido',
      correctAnswer: estacoes[correctAnswers.estacao],
      isCorrect: gameAnswers.estacao === correctAnswers.estacao
    }
  ]

  const getScoreColor = () => {
    const percentage = (score / totalQuestions) * 100
    if (percentage >= 75) return 'text-green-600'
    if (percentage >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreMessage = () => {
    const percentage = (score / totalQuestions) * 100
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
            Resultado do Bloco 1
          </h2>
          
          <div className="text-center mb-8">
            <div className={`text-6xl font-bold ${getScoreColor()} mb-2`}>
              {score}/{totalQuestions}
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
                      </p>
                    </div>
                  </div>
                  {!result.isCorrect && (
                    <div className="text-right">
                      <p className="text-sm text-green-600 font-medium">
                        Correto: {result.correctAnswer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl border-2 border-gray-300 hover:border-primary-400 hover:bg-gray-50 transition-all duration-300 font-semibold text-gray-700"
            >
              <RefreshCw className="w-5 h-5" />
              Tentar Novamente
            </button>
            
            <button
              onClick={() => navigate('/paises')}
              className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Continuar para Bloco 2
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultScreen
