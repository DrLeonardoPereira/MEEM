import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { BookOpen, ArrowLeft, ArrowRight } from 'lucide-react'

function WordRecall1() {
  const navigate = useNavigate()
  const { setAnswer } = useGame()
  const [selectedWords, setSelectedWords] = useState([])

  const todasPalavras = [
    'pote', 'ralo', 'anzol',
    'mesa', 'cadeira', 'livro', 'caneta', 'copo',
    'janela', 'porta', 'chave', 'relógio', 'telefone'
  ]

  const [shuffledWords, setShuffledWords] = useState(() => {
    const shuffled = [...todasPalavras]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  })

  const handleWordSelect = (word) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter(w => w !== word))
    } else if (selectedWords.length < 3) {
      setSelectedWords([...selectedWords, word])
    }
  }

  const handleContinue = () => {
    if (selectedWords.length === 3) {
      setAnswer('palavras1', selectedWords)
      navigate('/palavras2')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          <button
            onClick={() => navigate('/resultado-bloco2')}
            className="flex items-center text-gray-500 hover:text-gray-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary-100 p-3 rounded-xl">
              <BookOpen className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              Selecione 3 Palavras
            </h2>
          </div>
          
          <p className="text-gray-500 mb-2">
            Escolha 3 palavras das opções abaixo
          </p>
          
          <div className="mb-6 flex items-center justify-center gap-2">
            <span className="text-sm text-gray-500">Selecionadas:</span>
            <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full font-medium">
              {selectedWords.length}/3
            </span>
          </div>
          
          <div className="grid grid-cols-3 gap-3 mb-8">
            {shuffledWords.map((word) => (
              <button
                key={word}
                onClick={() => handleWordSelect(word)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 font-medium capitalize ${
                  selectedWords.includes(word)
                    ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-lg'
                    : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50 text-gray-700'
                }`}
              >
                {word}
              </button>
            ))}
          </div>
          
          <button
            onClick={handleContinue}
            disabled={selectedWords.length !== 3}
            className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            Continuar
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
            <span>Bloco 3 - Tela</span>
            <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full font-medium">1</span>
            <span>de 3</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WordRecall1
