import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { Trophy, Home, RefreshCw, CheckCircle2, XCircle, Download } from 'lucide-react'
import * as XLSX from 'xlsx'

function CombinedResultScreen() {
  const navigate = useNavigate()
  const { gameAnswers, calculateBlock1Score, calculateBlock2Score, calculateBlock3Score, calculateBlock4Score, calculateBlock5Score, calculateBlock6Score, calculateBlock7Score, calculateBlock8Score, calculateBlock9Score, calculateBlock10Score, calculateBlock11Score, calculateTotalScore } = useGame()
  
  const block1Score = calculateBlock1Score()
  const block2Score = calculateBlock2Score()
  const block3Score = calculateBlock3Score()
  const block4Score = calculateBlock4Score()
  const block5Score = calculateBlock5Score()
  const block6Score = calculateBlock6Score()
  const block7Score = calculateBlock7Score()
  const block8Score = calculateBlock8Score()
  const block9Score = calculateBlock9Score()
  const block10Score = calculateBlock10Score()
  const block11Score = calculateBlock11Score()
  const totalScore = calculateTotalScore()
  const totalQuestions = 29.06
  
  const getScoreColor = (score, max) => {
    const percentage = (score / max) * 100
    if (percentage >= 75) return 'text-green-600'
    if (percentage >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getOverallMessage = () => {
    const percentage = (totalScore / totalQuestions) * 100
    if (percentage === 100) return 'Perfeito! Você acertou tudo!'
    if (percentage >= 80) return 'Excelente! Desempenho muito bom!'
    if (percentage >= 60) return 'Muito bem! Continue assim!'
    if (percentage >= 40) return 'Bom! Você pode melhorar!'
    return 'Continue praticando!'
  }

  const handleExportToExcel = () => {
    const now = new Date()
    const dateStr = now.toLocaleDateString('pt-BR')
    const timeStr = now.toLocaleTimeString('pt-BR')
    
    // Save current result to localStorage
    const currentResult = {
      'Nome': gameAnswers.nome || '',
      'Idade': gameAnswers.idade || '',
      'Escolaridade': gameAnswers.escolaridade || '',
      'Data da Partida': dateStr,
      'Horário da Partida': timeStr,
      'Bloco 1 - Orientação Temporal': block1Score,
      'Bloco 2 - Conhecimento Geral': block2Score,
      'Bloco 3 - Memória de Palavras': block3Score,
      'Bloco 4 - Desafio Matemático': block4Score,
      'Bloco 5 - Memória de Palavras': block5Score,
      'Bloco 6 - Identificação de Imagens': block6Score,
      'Bloco 7 - Reconhecimento de Fala': block7Score,
      'Bloco 8 - Instruções e Fala': block8Score,
      'Bloco 9 - Reconhecimento de Fala': block9Score,
      'Bloco 10 - Ordenação de Frase': block10Score,
      'Bloco 11 - Encaixe de Pentágonos': block11Score,
      'Pontuação Total': totalScore,
      'Pontuação Máxima': totalQuestions,
      'Porcentagem de Acertos': `${Math.round((totalScore / totalQuestions) * 100)}%`
    }
    
    // Get existing results from localStorage
    const existingResults = JSON.parse(localStorage.getItem('meemResults') || '[]')
    existingResults.push(currentResult)
    localStorage.setItem('meemResults', JSON.stringify(existingResults))
    
    // Export all results to Excel
    const worksheet = XLSX.utils.json_to_sheet(existingResults)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Resultados')
    
    const fileName = `MEEM_Resultados_Todos_${dateStr.replace(/\//g, '-')}_${timeStr.replace(/:/g, '-')}.xlsx`
    XLSX.writeFile(workbook, fileName)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-full">
              <Trophy className="w-16 h-16 text-yellow-600" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
            Resultado Completo
          </h2>
          
          <div className="text-center mb-8">
            <div className={`text-7xl font-bold ${getScoreColor(totalScore, totalQuestions)} mb-2`}>
              {totalScore}/{totalQuestions}
            </div>
            <p className="text-gray-600 font-medium text-xl">
              {getOverallMessage()}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            <div className="bg-gradient-to-br from-violet-50 to-purple-100 rounded-2xl p-4">
              <h3 className="font-semibold text-gray-700 mb-2 text-center text-xs">Bloco 1 - Orientação Temporal</h3>
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(block1Score, 5)} mb-1`}>
                  {block1Score}/5
                </div>
                <p className="text-xs text-gray-600">
                  {Math.round((block1Score / 5) * 100)}% de acertos
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-violet-100 to-purple-200 rounded-2xl p-4">
              <h3 className="font-semibold text-gray-700 mb-2 text-center text-xs">Bloco 2 - Conhecimento Geral</h3>
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(block2Score, 4)} mb-1`}>
                  {block2Score}/4
                </div>
                <p className="text-xs text-gray-600">
                  {Math.round((block2Score / 4) * 100)}% de acertos
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-2xl p-4">
              <h3 className="font-semibold text-gray-700 mb-2 text-center text-xs">Bloco 3 - Memória de Palavras</h3>
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(block3Score, 3.06)} mb-1`}>
                  {block3Score}/3.06
                </div>
                <p className="text-xs text-gray-600">
                  {Math.round((block3Score / 3.06) * 100)}% de acertos
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-violet-50 to-fuchsia-100 rounded-2xl p-4">
              <h3 className="font-semibold text-gray-700 mb-2 text-center text-xs">Bloco 4 - Desafio Matemático</h3>
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(block4Score, 5)} mb-1`}>
                  {block4Score}/5
                </div>
                <p className="text-xs text-gray-600">
                  {Math.round((block4Score / 5) * 100)}% de acertos
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-100 to-violet-200 rounded-2xl p-4">
              <h3 className="font-semibold text-gray-700 mb-2 text-center text-xs">Bloco 5 - Memória de Palavras</h3>
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(block5Score, 3)} mb-1`}>
                  {block5Score}/3
                </div>
                <p className="text-xs text-gray-600">
                  {Math.round((block5Score / 3) * 100)}% de acertos
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-violet-100 to-purple-100 rounded-2xl p-4">
              <h3 className="font-semibold text-gray-700 mb-2 text-center text-xs">Bloco 6 - Identificação de Imagens</h3>
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(block6Score, 2)} mb-1`}>
                  {block6Score}/2
                </div>
                <p className="text-xs text-gray-600">
                  {Math.round((block6Score / 2) * 100)}% de acertos
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-fuchsia-50 to-violet-100 rounded-2xl p-4">
              <h3 className="font-semibold text-gray-700 mb-2 text-center text-xs">Bloco 7 - Reconhecimento de Fala</h3>
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(block7Score, 1)} mb-1`}>
                  {block7Score}/1
                </div>
                <p className="text-xs text-gray-600">
                  {Math.round((block7Score / 1) * 100)}% de acertos
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-fuchsia-100 rounded-2xl p-4">
              <h3 className="font-semibold text-gray-700 mb-2 text-center text-xs">Bloco 8 - Instruções e Fala</h3>
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(block8Score, 3)} mb-1`}>
                  {block8Score}/3
                </div>
                <p className="text-xs text-gray-600">
                  {Math.round((block8Score / 3) * 100)}% de acertos
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-4">
              <h3 className="font-semibold text-gray-700 mb-2 text-center text-xs">Bloco 9 - Reconhecimento de Fala</h3>
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(block9Score, 1)} mb-1`}>
                  {block9Score}/1
                </div>
                <p className="text-xs text-gray-600">
                  {Math.round((block9Score / 1) * 100)}% de acertos
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-fuchsia-100 to-violet-200 rounded-2xl p-4">
              <h3 className="font-semibold text-gray-700 mb-2 text-center text-xs">Bloco 10 - Ordenação de Frase</h3>
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(block10Score, 1)} mb-1`}>
                  {block10Score}/1
                </div>
                <p className="text-xs text-gray-600">
                  {Math.round((block10Score / 1) * 100)}% de acertos
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-100 to-fuchsia-100 rounded-2xl p-4">
              <h3 className="font-semibold text-gray-700 mb-2 text-center text-xs">Bloco 11 - Encaixe de Pentágonos</h3>
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(block11Score, 1)} mb-1`}>
                  {block11Score}/1
                </div>
                <p className="text-xs text-gray-600">
                  {Math.round((block11Score / 1) * 100)}% de acertos
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-violet-50 to-purple-100 rounded-2xl p-6 mb-8">
            <h3 className="font-semibold text-gray-700 mb-4 text-center">Desempenho Geral</h3>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div
                className="bg-gradient-to-r from-violet-500 to-purple-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${(totalScore / totalQuestions) * 100}%` }}
              />
            </div>
            <p className="text-center text-gray-600">
              {Math.round((totalScore / totalQuestions) * 100)}% de acertos no total
            </p>
          </div>
          
          <div className="flex gap-3 mb-6">
            <button
              onClick={handleExportToExcel}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Download className="w-5 h-5" />
              Exportar Excel (Todos)
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl border-2 border-violet-300 hover:border-violet-400 hover:bg-violet-50 transition-all duration-300 font-semibold text-gray-700"
            >
              <Home className="w-5 h-5" />
              Início
            </button>
            
            <button
              onClick={() => navigate('/dias-embaralhados')}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl border-2 border-violet-300 hover:border-violet-400 hover:bg-violet-50 transition-all duration-300 font-semibold text-gray-700"
            >
              <RefreshCw className="w-5 h-5" />
              Jogar Novamente
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CombinedResultScreen
