import "./footer.css";
// import { Link } from 'react-router-dom';

// const Footer = () => {

//   return (
//     <div className='footer'>Footer</div>
//   )
// }

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <p className="footer-copyright">
            &copy; {currentYear} Taurus and Bloodroot - FCNY2 <span>🍋</span>
          </p>
          <nav className="footer-nav">
            {/* <Link to="/" className="footer-link">Home</Link>
              <span>|</span>
              <Link to="/inventory" className="footer-link">Inventory</Link> */}
          </nav>
          <p>Built with MongoDB, Express, React, Node</p>
        </div>
      </footer>
    </>
  );
}
