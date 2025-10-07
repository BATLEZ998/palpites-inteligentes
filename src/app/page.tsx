"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Brain, 
  Target, 
  TrendingUp, 
  BarChart3, 
  MessageCircle,
  Trophy,
  Calendar,
  Clock,
  Zap,
  Activity,
  Percent,
  Users,
  Goal,
  Timer,
  Shield,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  AlertTriangle,
  Star,
  Cpu,
  Database,
  Eye,
  RefreshCw,
  Crown,
  Lock,
  Sparkles,
  TrendingDown,
  Flame,
  Award,
  Bell,
  BarChart,
  LineChart,
  PieChart
} from 'lucide-react'

// Dados dos jogos com previsões detalhadas do robô
const matches = [
  {
    id: 1,
    homeTeam: "Real Madrid",
    awayTeam: "Barcelona", 
    league: "La Liga",
    date: "Hoje",
    time: "16:00",
    status: "upcoming",
    // Previsões do robô
    predictions: {
      finalResult: {
        homeWin: 68,
        draw: 19,
        awayWin: 13,
        confidence: 94
      },
      totalGoals: {
        over25: 78,
        under25: 22,
        exact: "3 gols",
        confidence: 89
      },
      bothTeamsScore: {
        yes: 82,
        no: 18,
        confidence: 91
      },
      winOrDraw: {
        homeWinOrDraw: 87,
        awayWinOrDraw: 32,
        confidence: 88
      },
      handicap: {
        homeMinusOne: 65,
        homePlusOne: 95,
        confidence: 86
      },
      firstGoal: {
        home: 71,
        away: 29,
        confidence: 83
      },
      exactScore: {
        home: 2,
        away: 1,
        confidence: 76
      },
      goalScorers: [
        { player: "Benzema", probability: 68, team: "home" },
        { player: "Vinícius Jr.", probability: 54, team: "home" },
        { player: "Lewandowski", probability: 41, team: "away" },
        { player: "Raphinha", probability: 32, team: "away" }
      ]
    },
    // Previsões Premium (percentagens mais altas)
    premiumPredictions: {
      finalResult: {
        homeWin: 89,
        draw: 8,
        awayWin: 3,
        confidence: 98
      },
      totalGoals: {
        over25: 96,
        under25: 4,
        exact: "4 gols",
        confidence: 97
      },
      bothTeamsScore: {
        yes: 97,
        no: 3,
        confidence: 98
      },
      firstGoal: {
        home: 94,
        away: 6,
        confidence: 97
      },
      exactScore: {
        home: 3,
        away: 0,
        confidence: 93
      },
      goalScorers: [
        { player: "Benzema", probability: 94, team: "home" },
        { player: "Vinícius Jr.", probability: 83, team: "home" },
        { player: "Lewandowski", probability: 18, team: "away" },
        { player: "Raphinha", probability: 9, team: "away" }
      ],
      specialInsights: [
        "Análise de micro-padrões: Real Madrid 97% dominante nos primeiros 15min",
        "IA detecta fadiga extrema do Barcelona após Champions League",
        "Probabilidade de cartão vermelho: 31% (Gavi ou Araujo)",
        "Momento ideal para gol: Entre 12-22min (89% probabilidade)"
      ]
    },
    analysis: {
      keyFactors: [
        "Real Madrid invicto em casa há 12 jogos",
        "Barcelona com 3 desfalques importantes",
        "Histórico favorável ao Real (7W-2D-1L últimos 10)",
        "Condições climáticas ideais"
      ],
      aiInsight: "Robô detecta superioridade clara do Real Madrid. Ataque potente vs defesa fragilizada do Barcelona. Recomendação: vitória Real Madrid com mais de 2.5 gols.",
      riskLevel: "Baixo",
      lastUpdate: "há 5 minutos"
    }
  },
  {
    id: 2,
    homeTeam: "Manchester City",
    awayTeam: "Liverpool",
    league: "Premier League", 
    date: "Hoje",
    time: "18:30",
    status: "upcoming",
    predictions: {
      finalResult: {
        homeWin: 52,
        draw: 28,
        awayWin: 20,
        confidence: 79
      },
      totalGoals: {
        over25: 85,
        under25: 15,
        exact: "4 gols",
        confidence: 92
      },
      bothTeamsScore: {
        yes: 89,
        no: 11,
        confidence: 95
      },
      winOrDraw: {
        homeWinOrDraw: 80,
        awayWinOrDraw: 48,
        confidence: 81
      },
      handicap: {
        homeMinusOne: 38,
        homePlusOne: 87,
        confidence: 74
      },
      firstGoal: {
        home: 58,
        away: 42,
        confidence: 71
      },
      exactScore: {
        home: 2,
        away: 2,
        confidence: 68
      },
      goalScorers: [
        { player: "Haaland", probability: 74, team: "home" },
        { player: "De Bruyne", probability: 45, team: "home" },
        { player: "Salah", probability: 62, team: "away" },
        { player: "Núñez", probability: 38, team: "away" }
      ]
    },
    premiumPredictions: {
      finalResult: {
        homeWin: 81,
        draw: 14,
        awayWin: 5,
        confidence: 96
      },
      totalGoals: {
        over25: 98,
        under25: 2,
        exact: "5 gols",
        confidence: 99
      },
      bothTeamsScore: {
        yes: 99,
        no: 1,
        confidence: 99
      },
      firstGoal: {
        home: 87,
        away: 13,
        confidence: 95
      },
      exactScore: {
        home: 4,
        away: 1,
        confidence: 91
      },
      goalScorers: [
        { player: "Haaland", probability: 97, team: "home" },
        { player: "De Bruyne", probability: 79, team: "home" },
        { player: "Salah", probability: 64, team: "away" },
        { player: "Núñez", probability: 31, team: "away" }
      ],
      specialInsights: [
        "Padrão histórico: 100% dos últimos 8 clássicos tiveram +4 gols",
        "Haaland nunca ficou sem marcar contra Liverpool em casa (100% record)",
        "Salah tem 64% de chance de marcar em Etihad (dados premium)",
        "Probabilidade de pênalti: 78% (VAR analysis premium)"
      ]
    },
    analysis: {
      keyFactors: [
        "Ambas equipes com ataques letais",
        "Defesas vulneráveis em jogos grandes",
        "Histórico de jogos com muitos gols",
        "Motivação máxima de ambos os lados"
      ],
      aiInsight: "Clássico equilibrado com alta probabilidade de gols. Ambas equipes marcam quase certeza. Empate ou vitória apertada do City.",
      riskLevel: "Médio",
      lastUpdate: "há 3 minutos"
    }
  },
  {
    id: 3,
    homeTeam: "Bayern Munich",
    awayTeam: "Borussia Dortmund",
    league: "Bundesliga",
    date: "Amanhã", 
    time: "15:30",
    status: "upcoming",
    predictions: {
      finalResult: {
        homeWin: 75,
        draw: 16,
        awayWin: 9,
        confidence: 91
      },
      totalGoals: {
        over25: 82,
        under25: 18,
        exact: "3 gols",
        confidence: 87
      },
      bothTeamsScore: {
        yes: 71,
        no: 29,
        confidence: 84
      },
      winOrDraw: {
        homeWinOrDraw: 91,
        awayWinOrDraw: 25,
        confidence: 93
      },
      handicap: {
        homeMinusOne: 58,
        homePlusOne: 96,
        confidence: 89
      },
      firstGoal: {
        home: 78,
        away: 22,
        confidence: 86
      },
      exactScore: {
        home: 3,
        away: 1,
        confidence: 81
      },
      goalScorers: [
        { player: "Kane", probability: 79, team: "home" },
        { player: "Musiala", probability: 56, team: "home" },
        { player: "Bellingham", probability: 34, team: "away" },
        { player: "Reus", probability: 28, team: "away" }
      ]
    },
    premiumPredictions: {
      finalResult: {
        homeWin: 95,
        draw: 4,
        awayWin: 1,
        confidence: 99
      },
      totalGoals: {
        over25: 98,
        under25: 2,
        exact: "5 gols",
        confidence: 98
      },
      bothTeamsScore: {
        yes: 92,
        no: 8,
        confidence: 96
      },
      firstGoal: {
        home: 97,
        away: 3,
        confidence: 99
      },
      exactScore: {
        home: 5,
        away: 1,
        confidence: 96
      },
      goalScorers: [
        { player: "Kane", probability: 98, team: "home" },
        { player: "Musiala", probability: 87, team: "home" },
        { player: "Bellingham", probability: 14, team: "away" },
        { player: "Reus", probability: 8, team: "away" }
      ],
      specialInsights: [
        "Kane tem 100% de aproveitamento nos últimos 6 Der Klassiker",
        "Bayern nunca perdeu em casa para Dortmund com Kane no elenco",
        "Análise térmica: Dortmund 67% menos intenso fora de casa",
        "Momento crítico: 55-70min (Bayern marca 91% dos gols decisivos)"
      ]
    },
    analysis: {
      keyFactors: [
        "Bayern dominante em casa (85% vitórias)",
        "Dortmund instável fora de casa",
        "Kane em forma excepcional",
        "Superioridade técnica evidente"
      ],
      aiInsight: "Bayern amplamente favorito. Dortmund sem poder de reação fora de casa. Vitória confortável esperada com Kane marcando.",
      riskLevel: "Muito Baixo",
      lastUpdate: "há 8 minutos"
    }
  }
]

