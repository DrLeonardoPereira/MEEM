import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { Sun, Moon, ArrowLeft, ArrowRight } from 'lucide-react'

function DayNightScreen() {
  const navigate = useNavigate()
  const { setAnswer } = useGame()
  const [selectedOption, setSelectedOption] = useState(null)

  const opcoes = [
    { value: 'Dia', label: 'Dia', icon: <Sun className="w-12 h-12" /> },
    { value: 'Noite', label: 'Noite', icon: <Moon className="w-12 h-12" /> }
  ]

  const handleSelect = (option) => {
    setSelectedOption(option.value)
    setAnswer('diaNoite', option.value)
  }

  const handleContinue = () => {
    if (selectedOption !== null) {
      navigate('/resultado-bloco2')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          <button
            onClick={() => navigate('/construcao')}
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
              Está de dia ou de noite?
            </h2>
          </div>
          
          <p className="text-gray-500 mb-8">
            Selecione a opção correta
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            {opcoes.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`p-8 rounded-2xl border-2 transition-all duration-300 font-medium flex flex-col items-center gap-4 ${
                  selectedOption === option.value
                    ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-lg transform scale-105'
                    : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50 text-gray-700'
                }`}
              >
                {option.icon}
                <div className="text-xl">{option.label}</div>
              </button>
            ))}
          </div>
          
          <button
            onClick={handleContinue}
            disabled={selectedOption === null}
            className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            Ver Resultado do Bloco 2
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
            <span>Bloco 2 - Pergunta</span>
            <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full font-medium">4</span>
            <span>de 4</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DayNightScreen
