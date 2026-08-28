import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="page-wrapper">
        {children}
      </div>
    </div>
  );
}
