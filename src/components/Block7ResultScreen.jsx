import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { Trophy, RefreshCw, ArrowRight, CheckCircle2, XCircle } from 'lucide-react'

function Block7ResultScreen() {
  const navigate = useNavigate()
  const { gameAnswers, calculateBlock7Score } = useGame()
  
  const score = calculateBlock7Score()
  const correctPhrase = 'Nem aqui, nem ali, nem lá'
  const isCorrect = score === 1

  const getScoreColor = () => {
    if (isCorrect) return 'text-green-600'
    return 'text-red-600'
  }

  const getScoreMessage = () => {
    if (isCorrect) return 'Excelente! Pronúncia correta!'
    return 'Não foi possível identificar a frase corretamente.'
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
            Resultado do Bloco 7
          </h2>
          
          <div className="text-center mb-8">
            <div className={`text-6xl font-bold ${getScoreColor()} mb-2`}>
              {score}/1
            </div>
            <p className="text-gray-600 font-medium">
              {getScoreMessage()}
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 mb-8">
            <h3 className="font-semibold text-gray-700 mb-4 text-center">Detalhes da Resposta</h3>
            
            <div className={`flex items-center justify-between p-3 rounded-xl ${
              isCorrect ? 'bg-green-50' : 'bg-red-50'
            }`}>
              <div className="flex items-center gap-3">
                {isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
                <div>
                  <p className="font-medium text-gray-700">Frase esperada</p>
                  <p className="text-sm text-gray-500">
                    {correctPhrase}
                  </p>
                </div>
              </div>
              {isCorrect && (
                <div className="text-right">
                  <p className="text-sm text-green-600 font-medium">
                    +1
                  </p>
                </div>
              )}
            </div>
            
            {gameAnswers.fala && (
              <div className="mt-3 p-3 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Sua resposta:</p>
                <p className="text-gray-700">{gameAnswers.fala}</p>
              </div>
            )}
          </div>
          
          <button
            onClick={() => navigate('/imagem3')}
            className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
          >
            Continuar para Bloco 8
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <div className="mt-4">
            <button
              onClick={() => navigate('/fala')}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl border-2 border-gray-300 hover:border-primary-400 hover:bg-gray-50 transition-all duration-300 font-semibold text-gray-700"
            >
              <RefreshCw className="w-5 h-5" />
              Tentar Bloco 7 Novamente
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Block7ResultScreen
