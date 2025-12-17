import "./header.css";

const Header = () => {
 return (
   <>
     <div className="header-container">
       <div className="title-icon">
         <h1 className="icon">🐶</h1>
         <p className="title">PANTRY PAL</p>
       </div>
       <div className="slogan">
         <p>
           <small>Helping you fetch your groceries.</small>
         </p>
       </div>
     </div>
   </>
 );
};

export default Header;


