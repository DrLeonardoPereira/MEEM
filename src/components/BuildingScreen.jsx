import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { Building, ArrowLeft, ArrowRight } from 'lucide-react'

function BuildingScreen() {
  const navigate = useNavigate()
  const { setAnswer } = useGame()
  const [selectedBuilding, setSelectedBuilding] = useState(null)

  const construcoes = [
    { value: 'Casa', label: 'Casa', icon: '🏠' },
    { value: 'Barraco', label: 'Barraco', icon: '🏚️' },
    { value: 'Delegacia', label: 'Delegacia', icon: '🏢' },
    { value: 'Hospital', label: 'Hospital', icon: '🏥' },
    { value: 'Universidade', label: 'Universidade', icon: '🎓' },
    { value: 'Circo', label: 'Circo', icon: '🎪' }
  ]

  const handleBuildingSelect = (building) => {
    setSelectedBuilding(building.value)
    setAnswer('construcao', building.value)
  }

  const handleContinue = () => {
    if (selectedBuilding !== null) {
      navigate('/dia-noite')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          <button
            onClick={() => navigate('/estados')}
            className="flex items-center text-gray-500 hover:text-gray-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary-100 p-3 rounded-xl">
              <Building className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              Em que tipo de construção você se encontra?
            </h2>
          </div>
          
          <p className="text-gray-500 mb-8">
            Selecione o tipo de construção correto
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            {construcoes.map((building) => (
              <button
                key={building.value}
                onClick={() => handleBuildingSelect(building)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 font-medium ${
                  selectedBuilding === building.value
                    ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-lg transform scale-105'
                    : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50 text-gray-700'
                }`}
              >
                <div className="text-4xl mb-2">{building.icon}</div>
                <div className="text-lg">{building.label}</div>
              </button>
            ))}
          </div>
          
          <button
            onClick={handleContinue}
            disabled={selectedBuilding === null}
            className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            Continuar
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
            <span>Bloco 2 - Pergunta</span>
            <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full font-medium">3</span>
            <span>de 4</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuildingScreen
