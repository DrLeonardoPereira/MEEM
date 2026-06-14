import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { Calendar, ArrowLeft, ArrowRight, Shuffle } from 'lucide-react'

function ShuffledDays() {
  const navigate = useNavigate()
  const { setAnswer } = useGame()
  const [selectedDay, setSelectedDay] = useState(null)

  const diasSemana = [
    { value: 0, label: 'Domingo' },
    { value: 1, label: 'Segunda-feira' },
    { value: 2, label: 'Terça-feira' },
    { value: 3, label: 'Quarta-feira' },
    { value: 4, label: 'Quinta-feira' },
    { value: 5, label: 'Sexta-feira' },
    { value: 6, label: 'Sábado' }
  ]

  const [shuffledDays, setShuffledDays] = useState(() => {
    const shuffled = [...diasSemana]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  })

  const handleDaySelect = (day) => {
    setSelectedDay(day.value)
    setAnswer('diaSemana', day.value)
  }

  const handleContinue = () => {
    if (selectedDay !== null) {
      navigate('/ano')
    }
  }

  const handleReshuffle = () => {
    const shuffled = [...diasSemana]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    setShuffledDays(shuffled)
    setSelectedDay(null)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          <button
            onClick={() => navigate('/orientacao')}
            className="flex items-center text-gray-500 hover:text-gray-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary-100 p-3 rounded-xl">
              <Calendar className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              Selecione o Dia da Semana
            </h2>
          </div>
          
          <p className="text-gray-500 mb-8">
            Os dias estão embaralhados. Selecione o dia correto de hoje.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {shuffledDays.map((day) => (
              <button
                key={day.value}
                onClick={() => handleDaySelect(day)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 font-medium ${
                  selectedDay === day.value
                    ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-lg'
                    : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50 text-gray-700'
                }`}
              >
                {day.label}
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
              disabled={selectedDay === null}
              className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continuar
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
            <span>Pergunta</span>
            <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full font-medium">2</span>
            <span>de 5</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShuffledDays
