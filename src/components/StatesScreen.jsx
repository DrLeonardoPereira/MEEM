import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { Map, ArrowLeft, ArrowRight, Shuffle } from 'lucide-react'

function StatesScreen() {
  const navigate = useNavigate()
  const { setAnswer } = useGame()
  const [selectedState, setSelectedState] = useState(null)

  const estados = [
    { value: 'Distrito Federal', label: 'Distrito Federal' },
    { value: 'São Paulo', label: 'São Paulo' },
    { value: 'Rio de Janeiro', label: 'Rio de Janeiro' },
    { value: 'Minas Gerais', label: 'Minas Gerais' },
    { value: 'Bahia', label: 'Bahia' },
    { value: 'Paraná', label: 'Paraná' },
    { value: 'Rio Grande do Sul', label: 'Rio Grande do Sul' },
    { value: 'Pernambuco', label: 'Pernambuco' },
    { value: 'Ceará', label: 'Ceará' },
    { value: 'Goiás', label: 'Goiás' }
  ]

  const [shuffledStates, setShuffledStates] = useState(() => {
    const shuffled = [...estados]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  })

  const handleStateSelect = (state) => {
    setSelectedState(state.value)
    setAnswer('estado', state.value)
  }

  const handleContinue = () => {
    if (selectedState !== null) {
      navigate('/construcao')
    }
  }

  const handleReshuffle = () => {
    const shuffled = [...estados]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    setShuffledStates(shuffled)
    setSelectedState(null)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          <button
            onClick={() => navigate('/paises')}
            className="flex items-center text-gray-500 hover:text-gray-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary-100 p-3 rounded-xl">
              <Map className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              Selecione o Estado
            </h2>
          </div>
          
          <p className="text-gray-500 mb-8">
            Os estados estão embaralhados. Selecione o Distrito Federal.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            {shuffledStates.map((state) => (
              <button
                key={state.value}
                onClick={() => handleStateSelect(state)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 font-medium ${
                  selectedState === state.value
                    ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-lg'
                    : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50 text-gray-700'
                }`}
              >
                {state.label}
              </button>
            ))}
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={handleReshuffle}
              className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl border-2 border-gray-300 hover:border-primary-400 hover:bg-gray-50 transition-all duration-300 font-semibold text-gray-700"
            >
              <Shuffle className="w-5 h-5" />
              Embaralhar
            </button>
            
            <button
              onClick={handleContinue}
              disabled={selectedState === null}
              className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continuar
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
            <span>Bloco 2 - Pergunta</span>
            <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full font-medium">2</span>
            <span>de 4</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatesScreen
