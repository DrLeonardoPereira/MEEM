import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, Clock, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'

function OrientationTest() {
  const navigate = useNavigate()
  const [answers, setAnswers] = useState({
    data: '',
    dia: '',
    horas: ''
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const diasSemana = [
    { value: '', label: 'Selecione...' },
    { value: 'segunda', label: 'Segunda-feira' },
    { value: 'terca', label: 'Terça-feira' },
    { value: 'quarta', label: 'Quarta-feira' },
    { value: 'quinta', label: 'Quinta-feira' },
    { value: 'sexta', label: 'Sexta-feira' },
    { value: 'sabado', label: 'Sábado' },
    { value: 'domingo', label: 'Domingo' }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setAnswers(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!answers.data.trim()) {
      newErrors.data = 'Por favor, informe a data'
    }
    
    if (!answers.dia) {
      newErrors.dia = 'Por favor, selecione o dia da semana'
    }
    
    if (!answers.horas.trim()) {
      newErrors.horas = 'Por favor, informe as horas'
    }
    
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateForm()
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    
    setSubmitted(true)
    console.log('Respostas de orientação:', answers)
    
    setTimeout(() => {
      navigate('/dias-embaralhados')
    }, 2000)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-6 rounded-full">
                <CheckCircle2 className="w-16 h-16 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Respostas Registradas!
            </h2>
            <p className="text-gray-600">
              Suas respostas foram salvas com sucesso. Redirecionando...
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          <button
            onClick={() => navigate('/cadastro')}
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
              Teste de Orientação
            </h2>
          </div>
          
          <p className="text-gray-500 mb-8">
            Responda às perguntas sobre o momento atual
          </p>
          
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 mb-8">
            <p className="text-sm text-gray-600 text-center">
              Esta parte do teste avalia sua orientação temporal
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qual é a data de hoje?
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="data"
                  value={answers.data}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                    errors.data ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ex: 09/06/2026"
                />
              </div>
              {errors.data && (
                <p className="text-red-500 text-sm mt-1">{errors.data}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qual é o dia da semana hoje?
              </label>
              <select
                name="dia"
                value={answers.dia}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                  errors.dia ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                {diasSemana.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.dia && (
                <p className="text-red-500 text-sm mt-1">{errors.dia}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantas horas são agora?
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="horas"
                  value={answers.horas}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                    errors.horas ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ex: 18:45"
                />
              </div>
              {errors.horas && (
                <p className="text-red-500 text-sm mt-1">{errors.horas}</p>
              )}
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg"
            >
              Continuar
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
          
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
            <span>Pergunta</span>
            <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full font-medium">1</span>
            <span>de várias</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrientationTest
