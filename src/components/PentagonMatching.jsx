import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react'

function PentagonMatching() {
  const navigate = useNavigate()
  const { setAnswer } = useGame()
  
  // Pentagon SVG path
  const pentagonPath = "M 50 0 L 95 35 L 80 90 L 20 90 L 5 35 Z"
  
  // Shadow positions (overlapped)
  const shadows = [
    { id: 'shadow1', x: 150, y: 100, rotation: 0 },
    { id: 'shadow2', x: 200, y: 120, rotation: 0 }
  ]
  
  // Draggable pentagons (8 total, 2 fit the shadows with rotation 0)
  const [pentagons, setPentagons] = useState([
    { id: 'p1', x: 50, y: 300, rotation: 0, inShadow: null },      // Fits shadow1
    { id: 'p2', x: 120, y: 320, rotation: 0, inShadow: null },     // Fits shadow2
    { id: 'p3', x: 190, y: 290, rotation: 180, inShadow: null },   // Upside down
    { id: 'p4', x: 260, y: 310, rotation: 40, inShadow: null },    // 40° rotation
    { id: 'p5', x: 330, y: 300, rotation: 90, inShadow: null },    // 90° rotation
    { id: 'p6', x: 400, y: 320, rotation: 270, inShadow: null },   // 270° rotation
    { id: 'p7', x: 470, y: 290, rotation: 120, inShadow: null },   // 120° rotation
    { id: 'p8', x: 540, y: 310, rotation: 300, inShadow: null }    // 300° rotation
  ])
  
  const [draggedPentagon, setDraggedPentagon] = useState(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  
  const handleMouseDown = (e, pentagon) => {
    setDraggedPentagon(pentagon)
    setDragOffset({
      x: e.clientX - pentagon.x,
      y: e.clientY - pentagon.y
    })
  }
  
  const handleMouseMove = (e) => {
    if (!draggedPentagon) return
    
    const newX = e.clientX - dragOffset.x
    const newY = e.clientY - dragOffset.y
    
    setPentagons(prev => prev.map(p => 
      p.id === draggedPentagon.id 
        ? { ...p, x: newX, y: newY, inShadow: null }
        : p
    ))
  }
  
  const handleMouseUp = () => {
    if (!draggedPentagon) return
    
    // Check if pentagon is dropped in a shadow
    const pentagon = pentagons.find(p => p.id === draggedPentagon.id)
    if (!pentagon) {
      setDraggedPentagon(null)
      return
    }
    
    let inShadow = null
    shadows.forEach(shadow => {
      const dx = Math.abs(pentagon.x - shadow.x)
      const dy = Math.abs(pentagon.y - shadow.y)
      // More flexible tolerance (50px instead of 30px)
      if (dx < 50 && dy < 50) {
        inShadow = shadow.id
      }
    })
    
    setPentagons(prev => prev.map(p => 
      p.id === draggedPentagon.id 
        ? { ...p, inShadow }
        : p
    ))
    
    setDraggedPentagon(null)
  }
  
  const handleReset = () => {
    setPentagons([
      { id: 'p1', x: 50, y: 300, rotation: 0, inShadow: null },
      { id: 'p2', x: 120, y: 320, rotation: 0, inShadow: null },
      { id: 'p3', x: 190, y: 290, rotation: 180, inShadow: null },
      { id: 'p4', x: 260, y: 310, rotation: 40, inShadow: null },
      { id: 'p5', x: 330, y: 300, rotation: 90, inShadow: null },
      { id: 'p6', x: 400, y: 320, rotation: 270, inShadow: null },
      { id: 'p7', x: 470, y: 290, rotation: 120, inShadow: null },
      { id: 'p8', x: 540, y: 310, rotation: 300, inShadow: null }
    ])
  }
  
  const handleValidate = () => {
    // Check which pentagons are in shadows (p1 and p2 are the correct ones)
    // Just being in a shadow is enough, no rotation check needed
    const correctPentagons = ['p1', 'p2']
    const results = pentagons.map(p => ({
      id: p.id,
      correct: correctPentagons.includes(p.id) && p.inShadow !== null
    }))
    
    setAnswer('pentagonos', results)
    navigate('/resultado-bloco11')
  }
  
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="max-w-4xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          <button
            onClick={() => navigate('/resultado-bloco10')}
            className="flex items-center text-gray-500 hover:text-gray-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </button>
          
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
            Encaixe os Pentágonos
          </h2>
          
          <p className="text-gray-500 text-center mb-8">
            Arraste os pentágonos para as sombras correspondentes
          </p>
          
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 mb-6" style={{ height: '400px' }}>
            {/* Shadows */}
            {shadows.map(shadow => (
              <svg
                key={shadow.id}
                width="100"
                height="100"
                style={{
                  position: 'absolute',
                  left: shadow.x,
                  top: shadow.y,
                  transform: `rotate(${shadow.rotation}deg)`,
                  transformOrigin: 'center'
                }}
              >
                <path 
                  d={pentagonPath} 
                  fill="none"
                  stroke="#9ca3af"
                  strokeWidth="3"
                  strokeDasharray="5,5"
                />
              </svg>
            ))}
            
            {/* Draggable Pentagons */}
            {pentagons.map(pentagon => (
              <svg
                key={pentagon.id}
                width="100"
                height="100"
                style={{
                  position: 'absolute',
                  left: pentagon.x,
                  top: pentagon.y,
                  fill: 'none',
                  stroke: '#1f2937',
                  strokeWidth: 3,
                  cursor: 'grab',
                  opacity: draggedPentagon?.id === pentagon.id ? 0.8 : 1,
                  transform: `rotate(${pentagon.rotation}deg) ${draggedPentagon?.id === pentagon.id ? 'scale(1.1)' : 'scale(1)'}`,
                  transformOrigin: 'center',
                  transition: 'transform 0.1s'
                }}
                onMouseDown={(e) => handleMouseDown(e, pentagon)}
              >
                <path d={pentagonPath} />
              </svg>
            ))}
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
              onClick={handleValidate}
              className="flex-1 flex items-center justify-center gap-3 py-3 px-6 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Validar
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
            <span>Bloco 11 - Encaixe de Pentágonos</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PentagonMatching
