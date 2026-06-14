import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react'

function PhraseOrdering() {
  const navigate = useNavigate()
  const { setAnswer } = useGame()
  
  const correctPhrase = 'Ela colocou café na xicára'
  const words = ['Ela', 'colocou', 'café', 'na', 'xicára']
  
  const [shuffledWords, setShuffledWords] = useState([...words].sort(() => Math.random() - 0.5))
  const [orderedWords, setOrderedWords] = useState([])
  
  const addToOrdered = (word, index) => {
    setShuffledWords(prev => prev.filter((_, i) => i !== index))
    setOrderedWords(prev => [...prev, word])
  }
  
  const removeFromOrdered = (word, index) => {
    setOrderedWords(prev => prev.filter((_, i) => i !== index))
    setShuffledWords(prev => [...prev, word])
  }
  
  const handleReset = () => {
    setShuffledWords([...words].sort(() => Math.random() - 0.5))
    setOrderedWords([])
  }
  
  const handleContinue = () => {
    const orderedPhrase = orderedWords.join(' ')
    setAnswer('fraseOrdenada', orderedPhrase)
    navigate('/resultado-bloco10')
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          <button
            onClick={() => navigate('/resultado-bloco9')}
            className="flex items-center text-gray-500 hover:text-gray-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </button>
          
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
            Organize a Frase
          </h2>
          
          <p className="text-gray-500 text-center mb-8">
            Clique nas palavras para organizá-las na ordem correta
          </p>
          
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 mb-6">
            <p className="text-sm text-gray-500 mb-2 text-center">Palavras disponíveis:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {shuffledWords.map((word, index) => (
                <button
                  key={index}
                  onClick={() => addToOrdered(word, index)}
                  className="px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-gray-800 font-medium"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-6">
            <p className="text-sm text-gray-500 mb-2 text-center">Sua frase:</p>
            <div className="flex flex-wrap gap-2 justify-center min-h-[60px]">
              {orderedWords.length === 0 ? (
                <p className="text-gray-400 italic">Clique nas palavras acima para adicioná-las aqui</p>
              ) : (
                orderedWords.map((word, index) => (
                  <button
                    key={index}
                    onClick={() => removeFromOrdered(word, index)}
                    className="px-4 py-2 bg-primary-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium"
                  >
                    {word}
                  </button>
                ))
              )}
            </div>
          </div>
          
          <div className="flex gap-3 mb-6">
            <button
              onClick={handleReset}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl border-2 border-gray-300 hover:border-primary-400 hover:bg-gray-50 transition-all duration-300 font-semibold text-gray-700"
            >
              <RefreshCw className="w-5 h-5" />
              Reiniciar
            </button>
            
            <button
              onClick={handleContinue}
              disabled={orderedWords.length !== words.length}
              className="flex-1 flex items-center justify-center gap-3 py-3 px-6 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Verificar
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
            <span>Bloco 10 - Ordenação de Frase</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhraseOrdering
