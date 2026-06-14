import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { Sun, ArrowLeft, ArrowRight } from 'lucide-react'

function SeasonQuestion() {
  const navigate = useNavigate()
  const { setAnswer } = useGame()
  const [selectedSeason, setSelectedSeason] = useState(null)

  const estacoes = [
    { value: 0, label: 'Primavera', icon: '🌸' },
    { value: 1, label: 'Verão', icon: '☀️' },
    { value: 2, label: 'Outono', icon: '🍂' },
    { value: 3, label: 'Inverno', icon: '❄️' }
  ]

  const handleSeasonSelect = (season) => {
    setSelectedSeason(season.value)
    setAnswer('estacao', season.value)
  }

  const handleContinue = () => {
    if (selectedSeason !== null) {
      navigate('/resultado-bloco1')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          <button
            onClick={() => navigate('/mes')}
            className="flex items-center text-gray-500 hover:text-gray-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary-100 p-3 rounded-xl">
              <Sun className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              Em qual estação estamos?
            </h2>
          </div>
          
          <p className="text-gray-500 mb-8">
            Selecione a estação atual do ano
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            {estacoes.map((season) => (
              <button
                key={season.value}
                onClick={() => handleSeasonSelect(season)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 font-medium ${
                  selectedSeason === season.value
                    ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-lg transform scale-105'
                    : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50 text-gray-700'
                }`}
              >
                <div className="text-4xl mb-2">{season.icon}</div>
                <div className="text-lg">{season.label}</div>
              </button>
            ))}
          </div>
          
          <button
            onClick={handleContinue}
            disabled={selectedSeason === null}
            className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            Ver Resultado
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
            <span>Pergunta</span>
            <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full font-medium">5</span>
            <span>de 5</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeasonQuestion
