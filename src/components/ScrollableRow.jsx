import React, { useRef, useState, useEffect } from 'react'

export default function ScrollableRow({ className, children }) {
  const ref = useRef(null)
  const [isScrollable, setIsScrollable] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const count = React.Children.count(children)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    function check() {
      setIsScrollable(el.scrollWidth > el.clientWidth + 4)
    }

    function onScroll() {
      const maxScroll = el.scrollWidth - el.clientWidth
      if (maxScroll <= 0) return
      setActiveIdx(Math.round((el.scrollLeft / maxScroll) * (count - 1)))
    }

    check()
    el.addEventListener('scroll', onScroll, { passive: true })
    const ro = new ResizeObserver(check)
    ro.observe(el)

    return () => {
      el.removeEventListener('scroll', onScroll)
      ro.disconnect()
    }
  }, [count])

  return (
    <>
      <div ref={ref} className={className}>
        {children}
      </div>
      {isScrollable && (
        <div className="scroll-dots" aria-hidden="true">
          {Array.from({ length: count }, (_, i) => (
            <span
              key={i}
              className={`scroll-dot${i === activeIdx ? ' scroll-dot--active' : ''}`}
            />
          ))}
        </div>
      )}
    </>
  )
}