// Estatísticas do robô
const robotStats = {
  overallAccuracy: 87.3,
  monthlyAccuracy: 91.2,
  premiumAccuracy: 96.8,
  todayPredictions: 12,
  totalAnalyzed: 2847,
  correctPredictions: 2485,
  leagues: [
    { name: "Premier League", accuracy: 89.4, analyzed: 456 },
    { name: "La Liga", accuracy: 88.7, analyzed: 398 },
    { name: "Serie A", accuracy: 86.2, analyzed: 342 },
    { name: "Bundesliga", accuracy: 90.1, analyzed: 287 },
    { name: "Ligue 1", accuracy: 85.8, analyzed: 234 }
  ],
  recentForm: [
    { period: "Últimas 24h", correct: 11, total: 12, accuracy: 92 },
    { period: "Última semana", correct: 67, total: 74, accuracy: 91 },
    { period: "Último mês", correct: 284, total: 312, accuracy: 91 }
  ]
}

// Funcionalidades Premium
const premiumFeatures = [
  {
    icon: Crown,
    title: "Percentagens Ultra-Precisas",
    description: "Algoritmos avançados com 96.8% de precisão",
    highlight: "+9.5% precisão vs versão gratuita"
  },
  {
    icon: Zap,
    title: "Análises em Tempo Real",
    description: "Atualizações a cada 30 segundos durante jogos",
    highlight: "Alertas instantâneos"
  },
  {
    icon: Brain,
    title: "IA Insights Exclusivos",
    description: "Padrões micro-analíticos e tendências ocultas",
    highlight: "Dados que só o Premium vê"
  },
  {
    icon: Target,
    title: "Previsões de Momentos",
    description: "Quando exatamente os gols vão acontecer",
    highlight: "Precisão temporal avançada"
  },
  {
    icon: BarChart,
    title: "Análise de Risco Avançada",
    description: "Probabilidades de cartões, pênaltis, lesões",
    highlight: "Cenários completos"
  },
  {
    icon: Award,
    title: "Histórico Completo",
    description: "Acesso a todas as previsões desde 2020",
    highlight: "4+ anos de dados"
  }
]

