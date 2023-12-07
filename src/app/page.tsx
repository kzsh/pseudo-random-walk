'use client'
import {useEffect, useRef} from 'react';
import {configureCanvas, setupLoop} from './canvas';
import styles from './page.module.css'

export default function Home() {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref?.current
    if (element) {
      const canvas = configureCanvas(element);
      setupLoop(canvas);
    }
  }, [ref])

  return (
    <main ref={ref} className={styles.main}>
    <p className={styles.explanation}>
      Random drawing using 3 different methods of RNG.  
      After a moment, the seedable pattern will get stuck in 
      a predictable loop and trail off, since it has no safeguards.
    </p>
    </main>
  )
}
