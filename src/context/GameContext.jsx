import { createContext, useContext, useState } from 'react'

const GameContext = createContext()

export function GameProvider({ children }) {
  const [gameAnswers, setGameAnswers] = useState({
    diaSemana: null,
    ano: null,
    diaMes: null,
    mes: null,
    estacao: null,
    pais: null,
    estado: null,
    construcao: null,
    diaNoite: null,
    palavras1: [],
    palavras2: [],
    palavras3: [],
    calculo1: null,
    calculo2: null,
    calculo3: null,
    calculo4: null,
    calculo5: null,
    palavras4: [],
    imagem1: null,
    imagem2: null,
    fala: null,
    imagem3: null,
    imagem4: null,
    fala2: null,
    palmas: null,
    fraseOrdenada: null,
    pentagonos: []
  })

  const setAnswer = (question, value) => {
    setGameAnswers(prev => ({
      ...prev,
      [question]: value
    }))
  }

  const calculateBlock1Score = () => {
    const today = new Date()
    const correctAnswers = {
      diaSemana: today.getDay(),
      ano: today.getFullYear(),
      diaMes: today.getDate(),
      mes: today.getMonth(),
      estacao: Math.floor(today.getMonth() / 3)
    }

    let score = 0
    if (gameAnswers.diaSemana === correctAnswers.diaSemana) score++
    if (gameAnswers.ano === correctAnswers.ano) score++
    if (gameAnswers.diaMes === correctAnswers.diaMes) score++
    if (gameAnswers.mes === correctAnswers.mes) score++
    if (gameAnswers.estacao === correctAnswers.estacao) score++

    return score
  }

  const calculateBlock2Score = () => {
    const correctAnswers = {
      pais: 'Brasil',
      estado: 'Distrito Federal',
      construcao: 'Universidade',
      diaNoite: 'Dia'
    }

    let score = 0
    if (gameAnswers.pais === correctAnswers.pais) score++
    if (gameAnswers.estado === correctAnswers.estado) score++
    if (gameAnswers.construcao === correctAnswers.construcao) score++
    if (gameAnswers.diaNoite === correctAnswers.diaNoite) score++

    return score
  }

  const calculateTotalScore = () => {
    return calculateBlock1Score() + calculateBlock2Score() + calculateBlock3Score() + calculateBlock4Score() + calculateBlock5Score() + calculateBlock6Score() + calculateBlock7Score() + calculateBlock8Score() + calculateBlock9Score() + calculateBlock10Score() + calculateBlock11Score()
  }

  const calculateBlock11Score = () => {
    // 0.5 points per correctly placed pentagon (max 1 point)
    let score = 0
    if (gameAnswers.pentagonos && gameAnswers.pentagonos.length > 0) {
      gameAnswers.pentagonos.forEach(pentagon => {
        if (pentagon.correct) score += 0.5
      })
    }
    return score
  }

  const calculateBlock10Score = () => {
    const correctPhrase = 'Ela colocou café na xicára'
    if (gameAnswers.fraseOrdenada === correctPhrase) return 1
    return 0
  }

  const calculateBlock9Score = () => {
    const correctPhrase = 'lalala'
    if (gameAnswers.palmas && gameAnswers.palmas.toLowerCase().includes(correctPhrase)) {
      return 1
    }
    return 0
  }

  const calculateBlock8Score = () => {
    const correctAnswers = {
      imagem3: 'papel_dobrado_meio',
      imagem4: 'papel_chao'
    }
    // More flexible phrase matching - check for key words
    const keyWords = ['pegue', 'papel', 'mão', 'direita', 'dobre', 'meio', 'ponha', 'chão']
    let score = 0
    if (gameAnswers.imagem3 === correctAnswers.imagem3) score++
    if (gameAnswers.imagem4 === correctAnswers.imagem4) score++
    if (gameAnswers.fala2) {
      const lowerPhrase = gameAnswers.fala2.toLowerCase()
      const matchedWords = keyWords.filter(word => lowerPhrase.includes(word))
      if (matchedWords.length >= 5) score++
    }
    return score
  }

  const calculateBlock7Score = () => {
    const correctPhrase = 'nem aqui nem ali nem lá'
    if (gameAnswers.fala && gameAnswers.fala.toLowerCase().includes(correctPhrase)) {
      return 1
    }
    return 0
  }

  const calculateBlock6Score = () => {
    const correctAnswers = {
      imagem1: 'lapis',
      imagem2: 'relogio'
    }
    let score = 0
    if (gameAnswers.imagem1 === correctAnswers.imagem1) score++
    if (gameAnswers.imagem2 === correctAnswers.imagem2) score++
    return score
  }

  const calculateBlock5Score = () => {
    const correctWords = ['pote', 'ralo', 'anzol']
    let score = 0
    gameAnswers.palavras4.forEach(word => {
      if (word && correctWords.includes(word.toLowerCase())) score += 1
    })
    return score
  }

  const calculateBlock4Score = () => {
    const correctAnswers = {
      calculo1: 98,
      calculo2: 95,
      calculo3: 93,
      calculo4: 91,
      calculo5: 84
    }
    let score = 0
    if (gameAnswers.calculo1 === correctAnswers.calculo1) score++
    if (gameAnswers.calculo2 === correctAnswers.calculo2) score++
    if (gameAnswers.calculo3 === correctAnswers.calculo3) score++
    if (gameAnswers.calculo4 === correctAnswers.calculo4) score++
    if (gameAnswers.calculo5 === correctAnswers.calculo5) score++
    return score
  }

  const calculateBlock3Score = () => {
    const correctWords = ['pote', 'ralo', 'anzol']
    let score = 0
    
    // Screen 1
    gameAnswers.palavras1.forEach(word => {
      if (word && correctWords.includes(word.toLowerCase())) score += 0.34
    })
    
    // Screen 2
    gameAnswers.palavras2.forEach(word => {
      if (word && correctWords.includes(word.toLowerCase())) score += 0.34
    })
    
    // Screen 3
    gameAnswers.palavras3.forEach(word => {
      if (word && correctWords.includes(word.toLowerCase())) score += 0.34
    })
    
    return Math.round(score * 100) / 100
  }

  return (
    <GameContext.Provider value={{ gameAnswers, setAnswer, calculateBlock1Score, calculateBlock2Score, calculateBlock3Score, calculateBlock4Score, calculateBlock5Score, calculateBlock6Score, calculateBlock7Score, calculateBlock8Score, calculateBlock9Score, calculateBlock10Score, calculateBlock11Score, calculateTotalScore }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within GameProvider')
  }
  return context
}