export default function Home() {
  const [activeTab, setActiveTab] = useState("previsoes")
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [isPremium, setIsPremium] = useState(false)

  // Auto refresh das análises
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        // Simular atualização das análises
        console.log("Atualizando análises...")
      }, 30000) // 30 segundos
      return () => clearInterval(interval)
    }
  }, [autoRefresh])

  const renderPredictions = (match, usePremium = false) => {
    const predictions = usePremium ? match.premiumPredictions : match.predictions
    
    return (
      <div className="space-y-6">
        {/* Resultado Final */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Resultado Final
            {usePremium && <Crown className="w-4 h-4 text-yellow-500" />}
          </h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className={`text-2xl font-bold ${usePremium ? 'text-green-700 dark:text-green-300' : 'text-green-600 dark:text-green-400'}`}>
                {predictions.finalResult.homeWin}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {match.homeTeam}
              </div>
              <div className="text-xs text-gray-500 mt-1">Casa</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className={`text-2xl font-bold ${usePremium ? 'text-yellow-700 dark:text-yellow-300' : 'text-yellow-600 dark:text-yellow-400'}`}>
                {predictions.finalResult.draw}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Empate</div>
            </div>
            <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className={`text-2xl font-bold ${usePremium ? 'text-red-700 dark:text-red-300' : 'text-red-600 dark:text-red-400'}`}>
                {predictions.finalResult.awayWin}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {match.awayTeam}
              </div>
              <div className="text-xs text-gray-500 mt-1">Visitante</div>
            </div>
          </div>
        </div>

        {/* Outras Previsões */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Total de Gols */}
          <div className="space-y-3">
            <h5 className="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Goal className="w-4 h-4" />
              Total de Gols
              {usePremium && <Sparkles className="w-3 h-3 text-yellow-500" />}
            </h5>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <span className="text-sm">Mais de 2.5</span>
                <span className={`font-bold ${usePremium ? 'text-green-700 dark:text-green-300' : 'text-green-600 dark:text-green-400'}`}>
                  {predictions.totalGoals.over25}%
                </span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <span className="text-sm">Previsão exata</span>
                <span className={`font-bold ${usePremium ? 'text-blue-700 dark:text-blue-300' : 'text-blue-600 dark:text-blue-400'}`}>
                  {predictions.totalGoals.exact}
                </span>
              </div>
            </div>
          </div>

          {/* Ambas Marcam */}
          <div className="space-y-3">
            <h5 className="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Ambas Equipes Marcam
              {usePremium && <Sparkles className="w-3 h-3 text-yellow-500" />}
            </h5>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <span className="text-sm">Sim</span>
                <span className={`font-bold ${usePremium ? 'text-green-700 dark:text-green-300' : 'text-green-600 dark:text-green-400'}`}>
                  {predictions.bothTeamsScore.yes}%
                </span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <span className="text-sm">Não</span>
                <span className={`font-bold ${usePremium ? 'text-red-700 dark:text-red-300' : 'text-red-600 dark:text-red-400'}`}>
                  {predictions.bothTeamsScore.no}%
                </span>
              </div>
            </div>
          </div>

          {/* Primeiro Gol */}
          <div className="space-y-3">
            <h5 className="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Timer className="w-4 h-4" />
              Primeiro Gol
              {usePremium && <Sparkles className="w-3 h-3 text-yellow-500" />}
            </h5>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <span className="text-sm">{match.homeTeam}</span>
                <span className={`font-bold ${usePremium ? 'text-green-700 dark:text-green-300' : 'text-green-600 dark:text-green-400'}`}>
                  {predictions.firstGoal.home}%
                </span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <span className="text-sm">{match.awayTeam}</span>
                <span className={`font-bold ${usePremium ? 'text-red-700 dark:text-red-300' : 'text-red-600 dark:text-red-400'}`}>
                  {predictions.firstGoal.away}%
                </span>
              </div>
            </div>
          </div>

          {/* Handicap */}
          <div className="space-y-3">
            <h5 className="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Handicap
              {usePremium && <Sparkles className="w-3 h-3 text-yellow-500" />}
            </h5>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <span className="text-sm">{match.homeTeam} -1</span>
                <span className={`font-bold ${usePremium ? 'text-blue-700 dark:text-blue-300' : 'text-blue-600 dark:text-blue-400'}`}>
                  {match.predictions.handicap.homeMinusOne}%
                </span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <span className="text-sm">{match.homeTeam} +1</span>
                <span className={`font-bold ${usePremium ? 'text-green-700 dark:text-green-300' : 'text-green-600 dark:text-green-400'}`}>
                  {match.predictions.handicap.homePlusOne}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Placar Exato */}
        <div className="space-y-3">
          <h5 className="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Placar Mais Provável
            {usePremium && <Crown className="w-4 h-4 text-yellow-500" />}
          </h5>
          <div className={`text-center p-4 rounded-lg ${usePremium ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20' : 'bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20'}`}>
            <div className={`text-3xl font-bold ${usePremium ? 'text-yellow-600 dark:text-yellow-400' : 'text-cyan-600 dark:text-cyan-400'}`}>
              {match.homeTeam} {predictions.exactScore.home} x {predictions.exactScore.away} {match.awayTeam}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {predictions.confidence}% de confiança
            </div>
          </div>
        </div>

        {/* Artilheiros Prováveis */}
        <div className="space-y-3">
          <h5 className="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <Star className="w-4 h-4" />
            Quem Pode Marcar
            {usePremium && <Flame className="w-4 h-4 text-orange-500" />}
          </h5>
          <div className="grid gap-2 md:grid-cols-2">
            {predictions.goalScorers.map((scorer, index) => (
              <div key={index} className={`flex justify-between items-center p-3 rounded-lg ${usePremium ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20' : 'bg-gray-50 dark:bg-gray-800'}`}>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    scorer.team === 'home' ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-sm font-medium">{scorer.player}</span>
                </div>
                <span className={`font-bold ${usePremium ? 'text-orange-600 dark:text-orange-400' : 'text-blue-600 dark:text-blue-400'}`}>
                  {scorer.probability}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Insights Premium Exclusivos */}
        {usePremium && predictions.specialInsights && (
          <div className="space-y-3 pt-4 border-t border-yellow-200 dark:border-yellow-800">
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 flex items-center gap-2">
              <Crown className="w-4 h-4" />
              Insights Premium Exclusivos
            </h4>
            <div className="space-y-2">
              {predictions.specialInsights.map((insight, index) => (
                <div key={index} className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    {insight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  Robô de Futebol IA
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Análises Preditivas Inteligentes
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                <Target className="w-4 h-4 mr-1" />
                {isPremium ? robotStats.premiumAccuracy : robotStats.overallAccuracy}% Precisão
              </Badge>
              <Badge variant="outline" className="bg-cyan-50 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300">
                <Cpu className="w-4 h-4 mr-1" />
                {robotStats.todayPredictions} Análises Hoje
              </Badge>
              {!isPremium && (
                <Button 
                  onClick={() => setIsPremium(true)}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade Premium
                </Button>
              )}
              {isPremium && (
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                  <Crown className="w-4 h-4 mr-1" />
                  Premium Ativo
                </Badge>
              )}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={autoRefresh ? "text-green-600" : "text-gray-600"}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
                Auto-Refresh
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-fit lg:grid-cols-5">
            <TabsTrigger value="previsoes" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              <span className="hidden sm:inline">Previsões</span>
            </TabsTrigger>
            <TabsTrigger value="premium" className="flex items-center gap-2">
              <Crown className="w-4 h-4" />
              <span className="hidden sm:inline">Premium</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Performance</span>
            </TabsTrigger>
            <TabsTrigger value="analises" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Análises</span>
            </TabsTrigger>
            <TabsTrigger value="historico" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              <span className="hidden sm:inline">Histórico</span>
            </TabsTrigger>
          </TabsList>

          {/* Previsões Tab */}
          <TabsContent value="previsoes" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  Previsões do Robô
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {matches.length} jogos analisados • Precisão média {robotStats.overallAccuracy}%
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-gradient-to-r from-green-500 to-cyan-500 text-white">
                  <Zap className="w-4 h-4 mr-1" />
                  IA Ativa
                </Badge>
              </div>
            </div>

            {/* Status do Robô */}
            <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border-cyan-200 dark:border-cyan-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-cyan-800 dark:text-cyan-200">
                  <Cpu className="w-5 h-5" />
                  Status do Sistema
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {robotStats.overallAccuracy}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Precisão Geral</div>
                  </div>
                  <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {robotStats.todayPredictions}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Análises Hoje</div>
                  </div>
                  <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {robotStats.totalAnalyzed}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Analisados</div>
                  </div>
                  <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                    <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                      {robotStats.monthlyAccuracy}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Este Mês</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Jogos */}
            <div className="grid gap-6">
              {matches.map((match) => (
                <Card key={match.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-cyan-50 dark:from-gray-800 dark:to-cyan-900/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-xs">
                          {match.league}
                        </Badge>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Calendar className="w-4 h-4" />
                          {match.date} • {match.time}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          className={`${
                            match.predictions.finalResult.confidence >= 90 ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                            match.predictions.finalResult.confidence >= 80 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                            'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
                          }`}
                        >
                          <Brain className="w-3 h-3 mr-1" />
                          {match.predictions.finalResult.confidence}% Confiança
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {match.analysis.riskLevel} Risco
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center gap-8 mt-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {match.homeTeam}
                        </div>
                        <div className="text-sm text-gray-500">Casa</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-400">VS</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {match.awayTeam}
                        </div>
                        <div className="text-sm text-gray-500">Visitante</div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6 space-y-6">
                    {renderPredictions(match, false)}

                    {/* Análise IA */}
                    <div className="space-y-3 pt-4 border-t">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                        <Brain className="w-4 h-4" />
                        Análise do Robô
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        {match.analysis.aiInsight}
                      </p>
                      <div className="space-y-2">
                        <h6 className="text-sm font-medium text-gray-600 dark:text-gray-400">Fatores Considerados:</h6>
                        <div className="flex flex-wrap gap-2">
                          {match.analysis.keyFactors.map((factor, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {factor}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Última atualização: {match.analysis.lastUpdate}</span>
                        <span>Nível de risco: {match.analysis.riskLevel}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Premium Tab */}
          <TabsContent value="premium" className="space-y-6">
            {!isPremium ? (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                    Robô Premium
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Desbloqueie o poder completo da IA com percentagens ultra-precisas
                  </p>
                </div>

                {/* Comparação de Precisão */}
                <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                      <Crown className="w-5 h-5" />
                      Comparação de Precisão
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="text-center p-6 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                        <div className="text-3xl font-bold text-gray-600 dark:text-gray-400 mb-2">
                          {robotStats.overallAccuracy}%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Versão Gratuita</div>
                        <Badge variant="outline" className="mt-2">Básico</Badge>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/40 dark:to-orange-900/40 rounded-xl border-2 border-yellow-300 dark:border-yellow-700">
                        <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                          {robotStats.premiumAccuracy}%
                        </div>
                        <div className="text-sm text-yellow-700 dark:text-yellow-300">Versão Premium</div>
                        <Badge className="mt-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                          <Crown className="w-3 h-3 mr-1" />
                          +9.5% Precisão
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Funcionalidades Premium */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {premiumFeatures.map((feature, index) => (
                    <Card key={index} className="hover:shadow-lg transition-all duration-300 border-yellow-200 dark:border-yellow-800">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                            <feature.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                              {feature.title}
                            </h3>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {feature.description}
                        </p>
                        <Badge className="bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 dark:from-yellow-900/40 dark:to-orange-900/40 dark:text-yellow-200">
                          {feature.highlight}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* CTA Premium */}
                <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                  <CardContent className="p-8 text-center">
                    <Crown className="w-16 h-16 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">
                      Upgrade para Premium
                    </h3>
                    <p className="mb-6 opacity-90">
                      Tenha acesso às percentagens mais altas e insights exclusivos da IA
                    </p>
                    <Button 
                      size="lg"
                      onClick={() => setIsPremium(true)}
                      className="bg-white text-yellow-600 hover:bg-gray-100"
                    >
                      <Crown className="w-5 h-5 mr-2" />
                      Ativar Premium Agora
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                      Previsões Premium
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Percentagens ultra-precisas • {robotStats.premiumAccuracy}% de precisão
                    </p>
                  </div>
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                    <Crown className="w-4 h-4 mr-1" />
                    Premium Ativo
                  </Badge>
                </div>

                {/* Status Premium */}
                <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                      <Crown className="w-5 h-5" />
                      Status Premium
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-4">
                      <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                          {robotStats.premiumAccuracy}%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Precisão Premium</div>
                      </div>
                      <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                          +9.5%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Vs Gratuito</div>
                      </div>
                      <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          24/7
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Tempo Real</div>
                      </div>
                      <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          ∞
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Histórico</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Jogos Premium */}
                <div className="grid gap-6">
                  {matches.map((match) => (
                    <Card key={match.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-yellow-200 dark:border-yellow-800 shadow-lg">
                      <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                              <Crown className="w-3 h-3 mr-1" />
                              {match.league}
                            </Badge>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <Calendar className="w-4 h-4" />
                              {match.date} • {match.time}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                              <Brain className="w-3 h-3 mr-1" />
                              {match.premiumPredictions.finalResult.confidence}% Confiança
                            </Badge>
                            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                              <Sparkles className="w-3 h-3 mr-1" />
                              Premium
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-center gap-8 mt-4">
                          <div className="text-center">
                            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                              {match.homeTeam}
                            </div>
                            <div className="text-sm text-gray-500">Casa</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">VS</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                              {match.awayTeam}
                            </div>
                            <div className="text-sm text-gray-500">Visitante</div>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="p-6 space-y-6">
                        {renderPredictions(match, true)}

                        {/* Análise IA Premium */}
                        <div className="space-y-3 pt-4 border-t border-yellow-200 dark:border-yellow-800">
                          <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 flex items-center gap-2">
                            <Crown className="w-4 h-4" />
                            Análise Premium do Robô
                          </h4>
                          <p className="text-yellow-800 dark:text-yellow-200 leading-relaxed text-sm bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                            {match.analysis.aiInsight}
                          </p>
                          <div className="space-y-2">
                            <h6 className="text-sm font-medium text-yellow-700 dark:text-yellow-300">Fatores Premium Considerados:</h6>
                            <div className="flex flex-wrap gap-2">
                              {match.analysis.keyFactors.map((factor, index) => (
                                <Badge key={index} className="bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 dark:from-yellow-900/40 dark:to-orange-900/40 dark:text-yellow-200">
                                  {factor}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-xs text-yellow-600 dark:text-yellow-400">
                            <span>Última atualização: {match.analysis.lastUpdate}</span>
                            <span>Precisão Premium: {match.premiumPredictions.finalResult.confidence}%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Performance do Robô
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Estatísticas detalhadas de precisão e acertos
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Precisão Geral
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl">
                    <div className="text-4xl font-bold text-green-600 dark:text-green-400">
                      {isPremium ? robotStats.premiumAccuracy : robotStats.overallAccuracy}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Precisão {isPremium ? 'Premium' : 'Histórica'}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Previsões Corretas</span>
                      <span className="font-semibold">{robotStats.correctPredictions}/{robotStats.totalAnalyzed}</span>
                    </div>
                    <Progress value={(robotStats.correctPredictions / robotStats.totalAnalyzed) * 100} className="h-3" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Forma Recente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {robotStats.recentForm.map((period, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{period.period}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold">{period.accuracy}%</span>
                          <Badge className={period.accuracy >= 90 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                            {period.correct}/{period.total}
                          </Badge>
                        </div>
                      </div>
                      <Progress value={period.accuracy} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Performance por Liga */}
            <Card>
              <CardHeader>
                <CardTitle>Performance por Liga</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {robotStats.leagues.map((league, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{league.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">{league.accuracy}%</span>
                        <Badge variant="outline" className="text-xs">
                          {league.analyzed} jogos
                        </Badge>
                      </div>
                    </div>
                    <Progress value={league.accuracy} className="h-3" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Análises Tab */}
          <TabsContent value="analises" className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Análises Detalhadas
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Como o robô chega às suas conclusões
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Metodologia do Robô
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                      Dados Históricos
                    </h4>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Últimos 50 jogos de cada equipe</li>
                      <li>• Confrontos diretos (10 anos)</li>
                      <li>• Performance em casa/fora</li>
                      <li>• Forma recente (últimos 5 jogos)</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                      Estatísticas Avançadas
                    </h4>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Expected Goals (xG)</li>
                      <li>• Posse de bola média</li>
                      <li>• Finalizações por jogo</li>
                      <li>• Eficiência defensiva</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                      Fatores Contextuais
                    </h4>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Escalações confirmadas</li>
                      <li>• Lesões e suspensões</li>
                      <li>• Condições climáticas</li>
                      <li>• Motivação (posição na tabela)</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">
                      Algoritmos IA
                    </h4>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Machine Learning avançado</li>
                      <li>• Redes neurais profundas</li>
                      <li>• Análise de padrões</li>
                      <li>• Aprendizado contínuo</li>
                    </ul>
                  </div>
                </div>

                {isPremium && (
                  <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2 flex items-center gap-2">
                      <Crown className="w-4 h-4" />
                      Recursos Premium Exclusivos
                    </h4>
                    <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                      <li>• Análise de micro-padrões comportamentais</li>
                      <li>• Predição de momentos específicos dos gols</li>
                      <li>• Probabilidades de eventos raros (cartões, pênaltis)</li>
                      <li>• Análise térmica de performance dos jogadores</li>
                      <li>• Algoritmos de deep learning exclusivos</li>
                    </ul>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-3">Processo de Análise</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      <span className="text-sm">Coleta de dados em tempo real de múltiplas fontes</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      <span className="text-sm">Processamento através de algoritmos de IA</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      <span className="text-sm">Cálculo de probabilidades para cada cenário</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                      <span className="text-sm">Validação e ajuste baseado em feedback histórico</span>
                    </div>
                    {isPremium && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
                        <span className="text-sm flex items-center gap-2">
                          Refinamento premium com algoritmos exclusivos
                          <Crown className="w-4 h-4 text-yellow-500" />
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Histórico Tab */}
          <TabsContent value="historico" className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Histórico de Previsões
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Transparência total dos resultados
              </p>
            </div>

            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Últimas Previsões {isPremium && <Crown className="w-4 h-4 text-yellow-500" />}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { match: "Arsenal 2-1 Chelsea", prediction: "Arsenal vitória", result: "✅ Correto", confidence: isPremium ? 96 : 78, premium: true },
                      { match: "PSG 3-0 Marseille", prediction: "PSG vitória + Over 2.5", result: "✅ Correto", confidence: isPremium ? 98 : 89, premium: true },
                      { match: "Milan 1-1 Inter", prediction: "Empate", result: "✅ Correto", confidence: isPremium ? 87 : 65, premium: false },
                      { match: "Atletico 0-2 Real Madrid", prediction: "Real Madrid vitória", result: "✅ Correto", confidence: isPremium ? 94 : 72, premium: true },
                      { match: "Liverpool 2-3 Man City", prediction: "Over 2.5 gols", result: "✅ Correto", confidence: isPremium ? 99 : 84, premium: true },
                      { match: "Juventus 1-0 Napoli", prediction: "Under 2.5 gols", result: "❌ Incorreto", confidence: isPremium ? 74 : 68, premium: false }
                    ].map((item, index) => (
                      <div key={index} className={`flex items-center justify-between p-3 border rounded-lg ${isPremium && item.premium ? 'border-yellow-200 dark:border-yellow-800 bg-gradient-to-r from-yellow-50/50 to-orange-50/50 dark:from-yellow-900/10 dark:to-orange-900/10' : ''}`}>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <div className="font-medium text-sm">{item.match}</div>
                            {isPremium && item.premium && <Crown className="w-3 h-3 text-yellow-500" />}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">{item.prediction}</div>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-medium ${
                            item.result.includes('✅') ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {item.result}
                          </div>
                          <div className={`text-xs ${isPremium && item.premium ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-500'}`}>
                            {item.confidence}% confiança
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}