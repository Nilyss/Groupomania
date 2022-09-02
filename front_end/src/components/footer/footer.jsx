// css
import './_footer.scss'

// logo
import footerLogo from '../../assets/icon-left-font-monochrome-white.png'

export default function Footer() {
  return (
    <>
      <div className="footerContainer">
        <figure
          aria-label="Logo de Groupomania"
          className="footerContainer__fig"
        >
          <img
            src={footerLogo}
            alt="Groupomania logo"
            className="footerContainer__fig__img"
          />
        </figure>
      </div>
    </>
  )
}
