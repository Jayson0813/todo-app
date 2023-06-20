import { useEffect, useState } from 'react';
import styles from './ThemeSwitcher.module.css';
import { MoonIcon, SunIcon, SwatchIcon, XMarkIcon } from '@heroicons/react/24/outline';
import useLocalStorage from './hooks/useLocalStorage'

const ThemeSwitcher = () => {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('TodoApp.theme', defaultDark ? 'dark' : 'light');
  const [isColorPicking, setIsColorPicking] = useState(false);
  const [hue, setHue] = useLocalStorage('TodoApp.color', '240');

  const handleThemeButton = () => setTheme(theme === "light" ? "dark" : "light");

  useEffect(() => {
    document.documentElement.setAttribute('color-scheme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.style.setProperty('--_hue', hue)
  }, [hue])

  return (
    <aside 
      className={styles.wrapper}
      style={{
        backgroundColor: isColorPicking
          ? 'hsl(var(--muted / .6)'
          : 'transparent'
      }}
    >
      {
        isColorPicking 
        ? (
          <>
            <button
              className={`btn ${styles.close}`}
              aria-label='Close color picking mode'
              onClick={() => setIsColorPicking(false)}
            >
              <XMarkIcon />
            </button>
            <input 
              type="range" 
              className={styles.picker}
              aria-label='Change color theme slider'
              min="0"
              max="360"
              value={hue}
              onInput={(e) => setHue(e.target.value)}
            />
          </>
        )
        : (
          <div className={styles.btns}>
            <button 
              className='btn'
              aria-label={`Change theme to ${theme === "light" ? "dark" : "light"} mode`}
              role='switch'
              onClick={handleThemeButton}
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />} 
            </button>

            <button 
              className='btn'
              aria-label='Enable color picking mode'
              onClick={() => setIsColorPicking(true)}
            >
              <SwatchIcon />
            </button>
          </div>
        )
      }
    </aside>
  )
}

export default ThemeSwitcher  