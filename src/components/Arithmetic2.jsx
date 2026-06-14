import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { Calculator, ArrowLeft, ArrowRight } from 'lucide-react'

function Arithmetic2() {
  const navigate = useNavigate()
  const { setAnswer } = useGame()
  const [answer, setAnswerValue] = useState('')

  const handleContinue = () => {
    if (answer !== '') {
      setAnswer('calculo2', parseInt(answer))
      navigate('/calculo3')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          <button
            onClick={() => navigate('/calculo1')}
            className="flex items-center text-gray-500 hover:text-gray-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary-100 p-3 rounded-xl">
              <Calculator className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              Desafio Matemático
            </h2>
          </div>
          
          <p className="text-gray-500 mb-8">
            Resolva o cálculo abaixo
          </p>
          
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 mb-8 text-center">
            <p className="text-5xl font-bold text-gray-800 mb-4">
              100 - 5 = ?
            </p>
          </div>
          
          <input
            type="number"
            value={answer}
            onChange={(e) => setAnswerValue(e.target.value)}
            placeholder="Digite sua resposta"
            className="w-full p-4 rounded-xl border-2 border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all text-lg mb-6"
          />
          
          <button
            onClick={handleContinue}
            disabled={answer === ''}
            className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            Continuar
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
            <span>Bloco 4 - Cálculo</span>
            <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full font-medium">2</span>
            <span>de 5</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Arithmetic2
