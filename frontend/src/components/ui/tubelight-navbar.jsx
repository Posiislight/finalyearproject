import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import { cn } from "../../lib/utils"

export function NavBar({ items, className }) {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isMobile, setIsMobile] = useState(false)

  // Sync active tab with current location path
  useEffect(() => {
    const currentItem = items.find(item => item.url === location.pathname)
    if (currentItem) {
      setActiveTab(currentItem.name)
    } else if (location.pathname === '/') {
      // Logic for defaulting to 'Home'/'Landings' on root if matching item isn't found
      setActiveTab(items[0].name)
    }
  }, [location.pathname, items])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-6 left-1/2 -translate-x-1/2 z-[100] mb-6 sm:mb-0",
        className,
      )}
    >
      <div className="flex items-center gap-3 bg-black/40 border border-white/10 backdrop-blur-lg py-1 px-1 rounded-full shadow-2xl shadow-black/50">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name
          const isSignUp = item.name === 'Sign Up Free'

          return (
            <Link
              key={item.name}
              to={item.url}
              onClick={(e) => {
                if (item.onClick) {
                  e.preventDefault()
                  item.onClick()
                } else {
                  setActiveTab(item.name)
                }
              }}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-all",
                "text-white/70 hover:text-white",
                isActive && "bg-white/10 text-white",
                isSignUp && "bg-primary text-white hover:bg-primary/90",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && !isSignUp && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-white/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-t-full">
                    <div className="absolute w-12 h-6 bg-white/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-white/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-white/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
