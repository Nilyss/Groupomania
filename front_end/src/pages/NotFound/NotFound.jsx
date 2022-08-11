// libraries
import { Link } from 'react-router-dom'

// asset
import NotFoundAsset from '../../assets/notFound.webp'

// css
import './_NotFound.scss'

export default function NotFound() {
  return (
    <div className="notFoundAsset">
      <figure className="notFoundAsset__fig">
        <img
          className="notFoundAsset__fig__img"
          src={NotFoundAsset}
          alt="not found"
        />
      </figure>
      <Link to="/home" className="notFoundAsset__link">
        Back to home page
      </Link>
    </div>
  )
}
