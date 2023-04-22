import { useCallback, useRef, useState } from "react"
import './App.css'

const App = () => {
  const [subtitles, setSubtitles] = useState("")
  const [submitedValue, setSubmitedValue] = useState("")
  const [hidden, setHidden] = useState(false)

  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const submitHandler: React.FormEventHandler<HTMLFormElement> = useCallback((e) => {
    e.preventDefault()

    setSubmitedValue(subtitles)
    setSubtitles("")

    setTimeout(() => {
      setHidden(true)

      setTimeout(() => {
        setSubmitedValue(prev => "")
        setHidden(prev => false)
      }, 700)
    }, 2500)

  }, [submitedValue, subtitles])

  return (
    <>
      <form onSubmit={submitHandler}>
        <input type="text" id="msg" autoComplete="off" onChange={(e) => setSubtitles(e.target.value)} value={subtitles} />
        <button type="submit" ref={buttonRef} disabled={submitedValue !== ''}>Enter</button>
      </form>
      <main className="app">
        {submitedValue && (
          <p className={`sub-enter ${hidden && 'hidden'}`}>{submitedValue}</p>
        )}
        <p className={`${!subtitles && 'no-words'}`}>{subtitles}</p>
      </main>
    </>
  )
}

export default App
