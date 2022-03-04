import {
  InformationCircleIcon,
  ChartBarIcon,
  SunIcon,
  MoonIcon,
  // CakeIcon,
  // AcademicCapIcon,
} from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import GraphemeSplitter from 'grapheme-splitter'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { AboutModal } from './components/modals/AboutModal'
import { InfoModal } from './components/modals/InfoModal'
import { StatsModal } from './components/modals/StatsModal'
import {
  GAME_TITLE,
  WIN_MESSAGES,
  GAME_COPIED_MESSAGE,
  ABOUT_GAME_MESSAGE,
  NOT_ENOUGH_CARDS_MESSAGE,
  INVALID_HAND_MESSAGE,
  CORRECT_HAND_MESSAGE,
} from './constants/strings'
import {
  MAX_CARD_LENGTH,
  MAX_CHALLENGES,
  ALERT_TIME_MS,
  REVEAL_TIME_MS,
  GAME_LOST_INFO_DELAY,
} from './constants/settings'
import {
  isInvalidHand,
  isWinningHand,
  solution,
  findFirstUnusedReveal,
  solutionDisplay,
} from './lib/hands'
import { addStatsForCompletedGame, loadStats } from './lib/stats'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from './lib/localStorage'

import './App.css'
import { HandsModal } from './components/modals/HandsModal'

const graphemeSplitter = new GraphemeSplitter()

