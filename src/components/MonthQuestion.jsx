import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { Calendar, ArrowLeft, ArrowRight } from 'lucide-react'

function MonthQuestion() {
  const navigate = useNavigate()
  const { setAnswer } = useGame()
  const [selectedMonth, setSelectedMonth] = useState(null)

  const meses = [
    { value: 0, label: 'Janeiro' },
    { value: 1, label: 'Fevereiro' },
    { value: 2, label: 'Março' },
    { value: 3, label: 'Abril' },
    { value: 4, label: 'Maio' },
    { value: 5, label: 'Junho' },
    { value: 6, label: 'Julho' },
    { value: 7, label: 'Agosto' },
    { value: 8, label: 'Setembro' },
    { value: 9, label: 'Outubro' },
    { value: 10, label: 'Novembro' },
    { value: 11, label: 'Dezembro' }
  ]

  const handleMonthSelect = (month) => {
    setSelectedMonth(month.value)
    setAnswer('mes', month.value)
  }

  const handleContinue = () => {
    if (selectedMonth !== null) {
      navigate('/estacao')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          <button
            onClick={() => navigate('/dia-mes')}
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
              Em qual mês estamos?
            </h2>
          </div>
          
          <p className="text-gray-500 mb-8">
            Selecione o mês atual
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {meses.map((month) => (
              <button
                key={month.value}
                onClick={() => handleMonthSelect(month)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 font-medium ${
                  selectedMonth === month.value
                    ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-lg'
                    : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50 text-gray-700'
                }`}
              >
                {month.label}
              </button>
            ))}
          </div>
          
          <button
            onClick={handleContinue}
            disabled={selectedMonth === null}
            className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            Continuar
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
            <span>Pergunta</span>
            <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full font-medium">4</span>
            <span>de 5</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MonthQuestion
