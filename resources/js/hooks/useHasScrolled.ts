import { useState, useEffect } from "react"

const useWindowScrollPosition = ({distance = 0}) => {

    const [scrollPosition, setScrollPosition] = useState(window.pageYOffset)

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.pageYOffset)
        }

        window.addEventListener("scroll", handleScroll)

        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return scrollPosition >= distance;
}

export default useWindowScrollPosition
