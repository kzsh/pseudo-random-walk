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
    <main ref={ref} className={styles.main} />
  )
}
