/* Navbar based on the tutorial available at
* https://ansonlowzf.com/how-to-build-a-material-ui-navbar/
*/
import * as React from "react"
import { Zoom, useScrollTrigger } from "@material-ui/core"

const style = {
  position: `fixed`,
  bottom: `50px`,
  right: `100px`,
  zIndex: `99`,
}

//Component to add the "back to top" button when page is scrolled down
const BackToTop = ({ children }) => {
  const trigger = useScrollTrigger()

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    )
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" style={style}>
        {children}
      </div>
    </Zoom>
  )
}

export default BackToTop