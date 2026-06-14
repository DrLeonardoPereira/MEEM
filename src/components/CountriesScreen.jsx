import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { Globe, ArrowLeft, ArrowRight, Shuffle } from 'lucide-react'

function CountriesScreen() {
  const navigate = useNavigate()
  const { setAnswer } = useGame()
  const [selectedCountry, setSelectedCountry] = useState(null)

  const paises = [
    { value: 'Brasil', label: 'Brasil' },
    { value: 'Argentina', label: 'Argentina' },
    { value: 'Estados Unidos', label: 'Estados Unidos' },
    { value: 'França', label: 'França' },
    { value: 'Alemanha', label: 'Alemanha' },
    { value: 'Japão', label: 'Japão' },
    { value: 'China', label: 'China' },
    { value: 'Reino Unido', label: 'Reino Unido' },
    { value: 'Canadá', label: 'Canadá' },
    { value: 'Austrália', label: 'Austrália' }
  ]

  const [shuffledCountries, setShuffledCountries] = useState(() => {
    const shuffled = [...paises]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  })

  const handleCountrySelect = (country) => {
    setSelectedCountry(country.value)
    setAnswer('pais', country.value)
  }

  const handleContinue = () => {
    if (selectedCountry !== null) {
      navigate('/estados')
    }
  }

  const handleReshuffle = () => {
    const shuffled = [...paises]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    setShuffledCountries(shuffled)
    setSelectedCountry(null)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          <button
            onClick={() => navigate('/resultado-bloco1')}
            className="flex items-center text-gray-500 hover:text-gray-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary-100 p-3 rounded-xl">
              <Globe className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              Selecione o País
            </h2>
          </div>
          
          <p className="text-gray-500 mb-8">
            Os países estão embaralhados. Selecione o Brasil.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            {shuffledCountries.map((country) => (
              <button
                key={country.value}
                onClick={() => handleCountrySelect(country)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 font-medium ${
                  selectedCountry === country.value
                    ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-lg'
                    : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50 text-gray-700'
                }`}
              >
                {country.label}
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
              disabled={selectedCountry === null}
              className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continuar
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
            <span>Bloco 2 - Pergunta</span>
            <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full font-medium">1</span>
            <span>de 4</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CountriesScreen
