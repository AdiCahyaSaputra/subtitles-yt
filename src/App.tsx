import { useCallback, useEffect, useRef, useState } from "react"
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
      }, 1000)
    }, 3000)

  }, [submitedValue, subtitles])

  useEffect(() => {

    if(subtitles.split(" ").length === 10) buttonRef.current?.click() 

  }, [subtitles])

  return (
    <>
      <form onSubmit={submitHandler}>
        <input type="text" id="msg" onChange={(e) => setSubtitles(e.target.value)} value={subtitles} />
        <button type="submit" ref={buttonRef} disabled={submitedValue !== ''}>Enter</button>
      </form>
      <main className="app">
        {submitedValue && (
          <h2 className={`sub-enter ${hidden && 'hidden'}`}>{submitedValue}</h2>
        )}
        <h2>{subtitles}</h2>
      </main>
    </>
  )
}

export default App