function App() {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches

  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isHandsModalOpen, setIsHandsModalOpen] = useState(false)
  const [isNotEnoughCards, setIsNotEnoughCards] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isInvalidHandAlertOpen, setIsInvalidHandAlertOpen] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme')
      ? localStorage.getItem('theme') === 'dark'
      : prefersDarkMode
  )

  const [isFirstVisit, setIsFirstVisit] = useState(
    localStorage.getItem('isFirstVisit')
      ? localStorage.getItem('isFirstVisit') !== 'F'
      : true
  )
  const [successAlert, setSuccessAlert] = useState('')
  const [isRevealing, setIsRevealing] = useState(false)
  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.solution !== solution) {
      return []
    }
    const gameWasWon = loaded.guesses.includes(solution)
    if (gameWasWon) {
      setIsGameWon(true)
    }
    if (loaded.guesses.length === MAX_CHALLENGES && !gameWasWon) {
      setIsGameLost(true)
    }
    return loaded.guesses
  })

  const [stats, setStats] = useState(() => loadStats())

  // const [isHardMode, setIsHardMode] = useState(
  //   localStorage.getItem('gameMode')
  //     ? localStorage.getItem('gameMode') === 'hard'
  //     : false
  // )
  const isHardMode = false

  const [isMissingPreviousCards, setIsMissingPreviousCards] = useState(false)
  const [missingCardMessage, setIsMissingCardMessage] = useState('')

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  useEffect(() => {
    if (isFirstVisit) {
      setIsInfoModalOpen(true)
      localStorage.setItem('isFirstVisit', 'F')
      setIsFirstVisit(false)
    }
  }, [isFirstVisit])

  // const handleHardMode = (isHard: boolean) => {
  //   setIsHardMode(isHard)
  //   localStorage.setItem('gameMode', isHard ? 'hard' : 'normal')
  // }

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution })
  }, [guesses])

  useEffect(() => {
    if (isGameWon) {
      setTimeout(() => {
        setSuccessAlert(
          WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
        )

        setTimeout(() => {
          setSuccessAlert('')
          setIsStatsModalOpen(true)
        }, ALERT_TIME_MS)
      }, REVEAL_TIME_MS * (MAX_CARD_LENGTH + 2))
    }
    if (isGameLost) {
      setTimeout(() => {
        setIsStatsModalOpen(true)
      }, GAME_LOST_INFO_DELAY)
    }
  }, [isGameWon, isGameLost])

  const onCard = (value: string) => {
    if (
      graphemeSplitter.splitGraphemes(currentGuess).length < MAX_CARD_LENGTH &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setCurrentGuess(`${currentGuess}${value}`)
    }
  }

  const onDelete = () => {
    setCurrentGuess(
      graphemeSplitter.splitGraphemes(currentGuess).slice(0, -1).join('')
    )
  }

  const onEnter = () => {
    if (isGameWon || isGameLost) {
      return
    }
    if (
      graphemeSplitter.splitGraphemes(currentGuess).length !== MAX_CARD_LENGTH
    ) {
      setIsNotEnoughCards(true)
      return setTimeout(() => {
        setIsNotEnoughCards(false)
      }, ALERT_TIME_MS)
    }

    if (!isInvalidHand(currentGuess)) {
      setIsInvalidHandAlertOpen(true)
      return setTimeout(() => {
        setIsInvalidHandAlertOpen(false)
      }, ALERT_TIME_MS)
    }

    // enforce hard mode - all guesses must contain all previously revealed letters
    if (isHardMode) {
      const firstMissingReveal = findFirstUnusedReveal(currentGuess, guesses)
      if (firstMissingReveal) {
        setIsMissingCardMessage(firstMissingReveal)
        setIsMissingPreviousCards(true)
        return setTimeout(() => {
          setIsMissingPreviousCards(false)
        }, ALERT_TIME_MS)
      }
    }

    setIsRevealing(true)
    // turn this back off after all
    // chars have been revealed
    setTimeout(() => {
      setIsRevealing(false)
    }, REVEAL_TIME_MS * (MAX_CARD_LENGTH + 2))

    if (
      graphemeSplitter.splitGraphemes(currentGuess).length ===
        MAX_CARD_LENGTH &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')

      if (isWinningHand(currentGuess)) {
        setStats(addStatsForCompletedGame(stats, guesses.length))
        return setIsGameWon(true)
      }

      if (guesses.length === MAX_CHALLENGES - 1) {
        setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        setIsGameLost(true)
      }
    }
  }
  // console.log(guesses, currentGuess, isRevealing)

  return (
    <div className="pt-2 pb-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="flex w-80 mx-auto items-center mb-8 mt-8">
        <h1 className="text-xl ml-2.5 grow font-bold dark:text-white">
          {GAME_TITLE}
        </h1>
        {/* {isHardMode ? (
          <AcademicCapIcon
            className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
            onClick={() => handleHardMode(!isHardMode)}
          />
        ) : (
          <CakeIcon
            className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
            onClick={() => handleHardMode(!isHardMode)}
          />
        )} */}
        {isDarkMode ? (
          <SunIcon
            className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
            onClick={() => handleDarkMode(!isDarkMode)}
          />
        ) : (
          <MoonIcon
            className="h-6 w-6 mr-2 cursor-pointer"
            onClick={() => handleDarkMode(!isDarkMode)}
          />
        )}
        <InformationCircleIcon
          className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
          onClick={() => setIsInfoModalOpen(true)}
        />
        <ChartBarIcon
          className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
          onClick={() => setIsStatsModalOpen(true)}
        />
      </div>
      <Grid
        guesses={guesses}
        currentGuess={currentGuess}
        isRevealing={isRevealing}
      />
      <Keyboard
        onCard={onCard}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
        currentGuess={currentGuess}
        isRevealing={isRevealing}
        setIsHandsModalOpen={setIsHandsModalOpen}
      />
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
        setIsHandsModalOpen={setIsHandsModalOpen}
      />
      <HandsModal
        isOpen={isHandsModalOpen}
        handleClose={() => setIsHandsModalOpen(false)}
      />
      <StatsModal
        isOpen={isStatsModalOpen}
        handleClose={() => setIsStatsModalOpen(false)}
        guesses={guesses}
        gameStats={stats}
        isGameLost={isGameLost}
        isGameWon={isGameWon}
        handleShare={() => {
          setSuccessAlert(GAME_COPIED_MESSAGE)
          return setTimeout(() => setSuccessAlert(''), ALERT_TIME_MS)
        }}
        // isHardMode={false}
        isHardMode={isHardMode}
      />
      <AboutModal
        isOpen={isAboutModalOpen}
        handleClose={() => setIsAboutModalOpen(false)}
      />

      <button
        type="button"
        className="mx-auto mt-8 flex items-center px-2.5 py-1.5 border border-transparent text-xs text-slate-500 font-medium rounded bg-slate-100 hover:bg-slate-200 dark:text-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 select-none"
        onClick={() => setIsAboutModalOpen(true)}
      >
        {ABOUT_GAME_MESSAGE}
      </button>

      <Alert message={NOT_ENOUGH_CARDS_MESSAGE} isOpen={isNotEnoughCards} />
      <Alert message={INVALID_HAND_MESSAGE} isOpen={isInvalidHandAlertOpen} />
      <Alert message={missingCardMessage} isOpen={isMissingPreviousCards} />
      <Alert
        message={CORRECT_HAND_MESSAGE(solutionDisplay)}
        isOpen={isGameLost && !isRevealing}
      />
      <Alert
        message={successAlert}
        isOpen={successAlert !== ''}
        variant="success"
      />
    </div>
  )
}

export default App
